import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Clock,
  Briefcase,
  Award,
  ArrowRight,
  MessageSquare,
  Settings,
  RefreshCw,
  Check,
  ArrowLeft,
  Send,
} from 'lucide-react';
import { TechnicalGraphic } from '../components/ui/SmartImage';
import { PROGRAMMES, type Programme } from '../data/programmes';
import { INSTITUTION_INFO } from '../data/site';
import { photo } from '../lib/assets';
import {
  QUALIFICATION_OPTIONS,
  STREAM_OPTIONS,
  SUBJECT_OPTIONS,
  GOAL_OPTIONS,
  FIELD_OPTIONS,
  INITIAL_PATHWAY_PROFILE,
  evaluatePathwayMatches,
  savePathwayLead,
  type PathwayProfile,
  type PathwayMatchResult,
  type PathwayLead,
  type MatchStatus,
} from '../data/pathways';

interface PathwayCardProps {
  result: PathwayMatchResult;
  onViewDetails: (id: string) => void;
  onApplyNow: (title: string) => void;
  onContactCounsellor: (title: string) => void;
}

const PathwayMatchCard: React.FC<PathwayCardProps> = ({
  result,
  onViewDetails,
  onApplyNow,
  onContactCounsellor,
}) => {
  const {
    programme,
    status,
    matchScore,
    headline,
    matchReasons,
    recommendedPathway,
  } = result;

  const renderBadge = (s: MatchStatus) => {
    switch (s) {
      case 'DIRECT_ENTRY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Direct Entry Eligible ({matchScore}% Match)
          </span>
        );
      case 'CONDITIONAL_ASSESSMENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            Requires Assessment ({matchScore}% Match)
          </span>
        );
      case 'PROGRESSION_PATHWAY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-blue-300" />
            Foundation Pathway Recommended
          </span>
        );
    }
  };

  return (
    <div className="group relative bg-[#001a39]/90 hover:bg-[#002147]/90 border border-[#1a3b61]/40 hover:border-[#fdc800]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#fdc800]/5 flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fdc800]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            {programme.school}
          </span>
          {renderBadge(status)}
        </div>

        <div className="flex gap-4 items-start mb-4">
          <div className="hidden sm:block shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#002147] to-[#001428] border border-[#1a3b61]/40 overflow-hidden flex items-center justify-center p-1.5">
            <TechnicalGraphic
              type={programme.imageSvgType}
              className="w-full h-full text-[#fdc800]"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#fdc800] transition-colors leading-tight">
              {programme.title}
            </h3>
            <p className="text-xs text-[#fdc800] font-semibold mt-0.5">
              Award: {programme.qualification}
            </p>
          </div>
        </div>

        <div className="mb-4 bg-white/[0.03] border border-white/5 rounded-xl p-3">
          <p className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#fdc800]" />
            {headline}
          </p>
          <ul className="space-y-1">
            {matchReasons.map((reason, idx) => (
              <li
                key={idx}
                className="text-xs text-white/70 flex items-start gap-1.5 leading-relaxed"
              >
                <span className="text-[#fdc800] font-bold">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {status === 'PROGRESSION_PATHWAY' && recommendedPathway && (
          <div className="mb-4 bg-blue-950/40 border border-blue-500/30 rounded-xl p-3">
            <p className="text-xs font-bold text-blue-300 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Recommended Progression Step:
            </p>
            <p className="text-xs text-white font-medium">{recommendedPathway}</p>
            <p className="text-[11px] text-white/60 mt-1">
              Provides guaranteed progression to Year 1 upon completion.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs text-white/70 mb-4 bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#fdc800] shrink-0" />
            <span>{programme.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#fdc800] shrink-0" />
            <span>{programme.studyMode}</span>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">
            Career Opportunities
          </p>
          <div className="flex flex-wrap gap-1.5">
            {programme.careerPathways.slice(0, 3).map((career, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-white/5 hover:bg-white/10 text-white/80 px-2.5 py-0.5 rounded-md border border-white/5"
              >
                {career}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={() => onViewDetails(programme.id)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
        >
          <Award className="w-3.5 h-3.5" />
          View Details
        </button>
        <button
          onClick={() => onApplyNow(programme.title)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] transition-all shadow-md shadow-[#fdc800]/10 hover:shadow-[#fdc800]/25 cursor-pointer"
        >
          Apply Now
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onContactCounsellor(programme.title)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          Talk to Counsellor
        </button>
      </div>
    </div>
  );
};

interface FindMyPathPageProps {
  onApplyClick: (programmeTitle?: string) => void;
  onSelectProgramme: (programme: Programme) => void;
  onOpenAdmin: () => void;
}

export const FindMyPathPage: React.FC<FindMyPathPageProps> = ({
  onApplyClick,
  onSelectProgramme,
  onOpenAdmin,
}) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<PathwayProfile>(INITIAL_PATHWAY_PROFILE);
  const [customSubjectInput, setCustomSubjectInput] = useState('');
  const [results, setResults] = useState<PathwayMatchResult[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Colombo');
  const [preferredIntake, setPreferredIntake] = useState('September 2026');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submittedLead, setSubmittedLead] = useState<PathwayLead | null>(null);

  const toggleQualification = (id: string) => {
    let updated = [...profile.qualifications];
    if (updated.includes(id)) {
      if (updated.length > 1) {
        updated = updated.filter((q) => q !== id);
      }
    } else {
      updated.push(id);
    }
    setProfile({ ...profile, qualifications: updated });
  };

  const toggleSubject = (subj: string) => {
    let updated = [...profile.subjectsStudied];
    if (updated.includes(subj)) {
      updated = updated.filter((s) => s !== subj);
    } else {
      updated.push(subj);
    }
    setProfile({ ...profile, subjectsStudied: updated });
  };

  const addCustomSubject = () => {
    const trimmed = customSubjectInput.trim();
    if (trimmed) {
      if (!profile.subjectsStudied.includes(trimmed)) {
        setProfile({
          ...profile,
          subjectsStudied: [...profile.subjectsStudied, trimmed],
        });
      }
      setCustomSubjectInput('');
    }
  };

  const toggleGoal = (id: string) => {
    let updated = [...profile.goals];
    if (updated.includes(id)) {
      if (updated.length > 1) {
        updated = updated.filter((g) => g !== id);
      }
    } else {
      updated.push(id);
    }
    setProfile({ ...profile, goals: updated });
  };

  const toggleField = (id: string) => {
    let updated = [...profile.preferredFields];
    if (updated.includes(id)) {
      updated = updated.filter((f) => f !== id);
    } else {
      updated.push(id);
    }
    setProfile({ ...profile, preferredFields: updated });
  };

  const handleDiscoverPathways = () => {
    const matched = evaluatePathwayMatches(profile);
    setResults(matched);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    const saved = savePathwayLead({
      fullName,
      email,
      phone,
      city,
      preferredIntake,
      additionalNotes,
      profile,
      recommendedProgrammes: results.map((r) => ({
        id: r.programme.id,
        title: r.programme.title,
        status: r.status,
      })),
    });
    setSubmittedLead(saved);
  };

  const filteredResults = results.filter(
    (r) => statusFilter === 'all' || r.status === statusFilter
  );

  const getWhatsAppUrl = (courseTitle?: string) => {
    const num = (INSTITUTION_INFO.whatsappNumber || '94112345678').replace(
      /[^0-9]/g,
      ''
    );
    const targetCourse = courseTitle || results[0]?.programme.title || 'BIET Degrees';
    const text = `Hello BIET Admissions, I used the Find My Path tool on your website. My qualifications: ${profile.qualifications.join(
      ', '
    )} (${
      profile.stream || 'General'
    }). Recommended course: ${targetCourse}. I would like to speak with an admissions counsellor.`;
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  };

  const handleViewProgrammeDetails = (id: string) => {
    const prog = PROGRAMMES.find((p) => p.id === id);
    if (prog) onSelectProgramme(prog);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001428] via-[#001a39] to-[#001020] text-white pt-20 pb-16">
      <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#001a39] via-[#002147] to-[#001a39] border border-[#1a3b61]/50 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl">
          <img
            src={photo('photo-1523240795612-9a054b0db644')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001633]/45 via-[#002147]/20 to-transparent pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#fdc800]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Find Your Academic Path at BIET
              </h1>
              <p className="text-sm sm:text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
                Explore custom educational pathways into Engineering, Computing, and the Built Environment based on your unique academic qualifications, interests, and career ambitions.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
                title="Admin Console to manage course entry rules & view leads"
              >
                <Settings className="w-4 h-4 text-[#fdc800]" />
                Manage Entry Rules (Admin)
              </button>
              {step === 4 && (
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Start New Search
                </button>
              )}
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              {[
                { num: 1, label: 'Qualifications' },
                { num: 2, label: 'Academic Details' },
                { num: 3, label: 'Future Goals' },
                { num: 4, label: 'Matched Pathways' },
              ].map((item) => {
                const isCurrent = step === item.num;
                const isCompleted = step > item.num;
                return (
                  <div
                    key={item.num}
                    onClick={() => item.num < step && setStep(item.num)}
                    className={`flex items-center gap-2 cursor-pointer transition-all ${
                      isCurrent
                        ? 'text-[#fdc800] font-bold'
                        : isCompleted
                        ? 'text-white font-medium hover:text-[#fdc800]'
                        : 'text-white/40'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#fdc800] text-[#002147] shadow-md shadow-[#fdc800]/30 ring-4 ring-[#fdc800]/20'
                          : isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : item.num}
                    </div>
                    <span className="hidden sm:inline-block text-xs">{item.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#fdc800] to-emerald-400 h-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="bg-[#001a39]/95 border border-[#1a3b61]/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-[#fdc800] uppercase tracking-wider">
                Step 1 of 3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Select Your Qualifications
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Select one or multiple educational qualifications you hold or are currently completing. You are not restricted to a single pathway.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {QUALIFICATION_OPTIONS.map((opt) => {
                const isSelected = profile.qualifications.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleQualification(opt.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isSelected
                        ? 'bg-[#fdc800]/15 border-[#fdc800] shadow-lg shadow-[#fdc800]/5 text-white'
                        : 'bg-[#001428]/80 border-[#1a3b61]/30 text-white/80 hover:bg-[#002147]/60 hover:border-[#1a3b61]/60'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-[#fdc800] border-[#fdc800] text-[#002147]'
                          : 'border-white/30 bg-white/5'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white">
                        {opt.title}
                      </h3>
                      <p className="text-[11px] text-white/60 mt-0.5">{opt.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {profile.qualifications.includes('other') && (
              <div className="mt-4 p-4 bg-[#001428]/80 border border-[#1a3b61]/40 rounded-2xl space-y-2 animate-fadeIn">
                <label className="block text-xs font-bold text-white">
                  Specify Your Other Qualification:
                </label>
                <input
                  type="text"
                  placeholder="e.g. German Abitur, Indian CBSE Class XII, NVQ Level 4 Civil, etc."
                  value={profile.customQualification}
                  onChange={(e) =>
                    setProfile({ ...profile, customQualification: e.target.value })
                  }
                  className="w-full bg-[#001428]/80 border border-[#1a3b61]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fdc800]"
                />
              </div>
            )}

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/50">
                Selected:{' '}
                <strong className="text-[#fdc800]">{profile.qualifications.length}</strong>{' '}
                qualification(s)
              </span>
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fdc800] hover:bg-[#ffe066] text-[#002147] font-extrabold text-xs sm:text-sm shadow-lg shadow-[#fdc800]/20 transition-all hover:scale-105 cursor-pointer"
              >
                Next: Academic Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-[#001a39]/95 border border-[#1a3b61]/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#fdc800] uppercase tracking-wider">
                  Step 2 of 3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Academic Background Details
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Tell us a little more about your subjects, streams, and grades. You can skip any optional fields.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Examination Country / Authority
                  </label>
                  <select
                    value={profile.examCountry}
                    onChange={(e) =>
                      setProfile({ ...profile, examCountry: e.target.value })
                    }
                    className="w-full bg-[#001428]/80 border border-[#1a3b61]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fdc800]"
                  >
                    <option value="Sri Lanka">
                      Sri Lanka (G.C.E. Examinations Department)
                    </option>
                    <option value="United Kingdom">
                      United Kingdom (Cambridge Assessment / Pearson Edexcel)
                    </option>
                    <option value="India">India (CBSE / ICSE / State Board)</option>
                    <option value="International">International / Other Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Academic Stream Studied
                  </label>
                  <select
                    value={profile.stream}
                    onChange={(e) => setProfile({ ...profile, stream: e.target.value })}
                    className="w-full bg-[#001428]/80 border border-[#1a3b61]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fdc800]"
                  >
                    {STREAM_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Number of G.C.E. A/L Passes Achieved
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setProfile({ ...profile, alPassesCount: cnt })}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          profile.alPassesCount === cnt
                            ? 'bg-[#fdc800] text-[#002147] border-[#fdc800]'
                            : 'bg-[#001428]/80 text-white/70 border-[#1a3b61]/30 hover:bg-[#002147]/60'
                        }`}
                      >
                        {cnt === 0 ? '0 Passes' : `${cnt} Pass${cnt > 1 ? 'es' : ''}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Current Educational Status
                  </label>
                  <select
                    value={profile.currentStatus}
                    onChange={(e) =>
                      setProfile({ ...profile, currentStatus: e.target.value })
                    }
                    className="w-full bg-[#001428]/80 border border-[#1a3b61]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fdc800]"
                  >
                    <option value="Completed G.C.E. A/L">Completed G.C.E. A/L</option>
                    <option value="Awaiting A/L Results">
                      Awaiting G.C.E. A/L Results
                    </option>
                    <option value="Completed O/L (Exploring Pathways)">
                      Completed O/L (Exploring Foundation)
                    </option>
                    <option value="Studying Diploma / Higher Diploma">
                      Studying Diploma / Higher Diploma
                    </option>
                    <option value="Working Professional Seeking Degree Top-Up">
                      Working Professional Seeking Degree Top-Up
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      O/L Mathematics Grade
                    </label>
                    <select
                      value={profile.mathsGrade}
                      onChange={(e) =>
                        setProfile({ ...profile, mathsGrade: e.target.value })
                      }
                      className="w-full bg-[#001428]/80 border border-[#1a3b61]/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                    >
                      <option value="A">Distinction (A)</option>
                      <option value="B">Very Good (B)</option>
                      <option value="C">Credit (C)</option>
                      <option value="S">Ordinary Pass (S)</option>
                      <option value="F">Fail / Weak (F)</option>
                      <option value="Pending">Pending / Awaiting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      O/L English Grade
                    </label>
                    <select
                      value={profile.englishGrade}
                      onChange={(e) =>
                        setProfile({ ...profile, englishGrade: e.target.value })
                      }
                      className="w-full bg-[#001428]/80 border border-[#1a3b61]/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                    >
                      <option value="A">Distinction (A)</option>
                      <option value="B">Very Good (B)</option>
                      <option value="C">Credit (C)</option>
                      <option value="S">Ordinary Pass (S)</option>
                      <option value="F">Fail / Weak (F)</option>
                      <option value="Pending">Pending / Awaiting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Key Subjects Studied
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-[#001428]/80 rounded-xl border border-[#1a3b61]/40">
                    {SUBJECT_OPTIONS.map((subj) => {
                      const active = profile.subjectsStudied.includes(subj);
                      return (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => toggleSubject(subj)}
                          className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                            active
                              ? 'bg-[#fdc800] text-[#002147] font-bold'
                              : 'bg-white/5 text-white/70 hover:bg-white/15'
                          }`}
                        >
                          {subj}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add other subject..."
                      value={customSubjectInput}
                      onChange={(e) => setCustomSubjectInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && (e.preventDefault(), addCustomSubject())
                      }
                      className="flex-1 bg-[#001428]/80 border border-[#1a3b61]/40 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                    />
                    <button
                      type="button"
                      onClick={addCustomSubject}
                      className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-xs font-bold hover:bg-white/20 cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Additional Qualifications / Certifications (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pearson HND, NVQ Level 4/5, CIMA Operational, City & Guilds..."
                    value={profile.additionalQualifications}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        additionalQualifications: e.target.value,
                      })
                    }
                    className="w-full bg-[#001428]/80 border border-[#1a3b61]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fdc800] hover:bg-[#ffe066] text-[#002147] font-extrabold text-xs sm:text-sm shadow-lg shadow-[#fdc800]/20 transition-all hover:scale-105 cursor-pointer"
              >
                Next: Future Goals
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-[#001a39]/95 border border-[#1a3b61]/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-[#fdc800] uppercase tracking-wider">
                Step 3 of 3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Your Future Goals & Preferred Disciplines
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Select what you wish to achieve so we can tailor the best BIET degree & progression pathways for you.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-white/60">
                What is your primary educational goal?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {GOAL_OPTIONS.map((goal) => {
                  const active = profile.goals.includes(goal.id);
                  return (
                    <div
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                        active
                          ? 'bg-[#fdc800]/15 border-[#fdc800] shadow-md text-white'
                          : 'bg-[#001428]/80 border-[#1a3b61]/30 text-white/80 hover:bg-[#002147]/60'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md mt-0.5 shrink-0 flex items-center justify-center border ${
                          active
                            ? 'bg-[#fdc800] border-[#fdc800] text-[#002147]'
                            : 'border-white/30'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{goal.title}</h4>
                        <p className="text-[11px] text-white/60 mt-0.5">{goal.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-white/60">
                Preferred BIET Schools / Fields of Interest (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FIELD_OPTIONS.map((field) => {
                  const active = profile.preferredFields.includes(field.id);
                  return (
                    <div
                      key={field.id}
                      onClick={() => toggleField(field.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all select-none ${
                        active
                          ? 'bg-[#fdc800]/15 border-[#fdc800] text-white'
                          : 'bg-[#001428]/80 border-[#1a3b61]/30 text-white/70 hover:bg-[#002147]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{field.label}</h4>
                        {active && <Check className="w-4 h-4 text-[#fdc800]" />}
                      </div>
                      <p className="text-[11px] text-white/60 mt-1">{field.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-white/60">
                Preferred Study Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'any', label: 'Any Delivery Mode' },
                  { id: 'full-time', label: 'Full-Time (Weekday)' },
                  { id: 'part-time', label: 'Part-Time (Weekend/Evening)' },
                  { id: 'hybrid', label: 'Hybrid / Blended' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setProfile({ ...profile, studyMode: mode.id })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      profile.studyMode === mode.id
                        ? 'bg-[#fdc800] text-[#002147] border-[#fdc800]'
                        : 'bg-[#001428]/80 text-white/70 border-[#1a3b61]/30 hover:bg-[#002147]/60'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleDiscoverPathways}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#fdc800] to-[#ffe066] text-[#002147] font-extrabold text-xs sm:text-sm shadow-xl shadow-[#fdc800]/25 hover:scale-105 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Discover My Matched BIET Pathways
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#001a39]/95 border border-[#1a3b61]/40 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <span className="text-xs font-extrabold text-[#fdc800] uppercase tracking-wider">
                    Personalised Educational Pathway Report
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    We Found {results.length} Suitable Pathways For You
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">
                    Based on:{' '}
                    <strong className="text-white">
                      {profile.qualifications.join(', ')}
                    </strong>{' '}
                    ({profile.stream || 'General Stream'}, {profile.alPassesCount} A/L passes).
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#fdc800]" />
                    Edit Qualifications
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: `All Recommended Pathways (${results.length})` },
                  {
                    id: 'DIRECT_ENTRY',
                    label: `Direct Entry Eligible (${
                      results.filter((r) => r.status === 'DIRECT_ENTRY').length
                    })`,
                  },
                  {
                    id: 'CONDITIONAL_ASSESSMENT',
                    label: `Requires Assessment (${
                      results.filter((r) => r.status === 'CONDITIONAL_ASSESSMENT').length
                    })`,
                  },
                  {
                    id: 'PROGRESSION_PATHWAY',
                    label: `Foundation Pathways (${
                      results.filter((r) => r.status === 'PROGRESSION_PATHWAY').length
                    })`,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === tab.id
                        ? 'bg-[#fdc800] text-[#002147] shadow-md shadow-[#fdc800]/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResults.map((res) => (
                <PathwayMatchCard
                  key={res.programme.id}
                  result={res}
                  onViewDetails={handleViewProgrammeDetails}
                  onApplyNow={(title) => onApplyClick(title)}
                  onContactCounsellor={(title) => {
                    window.open(getWhatsAppUrl(title), '_blank');
                  }}
                />
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#001a39] to-[#002147] border border-[#1a3b61]/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#fdc800]/10 rounded-full blur-3xl pointer-events-none" />
              {submittedLead ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Pathway Submission Received!
                  </h3>
                  <p className="text-sm text-white/80 max-w-lg mx-auto">
                    Thank you{' '}
                    <strong className="text-[#fdc800]">{submittedLead.fullName}</strong>.
                    Reference ID:{' '}
                    <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-xs text-white">
                      {submittedLead.id}
                    </span>
                    . A BIET admissions counsellor will contact you at{' '}
                    <strong className="text-white">{submittedLead.email}</strong> /{' '}
                    <strong className="text-white">{submittedLead.phone}</strong>.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat Directly on WhatsApp Now
                    </a>
                    <button
                      onClick={() => setSubmittedLead(null)}
                      className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Submit Additional Query
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                      <Briefcase className="w-3.5 h-3.5" />
                      Personalised Counsellor Consultation
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Speak with a BIET Admissions Specialist
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      Have your qualifications officially reviewed by BIET academic officers. Get guidance on scholarships, credit transfers, and upcoming semester intakes.
                    </p>
                    <ul className="space-y-2 text-xs text-white/80">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#fdc800]" />
                        Official entry requirements verification
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#fdc800]" />
                        Special RPL (Prior Learning) assessment for working professionals
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#fdc800]" />
                        Institutional scholarship advisory
                      </li>
                    </ul>
                  </div>

                  <form
                    onSubmit={handleSubmitLead}
                    className="lg:col-span-7 bg-[#001428]/90 border border-[#1a3b61]/40 rounded-2xl p-5 sm:p-6 space-y-4"
                  >
                    <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2">
                      Request Counsellor Follow-Up
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-white/70 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kasun Perera"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#001a39]/90 border border-[#1a3b61]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-white/70 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="kasun@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#001a39]/90 border border-[#1a3b61]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-white/70 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+94 77 123 4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#001a39]/90 border border-[#1a3b61]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-white/70 mb-1">
                          City / Region
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Colombo, Kandy, Galle..."
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#001a39]/90 border border-[#1a3b61]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">
                        Intended Intake
                      </label>
                      <select
                        value={preferredIntake}
                        onChange={(e) => setPreferredIntake(e.target.value)}
                        className="w-full bg-[#001a39]/90 border border-[#1a3b61]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                      >
                        <option value="September 2026">September 2026 Intake</option>
                        <option value="February 2027">February 2027 Intake</option>
                        <option value="Exploring Options">Just Exploring Options</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">
                        Additional Notes / Questions (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Specify any questions about entry requirements, fees, or weekend classes..."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="w-full bg-[#001a39]/90 border border-[#1a3b61]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#fdc800]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#fdc800] hover:bg-[#ffe066] text-[#002147] rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#fdc800]/20 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Submit Profile for Counsellor Evaluation
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
