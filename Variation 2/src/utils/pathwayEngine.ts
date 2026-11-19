import type { CanonicalProgramme, SubjectCategory } from '../types/catalogue';
import type {
  ConditionEvaluation,
  EvaluationStatus,
  PathwayEvaluationOutput,
  PathwayState,
  PathwaySuggestion,
  ProgrammeRule,
  StartingPointId,
} from '../types/pathway';

export const STARTING_POINT_OPTIONS: {
  id: StartingPointId;
  title: string;
  description: string;
}[] = [
  {
    id: 'after-ol',
    title: 'After O/Ls',
    description:
      'Explore foundation and introductory study options to prepare for higher learning.',
  },
  {
    id: 'after-al',
    title: 'After A/Ls',
    description:
      'Explore diploma and higher qualification study options aligned with your background.',
  },
  {
    id: 'holding-qualification',
    title: 'I already hold a qualification',
    description:
      'Build on an existing certificate, diploma, HND, degree, or professional award.',
  },
  {
    id: 'professional-skills',
    title: 'Developing professional skills',
    description:
      'Strengthen subject knowledge or explore study options suited to working learners.',
  },
  {
    id: 'not-sure',
    title: "I'm not sure",
    description:
      'Explore available subject areas openly and speak with BIET admissions for guidance.',
  },
];

export const BROAD_QUALIFICATION_OPTIONS: {
  id: string;
  label: string;
  group: 'secondary' | 'post-secondary' | 'higher' | 'other';
  description: string;
}[] = [
  {
    id: 'gce-ol-sl',
    label: 'G.C.E. O/L (Sri Lankan)',
    group: 'secondary',
    description: 'Sri Lanka National Ordinary Level Examination',
  },
  {
    id: 'gce-al-sl',
    label: 'G.C.E. A/L (Sri Lankan)',
    group: 'secondary',
    description: 'Sri Lanka National Advanced Level Examination',
  },
  {
    id: 'cambridge-ol',
    label: 'Cambridge O/L / Edexcel IGCSE',
    group: 'secondary',
    description: 'UK International Ordinary Level / IGCSE',
  },
  {
    id: 'cambridge-al',
    label: 'Cambridge A/L / Edexcel IAL',
    group: 'secondary',
    description: 'UK International Advanced Level',
  },
  {
    id: 'foundation',
    label: 'Foundation Programme',
    group: 'post-secondary',
    description: 'Pre-university or engineering foundation study',
  },
  {
    id: 'certificate',
    label: 'Certificate Qualification',
    group: 'post-secondary',
    description: 'NVQ Level 3/4 or vocational certificate',
  },
  {
    id: 'diploma',
    label: 'Diploma / National Diploma (NDT / HNDE / NDES)',
    group: 'higher',
    description: 'Recognised technical or subject diploma',
  },
  {
    id: 'higher-diploma',
    label: 'Higher National Diploma (HND)',
    group: 'higher',
    description: 'Pearson BTEC or institutional HND qualification',
  },
  {
    id: 'bachelor',
    label: "Bachelor's Degree / Undergraduate Credits",
    group: 'higher',
    description: 'Completed degree or prior university credits',
  },
  {
    id: 'professional',
    label: 'Professional Qualification',
    group: 'higher',
    description: 'Industry or chartered professional body qualification',
  },
  {
    id: 'international',
    label: 'International School / Overseas Qualification',
    group: 'higher',
    description: 'IB, US High School, or overseas equivalent',
  },
  {
    id: 'other',
    label: 'Other / Prefer to discuss',
    group: 'other',
    description: 'Admissions will review your credentials directly',
  },
];

export const AL_STREAM_OPTIONS = [
  'Physical Science / Combined Mathematics',
  'Engineering Technology',
  'Biological Science',
  'Bio-Systems Technology',
  'Commerce & Accounting',
  'Arts & Humanities',
  'ICT / Computing',
  'Other / Not sure',
] as const;

/**
 * Programme rules carry explicit source, version/date, and formal approval flags.
 * Currently approved: false until BIET academic board confirms exact entry matrices per programme
 * (tracked as a documented release dependency). Exploratory matching still evaluates honestly.
 */
export const DEFAULT_PROGRAMME_RULES: ProgrammeRule[] = [
  {
    id: 'rule-diploma-business',
    programmeId: 'diploma-in-business-management',
    source: 'BIET Website Content.docx (pending BIET confirmation)',
    versionDate: '2026-11-19',
    approved: false,
    active: true,
    acceptedQualificationIds: [
      'gce-ol-sl',
      'gce-al-sl',
      'cambridge-ol',
      'cambridge-al',
      'foundation',
      'certificate',
      'diploma',
    ],
    requiresEquivalenceForForeign: true,
    ruleSummary: 'Entry criteria awaiting BIET official confirmation.',
  },
  {
    id: 'rule-diploma-computing',
    programmeId: 'diploma-in-computing',
    source: 'Existing repository + BIET Website Content.docx (pending BIET confirmation)',
    versionDate: '2026-11-19',
    approved: false,
    active: true,
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'S',
    acceptedQualificationIds: [
      'gce-ol-sl',
      'gce-al-sl',
      'cambridge-ol',
      'cambridge-al',
      'certificate',
    ],
    requiresEquivalenceForForeign: true,
    ruleSummary: 'Indicative O/L or post-secondary criteria subject to confirmation.',
  },
  {
    id: 'rule-foundation-engineering',
    programmeId: 'foundation-in-engineering',
    source: 'Existing repository + BIET Website Content.docx (pending BIET confirmation)',
    versionDate: '2026-11-19',
    approved: false,
    active: true,
    minOLMathsGrade: 'C',
    minOLEnglishGrade: 'S',
    acceptedQualificationIds: ['gce-ol-sl', 'cambridge-ol', 'gce-al-sl', 'cambridge-al'],
    requiresEquivalenceForForeign: true,
    ruleSummary: 'Entry requirements (including O/L or A/L grades) subject to confirmation.',
  },
  {
    id: 'rule-diploma-english',
    programmeId: 'diploma-in-english',
    source: 'BIET Website Content.docx (pending BIET confirmation)',
    versionDate: '2026-11-19',
    approved: false,
    active: true,
    minOLEnglishGrade: 'S',
    acceptedQualificationIds: [
      'gce-ol-sl',
      'gce-al-sl',
      'cambridge-ol',
      'cambridge-al',
      'certificate',
      'diploma',
      'other',
    ],
    requiresEquivalenceForForeign: true,
    ruleSummary: 'Language placement and entry criteria subject to BIET confirmation.',
  },
  {
    id: 'rule-diploma-psychology',
    programmeId: 'diploma-in-psychology',
    source: 'BIET Website Content.docx (pending BIET confirmation)',
    versionDate: '2026-11-19',
    approved: false,
    active: true,
    minOLEnglishGrade: 'S',
    acceptedQualificationIds: ['gce-ol-sl', 'gce-al-sl', 'cambridge-ol', 'cambridge-al', 'diploma'],
    requiresEquivalenceForForeign: true,
    ruleSummary: 'Entry criteria awaiting BIET confirmation.',
  },
];

const GRADE_RANK: Record<string, number> = { A: 4, B: 3, C: 2, S: 1, F: 0 };

export function evaluateGradeCondition(
  candidateGrade: string | null | undefined,
  minRequiredGrade?: 'A' | 'B' | 'C' | 'S'
): ConditionEvaluation {
  if (!minRequiredGrade) return 'met';
  if (
    !candidateGrade ||
    candidateGrade.trim() === '' ||
    candidateGrade === 'awaiting' ||
    candidateGrade === 'not-sure'
  ) {
    return 'unknown';
  }
  const candRank = GRADE_RANK[candidateGrade.trim().toUpperCase()];
  const minRank = GRADE_RANK[minRequiredGrade];
  if (candRank === undefined || minRank === undefined) return 'unknown';
  return candRank >= minRank ? 'met' : 'not_met';
}

export function isForeignQualificationSystem(state: PathwayState): boolean {
  if (state.qualificationSystem === 'cambridge-edexcel' || state.qualificationSystem === 'international') {
    return true;
  }
  return state.qualifications.some((q) =>
    ['cambridge-ol', 'cambridge-al', 'international'].includes(q)
  );
}

/**
 * Deterministic academic matching contract (strict 3-valued logic: met | not_met | unknown).
 * Guarantees zero invented eligibility, zero blank-string false matches, and clear distinction
 * between unknown evidence, pending approval rules, and known unmet requirements.
 */
export function evaluatePathway(
  state: PathwayState,
  catalogue: CanonicalProgramme[],
  rules: ProgrammeRule[] = DEFAULT_PROGRAMME_RULES
): PathwayEvaluationOutput {
  const activeProgrammes = catalogue.filter(
    (p) => p.availability !== 'archived-unavailable'
  );

  const hasApprovedRules = rules.some((r) => r.approved && r.active);
  const allResults: PathwaySuggestion[] = [];

  for (const prog of activeProgrammes) {
    const rule = rules.find((r) => r.programmeId === prog.id);

    // P08: Inactive rules are ignored as permissive rules; treat as needing admissions review
    const effectiveRule = rule && rule.active ? rule : undefined;

    const unknownItems: string[] = [];
    const unmetItems: string[] = [];

    // 1. Evaluate conditions strictly (never coerce unknown/empty into true or false)
    let qualificationEval: ConditionEvaluation = 'unknown';
    if (effectiveRule && state.qualifications.length > 0) {
      const matchedQual = state.qualifications.some((q) =>
        effectiveRule.acceptedQualificationIds.includes(q)
      );
      qualificationEval = matchedQual ? 'met' : 'unknown';
    } else if (state.qualifications.length === 0) {
      unknownItems.push('Prior academic qualification not specified.');
    }

    // Check awaiting results (P04)
    const isAwaitingResults =
      state.resultStatus === 'awaiting-results' ||
      state.olMathsGrade === 'awaiting' ||
      state.olEnglishGrade === 'awaiting';

    if (isAwaitingResults) {
      unknownItems.push('Examination results are currently awaiting confirmation.');
    }

    // Check O/L Maths & English (P03, P07)
    const mathsEval = effectiveRule?.minOLMathsGrade
      ? isAwaitingResults && !state.olMathsGrade
        ? 'unknown'
        : evaluateGradeCondition(state.olMathsGrade, effectiveRule.minOLMathsGrade)
      : 'met';

    const englishEval = effectiveRule?.minOLEnglishGrade
      ? isAwaitingResults && !state.olEnglishGrade
        ? 'unknown'
        : evaluateGradeCondition(state.olEnglishGrade, effectiveRule.minOLEnglishGrade)
      : 'met';

    if (mathsEval === 'not_met') {
      unmetItems.push(
        `Supplied Mathematics grade (${state.olMathsGrade}) does not meet the indicative ${effectiveRule?.minOLMathsGrade} criterion.`
      );
    } else if (mathsEval === 'unknown' && effectiveRule?.minOLMathsGrade) {
      unknownItems.push(`Mathematics grade to check against minimum ${effectiveRule.minOLMathsGrade} requirement.`);
    }

    if (englishEval === 'not_met') {
      unmetItems.push(
        `Supplied English grade (${state.olEnglishGrade}) does not meet the indicative ${effectiveRule?.minOLEnglishGrade} criterion.`
      );
    } else if (englishEval === 'unknown' && effectiveRule?.minOLEnglishGrade) {
      unknownItems.push(`English grade to check against minimum ${effectiveRule.minOLEnglishGrade} requirement.`);
    }

    // Check A/L Passes & Stream (P04, P07)
    let alPassesEval: ConditionEvaluation = 'met';
    if (effectiveRule?.requiresAL) {
      if (isAwaitingResults) {
        alPassesEval = 'unknown';
      } else if (state.alPassesCount === null) {
        alPassesEval = 'unknown';
        unknownItems.push('A/L pass count not provided.');
      } else if (
        effectiveRule.minALPasses !== undefined &&
        state.alPassesCount < effectiveRule.minALPasses
      ) {
        alPassesEval = 'not_met';
        unmetItems.push(
          `Requires ${effectiveRule.minALPasses} A/L passes (supplied: ${state.alPassesCount}).`
        );
      }
    }

    let streamEval: ConditionEvaluation = 'met';
    if (effectiveRule?.requiredALStreams && effectiveRule.requiredALStreams.length > 0) {
      const cleanedStream = (state.alStream ?? '').trim();
      if (cleanedStream === '' || cleanedStream === 'Other / Not sure') {
        streamEval = 'unknown';
        unknownItems.push('A/L subject stream compatibility to check.');
      } else {
        const matchedStream = effectiveRule.requiredALStreams.some(
          (req) => req.toLowerCase() === cleanedStream.toLowerCase()
        );
        streamEval = matchedStream ? 'met' : 'unknown';
        if (!matchedStream) {
          unknownItems.push(`Stream ("${cleanedStream}") requires individual review.`);
        }
      }
    }

    // Check Foreign Equivalence (P06)
    let equivalenceEval: ConditionEvaluation = 'met';
    if (isForeignQualificationSystem(state)) {
      if (!effectiveRule?.foreignEquivalenceApproved) {
        equivalenceEval = 'unknown';
        unknownItems.push(
          'Cambridge / Edexcel / international qualification equivalence requires admissions review.'
        );
      }
    }

    // Prior higher qualification / top-up check (P05)
    if (
      state.startingPoint === 'holding-qualification' ||
      state.qualifications.some((q) => ['diploma', 'higher-diploma', 'bachelor', 'professional'].includes(q))
    ) {
      unknownItems.push(
        'Advanced standing, exemptions, or top-up progression require individual BIET academic evaluation.'
      );
    }

    // Work experience / professional skills note (Invariant: no undocumented mature-entry approval)
    if (state.startingPoint === 'professional-skills') {
      unknownItems.push(
        'Entry eligibility is assessed based on formal qualifications and programme-specific criteria.'
      );
    }

    // 2. Interests & Preferences Influence (P10)
    const matchesInterest =
      state.interestUnsure ||
      state.interests.length === 0 ||
      state.interests.includes(prog.category);

    const requestedCampus =
      state.campusPreference && state.campusPreference !== 'no-preference'
        ? state.campusPreference
        : null;
    const requestedMode =
      state.modePreference && state.modePreference !== 'no-preference'
        ? state.modePreference
        : null;

    const campusSupported =
      !requestedCampus ||
      prog.campuses.some((c) => c.toLowerCase().includes(requestedCampus.toLowerCase()));
    const modeSupported =
      !requestedMode ||
      prog.deliveryModes.some((m) => m.toLowerCase().includes(requestedMode.toLowerCase()));

    const preferenceNotes: string[] = [];
    if (requestedCampus && prog.campuses.length === 0) {
      preferenceNotes.push(`${requestedCampus} availability is not yet confirmed for this programme.`);
    } else if (requestedCampus && !campusSupported) {
      preferenceNotes.push(`Currently listed for ${prog.campuses.join(', ')} rather than ${requestedCampus}.`);
    }
    if (requestedMode && prog.deliveryModes.length === 0) {
      preferenceNotes.push(`${requestedMode} delivery schedule is not yet confirmed for this programme.`);
    } else if (requestedMode && !modeSupported) {
      preferenceNotes.push(`Requested ${requestedMode} study mode is unconfirmed in current records.`);
    }

    const matchesPreference = campusSupported && modeSupported;

    // 3. Determine Honest Result Status & Label
    let status: EvaluationStatus = 'ADMISSIONS_REVIEW_NEEDED';
    let statusLabel = 'Admissions review needed';
    let explanation = '';

    const hasMandatoryFailure = unmetItems.length > 0;
    const ruleIsApproved = Boolean(effectiveRule?.approved);

    if (hasMandatoryFailure) {
      status = 'CRITERIA_NOT_MET_REVIEW';
      statusLabel = 'Admissions review needed';
      explanation = `${unmetItems[0]} Speak with BIET admissions to review alternative or preparatory pathways.`;
    } else if (!effectiveRule || !ruleIsApproved) {
      status = 'ADMISSIONS_REVIEW_NEEDED';
      statusLabel = 'Admissions review needed';
      explanation =
        unknownItems.length > 0
          ? `${unknownItems[0]} Official entry rules for this qualification await BIET confirmation.`
          : 'Relevant to your selected interests; entry requirements and intake availability require BIET confirmation.';
    } else if (
      unknownItems.length > 0 ||
      equivalenceEval === 'unknown' ||
      qualificationEval === 'unknown'
    ) {
      status = equivalenceEval === 'unknown' ? 'ADMISSIONS_REVIEW_NEEDED' : 'REQUIREMENTS_TO_CHECK';
      statusLabel =
        status === 'ADMISSIONS_REVIEW_NEEDED'
          ? 'Admissions review needed'
          : 'Requirements to check';
      explanation =
        unknownItems[0] ||
        'Aligned with your academic background; speak with admissions to confirm specific subject criteria.';
    } else {
      status = 'SUGGESTED_OPTION';
      statusLabel = 'Suggested option';
      explanation =
        'Matches your selected starting stage and published criteria. Final admission is confirmed by BIET after document check.';
    }

    const preparatoryAlternative =
      hasMandatoryFailure &&
      effectiveRule?.preparatoryApproved &&
      effectiveRule.preparatoryAlternativeId
        ? activeProgrammes.find((p) => p.id === effectiveRule.preparatoryAlternativeId)
        : undefined;

    allResults.push({
      programme: prog,
      status,
      statusLabel,
      explanation,
      unknownItems,
      unmetItems,
      preferenceNote: preferenceNotes.length > 0 ? preferenceNotes.join(' ') : null,
      matchesInterest,
      matchesPreference,
      preparatoryAlternative,
      conditionChecks: {
        qualification: qualificationEval,
        maths: mathsEval,
        english: englishEval,
        stream: streamEval,
        alPasses: alPassesEval,
        equivalence: equivalenceEval,
      },
    });
  }

  // Deterministic ranking:
  // 1. Interest match first (when student chose subjects — Marketing priority never overrides suitability!)
  // 2. Preference availability
  // 3. Status tier (SUGGESTED_OPTION > REQUIREMENTS_TO_CHECK > ADMISSIONS_REVIEW_NEEDED > CRITERIA_NOT_MET_REVIEW)
  // 4. Priority order for exploratory tie-breaking among equally suitable programmes
  const statusWeight: Record<EvaluationStatus, number> = {
    SUGGESTED_OPTION: 4,
    REQUIREMENTS_TO_CHECK: 3,
    ADMISSIONS_REVIEW_NEEDED: 2,
    CRITERIA_NOT_MET_REVIEW: 0,
  };

  allResults.sort((a, b) => {
    // Non-met criteria always sink below viable / reviewable options
    if (
      (a.status === 'CRITERIA_NOT_MET_REVIEW') !==
      (b.status === 'CRITERIA_NOT_MET_REVIEW')
    ) {
      return a.status === 'CRITERIA_NOT_MET_REVIEW' ? 1 : -1;
    }

    // Selected subject interest drives primary relevance
    if (a.matchesInterest !== b.matchesInterest) {
      return a.matchesInterest ? -1 : 1;
    }

    // Starting stage alignment (e.g., After O/Ls surfaces Foundation/Diploma first, Holding Qualification surfaces HND/Degree)
    const stageScore = (item: PathwaySuggestion): number => {
      if (state.startingPoint === 'after-ol') {
        if (item.programme.qualificationLevel === 'Foundation') return 3;
        if (item.programme.qualificationLevel === 'Diploma') return 2;
        return 0;
      }
      if (state.startingPoint === 'after-al') {
        if (item.programme.qualificationLevel === 'Higher National Diploma') return 3;
        if (item.programme.qualificationLevel === 'Diploma') return 2;
        return 1;
      }
      if (state.startingPoint === 'holding-qualification') {
        if (item.programme.qualificationLevel === 'Undergraduate Degree / Pathway') return 3;
        if (item.programme.qualificationLevel === 'Higher National Diploma') return 2;
        return 1;
      }
      return item.programme.marketingPriority ? 2 : 1;
    };

    const sDiff = stageScore(b) - stageScore(a);
    if (sDiff !== 0) return sDiff;

    const wDiff = statusWeight[b.status] - statusWeight[a.status];
    if (wDiff !== 0) return wDiff;

    if (a.matchesPreference !== b.matchesPreference) {
      return a.matchesPreference ? -1 : 1;
    }

    return (a.programme.priorityOrder ?? 50) - (b.programme.priorityOrder ?? 50);
  });

  // Partition into top 3 primary suggestions + additional options + unmet/incompatible options
  const viable = allResults.filter((r) => {
    if (r.status === 'CRITERIA_NOT_MET_REVIEW') return false;
    if (!state.interestUnsure && state.interests.length > 0 && !r.matchesInterest) return false;
    return true;
  });

  const unmetOrReviewOptions = allResults.filter(
    (r) =>
      r.status === 'CRITERIA_NOT_MET_REVIEW' ||
      (!state.interestUnsure && state.interests.length > 0 && !r.matchesInterest)
  );

  const primarySuggestions = viable.slice(0, 3);
  const additionalOptions = viable.slice(3);

  const globalNotice = hasApprovedRules
    ? 'These options guide your exploration. Formal admission, exemptions, and placements are confirmed by BIET after reviewing your official documents.'
    : 'Published programme entry rules are currently awaiting final BIET sign-off. The options below are shown for exploration and will be reviewed with you by BIET admissions.';

  return {
    primarySuggestions,
    additionalOptions,
    unmetOrReviewOptions,
    allResults,
    globalNotice,
    hasApprovedRules,
  };
}

export function getSelectableCategories(catalogue: CanonicalProgramme[]): SubjectCategory[] {
  const order: SubjectCategory[] = [
    'Business & Management',
    'Computing & Technology',
    'Engineering',
    'English & Communication',
    'Psychology & Human Behaviour',
    'Built Environment',
  ];
  const present = new Set(
    catalogue.filter((p) => p.availability !== 'archived-unavailable').map((p) => p.category)
  );
  return order.filter((c) => present.has(c));
}
