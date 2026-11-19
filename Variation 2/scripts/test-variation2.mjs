import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const vite = await createServer({
  root: rootDir,
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { INITIAL_PATHWAY_STATE } = await vite.ssrLoadModule('/src/context/PathwayContext.tsx');
  const {
    evaluatePathway,
    DEFAULT_PROGRAMME_RULES,
    evaluateGradeCondition,
    getSelectableCategories,
  } = await vite.ssrLoadModule('/src/utils/pathwayEngine.ts');
  const {
    CANONICAL_PROGRAMMES,
    getActiveCatalogue,
    getPriorityProgrammes,
    getProgrammeBySlugOrId,
  } = await vite.ssrLoadModule('/src/data/catalogue.ts');
  const {
    submitConsultationRequest,
    validateConsultationInput,
    createIdempotencyKey,
  } = await vite.ssrLoadModule('/src/services/consultationService.ts');
  const { buildWhatsAppUrl, siteConfig } = await vite.ssrLoadModule('/src/config/siteConfig.ts');

  const catalogue = getActiveCatalogue();

  // P01: Fresh visitor has NO invented qualification, grade, completion year, stream, or pass count
  assert.equal(INITIAL_PATHWAY_STATE.startingPoint, null, 'P01: startingPoint must be null');
  assert.equal(INITIAL_PATHWAY_STATE.qualifications.length, 0, 'P01: qualifications must be empty');
  assert.equal(INITIAL_PATHWAY_STATE.alStream, null, 'P01: alStream must be null');
  assert.equal(INITIAL_PATHWAY_STATE.alPassesCount, null, 'P01: alPassesCount must be null');
  assert.equal(INITIAL_PATHWAY_STATE.olMathsGrade, null, 'P01: olMathsGrade must be null');
  assert.equal(INITIAL_PATHWAY_STATE.olEnglishGrade, null, 'P01: olEnglishGrade must be null');

  // V03: All 5 priority programmes exist distinctly & archive exclusion works
  const priorities = getPriorityProgrammes();
  assert.equal(priorities.length, 5, 'V03: Must have all 5 marketing priority programmes');
  assert.ok(
    priorities.some((p) => p.id === 'diploma-in-computing') &&
      CANONICAL_PROGRAMMES.some((p) => p.id === 'hnd-software-engineering'),
    'Diploma in Computing remains distinct from HND Software/Computing records'
  );
  const archived = getProgrammeBySlugOrId('certificate-drafting-legacy');
  assert.equal(archived?.availability, 'archived-unavailable');
  assert.ok(
    !catalogue.some((p) => p.id === 'certificate-drafting-legacy'),
    'P08: Inactive/archived programmes excluded from active catalogue'
  );

  // Synthetic approved rule fixture to test strict 3-valued logic deterministically
  const approvedTestRules = [
    {
      id: 'approved-rule-eng',
      programmeId: 'foundation-in-engineering',
      source: 'Test approved spec',
      versionDate: '2026-11-19',
      approved: true,
      active: true,
      minOLMathsGrade: 'C',
      minOLEnglishGrade: 'S',
      acceptedQualificationIds: ['gce-ol-sl', 'gce-al-sl'],
      requiresEquivalenceForForeign: true,
      ruleSummary: 'Approved C+ O/L Maths and S+ O/L English',
    },
    {
      id: 'approved-rule-al',
      programmeId: 'civil-engineering',
      source: 'Test approved spec',
      versionDate: '2026-11-19',
      approved: true,
      active: true,
      requiresAL: true,
      minALPasses: 2,
      requiredALStreams: ['Physical Science / Combined Mathematics'],
      minOLMathsGrade: 'C',
      acceptedQualificationIds: ['gce-al-sl'],
      requiresEquivalenceForForeign: true,
      preparatoryAlternativeId: 'foundation-in-engineering',
      preparatoryApproved: true,
      ruleSummary: 'Requires 2 A/L passes in Physical Science + C O/L Maths',
    },
    {
      id: 'inactive-rule-biz',
      programmeId: 'diploma-in-business-management',
      source: 'Inactive test rule',
      versionDate: '2026-11-19',
      approved: true,
      active: false,
      acceptedQualificationIds: ['gce-ol-sl'],
      requiresEquivalenceForForeign: false,
      ruleSummary: 'Inactive rule should never act as permissive pass',
    },
  ];

  // P03: O/L with unknown grades produces REQUIREMENTS_TO_CHECK / ADMISSIONS_REVIEW_NEEDED, NEVER SUGGESTED_OPTION
  const olUnknownRes = evaluatePathway(
    { ...INITIAL_PATHWAY_STATE, startingPoint: 'after-ol', qualifications: ['gce-ol-sl'] },
    catalogue,
    approvedTestRules
  );
  const olEng = olUnknownRes.allResults.find((r) => r.programme.id === 'foundation-in-engineering');
  assert.notEqual(olEng?.status, 'SUGGESTED_OPTION', 'P03: O/L without grades cannot be SUGGESTED_OPTION');
  assert.equal(olEng?.conditionChecks.maths, 'unknown', 'P03: Maths grade must evaluate unknown');

  // P04: A/L awaiting results stays pending/unknown, NEVER fails or grants direct eligibility
  const alAwaitingRes = evaluatePathway(
    {
      ...INITIAL_PATHWAY_STATE,
      startingPoint: 'after-al',
      qualifications: ['gce-al-sl'],
      resultStatus: 'awaiting-results',
      alStream: 'Physical Science / Combined Mathematics',
    },
    catalogue,
    approvedTestRules
  );
  const awaitingCivil = alAwaitingRes.allResults.find((r) => r.programme.id === 'civil-engineering');
  assert.notEqual(awaitingCivil?.status, 'CRITERIA_NOT_MET_REVIEW', 'P04: Awaiting results must not false-fail');
  assert.notEqual(awaitingCivil?.status, 'SUGGESTED_OPTION', 'P04: Awaiting results must not claim direct match');

  // P05: Diploma/HND holder receives no automatic advanced standing
  const priorHndRes = evaluatePathway(
    {
      ...INITIAL_PATHWAY_STATE,
      startingPoint: 'holding-qualification',
      qualifications: ['higher-diploma'],
    },
    catalogue,
    DEFAULT_PROGRAMME_RULES
  );
  assert.ok(
    priorHndRes.allResults.every((r) => r.status !== 'SUGGESTED_OPTION'),
    'P05: Prior diploma/HND without approved equivalence rule does not get automatic top-up pass'
  );

  // P06: Cambridge/Edexcel without approved mapping triggers equivalence review
  const cambridgeRes = evaluatePathway(
    {
      ...INITIAL_PATHWAY_STATE,
      startingPoint: 'after-ol',
      qualifications: ['cambridge-ol'],
      qualificationSystem: 'cambridge-edexcel',
      olMathsGrade: 'A',
      olEnglishGrade: 'A',
    },
    catalogue,
    approvedTestRules
  );
  const cambridgeEng = cambridgeRes.allResults.find((r) => r.programme.id === 'foundation-in-engineering');
  assert.equal(
    cambridgeEng?.status,
    'ADMISSIONS_REVIEW_NEEDED',
    'P06: Foreign examination system requires equivalence review'
  );

  // P07: Empty/blank strings never pass stream or grade conditions
  assert.equal(evaluateGradeCondition('', 'C'), 'unknown', 'P07: Blank grade must evaluate unknown');
  const blankStreamRes = evaluatePathway(
    {
      ...INITIAL_PATHWAY_STATE,
      startingPoint: 'after-al',
      qualifications: ['gce-al-sl'],
      alStream: '   ',
      alPassesCount: 3,
      olMathsGrade: 'A',
    },
    catalogue,
    approvedTestRules
  );
  const blankStreamCivil = blankStreamRes.allResults.find((r) => r.programme.id === 'civil-engineering');
  assert.equal(blankStreamCivil?.conditionChecks.stream, 'unknown', 'P07: Blank stream must not pass');

  // P08: Inactive rule does not fall back to permissive pass
  const inactiveRes = evaluatePathway(
    {
      ...INITIAL_PATHWAY_STATE,
      startingPoint: 'after-ol',
      qualifications: ['gce-ol-sl'],
    },
    catalogue,
    approvedTestRules
  );
  const inactiveBiz = inactiveRes.allResults.find(
    (r) => r.programme.id === 'diploma-in-business-management'
  );
  assert.equal(
    inactiveBiz?.status,
    'ADMISSIONS_REVIEW_NEEDED',
    'P08: Inactive rule defaults to ADMISSIONS_REVIEW_NEEDED'
  );

  // Unmet mandatory condition separates cleanly from unknown evidence & links approved preparatory alternative
  const unmetMathsRes = evaluatePathway(
    {
      ...INITIAL_PATHWAY_STATE,
      startingPoint: 'after-al',
      qualifications: ['gce-al-sl'],
      resultStatus: 'completed',
      alStream: 'Physical Science / Combined Mathematics',
      alPassesCount: 1,
      olMathsGrade: 'F',
    },
    catalogue,
    approvedTestRules
  );
  const unmetCivil = unmetMathsRes.allResults.find((r) => r.programme.id === 'civil-engineering');
  assert.equal(unmetCivil?.status, 'CRITERIA_NOT_MET_REVIEW', 'Unmet mandatory criteria marked cleanly');
  assert.equal(
    unmetCivil?.preparatoryAlternative?.id,
    'foundation-in-engineering',
    'Approved preparatory option surfaced for unmet mandatory criteria'
  );

  // P09 & P10: New categories + preferences affect suggestions and surface unavailability
  const cats = getSelectableCategories(CANONICAL_PROGRAMMES);
  assert.ok(cats.includes('Business & Management'));
  assert.ok(cats.includes('English & Communication'));
  assert.ok(cats.includes('Psychology & Human Behaviour'));
  assert.ok(cats.includes('Computing & Technology'));
  assert.ok(cats.includes('Engineering'));

  const kandyPrefRes = evaluatePathway(
    {
      ...INITIAL_PATHWAY_STATE,
      interests: ['Business & Management'],
      campusPreference: 'Kandy Campus',
      modePreference: 'Weekend',
    },
    catalogue,
    DEFAULT_PROGRAMME_RULES
  );
  assert.equal(
    kandyPrefRes.primarySuggestions[0]?.programme.id,
    'diploma-in-business-management',
    'P10: Interest selection surfaces matching programme first'
  );
  assert.ok(
    kandyPrefRes.primarySuggestions[0]?.preferenceNote?.includes('Kandy Campus'),
    'P10: Unavailable/unconfirmed campus flagged honestly in preferenceNote'
  );

  // C01-C11: Consultation & WhatsApp contracts
  // C11: Default unconfigured env must NEVER expose audited placeholder 94112345678
  assert.notEqual(siteConfig.whatsapp.digits, '94112345678', 'C11: Audited placeholder must never be active');
  if (!siteConfig.whatsapp.isConfigured) {
    assert.equal(buildWhatsAppUrl({ kind: 'general' }), null, 'C11: Unconfigured WhatsApp returns null URL');
  }

  // Validation checks (accepts single-word name like Kumara, validates email vs phone dynamically)
  const validSingleNameErrors = validateConsultationInput({
    name: 'Kumara',
    contactMethod: 'whatsapp',
    contactValue: '+94771234567',
    programmeId: 'diploma-in-computing',
    privacyAcknowledged: true,
  });
  assert.equal(Object.keys(validSingleNameErrors).length, 0, 'C02: Single-word name & phone-only method valid');

  const unconfiguredOutcome = await submitConsultationRequest(
    {
      name: 'Kumara',
      contactMethod: 'email',
      contactValue: 'kumara@example.com',
      programmeId: 'diploma-in-computing',
      programmeTitle: 'Diploma in Computing',
      privacyAcknowledged: true,
      optionalUpdatesOptIn: false,
      idempotencyKey: createIdempotencyKey(),
    },
    fetch,
    ''
  );
  assert.equal(
    unconfiguredOutcome.status,
    'unconfigured',
    'C04: Without endpoint, consultation refuses to fake submission success'
  );

  const acceptedOutcome = await submitConsultationRequest(
    {
      name: 'Kumara',
      contactMethod: 'email',
      contactValue: 'kumara@example.com',
      programmeId: 'diploma-in-computing',
      programmeTitle: 'Diploma in Computing',
      privacyAcknowledged: true,
      optionalUpdatesOptIn: false,
      idempotencyKey: 'idem-123',
    },
    async () =>
      new Response(JSON.stringify({ reference: 'SRV-REF-9001' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    'https://api.example.test/consultations'
  );
  assert.equal(acceptedOutcome.status, 'accepted');
  assert.equal(acceptedOutcome.reference, 'SRV-REF-9001', 'C04: Uses server-returned reference only');

  const failedOutcome = await submitConsultationRequest(
    {
      name: 'Kumara',
      contactMethod: 'email',
      contactValue: 'kumara@example.com',
      programmeId: 'diploma-in-computing',
      programmeTitle: 'Diploma in Computing',
      privacyAcknowledged: true,
      optionalUpdatesOptIn: false,
      idempotencyKey: 'idem-123',
    },
    async () => new Response('Server error', { status: 500 }),
    'https://api.example.test/consultations'
  );
  assert.equal(failedOutcome.status, 'failed', 'C05: Non-2xx returns honest failed outcome');

  const timeoutOutcome = await submitConsultationRequest(
    {
      name: 'Kumara',
      contactMethod: 'email',
      contactValue: 'kumara@example.com',
      programmeId: 'diploma-in-computing',
      programmeTitle: 'Diploma in Computing',
      privacyAcknowledged: true,
      optionalUpdatesOptIn: false,
      idempotencyKey: 'idem-123',
    },
    async () => {
      const e = new Error('Aborted');
      e.name = 'AbortError';
      throw e;
    },
    'https://api.example.test/consultations'
  );
  assert.equal(timeoutOutcome.status, 'uncertain', 'C05: Timeout yields honest uncertain outcome');

  console.log('ALL VARIATION 2 PATHFINDER & CONSULTATION UNIT TESTS PASSED (100%).');
} finally {
  await vite.close();
}
