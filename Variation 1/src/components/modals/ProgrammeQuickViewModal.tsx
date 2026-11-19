import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Clock,
  BookOpen,
  Calendar,
  Award,
  CheckCircle,
  FlaskConical,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';
import type { Programme } from '../../data/programmes';

interface ProgrammeQuickViewModalProps {
  programme: Programme | null;
  onClose: () => void;
  onApply: (title: string) => void;
}

export const ProgrammeQuickViewModal: React.FC<ProgrammeQuickViewModalProps> = ({
  programme,
  onClose,
  onApply,
}) => {
  useEffect(() => {
    if (!programme) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [programme, onClose]);

  if (!programme) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="programme-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-neutral-200 my-8">
        <div className="bg-gradient-to-r from-[#001a39] to-[#002147] text-white p-6 sm:p-8 relative border-b border-[#1a3b61]/60">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#fdc800] text-[#002147] text-[10px] font-bold uppercase tracking-wider">
                  {programme.school}
                </span>
                <span className="px-3 py-1 rounded-md bg-[#001428]/80 text-[#fdc800] text-[10px] font-semibold border border-[#1a3b61]/60">
                  {programme.qualification}
                </span>
              </div>
              <h2
                id="programme-modal-title"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
              >
                {programme.title}
              </h2>
              {programme.sampleBadgeNote && (
                <p className="text-[11px] text-neutral-400 font-mono">{programme.sampleBadgeNote}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-[#001428]/80 hover:bg-[#1a3b61]/80 border border-[#1a3b61]/40 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              aria-label="Close specification modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#1a3b61]/40">
            <div className="bg-[#001428]/80 p-3 rounded-xl border border-[#1a3b61]/50">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-[#fdc800]" />
                <span>Duration</span>
              </div>
              <div className="text-xs font-bold text-white mt-1">{programme.duration}</div>
            </div>
            <div className="bg-[#001428]/80 p-3 rounded-xl border border-[#1a3b61]/50">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                <BookOpen className="w-3.5 h-3.5 text-[#fdc800]" />
                <span>Study Mode</span>
              </div>
              <div className="text-xs font-bold text-white mt-1">{programme.studyMode}</div>
            </div>
            <div className="bg-[#001428]/80 p-3 rounded-xl border border-[#1a3b61]/50">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                <Calendar className="w-3.5 h-3.5 text-[#fdc800]" />
                <span>Intakes</span>
              </div>
              <div className="text-xs font-bold text-white mt-1">
                {programme.intakes.join(' / ')}
              </div>
            </div>
            <div className="bg-[#001428]/80 p-3 rounded-xl border border-[#1a3b61]/50">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                <Award className="w-3.5 h-3.5 text-[#fdc800]" />
                <span>Awarding Body</span>
              </div>
              <div className="text-[11px] font-medium text-neutral-300 mt-1 truncate">
                {programme.awardingBodyPlaceholder}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-neutral-200">
              <SmartImage
                src={programme.imageUrl}
                alt={programme.title}
                imageSvgType={programme.imageSvgType}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#002147]">
                Programme Overview
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{programme.overview}</p>
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002147]">
              Key Learning Outcomes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {programme.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                  <CheckCircle className="w-4 h-4 text-[#002147] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002147]">
              Curriculum Structure Across Academic Years
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#002147] text-[#fdc800] text-[10px] font-bold uppercase tracking-wider">
                  Year 1 — Foundation & Core
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {programme.coreModulesYear1.map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#fdc800] mt-1.5 shrink-0" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#002147] text-[#fdc800] text-[10px] font-bold uppercase tracking-wider">
                  Year 2 — Advanced Systems
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {programme.coreModulesYear2.map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#fdc800] mt-1.5 shrink-0" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#002147] text-[#fdc800] text-[10px] font-bold uppercase tracking-wider">
                  Year 3 — Honours & Capstone
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {programme.coreModulesYear3.map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#fdc800] mt-1.5 shrink-0" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-neutral-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                <FlaskConical className="w-4 h-4 text-[#002147]" />
                <span>Dedicated Laboratories & Studios</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-600">
                {programme.laboratories.map((lab, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fdc800]" />
                    <span>{lab}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
                <Briefcase className="w-4 h-4 text-[#002147]" />
                <span>Graduate Career Pathways</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {programme.careerPathways.map((career, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 px-6 sm:px-8 py-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-600">
            Have questions about entry qualifications or credit exemptions?
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-[#002147] transition-colors cursor-pointer"
            >
              Close
            </button>
            <Link
              to={`/programmes/${programme.id}`}
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-white hover:bg-neutral-100 border border-neutral-300 hover:border-[#002147] rounded-xl transition-colors"
            >
              Open Full Page
            </Link>
            <button
              onClick={() => {
                onClose();
                onApply(programme.title);
              }}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Apply for This Programme</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

