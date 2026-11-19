import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConsultationForm } from './ConsultationForm';

interface ConsultationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  programmeId?: string;
  initialQuestion?: string;
}

export const ConsultationDialog: React.FC<ConsultationDialogProps> = ({
  isOpen,
  onClose,
  programmeId,
  initialQuestion,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtnRef.current?.focus(), 40);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
      previousActiveElementRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fullPageUrl = `/contact?enquiry=consultation${
    programmeId ? `&programme=${encodeURIComponent(programmeId)}` : ''
  }`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Request a consultation"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-[4px] border-2 border-[#111111] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-[#262626]">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFCC00] block">
              BIET Admissions Guidance
            </span>
            <span className="text-sm font-bold text-white">Consultation Request</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={fullPageUrl}
              onClick={onClose}
              className="hidden sm:inline-block text-xs font-semibold text-white/80 hover:text-[#FFCC00] underline"
            >
              Open Full Page View
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close consultation dialog"
              className="w-11 h-11 rounded-[4px] bg-[#1A1A1A] hover:bg-[#FFCC00] text-white hover:text-[#111111] border border-[#262626] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto">
          <ConsultationForm
            initialProgrammeId={programmeId}
            initialQuestion={initialQuestion}
          />
        </div>
      </div>
    </div>
  );
};
