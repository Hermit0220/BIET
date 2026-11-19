import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Award,
  Sparkles,
  Clock,
  GraduationCap,
  Layers,
  BookOpen,
  Calendar,
  CheckCircle2,
  Table,
  LayoutGrid,
  Cpu,
  Briefcase,
  Phone,
  Mail,
} from 'lucide-react';
import { PROGRAMMES } from '../data/programmes';
import { INSTITUTION_INFO } from '../data/site';
import { SmartImage } from '../components/ui/SmartImage';

interface ProgrammeDetailPageProps {
  onApplyClick: (programmeTitle?: string) => void;
  onProspectusClick: () => void;
}

export const ProgrammeDetailPage: React.FC<ProgrammeDetailPageProps> = ({
  onApplyClick,
  onProspectusClick,
}) => {
  const { programmeId } = useParams<{ programmeId: string }>();
  const prog = PROGRAMMES.find((p) => p.id === programmeId);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [moduleViewMode, setModuleViewMode] = useState<'table' | 'cards'>('table');

  if (!prog) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-20">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-neutral-200 text-center space-y-4 shadow-sm">
          <h1 className="text-2xl font-bold text-[#111111]">Programme Not Found</h1>
          <p className="text-sm text-neutral-600">
            The requested course specification could not be located.
          </p>
          <div className="pt-2">
            <Link
              to="/programmes"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Programmes</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const otherProgrammes = PROGRAMMES.filter((p) => p.id !== prog.id).slice(0, 3);
  const heroImage = prog.heroImageUrl || prog.imageUrl;

  return (
    <div className="bg-white text-[#111111]">
      <div className="bg-white border-b border-neutral-200 text-xs text-neutral-600 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-neutral-500 flex-wrap">
            <Link to="/" className="hover:text-[#002147] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/programmes" className="hover:text-[#002147] transition-colors">
              Programmes
            </Link>
            <span>/</span>
            <span className="text-[#002147] font-bold truncate max-w-[240px] sm:max-w-none">
              {prog.title}
            </span>
          </nav>
          <Link
            to="/programmes"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-[#002147]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Courses</span>
          </Link>
        </div>
      </div>

      <section className="relative bg-white text-[#111111] border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111]">
                <span className="px-3 py-1 rounded-full bg-[#002147]/10 text-[#002147] font-extrabold border border-[#002147]/20">
                  {prog.school}
                </span>
                <span aria-hidden="true" className="text-neutral-400">
                  ·
                </span>
                <span className="font-bold text-neutral-800">{prog.qualification}</span>
                {prog.affiliatedInstitution && (
                  <>
                    <span aria-hidden="true" className="text-neutral-400">
                      ·
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#002147] text-[#fdc800] font-extrabold border border-[#1a3b61] shadow-2xs">
                      Affiliated: {prog.affiliatedInstitution}
                    </span>
                  </>
                )}
                {prog.assessmentMethod && (
                  <>
                    <span aria-hidden="true" className="text-neutral-400">
                      ·
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-bold border border-neutral-200">
                      {prog.assessmentMethod.includes(',')
                        ? 'Modular Assessment'
                        : prog.assessmentMethod}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight text-balance">
                {prog.title}
              </h1>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-800">
                <Award className="w-4 h-4 text-[#002147] shrink-0" />
                <span>
                  {prog.affiliatedInstitution === 'TVEC (Pending)' ? (
                    <>
                      Institution:{' '}
                      <strong>British Institute of Engineering Technology (BIET)</strong> ·
                      Affiliation: <strong>TVEC (Pending)</strong>
                    </>
                  ) : prog.affiliatedInstitution ? (
                    <>
                      Awarding / Affiliated Institution:{' '}
                      <strong>{prog.affiliatedInstitution}</strong>
                    </>
                  ) : (
                    <>
                      Institution:{' '}
                      <strong>
                        {prog.awardingBodyPlaceholder.includes('[')
                          ? 'British Institute of Engineering Technology (BIET)'
                          : prog.awardingBodyPlaceholder}
                      </strong>
                    </>
                  )}
                </span>
              </div>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
                {prog.overview}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onApplyClick(prog.title)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4 text-[#002147]" />
                </button>
                <button
                  onClick={() => onApplyClick(`Inquiry regarding ${prog.title}`)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#002147] rounded-xl transition-colors cursor-pointer"
                >
                  <span>Enquire Now</span>
                </button>
                <button
                  onClick={onProspectusClick}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-medium text-neutral-600 hover:text-[#002147] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#002147]" />
                  <span>Syllabus Outline</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-3xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-100 group">
                <SmartImage
                  src={heroImage}
                  alt={prog.title}
                  imageSvgType={prog.imageSvgType}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#002147]/90 backdrop-blur-md text-[11px] font-bold text-[#fdc800] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#fdc800]" />
                    <span>{prog.affiliatedInstitution || 'BIET Engineering Faculty'}</span>
                  </div>
                  <p className="text-xs text-white/90 mt-1.5 font-medium line-clamp-1">
                    Hands-on laboratory training & practical coursework
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-10 pt-8 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-3 ${
              prog.affiliatedInstitution && prog.studySchedule
                ? 'lg:grid-cols-4 xl:grid-cols-7'
                : prog.affiliatedInstitution || prog.studySchedule
                ? 'lg:grid-cols-6'
                : 'lg:grid-cols-5'
            } gap-4 text-xs`}
          >
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#002147]" />
                <span>Duration</span>
              </div>
              <div className="font-extrabold text-[#111111] text-sm sm:text-base">
                {prog.duration}
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <GraduationCap className="w-4 h-4 text-[#002147]" />
                <span>Total Credits</span>
              </div>
              <div className="font-extrabold text-[#111111] text-xs sm:text-sm">
                {prog.totalCredits
                  ? prog.totalCredits.includes('Credits')
                    ? prog.totalCredits
                    : `${prog.totalCredits} Credits`
                  : '360 UK Credits'}
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <Layers className="w-4 h-4 text-[#002147]" />
                <span>Number of Modules</span>
              </div>
              <div className="font-extrabold text-[#111111] text-sm sm:text-base">
                {prog.moduleCount
                  ? `${prog.moduleCount} Modules`
                  : prog.allModules
                  ? `${prog.allModules.length} Modules`
                  : `${(prog.structureBreakdown || []).reduce((acc, s) => acc + s.modules.length, 0)} Modules`}
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <BookOpen className="w-4 h-4 text-[#002147]" />
                <span>Assessment</span>
              </div>
              <div className="font-extrabold text-[#111111] text-xs sm:text-sm line-clamp-2">
                {prog.assessmentMethod || 'Coursework & Exams'}
              </div>
            </div>
            {prog.studySchedule && (
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
                <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#002147]" />
                  <span>
                    {prog.id === 'hnd-cyber-security-digital-forensics' ||
                    prog.id === 'hnd-software-engineering'
                      ? 'Study Method'
                      : 'Study Schedule'}
                  </span>
                </div>
                <div className="font-extrabold text-[#111111] text-xs sm:text-sm">
                  {prog.studySchedule}
                </div>
              </div>
            )}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#002147]" />
                <span>Intake Dates</span>
              </div>
              <div className="font-extrabold text-[#111111] text-xs sm:text-sm">
                {prog.intakes.join(' · ')}
              </div>
            </div>
            {prog.affiliatedInstitution && (
              <div className="bg-white p-4 rounded-2xl border border-[#fdc800]/60 shadow-2xs col-span-2 sm:col-span-1 bg-[#fdc800]/5">
                <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                  <Award className="w-4 h-4 text-[#002147]" />
                  <span>Affiliation</span>
                </div>
                <div className="font-extrabold text-[#002147] text-xs sm:text-sm">
                  {prog.affiliatedInstitution}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-12">
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                  <span className="w-6 h-0.5 bg-[#fdc800]" />
                  <span>About The Programme</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">
                  Programme Overview & Learning Scope
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {prog.overview}
                </p>
                <div className="pt-2 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#002147]" />
                    <span>Key Competencies & Learning Outcomes</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {prog.whatYouWillLearn.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-[#fdc800] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#002147] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border-2 border-[#fdc800]/50 shadow-sm space-y-5 bg-gradient-to-br from-white to-[#f5f8ff]">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                    <CheckCircle2 className="w-4 h-4 text-[#002147]" />
                    <span>Admissions Criteria</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#fdc800] text-[#002147] text-[11px] font-extrabold uppercase tracking-wider">
                    Official Entry Requirements
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">Entry Requirements</h2>
                <ul className="space-y-3">
                  {prog.entryRequirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#fdc800] flex items-center justify-center shrink-0 mt-0.5 text-[#002147] font-bold text-xs">
                        ✓
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-sm sm:text-base font-semibold text-neutral-900 whitespace-pre-line">
                          {req}
                        </span>
                        {prog.id !== 'foundation-in-engineering' &&
                          prog.id !== 'beng-mechanical-manufacturing' &&
                          prog.id !== 'beng-mechanical-mechatronics' &&
                          prog.id !== 'diploma-in-computing' &&
                          prog.id !== 'hnd-artificial-intelligence' &&
                          prog.id !== 'hnd-cyber-security-digital-forensics' &&
                          prog.id !== 'hnd-software-engineering' && (
                            <p className="text-xs text-neutral-500">
                              Students with relevant foundation diplomas or equivalent qualifications are encouraged to apply.
                            </p>
                          )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                      <BookOpen className="w-4 h-4 text-[#002147]" />
                      <span>Curriculum & Modules</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#111111] mt-1">
                      Module Structure
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      {prog.assessmentNote
                        ? prog.assessmentNote
                        : prog.allModules
                        ? `All ${prog.allModules.length} modules structured for academic excellence.`
                        : 'Comprehensive modular structure.'}
                    </p>
                  </div>
                  {prog.allModules && (
                    <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl self-start sm:self-auto">
                      <button
                        onClick={() => setModuleViewMode('table')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          moduleViewMode === 'table'
                            ? 'bg-[#fdc800] text-[#002147] shadow-2xs'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        <Table className="w-3.5 h-3.5" />
                        <span>Table View</span>
                      </button>
                      <button
                        onClick={() => setModuleViewMode('cards')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          moduleViewMode === 'cards'
                            ? 'bg-[#fdc800] text-[#002147] shadow-2xs'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>Stages View</span>
                      </button>
                    </div>
                  )}
                </div>

                {prog.allModules && moduleViewMode === 'table' ? (
                  <div className="space-y-4">
                    <div className="overflow-x-auto rounded-2xl border border-[#1a3b61]/30 shadow-2xs">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#002147] border-b border-[#1a3b61] text-white font-bold uppercase text-[11px] tracking-wider">
                            <th className="py-3.5 px-4 w-12 text-center text-white/80">No.</th>
                            <th className="py-3.5 px-4 text-[#fdc800]">Module Code</th>
                            <th className="py-3.5 px-4">Module Title</th>
                            <th className="py-3.5 px-4 text-center">Credits</th>
                            {prog.id === 'hnd-cyber-security-digital-forensics' ||
                            prog.id === 'hnd-software-engineering' ? (
                              <th className="py-3.5 px-4 text-center">Year / Semester</th>
                            ) : (
                              <>
                                {prog.allModules.some((m) => !!m.academicYear) && (
                                  <th className="py-3.5 px-4 text-center">Academic Year</th>
                                )}
                                {prog.allModules.some((m) => !!m.semester) && (
                                  <th className="py-3.5 px-4 text-center">Semester</th>
                                )}
                              </>
                            )}
                            {prog.allModules.some((m) => !!m.moduleType) && (
                              <th className="py-3.5 px-4 text-center">Type</th>
                            )}
                            <th className="py-3.5 px-4 text-right">Assessment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 bg-white">
                          {prog.allModules.map((mod) => (
                            <tr
                              key={mod.no}
                              className="hover:bg-neutral-50/80 transition-colors"
                            >
                              <td className="py-3.5 px-4 font-mono font-bold text-neutral-400 text-center">
                                {mod.no}
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="bg-[#fdc800]/20 text-[#002147] px-2.5 py-1 rounded text-xs font-bold border border-[#fdc800]/40">
                                    {mod.code}
                                  </span>
                                  {mod.moduleType &&
                                    prog.id !== 'hnd-cyber-security-digital-forensics' &&
                                    prog.id !== 'hnd-software-engineering' && (
                                      <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-[#002147] px-1.5 py-0.5 rounded border border-neutral-200">
                                        {mod.moduleType}
                                      </span>
                                    )}
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-neutral-900">
                                {mod.title}
                              </td>
                              <td className="py-3.5 px-4 text-center font-mono font-bold text-neutral-700 whitespace-nowrap">
                                {mod.creditsDisplay || mod.credits}
                              </td>
                              {prog.id === 'hnd-cyber-security-digital-forensics' ||
                              prog.id === 'hnd-software-engineering' ? (
                                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#002147]/10 text-[#002147] text-[11px] font-bold border border-[#002147]/20">
                                    {mod.academicYear
                                      ? `${mod.academicYear} – ${mod.semester}`
                                      : mod.semester}
                                  </span>
                                </td>
                              ) : (
                                <>
                                  {prog.allModules?.some((m) => !!m.academicYear) && (
                                    <td className="py-3.5 px-4 text-center font-mono text-xs text-neutral-700 whitespace-nowrap">
                                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-medium border border-neutral-200">
                                        {mod.academicYear || '2026/27'}
                                      </span>
                                    </td>
                                  )}
                                  {prog.allModules?.some((m) => !!m.semester) && (
                                    <td className="py-3.5 px-4 text-center">
                                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#002147]/10 text-[#002147] text-[11px] font-bold border border-[#002147]/20">
                                        {mod.semester || 'Core'}
                                      </span>
                                    </td>
                                  )}
                                </>
                              )}
                              {prog.allModules?.some((m) => !!m.moduleType) && (
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-bold border border-neutral-200 uppercase tracking-wider">
                                    {mod.moduleType || 'Core'}
                                  </span>
                                </td>
                              )}
                              <td className="py-3.5 px-4 text-right">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium border border-neutral-200">
                                  {prog.assessmentMethod ||
                                    (prog.assessmentNote
                                      ? 'Coursework & Exams'
                                      : 'Coursework')}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-[#f5f8ff] font-bold text-xs sm:text-sm border-t-2 border-[#1a3b61]/30">
                            <td
                              colSpan={
                                3 +
                                (prog.id === 'hnd-cyber-security-digital-forensics' ||
                                prog.id === 'hnd-software-engineering'
                                  ? 1
                                  : +!!prog.allModules.some((m) => !!m.academicYear) +
                                    +!!prog.allModules.some((m) => !!m.semester)) +
                                +!!prog.allModules.some((m) => !!m.moduleType)
                              }
                              className="py-3.5 px-4 text-[#002147]"
                            >
                              Total Programme Requirements ({prog.allModules.length} Modules)
                            </td>
                            <td className="py-3.5 px-4 text-center font-mono text-[#002147] font-extrabold whitespace-nowrap">
                              {prog.totalCredits ||
                                `${prog.allModules.reduce(
                                  (sum, m) => sum + (m.credits || 0),
                                  0
                                )} Credits`}
                            </td>
                            <td className="py-3.5 px-4 text-right font-medium text-neutral-600">
                              {prog.assessmentMethod ||
                                (prog.assessmentNote
                                  ? 'Modular Weighting'
                                  : '100% Coursework')}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    {prog.assessmentNote && (
                      <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-700 flex items-start gap-2.5">
                        <BookOpen className="w-4 h-4 text-[#002147] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#002147] font-bold">
                            Assessment Note:{' '}
                          </strong>
                          {prog.assessmentNote}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 p-1 bg-white border border-neutral-200 rounded-xl">
                      {(prog.structureBreakdown || []).map((stage, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStageIdx(idx)}
                          className={`flex-1 min-w-[140px] py-2.5 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                            activeStageIdx === idx
                              ? 'bg-[#fdc800] text-[#002147] shadow-2xs'
                              : 'text-neutral-600 hover:text-[#002147] hover:bg-neutral-50'
                          }`}
                        >
                          {stage.yearTitle}
                        </button>
                      ))}
                    </div>
                    {prog.structureBreakdown?.[activeStageIdx] && (
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                          <div>
                            <h3 className="text-lg font-bold text-[#002147]">
                              {prog.structureBreakdown[activeStageIdx].yearTitle}
                            </h3>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              {prog.structureBreakdown[activeStageIdx].description}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-[#002147] bg-[#fdc800]/25 px-3 py-1 rounded-lg">
                            {prog.structureBreakdown[activeStageIdx].credits} Credits
                          </span>
                        </div>
                        <div className="space-y-3">
                          {prog.structureBreakdown[activeStageIdx].modules.map((mod) => (
                            <div
                              key={mod.code}
                              className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#fdc800] transition-colors shadow-2xs"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-[#002147] bg-[#fdc800]/20 px-2.5 py-0.5 rounded">
                                    {mod.code}
                                  </span>
                                  <h4 className="text-sm font-bold text-[#111111]">
                                    {mod.name}
                                  </h4>
                                </div>
                                <span className="text-xs font-semibold text-neutral-500 font-mono">
                                  {mod.credits} Cr
                                </span>
                              </div>
                              <p className="text-xs text-neutral-600 leading-relaxed pl-1">
                                {mod.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {prog.galleryImages && prog.galleryImages.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                      <Award className="w-4 h-4 text-[#002147]" />
                      <span>Laboratories & Practical Training</span>
                    </div>
                    <span className="text-xs font-semibold text-neutral-500">
                      Real Engineering Environments
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#111111]">
                      Practical Learning & Engineering Labs
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                      Students engage with hands-on circuitry, test instruments, microcontrollers, and robotics.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prog.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs group bg-neutral-100 flex flex-col"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={img.url}
                            alt={img.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="eager"
                          />
                          {img.category && (
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#002147]/90 backdrop-blur-md text-[10px] font-bold text-[#fdc800] uppercase tracking-wider">
                              {img.category}
                            </span>
                          )}
                        </div>
                        <div className="p-3.5 bg-white flex-1 flex items-center">
                          <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                  <Cpu className="w-4 h-4 text-[#002147]" />
                  <span>Facilities</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">
                  Dedicated Laboratories & Studios
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {prog.laboratories.map((lab, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#fdc800] shrink-0" />
                      <span>{lab}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                  <Briefcase className="w-4 h-4 text-[#002147]" />
                  <span>Academic & Career Progression</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">
                  Progression Opportunities
                </h2>
                <div className="p-5 bg-gradient-to-r from-[#001a39] via-[#002147] to-[#001a39] text-white border border-[#1a3b61]/60 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-[#fdc800] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {prog.id === 'foundation-in-engineering' ||
                      prog.id === 'diploma-in-computing'
                        ? 'Higher National Diploma (HND) Progression'
                        : prog.id === 'hnd-artificial-intelligence' ||
                          prog.id === 'hnd-cyber-security-digital-forensics' ||
                          prog.id === 'hnd-software-engineering'
                        ? 'Top - Up Degree Progression'
                        : prog.progressionOpportunities?.some((o) =>
                            o.toLowerCase().includes('master')
                          )
                        ? 'Postgraduate Progression'
                        : 'Degree Pathways'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {prog.id === 'foundation-in-engineering' ||
                    prog.id === 'diploma-in-computing'
                      ? 'Eligibility for Higher National Diploma (HND) Programmes'
                      : prog.id === 'hnd-artificial-intelligence' ||
                        prog.id === 'hnd-cyber-security-digital-forensics' ||
                        prog.id === 'hnd-software-engineering'
                      ? 'Top - Up Degree Programmes'
                      : prog.progressionOpportunities?.some((o) =>
                          o.toLowerCase().includes('master')
                        )
                      ? 'Masters & Advanced Professional Career Pathways'
                      : 'Top-Up Degrees & Career Pathways'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {prog.id === 'hnd-software-engineering' ? (
                      <>
                        Graduates of the Higher National Diploma in Software Engineering (SE) can progress directly into Top - Up Degree Programmes to complete a full Bachelor of Science (BSc) or Bachelor of Engineering (BEng) degree.
                      </>
                    ) : prog.id === 'hnd-cyber-security-digital-forensics' ? (
                      <>
                        Graduates of the Higher National Diploma in Cyber Security and Digital Forensics can progress directly into Top - Up Degree Programmes to complete a full Bachelor of Science (BSc) or Bachelor of Engineering (BEng) degree.
                      </>
                    ) : prog.id === 'hnd-artificial-intelligence' ? (
                      <>
                        Graduates of the Higher National Diploma in Artificial Intelligence (AI) can progress directly into Top-Up Degree Programmes to complete a full Bachelor of Science (BSc Hons) or Bachelor of Engineering (BEng Hons) degree.
                      </>
                    ) : prog.id === 'diploma-in-computing' ? (
                      <>
                        Students will be eligible for progression into Higher National Diploma (HND) programmes upon successful completion of the Diploma in Computing.
                      </>
                    ) : prog.id === 'foundation-in-engineering' ? (
                      <>
                        Students will be eligible for progression into Higher National Diploma (HND) programmes upon successful completion of the Foundation in Engineering.
                      </>
                    ) : prog.id === 'beng-mechanical-manufacturing' ? (
                      <>
                        Graduates of the BEng (Hons) Mechanical Engineering specialise in Manufacturing programme, affiliated with the University of West England, earn a full honours degree that enables direct progression to Master’s programmes (MSc, MEng, MPhil, or PhD).
                      </>
                    ) : prog.id === 'beng-mechanical-mechatronics' ? (
                      <>
                        Graduates of the BEng(Hons) Mechanical Engineering specialise in Mechatronics programme, affiliated with the University of West England, earn a full honours degree that enables direct progression to Master’s programmes (MSc, MEng, MPhil, or PhD).
                      </>
                    ) : prog.id === 'beng-electrical-electronics' ? (
                      <>
                        Graduates of the BEng (Hons) Electrical and Electronics Engineering programme, affiliated with the University of West England, earn a full honours degree that enables direct progression to Master’s programmes (MSc, MEng, MPhil, or PhD) as well as leading engineering careers in international electronics, energy, and robotics sectors.
                      </>
                    ) : (
                      <>
                        Graduates of {prog.title} can progress to top-up degree programmes to complete a full Bachelor of Engineering (BEng) or Bachelor of Science (BSc) degree, or pursue dynamic careers across leading industry sectors.
                      </>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                      Career Pathways:
                    </h3>
                    <div className="space-y-2">
                      {prog.careerPathways.map((cp, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-xl border border-neutral-200 text-xs sm:text-sm font-semibold text-[#111111] shadow-2xs"
                        >
                          {cp}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                      Target Industry Sectors:
                    </h3>
                    <div className="space-y-2">
                      {prog.industrySectors.map((sec, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-700 shadow-2xs"
                        >
                          {sec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#001a39] to-[#002147] text-white p-8 rounded-3xl border border-[#1a3b61]/60 shadow-xl space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fdc800]">
                    <Calendar className="w-4 h-4 text-[#fdc800]" />
                    <span>Intake Schedule</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#fdc800] text-[#002147] text-[11px] font-bold uppercase tracking-wider">
                    {prog.duration} Duration
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Upcoming Intakes
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Enrolment is now open for prospective students for the upcoming academic cohorts.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {prog.intakes.map((intake, idx) => {
                    const isNext =
                      intake.toLowerCase().includes('next starting') ||
                      (prog.nextIntakeHighlight &&
                        intake.includes(prog.nextIntakeHighlight));
                    const cleanLabel = intake
                      .split(' – ')[0]
                      .replace(' – Next Starting Date', '')
                      .trim();
                    return (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all relative overflow-hidden ${
                          isNext
                            ? 'bg-[#001428] border-2 border-[#fdc800] shadow-lg shadow-[#fdc800]/10 ring-1 ring-[#fdc800]/30'
                            : 'bg-[#001428]/80 border border-[#1a3b61]/50'
                        }`}
                      >
                        {isNext && (
                          <div className="absolute top-0 right-0 bg-[#fdc800] text-[#002147] text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-bl-lg tracking-wider">
                            Next Starting Date
                          </div>
                        )}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                            Intake {idx + 1}
                          </span>
                          <div className="text-lg font-extrabold text-[#fdc800] leading-snug">
                            {cleanLabel}
                          </div>
                          {isNext ? (
                            <span className="text-[11px] font-bold text-[#fdc800] flex items-center gap-1">
                              ● Priority Enrolment Open
                            </span>
                          ) : (
                            <span className="text-[11px] text-neutral-400 block">
                              Registration Open
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onApplyClick(prog.title)}
                          className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                            isNext
                              ? 'bg-[#fdc800] hover:bg-[#ffe066] text-[#002147] shadow-xs'
                              : 'bg-[#1a3b61]/60 hover:bg-[#1a3b61] text-white'
                          }`}
                        >
                          Apply for Intake {idx + 1}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#fdc800]/15 via-white to-[#f5f8ff] p-8 rounded-3xl border-2 border-[#fdc800] shadow-md space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                  <Sparkles className="w-4 h-4 text-[#002147]" />
                  <span>Begin Your Engineering Journey</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  Apply for {prog.title}
                </h2>
                <p className="text-sm text-neutral-700 leading-relaxed max-w-2xl">
                  Take the first step towards world-class engineering qualifications. Submit your application online or speak directly with our admissions counsellors.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onApplyClick(prog.title)}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-extrabold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 text-[#002147]" />
                  </button>
                  <button
                    onClick={() => onApplyClick(`Inquiry regarding ${prog.title}`)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#002147] rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Enquire Now</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="p-6 bg-white rounded-3xl border-2 border-neutral-200 space-y-5 shadow-lg">
                <div className="border-b border-neutral-200 pb-3">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#002147] bg-[#002147]/10 px-2.5 py-0.5 rounded">
                    Admissions
                  </span>
                  <h3 className="text-xl font-bold text-[#111111] mt-2">
                    Ready to Apply?
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Applications open for upcoming intakes.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-700">
                  {prog.affiliatedInstitution && (
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Affiliation:</span>
                      <span className="font-bold text-[#002147] text-right">
                        {prog.affiliatedInstitution}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Qualification:</span>
                    <span className="font-semibold text-[#111111] text-right">
                      {prog.qualification}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Duration:</span>
                    <span className="font-semibold text-[#111111]">{prog.duration}</span>
                  </div>
                  {prog.studyMode && (
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Delivery Mode:</span>
                      <span className="font-semibold text-[#111111] text-right">
                        {prog.studyMode}
                      </span>
                    </div>
                  )}
                  {prog.studySchedule && (
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Study Method:</span>
                      <span className="font-semibold text-[#111111]">
                        {prog.studySchedule}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Credits:</span>
                    <span className="font-semibold text-[#111111]">
                      {prog.totalCredits || '360 UK'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Assessment:</span>
                    <span className="font-semibold text-[#111111] text-right line-clamp-2">
                      {prog.assessmentMethod || 'Coursework'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Intakes:</span>
                    <span className="font-semibold text-[#111111] text-right">
                      {prog.intakes.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => onApplyClick(prog.title)}
                    className="w-full py-3.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => onApplyClick(`Inquiry regarding ${prog.title}`)}
                    className="w-full py-3 px-4 text-center text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#002147] rounded-xl transition-colors cursor-pointer"
                  >
                    Enquire Now
                  </button>
                  <button
                    onClick={onProspectusClick}
                    className="w-full py-2.5 px-4 text-center text-xs font-medium text-neutral-600 hover:text-[#002147] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#002147]" />
                    <span>Download Syllabus Outline</span>
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4 text-xs">
                <h4 className="font-bold text-[#111111] text-sm uppercase tracking-wider pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <span>Admissions Office</span>
                  <span className="w-2 h-2 rounded-full bg-[#fdc800]" />
                </h4>
                <div className="space-y-2.5 text-neutral-700">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[#002147] mt-0.5 shrink-0" />
                    <span>{INSTITUTION_INFO.telephonePlaceholder}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-[#002147] mt-0.5 shrink-0" />
                    <span>{INSTITUTION_INFO.emailPlaceholder}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-[#002147] hover:underline block"
                  >
                    Contact Admissions Office →
                  </Link>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-3 text-xs">
                <h4 className="font-bold text-[#111111] text-xs uppercase tracking-wider pb-2 border-b border-neutral-100">
                  Other Programmes
                </h4>
                <div className="space-y-2">
                  {otherProgrammes.map((other) => (
                    <Link
                      key={other.id}
                      to={`/programmes/${other.id}`}
                      className="block p-2.5 rounded-xl hover:bg-[#002147]/5 border border-transparent hover:border-neutral-200 transition-colors group"
                    >
                      <span className="text-[10px] text-neutral-500 font-semibold uppercase block">
                        {other.school}
                      </span>
                      <span className="font-bold text-neutral-800 group-hover:text-[#002147] group-hover:underline">
                        {other.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 text-[#002147]" />
            <span>All Programmes</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onApplyClick(prog.title)}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-sm"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
