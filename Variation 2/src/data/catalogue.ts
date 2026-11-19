import { photo } from '../lib/assets';
import { PROGRAMMES as LEGACY_PROGRAMMES, type Programme as LegacyProgramme } from './programmes';
import type {
  CanonicalProgramme,
  QualificationLevel,
  SubjectCategory,
} from '../types/catalogue';

function inferCategory(legacy: LegacyProgramme): SubjectCategory {
  if (legacy.category === 'computing') return 'Computing & Technology';
  if (legacy.category === 'built-environment') return 'Built Environment';
  return 'Engineering';
}

function inferLevel(legacy: LegacyProgramme): QualificationLevel {
  const q = legacy.qualification.toLowerCase();
  if (q.includes('foundation')) return 'Foundation';
  if (q.includes('higher national') || q.includes('hnd')) return 'Higher National Diploma';
  if (q.includes('beng') || q.includes('bsc')) return 'Undergraduate Degree / Pathway';
  return 'Diploma';
}

function convertLegacyProgramme(legacy: LegacyProgramme): CanonicalProgramme {
  const isComputingDip = legacy.id === 'diploma-in-computing';
  const isEngFoundation = legacy.id === 'foundation-in-engineering';

  const moduleRows =
    legacy.allModules && legacy.allModules.length > 0
      ? legacy.allModules.map((m) => ({
          title: m.title,
          code: m.code,
          credits: m.creditsDisplay || (m.credits ? `${m.credits} Credits` : undefined),
          stage: m.academicYear || m.semester,
        }))
      : [
          ...legacy.coreModulesYear1.map((t) => ({ title: t, stage: 'Stage 1 / Year 1' })),
          ...legacy.coreModulesYear2.map((t) => ({ title: t, stage: 'Stage 2 / Year 2' })),
          ...legacy.coreModulesYear3.map((t) => ({ title: t, stage: 'Stage 3 / Year 3' })),
        ];

  return {
    id: legacy.id,
    slug: legacy.id,
    legacyIds: [legacy.id],
    title: legacy.title,
    titleConfirmationNote: isEngFoundation
      ? 'Confirmation pending: official qualification title ("Foundation in Engineering" vs "Engineering Foundation").'
      : isComputingDip
        ? 'Maintained as a distinct record from Higher National Diploma (HND) computing programmes pending BIET confirmation.'
        : undefined,
    category: inferCategory(legacy),
    school: legacy.school,
    qualificationLevel: inferLevel(legacy),
    qualificationLabel: legacy.qualification,
    marketingPriority: isComputingDip || isEngFoundation,
    priorityOrder: isComputingDip ? 2 : isEngFoundation ? 3 : undefined,
    availability: 'review-preview',
    approvalStatus: 'draft-pending-confirmation',
    revisionNote:
      'Legacy catalogue record retained for review. Intakes, awarding institution details, and entry criteria require BIET sign-off prior to public release.',
    shortDescription: isComputingDip
      ? 'Develop foundational knowledge of computer systems, software and digital technologies.'
      : isEngFoundation
        ? 'Build essential knowledge in mathematics, science and engineering for further technical study.'
        : legacy.overview,
    overview: legacy.overview,
    learningOutcomes: legacy.whatYouWillLearn,
    awardingBody: legacy.affiliatedInstitution || null,
    recognitionNote: legacy.affiliatedInstitution
      ? 'Subject to formal institutional and awarding-body confirmation.'
      : 'Awarding institution and accreditation details pending official BIET confirmation.',
    duration: legacy.duration || null,
    deliveryModes: legacy.studyMode
      ? legacy.studyMode
          .split('/')
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    campuses: ['Colombo Campus'],
    schedule: legacy.studySchedule || null,
    entryRequirements: legacy.entryRequirements.map((req) => ({
      statement: req,
      source: 'Existing repository specification (pending formal approval)',
      verified: false,
    })),
    curriculumModules: moduleRows,
    assessmentSummary: legacy.assessmentMethod || legacy.assessmentNote || null,
    progressionOpportunities: (legacy.progressionOpportunities || []).map((opp) => ({
      statement: opp,
      conditions:
        'Progression and credit recognition are not automatic and depend on approved institutional criteria and grade thresholds.',
      verified: false,
    })),
    intakeStatus: 'Upcoming intake dates are subject to official BIET confirmation.',
    confirmedIntakes: [],
    feeNote:
      'Fee schedule and approved installment options are provided upon admissions consultation.',
    brochureUrl: null,
    media: {
      imageUrl: legacy.imageUrl || legacy.heroImageUrl || photo('photo-1581092160607-ee22621dd758'),
      alt: `${legacy.title} illustrative academic imagery`,
      isIllustrative: true,
      caption: 'Illustrative learning imagery — pending official BIET programme photography',
    },
    relatedIds: [],
    faqs: [
      {
        q: 'How are entry requirements assessed for this programme?',
        a: 'Applications are evaluated individually against confirmed programme criteria by the BIET admissions team. Request a consultation to review your qualifications.',
      },
      {
        q: 'Are intake schedules and fee details available online?',
        a: 'Confirmed intake dates and programme-specific fee breakdowns are shared directly by our admissions advisors upon enquiry.',
      },
    ],
    careerNote:
      legacy.careerPathways.length > 0
        ? `Illustrative areas of study application: ${legacy.careerPathways.join(', ')}`
        : null,
  };
}

const PRIORITY_BUSINESS_MANAGEMENT: CanonicalProgramme = {
  id: 'diploma-in-business-management',
  slug: 'diploma-in-business-management',
  title: 'Diploma in Business Management',
  titleConfirmationNote: 'Priority programme specification awaiting final BIET academic sign-off.',
  category: 'Business & Management',
  school: 'Business & Management',
  qualificationLevel: 'Diploma',
  qualificationLabel: 'Diploma (Official designation pending confirmation)',
  marketingPriority: true,
  priorityOrder: 1,
  availability: 'review-preview',
  approvalStatus: 'draft-pending-confirmation',
  revisionNote:
    'Prepared from BIET Website Content.docx. Awarding body, duration, entry requirements, curriculum modules, fees, and January 2027 intake availability await BIET confirmation.',
  shortDescription:
    'Explore the principles behind business operations, management and organisational decision-making.',
  overview:
    'Build an understanding of the principles that support effective business operations and decision-making. Explore business management as a starting point for developing knowledge relevant to a range of organisational and professional environments.',
  learningOutcomes: [
    'Understand foundational principles of business operations and organisational structure.',
    'Explore decision-making frameworks used in contemporary management environments.',
    'Develop analytical and communication skills applicable across commercial contexts.',
  ],
  awardingBody: null,
  recognitionNote: 'Awarding institution details awaiting official BIET confirmation.',
  duration: null,
  deliveryModes: [],
  campuses: [],
  schedule: null,
  entryRequirements: [],
  curriculumModules: [],
  assessmentSummary: null,
  progressionOpportunities: [],
  intakeStatus: 'Upcoming intake dates subject to programme-specific confirmation.',
  confirmedIntakes: [],
  feeNote: 'Approved fee information is available directly through BIET admissions consultation.',
  brochureUrl: null,
  media: {
    imageUrl: photo('photo-1517245386807-bb43f82c33c4'),
    alt: 'Students collaborating in a business seminar discussion',
    isIllustrative: true,
    caption: 'Illustrative business classroom imagery',
  },
  relatedIds: ['diploma-in-computing', 'diploma-in-english', 'diploma-in-psychology'],
  faqs: [
    {
      q: 'What are the entry requirements for the Diploma in Business Management?',
      a: 'Specific entry grades and qualification routes are confirmed by the BIET admissions team. Please request a consultation to check your background.',
    },
    {
      q: 'Which campuses and study schedules are available?',
      a: 'Available campuses (Colombo / Kandy) and study schedules are confirmed per intake by BIET admissions.',
    },
  ],
  careerNote: null,
};

const PRIORITY_ENGLISH: CanonicalProgramme = {
  id: 'diploma-in-english',
  slug: 'diploma-in-english',
  title: 'Diploma in English',
  titleConfirmationNote: 'Priority programme specification awaiting final BIET academic sign-off.',
  category: 'English & Communication',
  school: 'English & Communication',
  qualificationLevel: 'Diploma',
  qualificationLabel: 'Diploma (Official designation pending confirmation)',
  marketingPriority: true,
  priorityOrder: 4,
  availability: 'review-preview',
  approvalStatus: 'draft-pending-confirmation',
  revisionNote:
    'Prepared from BIET Website Content.docx. Official qualification title, language entry requirements, curriculum, awarding body, and intake availability await BIET confirmation.',
  shortDescription:
    'Develop English-language knowledge and communication skills for academic and professional settings.',
  overview:
    'Develop your English-language knowledge and communication skills for academic, personal and professional settings. Explore opportunities to improve your confidence in understanding and using English.',
  learningOutcomes: [
    'Strengthen academic reading, structured writing, and comprehension proficiency.',
    'Build spoken communication confidence for presentation and seminar settings.',
    'Apply clear English usage across professional and tertiary education contexts.',
  ],
  awardingBody: null,
  recognitionNote: 'Awarding institution details awaiting official BIET confirmation.',
  duration: null,
  deliveryModes: [],
  campuses: [],
  schedule: null,
  entryRequirements: [],
  curriculumModules: [],
  assessmentSummary: null,
  progressionOpportunities: [],
  intakeStatus: 'Upcoming intake dates subject to programme-specific confirmation.',
  confirmedIntakes: [],
  feeNote: 'Approved fee information is available directly through BIET admissions consultation.',
  brochureUrl: null,
  media: {
    imageUrl: photo('photo-1524178232363-1fb2b075b655'),
    alt: 'Students participating in an English language seminar and presentation',
    isIllustrative: true,
    caption: 'Illustrative communication and classroom learning imagery',
  },
  relatedIds: ['diploma-in-business-management', 'diploma-in-psychology', 'foundation-in-engineering'],
  faqs: [
    {
      q: 'Do I need a prior English grade or placement check before enrolling?',
      a: 'Entry-level language criteria are reviewed with admissions during your consultation.',
    },
  ],
  careerNote: null,
};

const PRIORITY_PSYCHOLOGY: CanonicalProgramme = {
  id: 'diploma-in-psychology',
  slug: 'diploma-in-psychology',
  title: 'Diploma in Psychology',
  titleConfirmationNote: 'Academic introductory qualification (non-clinical); details awaiting BIET confirmation.',
  category: 'Psychology & Human Behaviour',
  school: 'Psychology & Human Behaviour',
  qualificationLevel: 'Diploma',
  qualificationLabel: 'Diploma (Official designation pending confirmation)',
  marketingPriority: true,
  priorityOrder: 5,
  availability: 'review-preview',
  approvalStatus: 'draft-pending-confirmation',
  revisionNote:
    'Prepared from BIET Website Content.docx. Non-clinical academic scope; does not claim clinical practice, therapy licensing, or counselling certification.',
  shortDescription:
    'Explore introductory concepts in human thought, emotion and behaviour.',
  overview:
    'Explore the study of human thought, emotion and behaviour. Develop an introductory understanding of psychological concepts and discover how psychology contributes to understanding individuals and society.',
  learningOutcomes: [
    'Understand foundational concepts of cognition, emotion, and human behaviour.',
    'Examine how psychological research contributes to social and organisational understanding.',
    'Note: This is an academic foundational programme and not a clinical or therapeutic licensing qualification.',
  ],
  awardingBody: null,
  recognitionNote: 'Awarding institution details awaiting official BIET confirmation.',
  duration: null,
  deliveryModes: [],
  campuses: [],
  schedule: null,
  entryRequirements: [],
  curriculumModules: [],
  assessmentSummary: null,
  progressionOpportunities: [],
  intakeStatus: 'Upcoming intake dates subject to programme-specific confirmation.',
  confirmedIntakes: [],
  feeNote: 'Approved fee information is available directly through BIET admissions consultation.',
  brochureUrl: null,
  media: {
    imageUrl: photo('photo-1515378791036-0648a3ef77b2'),
    alt: 'Academic seminar study desk with textbook and notebook (non-clinical)',
    isIllustrative: true,
    caption: 'Illustrative academic psychology study imagery',
  },
  relatedIds: ['diploma-in-business-management', 'diploma-in-english', 'diploma-in-computing'],
  faqs: [
    {
      q: 'Does the Diploma in Psychology qualify graduates for clinical therapy or counselling practice?',
      a: 'No. This qualification focuses on introductory academic concepts in human behaviour and does not confer clinical or therapeutic licensing.',
    },
  ],
  careerNote: null,
};

// Reconcile existing programmes from repository while elevating the 5 priority programmes
const convertedLegacy = LEGACY_PROGRAMMES.map(convertLegacyProgramme).map((item) => {
  if (item.id === 'diploma-in-computing') {
    return {
      ...item,
      category: 'Computing & Technology' as const,
      shortDescription:
        'Develop foundational knowledge of computer systems, software and digital technologies.',
      media: {
        imageUrl: photo('photo-1517694712202-14dd9538aa97'),
        alt: 'Software and computing student working at a laptop',
        isIllustrative: true,
        caption: 'Illustrative computing learning imagery',
      },
      relatedIds: ['hnd-software-engineering', 'diploma-in-business-management', 'foundation-in-engineering'],
    };
  }
  if (item.id === 'foundation-in-engineering') {
    return {
      ...item,
      shortDescription:
        'Build essential knowledge in mathematics, science and engineering for further technical study.',
      media: {
        imageUrl: photo('photo-1581092160607-ee22621dd758'),
        alt: 'Engineering workbench and scientific fundamentals setup',
        isIllustrative: true,
        caption: 'Illustrative engineering foundation imagery',
      },
      relatedIds: ['civil-engineering', 'hndme', 'hndeee'],
    };
  }
  return item;
});

const legacyEngineeringCivil = convertedLegacy.find((p) => p.id === 'civil-engineering');
const legacyDiplomaComputing = convertedLegacy.find((p) => p.id === 'diploma-in-computing')!;
const legacyFoundationEng = convertedLegacy.find((p) => p.id === 'foundation-in-engineering')!;
const otherLegacy = convertedLegacy.filter(
  (p) => p.id !== 'diploma-in-computing' && p.id !== 'foundation-in-engineering'
);

// Archived sample demonstrating honest handling of inactive legacy URLs per Section 03
const ARCHIVED_LEGACY_EXAMPLE: CanonicalProgramme = {
  id: 'certificate-drafting-legacy',
  slug: 'certificate-drafting-legacy',
  legacyIds: ['certificate-in-cad-drafting'],
  title: 'Certificate in Technical CAD Drafting (Archived)',
  category: 'Built Environment',
  school: 'School of Built Environment',
  qualificationLevel: 'Foundation',
  qualificationLabel: 'Legacy Certificate (Archived)',
  marketingPriority: false,
  availability: 'archived-unavailable',
  approvalStatus: 'draft-pending-confirmation',
  revisionNote: 'Previous curriculum retired / currently unavailable for new enrolment.',
  shortDescription: 'This historical course specification is no longer open for new admissions.',
  overview:
    'This archived specification is preserved for historical URL compatibility only and is excluded from active admissions recommendations.',
  learningOutcomes: [],
  awardingBody: null,
  recognitionNote: null,
  duration: null,
  deliveryModes: [],
  campuses: [],
  schedule: null,
  entryRequirements: [],
  curriculumModules: [],
  assessmentSummary: null,
  progressionOpportunities: [],
  intakeStatus: 'Currently unavailable for enrolment',
  confirmedIntakes: [],
  feeNote: 'Programme currently unavailable. Contact admissions to explore active alternatives.',
  brochureUrl: null,
  media: {
    imageUrl: photo('photo-1503387762-592deb58ef4e'),
    alt: 'Architectural and technical drafting workspace',
    isIllustrative: true,
    caption: 'Illustrative technical drafting workspace',
  },
  relatedIds: ['quantity-surveying', 'civil-engineering', 'foundation-in-engineering'],
  faqs: [],
  careerNote: null,
};

export const CANONICAL_PROGRAMMES: CanonicalProgramme[] = [
  PRIORITY_BUSINESS_MANAGEMENT,
  legacyDiplomaComputing,
  legacyFoundationEng,
  PRIORITY_ENGLISH,
  PRIORITY_PSYCHOLOGY,
  ...(legacyEngineeringCivil ? [legacyEngineeringCivil] : []),
  ...otherLegacy.filter((p) => p.id !== 'civil-engineering'),
  ARCHIVED_LEGACY_EXAMPLE,
];

export function getActiveCatalogue(): CanonicalProgramme[] {
  return CANONICAL_PROGRAMMES.filter((p) => p.availability !== 'archived-unavailable');
}

export function getPriorityProgrammes(): CanonicalProgramme[] {
  return CANONICAL_PROGRAMMES.filter(
    (p) => p.marketingPriority && p.availability !== 'archived-unavailable'
  ).sort((a, b) => (a.priorityOrder ?? 99) - (b.priorityOrder ?? 99));
}

export function getProgrammeBySlugOrId(idOrSlug?: string): CanonicalProgramme | undefined {
  if (!idOrSlug) return undefined;
  return CANONICAL_PROGRAMMES.find(
    (p) =>
      p.slug === idOrSlug ||
      p.id === idOrSlug ||
      (p.legacyIds && p.legacyIds.includes(idOrSlug))
  );
}

export function getDerivedCategories(): SubjectCategory[] {
  const seen = new Set<SubjectCategory>();
  for (const p of getActiveCatalogue()) {
    seen.add(p.category);
  }
  return Array.from(seen);
}

export function getDerivedLevels(): QualificationLevel[] {
  const seen = new Set<QualificationLevel>();
  for (const p of getActiveCatalogue()) {
    seen.add(p.qualificationLevel);
  }
  return Array.from(seen);
}

export function getDerivedModes(): string[] {
  const seen = new Set<string>();
  for (const p of getActiveCatalogue()) {
    for (const m of p.deliveryModes) {
      if (m.trim()) seen.add(m.trim());
    }
  }
  return Array.from(seen);
}

export function getDerivedCampuses(): string[] {
  const seen = new Set<string>();
  for (const p of getActiveCatalogue()) {
    for (const c of p.campuses) {
      if (c.trim()) seen.add(c.trim());
    }
  }
  return Array.from(seen);
}

export function searchCatalogue(query: string): CanonicalProgramme[] {
  const q = query.trim().toLowerCase();
  const active = getActiveCatalogue();
  if (!q) return active;
  return active.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.qualificationLevel.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.overview.toLowerCase().includes(q) ||
      p.curriculumModules.some((m) => m.title.toLowerCase().includes(q))
  );
}
