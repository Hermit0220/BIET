import React, { useState, useEffect } from 'react';
import { BookOpen, X, CheckCircle, FileText, Download } from 'lucide-react';
import { PROGRAMMES } from '../../data/programmes';
import { INSTITUTION_INFO } from '../../data/site';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('All Engineering & IT Programmes');
  const [downloading, setDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerProspectusDownload = () => {
    const content = [
      '========================================================================',
      '       BRITISH INSTITUTE OF ENGINEERING AND TECHNOLOGY (BIET)           ',
      '              ACADEMIC PROSPECTUS & PROGRAMME OVERVIEW                  ',
      '                     2026 / 2027 ACADEMIC CYCLE                         ',
      '========================================================================',
      '',
      `Prepared For: ${name || 'Prospective Candidate'}`,
      `Primary Interest: ${interest}`,
      `Date Generated: ${new Date().toLocaleDateString()}`,
      '',
      '------------------------------------------------------------------------',
      '1. INSTITUTIONAL SUMMARY',
      '------------------------------------------------------------------------',
      'The British Institute of Engineering and Technology (BIET) provides ',
      'rigorous engineering, computing, and built-environment education ',
      'modeled on British higher education benchmarks in Colombo, Sri Lanka.',
      '',
      '------------------------------------------------------------------------',
      '2. ACADEMIC PROGRAMMES OFFERED',
      '------------------------------------------------------------------------',
      ...PROGRAMMES.map(
        (p, idx) =>
          `\n2.${idx + 1} ${p.title.toUpperCase()}\n` +
          `   School: ${p.school}\n` +
          `   Qualification: ${p.qualification}\n` +
          `   Duration: ${p.duration} (${p.studyMode})\n` +
          `   Intakes: ${p.intakes.join(', ')}\n` +
          `   Overview: ${p.overview}\n` +
          `   Key Modules (Year 1): ${p.coreModulesYear1.join(' | ')}\n` +
          `   Career Outcomes: ${p.careerPathways.join(', ')}`
      ),
      '',
      '------------------------------------------------------------------------',
      '3. ADMISSIONS & CONTACT DETAILS',
      '------------------------------------------------------------------------',
      `Campus Location: ${INSTITUTION_INFO.campusAddressPlaceholder}`,
      `Telephone: ${INSTITUTION_INFO.telephonePlaceholder}`,
      `Email: ${INSTITUTION_INFO.emailPlaceholder}`,
      `Office Hours: ${INSTITUTION_INFO.hours}`,
      '========================================================================',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BIET-Prospectus-2026-2027.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloading(true);
    setTimeout(() => {
      triggerProspectusDownload();
      setDownloading(false);
      setCompleted(true);
    }, 900);
  };

  const handleClose = () => {
    setCompleted(false);
    setDownloading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prospectus-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200">
        <div className="bg-gradient-to-r from-[#001a39] to-[#002147] text-white px-6 py-5 flex items-center justify-between border-b border-[#1a3b61]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fdc800] text-[#002147] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#fdc800] block">
                Academic Publications
              </span>
              <h2 id="prospectus-modal-title" className="text-lg font-extrabold text-white">
                Download Digital Prospectus
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-lg bg-[#001428]/80 hover:bg-[#1a3b61]/80 border border-[#1a3b61]/40 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close prospectus modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          {completed ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#fdc800]/20 text-[#002147] flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-[#002147]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#111111]">Prospectus Dispatched</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Your 2026/2027 BIET Academic Summary has been downloaded to your device. If the
                download did not start automatically, click the button below.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={triggerProspectusDownload}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#002147]/5 hover:bg-[#002147]/10 rounded-xl transition-colors cursor-pointer border border-[#002147]/15"
                >
                  Download Again
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-3.5">
                <FileText className="w-8 h-8 text-[#002147] shrink-0" />
                <div className="text-xs text-neutral-600">
                  <div className="font-bold text-[#002147]">
                    BIET 2026/2027 Course Guide & Fee Framework
                  </div>
                  <div>
                    Includes full curriculum modules, entry requirements, and laboratory overviews.
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="pros-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  Your Name *
                </label>
                <input
                  id="pros-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] focus:outline-none focus:border-[#002147]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="pros-email"
                  className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  Email Address *
                </label>
                <input
                  id="pros-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] focus:outline-none focus:border-[#002147]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="pros-interest"
                  className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  Primary School of Interest
                </label>
                <select
                  id="pros-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] focus:outline-none focus:border-[#002147]"
                >
                  <option value="All Engineering & IT Programmes">
                    All Engineering & IT Programmes
                  </option>
                  <option value="School of Engineering (Civil / Mech / Elec)">
                    School of Engineering (Civil / Mech / Elec)
                  </option>
                  <option value="School of Computing & IT (Software / Cyber)">
                    School of Computing & IT (Software / Cyber)
                  </option>
                  <option value="School of Built Environment (Quantity Surveying)">
                    School of Built Environment (Quantity Surveying)
                  </option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-[#002147] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={downloading}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloading ? 'Preparing File...' : 'Download Now'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

