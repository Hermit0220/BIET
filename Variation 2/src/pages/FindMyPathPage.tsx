import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  RotateCcw,
  Check,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CANONICAL_PROGRAMMES, getDerivedCampuses, getDerivedModes } from '../data/catalogue';
import { StructuredData } from '../components/seo/StructuredData';
import { WhatsAppLink } from '../components/common/WhatsAppLink';
import { siteConfig } from '../config/siteConfig';
import { usePathway } from '../context/PathwayContext';
import {
  AL_STREAM_OPTIONS,
  BROAD_QUALIFICATION_OPTIONS,
  STARTING_POINT_OPTIONS,
  getSelectableCategories,
} from '../utils/pathwayEngine';
import type {
  GoalId,
  GradeValue,
  QualificationSystemId,
  ResultStatusId,
  StartingPointId,
} from '../types/pathway';

interface FindMyPathPageProps {
  onOpenConsultation: (programmeId?: string) => void;
}

const STAGE_NAMES: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'Starting Point',
  2: 'Academic Details',
  3: 'Interests & Goals',
  4: 'Study Preferences',
  5: 'Your Study Options',
};

export const FindMyPathPage: React.FC<FindMyPathPageProps> = ({ onOpenConsultation }) => {
  const {
    state,
    evaluation,
    setStep,
    selectStartingPoint,
    toggleQualification,
    setQualificationSystem,
    setResultStatus,
    setAcademicDetails,
    toggleInterest,
    setInterestUnsure,
    setGoal,
    setPreferences,
    restartFinder,
  } = usePathway();

  const [validationError, setValidationError] = useState<string | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showAllQuals, setShowAllQuals] = useState(false);
  const [stepAnnouncement, setStepAnnouncement] = useState('');
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const selectableCategories = useMemo(
    () => getSelectableCategories(CANONICAL_PROGRAMMES),
    []
  );
  const availableCampuses = useMemo(() => getDerivedCampuses(), []);
  const availableModes = useMemo(() => getDerivedModes(), []);

  // Move focus to step heading and politely announce progress when step changes
  useEffect(() => {
    setValidationError(null);
    const label =
      state.currentStep === 5
        ? 'Showing your study options.'
        : `Step ${state.currentStep} of 4: ${STAGE_NAMES[state.currentStep]}`;
    setStepAnnouncement(label);
    const t = setTimeout(() => {
      stepHeadingRef.current?.focus();
    }, 30);
    return () => clearTimeout(t);
  }, [state.currentStep]);

  const handleContinue = () => {
    if (state.currentStep === 1 && !state.startingPoint && state.qualifications.length === 0) {
      setValidationError(
        'Please select where you are starting from or choose "I\'m not sure" to continue.'
      );
      return;
    }

    if (state.currentStep === 3 && !state.interestUnsure && state.interests.length === 0) {
      setValidationError('Select up to 3 subject areas or choose "I\'m not sure yet".');
      return;
    }

    if (state.currentStep < 5) {
      setStep((state.currentStep + 1) as 1 | 2 | 3 | 4 | 5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (state.currentStep > 1) {
      setStep((state.currentStep - 1) as 1 | 2 | 3 | 4 | 5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showALFields =
    state.startingPoint === 'after-al' ||
    state.qualifications.includes('gce-al-sl') ||
    state.qualifications.includes('cambridge-al');

  const showPriorQualificationFields =
    state.startingPoint === 'holding-qualification' ||
    state.qualifications.some((q) =>
      ['foundation', 'certificate', 'diploma', 'higher-diploma', 'bachelor', 'professional'].includes(q)
    );

  const showOLGrades =
    state.startingPoint === 'after-ol' ||
    state.startingPoint === 'after-al' ||
    state.qualifications.includes('gce-ol-sl') ||
    state.qualifications.includes('cambridge-ol');

  return (
    <main id="main-content" className="min-h-screen bg-white text-[#111111]">
      <StructuredData
        pageTitle="Find My Path — Study Options Explorer"
        pageDescription="Explore BIET study pathways across business, computing, engineering, English and psychology based on your background and interests."
      />

      {/* Charcoal / Yellow Header Band */}
      <section className="bg-[#111111] text-white py-10 lg:py-14 border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#FFCC00]">
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Find My Path</span>
            </div>
            <h1 className="heading-section text-white">Explore Study Pathways at BIET</h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Answer a short sequence of questions about your background and interests to explore
              relevant programmes and guidance routes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              restartFinder();
              setShowMoreOptions(false);
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 bg-[#1A1A1A] hover:bg-[#FFCC00] text-white hover:text-[#111111] border border-[#262626] rounded-[4px] text-xs font-extrabold uppercase tracking-wider transition-colors self-start md:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Restart</span>
          </button>
        </div>
      </section>

      {/* Live screen reader progress announcement */}
      <div className="sr-only" aria-live="polite">
        {stepAnnouncement}
      </div>

      {/* Main Surface: Narrow Progress Column (Desktop) + Clean Light 720px Question Panel */}
      <section className="surface-light py-10 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Desktop Left Progress Summary Column (hidden above mobile question) */}
            <aside className="hidden lg:block lg:col-span-4 space-y-6 bg-[#F4F4F5] p-6 border border-[#E2E2E6] rounded-[4px]">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#666666]">
                  Finder Progress
                </span>
                <div className="text-lg font-extrabold text-[#111111] mt-1">
                  {state.currentStep === 5 ? 'Results Ready' : `Step ${state.currentStep} of 4`}
                </div>
              </div>

              <ol className="space-y-2.5">
                {([1, 2, 3, 4] as const).map((stepNum) => {
                  const isCurrent = state.currentStep === stepNum;
                  const isDone = state.currentStep > stepNum;
                  return (
                    <li key={stepNum}>
                      <button
                        type="button"
                        onClick={() => setStep(stepNum)}
                        className={`w-full text-left px-3.5 py-3 rounded-[4px] border flex items-center justify-between gap-2 text-sm font-bold cursor-pointer ${
                          isCurrent
                            ? 'bg-[#111111] text-[#FFCC00] border-[#111111]'
                            : isDone
                              ? 'bg-white text-[#111111] border-[#111111]'
                              : 'bg-white/60 text-[#666666] border-[#E2E2E6]'
                        }`}
                      >
                        <span>
                          {stepNum}. {STAGE_NAMES[stepNum]}
                        </span>
                        {isDone && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="text-xs text-[#666666] leading-relaxed">
                This tool suggests study options for exploration. Final admission eligibility,
                exemptions and credit transfers are confirmed by BIET admissions.
              </p>
            </aside>

            {/* Primary Question / Results Panel (680-760px target width) */}
            <div className="lg:col-span-8 max-w-[740px] w-full">
              {/* Mobile Progress Header */}
              <div className="lg:hidden mb-6 p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#666666]">
                    {state.currentStep === 5
                      ? 'Completed'
                      : `Step ${state.currentStep} of 4`}
                  </span>
                  <div className="text-sm font-extrabold text-[#111111]">
                    {STAGE_NAMES[state.currentStep]}
                  </div>
                </div>
                {state.currentStep === 5 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-extrabold underline cursor-pointer"
                  >
                    Edit answers
                  </button>
                )}
              </div>

              {validationError && (
                <div
                  role="alert"
                  className="mb-6 p-4 bg-[#FFF0B3] border-2 border-[#B91C1C] rounded-[4px] flex items-start gap-2.5 text-sm font-bold text-[#111111]"
                >
                  <AlertCircle className="w-5 h-5 text-[#B91C1C] shrink-0" aria-hidden="true" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* STEP 1 OF 4: STARTING POINT */}
              {state.currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#666666] block mb-1">
                      Step 1 of 4 · {STAGE_NAMES[1]}
                    </span>
                    <h2
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="text-2xl sm:text-3xl font-extrabold text-[#111111] focus:outline-none"
                    >
                      Where are you in your education journey?
                    </h2>
                    <p className="text-sm sm:text-base text-[#666666] mt-1.5">
                      Choose the stage that best describes where you are starting from.
                    </p>
                  </div>

                  <div role="radiogroup" aria-label="Educational starting point" className="space-y-3">
                    {STARTING_POINT_OPTIONS.map((opt) => {
                      const selected = state.startingPoint === opt.id;
                      return (
                        <label
                          key={opt.id}
                          className={`block p-4 sm:p-5 rounded-[4px] border-2 cursor-pointer transition-colors ${
                            selected
                              ? 'bg-[#FFF0B3] border-[#111111]'
                              : 'bg-white border-[#E2E2E6] hover:border-[#111111]'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <input
                              type="radio"
                              name="starting-point"
                              value={opt.id}
                              checked={selected}
                              onChange={() => selectStartingPoint(opt.id as StartingPointId)}
                              className="mt-1 w-5 h-5 accent-[#111111] shrink-0"
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-base font-extrabold text-[#111111]">
                                  {opt.title}
                                </span>
                                {selected && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#111111] text-[#FFCC00] text-[11px] font-bold uppercase rounded-[4px]">
                                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                                    Selected
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[#666666]">{opt.description}</p>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {/* Broader Qualification Multi-Select Disclosure */}
                  <div className="pt-3 border-t border-[#E2E2E6]">
                    <button
                      type="button"
                      onClick={() => setShowAllQuals((prev) => !prev)}
                      aria-expanded={showAllQuals}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] underline cursor-pointer py-1"
                    >
                      {showAllQuals ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                      <span>
                        Or select specific qualifications you already hold (multiple allowed)
                      </span>
                    </button>

                    {showAllQuals && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {BROAD_QUALIFICATION_OPTIONS.map((q) => {
                          const checked = state.qualifications.includes(q.id);
                          return (
                            <label
                              key={q.id}
                              className={`p-3 rounded-[4px] border-2 cursor-pointer flex items-start gap-2.5 text-sm ${
                                checked
                                  ? 'bg-[#FFF0B3] border-[#111111] font-bold'
                                  : 'bg-[#F4F4F5] border-[#E2E2E6] hover:border-[#111111]'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleQualification(q.id)}
                                className="mt-0.5 w-4 h-4 accent-[#111111] shrink-0"
                              />
                              <span>
                                <span className="block font-bold text-[#111111]">{q.label}</span>
                                <span className="block text-xs text-[#666666]">
                                  {q.description}
                                </span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2 OF 4: ACADEMIC DETAILS */}
              {state.currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#666666] block mb-1">
                      Step 2 of 4 · {STAGE_NAMES[2]}
                    </span>
                    <h2
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="text-2xl sm:text-3xl font-extrabold text-[#111111] focus:outline-none"
                    >
                      Tell us a little about your qualifications.
                    </h2>
                    <p className="text-sm sm:text-base text-[#666666] mt-1.5">
                      Share what you know now—if results are pending or you prefer not to say, you
                      can still continue and review requirements with admissions.
                    </p>
                  </div>

                  {/* Qualification System */}
                  <div className="space-y-2">
                    <label
                      htmlFor="finder-qual-system"
                      className="block text-sm font-bold text-[#111111]"
                    >
                      Examination system
                    </label>
                    <select
                      id="finder-qual-system"
                      value={state.qualificationSystem || ''}
                      onChange={(e) =>
                        setQualificationSystem(
                          (e.target.value || null) as QualificationSystemId | null
                        )
                      }
                      className="w-full min-h-[52px] px-4 rounded-[4px] border-2 border-[#111111]/25 bg-white text-base text-[#111111]"
                    >
                      <option value="">Skip for now / Prefer not to select</option>
                      <option value="local-sl">Sri Lankan G.C.E. (O/L or A/L)</option>
                      <option value="cambridge-edexcel">
                        Cambridge / Edexcel International (IGCSE / IAL)
                      </option>
                      <option value="vocational-higher">
                        Diploma, Certificate, HND or Professional Award
                      </option>
                      <option value="international">Overseas High School / IB / Other</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                  </div>

                  {/* Results Status */}
                  <div className="space-y-2">
                    <span className="block text-sm font-bold text-[#111111]">
                      Examination or qualification status
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(
                        [
                          { id: 'completed', label: 'Results received / Completed' },
                          { id: 'awaiting-results', label: 'Awaiting results' },
                          { id: 'in-progress', label: 'Currently studying' },
                          { id: 'not-sure', label: 'Skip for now / Not sure' },
                        ] as { id: ResultStatusId; label: string }[]
                      ).map((st) => {
                        const active = state.resultStatus === st.id;
                        return (
                          <label
                            key={st.id}
                            className={`p-3.5 rounded-[4px] border-2 cursor-pointer flex items-center gap-2.5 text-sm font-bold ${
                              active
                                ? 'bg-[#FFF0B3] border-[#111111]'
                                : 'bg-[#F4F4F5] border-[#E2E2E6] hover:border-[#111111]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="result-status"
                              checked={active}
                              onChange={() => setResultStatus(st.id)}
                              className="w-4 h-4 accent-[#111111]"
                            />
                            <span>{st.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* O/L Maths & English when relevant and not awaiting results */}
                  {showOLGrades && state.resultStatus !== 'awaiting-results' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label
                          htmlFor="finder-ol-maths"
                          className="block text-sm font-bold text-[#111111] mb-1.5"
                        >
                          O/L Mathematics grade (optional)
                        </label>
                        <select
                          id="finder-ol-maths"
                          value={state.olMathsGrade || ''}
                          onChange={(e) =>
                            setAcademicDetails({
                              olMathsGrade: (e.target.value || null) as GradeValue | null,
                            })
                          }
                          className="w-full min-h-[50px] px-3.5 rounded-[4px] border-2 border-[#111111]/25 bg-white text-base"
                        >
                          <option value="">Skip for now / Not sure</option>
                          <option value="A">Grade A / Distinction</option>
                          <option value="B">Grade B / Very Good</option>
                          <option value="C">Grade C / Credit</option>
                          <option value="S">Grade S / Pass</option>
                          <option value="F">Did not pass / Resit</option>
                          <option value="awaiting">Awaiting results</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="finder-ol-english"
                          className="block text-sm font-bold text-[#111111] mb-1.5"
                        >
                          O/L English grade (optional)
                        </label>
                        <select
                          id="finder-ol-english"
                          value={state.olEnglishGrade || ''}
                          onChange={(e) =>
                            setAcademicDetails({
                              olEnglishGrade: (e.target.value || null) as GradeValue | null,
                            })
                          }
                          className="w-full min-h-[50px] px-3.5 rounded-[4px] border-2 border-[#111111]/25 bg-white text-base"
                        >
                          <option value="">Skip for now / Not sure</option>
                          <option value="A">Grade A / Distinction</option>
                          <option value="B">Grade B / Very Good</option>
                          <option value="C">Grade C / Credit</option>
                          <option value="S">Grade S / Pass</option>
                          <option value="F">Did not pass / Resit</option>
                          <option value="awaiting">Awaiting results</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* A/L Stream & Passes only when relevant */}
                  {showALFields && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label
                          htmlFor="finder-al-stream"
                          className="block text-sm font-bold text-[#111111] mb-1.5"
                        >
                          A/L subject stream (optional)
                        </label>
                        <select
                          id="finder-al-stream"
                          value={state.alStream || ''}
                          onChange={(e) =>
                            setAcademicDetails({ alStream: e.target.value || null })
                          }
                          className="w-full min-h-[50px] px-3.5 rounded-[4px] border-2 border-[#111111]/25 bg-white text-base"
                        >
                          <option value="">Skip for now / Not sure</option>
                          {AL_STREAM_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      {state.resultStatus !== 'awaiting-results' && (
                        <div>
                          <label
                            htmlFor="finder-al-passes"
                            className="block text-sm font-bold text-[#111111] mb-1.5"
                          >
                            Number of A/L passes (optional)
                          </label>
                          <select
                            id="finder-al-passes"
                            value={state.alPassesCount === null ? '' : String(state.alPassesCount)}
                            onChange={(e) =>
                              setAcademicDetails({
                                alPassesCount:
                                  e.target.value === '' ? null : Number(e.target.value),
                              })
                            }
                            className="w-full min-h-[50px] px-3.5 rounded-[4px] border-2 border-[#111111]/25 bg-white text-base"
                          >
                            <option value="">Skip for now / Not sure</option>
                            <option value="3">3 Passes</option>
                            <option value="2">2 Passes</option>
                            <option value="1">1 Pass</option>
                            <option value="0">0 A/L Passes</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Prior qualification fields when holding higher qualification */}
                  {showPriorQualificationFields && (
                    <div className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-4">
                      <div className="text-sm font-bold text-[#111111]">
                        Prior Qualification Details (Optional)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          aria-label="Qualification type"
                          value={state.priorQualificationType || ''}
                          onChange={(e) =>
                            setAcademicDetails({
                              priorQualificationType: e.target.value || null,
                            })
                          }
                          placeholder="e.g. HND, National Diploma, Certificate"
                          className="min-h-[48px] px-3.5 rounded-[4px] border border-[#E2E2E6] bg-white text-base"
                        />
                        <input
                          type="text"
                          aria-label="Subject area"
                          value={state.priorSubjectArea || ''}
                          onChange={(e) =>
                            setAcademicDetails({ priorSubjectArea: e.target.value || null })
                          }
                          placeholder="Subject area (or Not sure)"
                          className="min-h-[48px] px-3.5 rounded-[4px] border border-[#E2E2E6] bg-white text-base"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3 OF 4: INTERESTS & GOALS */}
              {state.currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#666666] block mb-1">
                      Step 3 of 4 · {STAGE_NAMES[3]}
                    </span>
                    <h2
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="text-2xl sm:text-3xl font-extrabold text-[#111111] focus:outline-none"
                    >
                      What would you like to study?
                    </h2>
                    <p className="text-sm sm:text-base text-[#666666] mt-1.5">
                      Choose up to 3 subject areas of interest, or select &ldquo;I&apos;m not sure
                      yet&rdquo;.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectableCategories.map((cat) => {
                      const selected = state.interests.includes(cat);
                      const disabled = !selected && state.interests.length >= 3;
                      return (
                        <label
                          key={cat}
                          className={`p-4 rounded-[4px] border-2 cursor-pointer flex items-center justify-between gap-3 ${
                            selected
                              ? 'bg-[#FFF0B3] border-[#111111] font-extrabold'
                              : disabled
                                ? 'bg-[#F4F4F5] border-[#E2E2E6] opacity-55 cursor-not-allowed'
                                : 'bg-white border-[#E2E2E6] hover:border-[#111111]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selected}
                              disabled={disabled}
                              onChange={() => toggleInterest(cat)}
                              className="w-5 h-5 accent-[#111111]"
                            />
                            <span className="text-sm sm:text-base font-bold text-[#111111]">
                              {cat}
                            </span>
                          </div>
                          {selected && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                        </label>
                      );
                    })}

                    <label
                      className={`p-4 rounded-[4px] border-2 cursor-pointer flex items-center gap-3 sm:col-span-2 ${
                        state.interestUnsure
                          ? 'bg-[#FFF0B3] border-[#111111] font-extrabold'
                          : 'bg-[#F4F4F5] border-[#E2E2E6] hover:border-[#111111]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={state.interestUnsure}
                        onChange={(e) => setInterestUnsure(e.target.checked)}
                        className="w-5 h-5 accent-[#111111]"
                      />
                      <span className="text-sm sm:text-base font-bold text-[#111111]">
                        I&apos;m not sure yet — show options across subject areas
                      </span>
                    </label>
                  </div>

                  {/* Optional Study Goal */}
                  <div className="pt-4 border-t border-[#E2E2E6] space-y-2.5">
                    <span className="block text-sm font-bold text-[#111111]">
                      What is your main goal right now? (optional)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(
                        [
                          { id: 'start-qualification', label: 'Start a qualification' },
                          { id: 'further-study', label: 'Further academic study' },
                          { id: 'professional-development', label: 'Professional development' },
                        ] as { id: GoalId; label: string }[]
                      ).map((g) => {
                        const active = state.goal === g.id;
                        return (
                          <label
                            key={g.id}
                            className={`p-3 rounded-[4px] border-2 cursor-pointer flex items-center gap-2 text-xs sm:text-sm font-bold ${
                              active
                                ? 'bg-[#FFF0B3] border-[#111111]'
                                : 'bg-white border-[#E2E2E6] hover:border-[#111111]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="finder-goal"
                              checked={active}
                              onChange={() => setGoal(g.id)}
                              className="w-4 h-4 accent-[#111111]"
                            />
                            <span>{g.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 OF 4: STUDY PREFERENCES & SUMMARY */}
              {state.currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#666666] block mb-1">
                      Step 4 of 4 · {STAGE_NAMES[4]}
                    </span>
                    <h2
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="text-2xl sm:text-3xl font-extrabold text-[#111111] focus:outline-none"
                    >
                      How would you prefer to study?
                    </h2>
                    <p className="text-sm sm:text-base text-[#666666] mt-1.5">
                      Select any preference below or leave as &ldquo;No Preference&rdquo;. Campus
                      and delivery mode availability are confirmed individually per programme.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="finder-campus"
                        className="block text-sm font-bold text-[#111111] mb-1.5"
                      >
                        Preferred Campus
                      </label>
                      <select
                        id="finder-campus"
                        value={state.campusPreference || 'no-preference'}
                        onChange={(e) => setPreferences({ campusPreference: e.target.value })}
                        className="w-full min-h-[52px] px-4 rounded-[4px] border-2 border-[#111111]/25 bg-white text-base"
                      >
                        <option value="no-preference">No Preference</option>
                        {availableCampuses.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                        <option value="Kandy Campus">Kandy Campus (Check Availability)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="finder-mode"
                        className="block text-sm font-bold text-[#111111] mb-1.5"
                      >
                        Preferred Study Mode
                      </label>
                      <select
                        id="finder-mode"
                        value={state.modePreference || 'no-preference'}
                        onChange={(e) => setPreferences({ modePreference: e.target.value })}
                        className="w-full min-h-[52px] px-4 rounded-[4px] border-2 border-[#111111]/25 bg-white text-base"
                      >
                        <option value="no-preference">No Preference</option>
                        {availableModes.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Editable Summary before Results */}
                  <div className="p-5 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-2 text-sm">
                    <div className="font-extrabold text-[#111111]">Review Your Selections</div>
                    <div>
                      <strong>Starting Point:</strong>{' '}
                      {STARTING_POINT_OPTIONS.find((s) => s.id === state.startingPoint)?.title ||
                        'Exploratory'}{' '}
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold underline ml-2 cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <strong>Interests:</strong>{' '}
                      {state.interestUnsure || state.interests.length === 0
                        ? 'Open across subjects'
                        : state.interests.join(', ')}{' '}
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-xs font-bold underline ml-2 cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* RESULTS VIEW (Visible WITHOUT collecting contact details!) */}
              {state.currentStep === 5 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#666666] block">
                      Study Exploration Results
                    </span>
                    <h2
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="text-2xl sm:text-4xl font-extrabold text-[#111111] focus:outline-none"
                    >
                      Explore your study options.
                    </h2>
                  </div>

                  {/* Single Guidance Disclaimer Notice */}
                  <div className="p-4 bg-[#FFF0B3] border-2 border-[#111111] rounded-[4px] flex items-start gap-3 text-sm text-[#111111]">
                    <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <p>{evaluation.globalNotice}</p>
                  </div>

                  {/* Top 3 Relevant Suggestions First */}
                  {evaluation.primarySuggestions.length > 0 ? (
                    <div className="space-y-4">
                      {evaluation.primarySuggestions.map((item) => (
                        <article
                          key={item.programme.id}
                          className="p-6 bg-white border-2 border-[#111111] rounded-[4px] space-y-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                              {item.programme.category} · {item.programme.qualificationLevel}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] text-[#FFCC00] text-xs font-extrabold rounded-[4px]">
                              {item.status === 'SUGGESTED_OPTION' ? (
                                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              ) : (
                                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                              )}
                              <span>{item.statusLabel}</span>
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                            <Link
                              to={`/programmes/${item.programme.slug}`}
                              className="hover:underline"
                            >
                              {item.programme.title}
                            </Link>
                          </h3>

                          <p className="text-sm sm:text-base text-[#111111] leading-relaxed">
                            {item.explanation}
                          </p>

                          {item.preferenceNote && (
                            <p className="text-xs font-semibold text-[#A16207] bg-[#FFF0B3]/60 px-3 py-2 rounded-[4px] border border-[#A16207]/30">
                              Preference note: {item.preferenceNote}
                            </p>
                          )}

                          <div className="pt-2 flex flex-wrap items-center gap-4">
                            <Link
                              to={`/programmes/${item.programme.slug}`}
                              className="biet-btn-primary text-sm min-h-[44px]"
                            >
                              <span>View Programme</span>
                              <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>

                            {item.programme.duration && (
                              <span className="text-xs font-semibold text-[#666666]">
                                Duration: {item.programme.duration}
                              </span>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-3">
                      <h3 className="text-lg font-extrabold text-[#111111]">
                        Discuss your study options directly with BIET admissions
                      </h3>
                      <p className="text-sm text-[#666666]">
                        No direct automatic match was generated for this specific combination of
                        inputs. Browse our full directory or request an admissions consultation.
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1">
                        <Link to="/programmes" className="biet-btn-secondary-light text-sm">
                          Browse Full Catalogue
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Access to more options */}
                  {evaluation.additionalOptions.length > 0 && (
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => setShowMoreOptions((prev) => !prev)}
                        aria-expanded={showMoreOptions}
                        className="inline-flex items-center gap-2 min-h-[44px] px-4 bg-[#F4F4F5] hover:bg-[#FFF0B3] border border-[#111111] rounded-[4px] text-sm font-extrabold text-[#111111] cursor-pointer"
                      >
                        {showMoreOptions ? (
                          <>
                            <ChevronUp className="w-4 h-4" aria-hidden="true" />
                            <span>Hide Additional Study Options</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" aria-hidden="true" />
                            <span>
                              Explore {evaluation.additionalOptions.length} More Study Options
                            </span>
                          </>
                        )}
                      </button>

                      {showMoreOptions && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {evaluation.additionalOptions.map((item) => (
                            <div
                              key={item.programme.id}
                              className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-2 flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[11px] font-bold uppercase text-[#666666]">
                                  {item.statusLabel} · {item.programme.category}
                                </span>
                                <h4 className="text-base font-extrabold text-[#111111] mt-1">
                                  {item.programme.title}
                                </h4>
                                <p className="text-xs text-[#666666] mt-1">{item.explanation}</p>
                              </div>
                              <Link
                                to={`/programmes/${item.programme.slug}`}
                                className="text-xs font-extrabold underline text-[#111111] pt-2 inline-block"
                              >
                                View Programme →
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Unmet Criteria Section (Transparent Guidance, Never Hidden Rejection) */}
                  {evaluation.unmetOrReviewOptions.some(
                    (u) => u.status === 'CRITERIA_NOT_MET_REVIEW'
                  ) && (
                    <div className="pt-4 border-t border-[#E2E2E6] space-y-3">
                      <h3 className="text-base font-extrabold text-[#111111]">
                        Programmes Needing Alternative or Admissions Review
                      </h3>
                      <div className="space-y-3">
                        {evaluation.unmetOrReviewOptions
                          .filter((u) => u.status === 'CRITERIA_NOT_MET_REVIEW')
                          .map((item) => (
                            <div
                              key={item.programme.id}
                              className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-1.5"
                            >
                              <div className="text-sm font-extrabold text-[#111111]">
                                {item.programme.title}
                              </div>
                              <p className="text-xs text-[#666666]">{item.explanation}</p>
                              {item.preparatoryAlternative && (
                                <Link
                                  to={`/programmes/${item.preparatoryAlternative.slug}`}
                                  className="text-xs font-bold underline text-[#111111] block"
                                >
                                  Explore preparatory option: {item.preparatoryAlternative.title}
                                </Link>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Result-Group Level Consultation & WhatsApp CTAs */}
                  <div className="p-6 bg-[#111111] text-white rounded-[4px] space-y-4">
                    <h3 className="text-xl font-extrabold text-white">
                      Next Step: Confirm Your Pathway with BIET Admissions
                    </h3>
                    <p className="text-sm text-white/80">
                      Share your results or preferred study area with our admissions team for
                      confirmed entry guidance.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenConsultation(evaluation.primarySuggestions[0]?.programme.id)
                        }
                        className="biet-btn-primary text-sm"
                      >
                        Request a Consultation
                      </button>

                      {siteConfig.whatsapp.isConfigured && (
                        <WhatsAppLink
                          context={{
                            kind: 'finder',
                            subjectOrProgramme:
                              evaluation.primarySuggestions[0]?.programme.title ||
                              state.interests[0] ||
                              'BIET Study Options',
                          }}
                          label="Chat on WhatsApp"
                          className="bg-[#1A1A1A] hover:bg-[#262626] text-white border-white/30"
                        />
                      )}

                      <Link
                        to="/programmes"
                        className="text-sm font-bold text-[#FFCC00] underline ml-auto"
                      >
                        Browse Full Catalogue →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Navigation Controls for Steps 1–4: Back left / Continue right */}
              {state.currentStep <= 4 && (
                <div className="mt-10 pt-6 border-t border-[#E2E2E6] flex items-center justify-between gap-4">
                  {state.currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="biet-btn-secondary-light min-h-[48px] px-6 text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <Link
                      to="/programmes"
                      className="text-sm font-bold text-[#666666] hover:text-[#111111] underline"
                    >
                      Browse all programmes instead
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleContinue}
                    className="biet-btn-primary min-h-[50px] px-8 text-sm"
                  >
                    <span>{state.currentStep === 4 ? 'Show My Options' : 'Continue'}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
