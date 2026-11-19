import type { CanonicalProgramme, SubjectCategory } from './catalogue';

export type StartingPointId =
  | 'after-ol'
  | 'after-al'
  | 'holding-qualification'
  | 'professional-skills'
  | 'not-sure';

export type QualificationSystemId =
  | 'local-sl'
  | 'cambridge-edexcel'
  | 'international'
  | 'vocational-higher'
  | 'not-sure';

export type ResultStatusId = 'completed' | 'awaiting-results' | 'in-progress' | 'not-sure';

export type GradeValue = 'A' | 'B' | 'C' | 'S' | 'F' | 'awaiting' | 'not-sure';

export type ConditionEvaluation = 'met' | 'not_met' | 'unknown';

export type GoalId =
  | 'start-qualification'
  | 'further-study'
  | 'professional-development'
  | 'not-sure';

export interface PathwayState {
  currentStep: 1 | 2 | 3 | 4 | 5; // Steps 1-4 inputs, 5 Results view
  startingPoint: StartingPointId | null;
  qualifications: string[];
  qualificationSystem: QualificationSystemId | null;
  resultStatus: ResultStatusId | null;
  alStream: string | null;
  alPassesCount: number | null;
  olMathsGrade: GradeValue | null;
  olEnglishGrade: GradeValue | null;
  priorQualificationType: string | null;
  priorSubjectArea: string | null;
  priorAwardingBody: string | null;
  interests: SubjectCategory[];
  interestUnsure: boolean;
  goal: GoalId | null;
  campusPreference: string | null; // 'Colombo Campus', 'Kandy Campus', 'no-preference', etc.
  modePreference: string | null; // 'Full-Time', 'Part-Time', 'no-preference', etc.
}

export interface ProgrammeRule {
  id: string;
  programmeId: string;
  source: string;
  versionDate: string;
  approved: boolean;
  active: boolean;
  requiresAL?: boolean;
  minALPasses?: number;
  requiredALStreams?: string[];
  minOLMathsGrade?: 'A' | 'B' | 'C' | 'S';
  minOLEnglishGrade?: 'A' | 'B' | 'C' | 'S';
  acceptedQualificationIds: string[];
  requiresEquivalenceForForeign: boolean;
  foreignEquivalenceApproved?: boolean;
  preparatoryAlternativeId?: string;
  preparatoryApproved?: boolean;
  ruleSummary: string;
}

export type EvaluationStatus =
  | 'SUGGESTED_OPTION'
  | 'REQUIREMENTS_TO_CHECK'
  | 'ADMISSIONS_REVIEW_NEEDED'
  | 'CRITERIA_NOT_MET_REVIEW';

export interface PathwaySuggestion {
  programme: CanonicalProgramme;
  status: EvaluationStatus;
  statusLabel: string;
  explanation: string;
  unknownItems: string[];
  unmetItems: string[];
  preferenceNote: string | null;
  matchesInterest: boolean;
  matchesPreference: boolean;
  preparatoryAlternative?: CanonicalProgramme;
  conditionChecks: {
    qualification: ConditionEvaluation;
    maths: ConditionEvaluation;
    english: ConditionEvaluation;
    stream: ConditionEvaluation;
    alPasses: ConditionEvaluation;
    equivalence: ConditionEvaluation;
  };
}

export interface PathwayEvaluationOutput {
  primarySuggestions: PathwaySuggestion[];
  additionalOptions: PathwaySuggestion[];
  unmetOrReviewOptions: PathwaySuggestion[];
  allResults: PathwaySuggestion[];
  globalNotice: string;
  hasApprovedRules: boolean;
}
