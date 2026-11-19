import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getActiveCatalogue } from '../data/catalogue';
import { DEFAULT_PROGRAMME_RULES, evaluatePathway } from '../utils/pathwayEngine';
import type {
  GoalId,
  PathwayEvaluationOutput,
  PathwayState,
  QualificationSystemId,
  ResultStatusId,
  StartingPointId,
  GradeValue,
} from '../types/pathway';
import type { SubjectCategory } from '../types/catalogue';

export const INITIAL_PATHWAY_STATE: PathwayState = {
  currentStep: 1,
  startingPoint: null,
  qualifications: [],
  qualificationSystem: null,
  resultStatus: null,
  alStream: null,
  alPassesCount: null,
  olMathsGrade: null,
  olEnglishGrade: null,
  priorQualificationType: null,
  priorSubjectArea: null,
  priorAwardingBody: null,
  interests: [],
  interestUnsure: false,
  goal: null,
  campusPreference: null,
  modePreference: null,
};

interface PathwayContextValue {
  state: PathwayState;
  evaluation: PathwayEvaluationOutput;
  setStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  selectStartingPoint: (sp: StartingPointId | null) => void;
  presetStartingPointFromHome: (sp: StartingPointId) => void;
  toggleQualification: (qualId: string) => void;
  setQualificationSystem: (sys: QualificationSystemId | null) => void;
  setResultStatus: (status: ResultStatusId | null) => void;
  setAcademicDetails: (
    patch: Partial<
      Pick<
        PathwayState,
        | 'alStream'
        | 'alPassesCount'
        | 'olMathsGrade'
        | 'olEnglishGrade'
        | 'priorQualificationType'
        | 'priorSubjectArea'
        | 'priorAwardingBody'
      >
    >
  ) => void;
  toggleInterest: (cat: SubjectCategory) => void;
  setInterestUnsure: (unsure: boolean) => void;
  setGoal: (goal: GoalId | null) => void;
  setPreferences: (patch: { campusPreference?: string | null; modePreference?: string | null }) => void;
  restartFinder: () => void;
}

const PathwayContext = createContext<PathwayContextValue | null>(null);

export const PathwayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PathwayState>(INITIAL_PATHWAY_STATE);

  const setStep = useCallback((step: 1 | 2 | 3 | 4 | 5) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  /**
   * Editing an earlier answer clears ONLY incompatible dependent fields (State Behaviour invariant).
   */
  const selectStartingPoint = useCallback((sp: StartingPointId | null) => {
    setState((prev) => {
      if (prev.startingPoint === sp) return prev;
      const resetAlFields = sp === 'after-ol' || sp === 'professional-skills' || sp === 'not-sure';
      return {
        ...prev,
        startingPoint: sp,
        alStream: resetAlFields ? null : prev.alStream,
        alPassesCount: resetAlFields ? null : prev.alPassesCount,
        priorQualificationType: sp === 'after-ol' || sp === 'after-al' ? null : prev.priorQualificationType,
        priorSubjectArea: sp === 'after-ol' || sp === 'after-al' ? null : prev.priorSubjectArea,
        priorAwardingBody: sp === 'after-ol' || sp === 'after-al' ? null : prev.priorAwardingBody,
      };
    });
  }, []);

  /**
   * Homepage starting-point selection resets cleanly and sets ONLY startingPoint.
   * Never seeds grades, passes, stream, or completion year.
   */
  const presetStartingPointFromHome = useCallback((sp: StartingPointId) => {
    setState({
      ...INITIAL_PATHWAY_STATE,
      currentStep: 1,
      startingPoint: sp,
    });
  }, []);

  const toggleQualification = useCallback((qualId: string) => {
    setState((prev) => {
      const exists = prev.qualifications.includes(qualId);
      const next = exists
        ? prev.qualifications.filter((q) => q !== qualId)
        : [...prev.qualifications, qualId];
      return { ...prev, qualifications: next };
    });
  }, []);

  const setQualificationSystem = useCallback((sys: QualificationSystemId | null) => {
    setState((prev) => ({
      ...prev,
      qualificationSystem: sys,
    }));
  }, []);

  const setResultStatus = useCallback((status: ResultStatusId | null) => {
    setState((prev) => ({
      ...prev,
      resultStatus: status,
      olMathsGrade:
        status === 'awaiting-results' ? ('awaiting' as GradeValue) : prev.olMathsGrade === 'awaiting' ? null : prev.olMathsGrade,
      olEnglishGrade:
        status === 'awaiting-results' ? ('awaiting' as GradeValue) : prev.olEnglishGrade === 'awaiting' ? null : prev.olEnglishGrade,
    }));
  }, []);

  const setAcademicDetails = useCallback(
    (
      patch: Partial<
        Pick<
          PathwayState,
          | 'alStream'
          | 'alPassesCount'
          | 'olMathsGrade'
          | 'olEnglishGrade'
          | 'priorQualificationType'
          | 'priorSubjectArea'
          | 'priorAwardingBody'
        >
      >
    ) => {
      setState((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const toggleInterest = useCallback((cat: SubjectCategory) => {
    setState((prev) => {
      const exists = prev.interests.includes(cat);
      if (exists) {
        return {
          ...prev,
          interests: prev.interests.filter((c) => c !== cat),
        };
      }
      if (prev.interests.length >= 3) {
        return prev;
      }
      return {
        ...prev,
        interestUnsure: false,
        interests: [...prev.interests, cat],
      };
    });
  }, []);

  const setInterestUnsure = useCallback((unsure: boolean) => {
    setState((prev) => ({
      ...prev,
      interestUnsure: unsure,
      interests: unsure ? [] : prev.interests,
    }));
  }, []);

  const setGoal = useCallback((goal: GoalId | null) => {
    setState((prev) => ({ ...prev, goal }));
  }, []);

  const setPreferences = useCallback(
    (patch: { campusPreference?: string | null; modePreference?: string | null }) => {
      setState((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const restartFinder = useCallback(() => {
    setState(INITIAL_PATHWAY_STATE);
  }, []);

  const catalogue = useMemo(() => getActiveCatalogue(), []);
  const evaluation = useMemo(
    () => evaluatePathway(state, catalogue, DEFAULT_PROGRAMME_RULES),
    [state, catalogue]
  );

  const value: PathwayContextValue = {
    state,
    evaluation,
    setStep,
    selectStartingPoint,
    presetStartingPointFromHome,
    toggleQualification,
    setQualificationSystem,
    setResultStatus,
    setAcademicDetails,
    toggleInterest,
    setInterestUnsure,
    setGoal,
    setPreferences,
    restartFinder,
  };

  return <PathwayContext.Provider value={value}>{children}</PathwayContext.Provider>;
};

export function usePathway(): PathwayContextValue {
  const ctx = useContext(PathwayContext);
  if (!ctx) {
    throw new Error('usePathway must be used within a PathwayProvider');
  }
  return ctx;
}
