export type ApprovalStatus = 'approved' | 'draft-pending-confirmation';

export type AvailabilityStatus =
  | 'enrolment-open'
  | 'review-preview'
  | 'archived-unavailable';

export type SubjectCategory =
  | 'Business & Management'
  | 'Computing & Technology'
  | 'Engineering'
  | 'English & Communication'
  | 'Psychology & Human Behaviour'
  | 'Built Environment';

export type QualificationLevel =
  | 'Foundation'
  | 'Diploma'
  | 'Higher National Diploma'
  | 'Undergraduate Degree / Pathway';

export interface ProgrammeEntryRequirement {
  statement: string;
  source: string;
  verified: boolean;
}

export interface ProgrammeModuleItem {
  title: string;
  stage?: string;
  credits?: string;
  code?: string;
}

export interface ProgrammeProgressionRoute {
  statement: string;
  conditions: string;
  verified: boolean;
}

export interface CanonicalProgramme {
  id: string;
  slug: string;
  legacyIds?: string[];
  title: string;
  titleConfirmationNote?: string;
  category: SubjectCategory;
  school: string;
  qualificationLevel: QualificationLevel;
  qualificationLabel: string;
  marketingPriority: boolean;
  priorityOrder?: number;
  availability: AvailabilityStatus;
  approvalStatus: ApprovalStatus;
  revisionNote: string;
  shortDescription: string;
  overview: string;
  learningOutcomes: string[];
  awardingBody: string | null;
  recognitionNote: string | null;
  duration: string | null;
  deliveryModes: string[];
  campuses: string[];
  schedule: string | null;
  entryRequirements: ProgrammeEntryRequirement[];
  curriculumModules: ProgrammeModuleItem[];
  assessmentSummary: string | null;
  progressionOpportunities: ProgrammeProgressionRoute[];
  intakeStatus: string | null;
  confirmedIntakes: string[];
  feeNote: string;
  brochureUrl: string | null;
  media: {
    imageUrl: string;
    alt: string;
    isIllustrative: boolean;
    caption: string;
  };
  relatedIds: string[];
  faqs: { q: string; a: string }[];
  careerNote?: string | null;
}
