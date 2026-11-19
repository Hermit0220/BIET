import React, { useState, useEffect } from 'react';
import { GraduationCap, X, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { PROGRAMMES } from '../../data/programmes';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramme?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  defaultProgramme = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    programme: defaultProgramme || PROGRAMMES[0].title,
    intake: 'September 2026',
    qualificationLevel: '',
    statement: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultProgramme) {
      setFormData((prev) => ({ ...prev, programme: defaultProgramme }));
    }
  }, [defaultProgramme]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please complete your full name, email address, and telephone number.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 my-8">
        <div className="bg-gradient-to-r from-[#001a39] to-[#002147] text-white px-6 sm:px-8 py-6 flex items-center justify-between border-b border-[#1a3b61]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fdc800] text-[#002147] flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#fdc800] block">
                Online Admissions Portal
              </span>
              <h2 id="apply-modal-title" className="text-xl font-extrabold text-white">
                Apply to BIET
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-lg bg-[#001428]/80 hover:bg-[#1a3b61]/80 border border-[#1a3b61]/40 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close application modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#fdc800]/20 text-[#002147] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#002147]" />
              </div>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                  Reference: BIET-2026-{Math.floor(1000 + Math.random() * 9000)}
                </span>
                <h3 className="text-2xl font-extrabold text-[#111111]">Application Received</h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#111111]">{formData.fullName}</span>.
                  Your preliminary application for{' '}
                  <span className="font-bold text-[#111111]">{formData.programme}</span> (
                  {formData.intake}) has been logged with our Colombo Admissions Office.
                </p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs text-neutral-600 max-w-md mx-auto text-left space-y-1.5">
                <div className="font-bold text-[#111111]">What happens next?</div>
                <p>1. An admissions counselor will review your entry profile within 24–48 hours.</p>
                <p>
                  2. You will receive an email at{' '}
                  <span className="font-semibold text-[#111111]">{formData.email}</span> requesting
                  scanned academic transcripts.
                </p>
              </div>
              <div className="pt-3">
                <button
                  onClick={handleClose}
                  className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-colors cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Complete this form to register your application for an upcoming academic intake at
                the British Institute of Engineering and Technology.
              </p>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-800 font-medium">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Select Programme *
                  </label>
                  <select
                    value={formData.programme}
                    onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] font-medium focus:outline-none focus:border-[#002147]"
                  >
                    {PROGRAMMES.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Preferred Intake *
                  </label>
                  <select
                    value={formData.intake}
                    onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] font-medium focus:outline-none focus:border-[#002147]"
                  >
                    <option value="September 2026">September / October 2026</option>
                    <option value="February 2027">January / February 2027</option>
                    <option value="June 2027">May / June 2027</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="app-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
                  >
                    Candidate Full Name *
                  </label>
                  <input
                    id="app-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="As stated on NIC / Passport"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] focus:outline-none focus:border-[#002147]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="app-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
                  >
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    id="app-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+94 7X XXX XXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] focus:outline-none focus:border-[#002147]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="app-email"
                    className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
                  >
                    Email Address *
                  </label>
                  <input
                    id="app-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] focus:outline-none focus:border-[#002147]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="app-qual"
                    className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
                  >
                    Highest Qualification Held
                  </label>
                  <select
                    id="app-qual"
                    value={formData.qualificationLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, qualificationLevel: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] focus:outline-none focus:border-[#002147]"
                  >
                    <option value="">Select Highest Qualification</option>
                    <option value="GCE A/L (Sri Lanka)">Sri Lankan G.C.E. Advanced Level</option>
                    <option value="Cambridge / Edexcel A-Level">
                      Cambridge / Edexcel International A/L
                    </option>
                    <option value="GCE O/L (Foundation Entry)">
                      G.C.E. O/L (Seeking Foundation Entry)
                    </option>
                    <option value="HND / National Diploma (Top-Up)">
                      Recognized HND / Engineering Diploma
                    </option>
                    <option value="Professional / Mature Entry">
                      Industry Experience / Mature Candidate
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="app-notes"
                  className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  Academic Summary / Questions (Optional)
                </label>
                <textarea
                  id="app-notes"
                  rows={2}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Share your A/L stream, results, or specific study mode preference (Full-Time / Part-Time)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-[#111111] focus:outline-none focus:border-[#002147]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-[#002147] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

