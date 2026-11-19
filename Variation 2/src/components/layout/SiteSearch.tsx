import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Compass, RotateCcw } from 'lucide-react';
import { searchCatalogue } from '../../data/catalogue';

interface SiteSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: (programmeId?: string) => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

const KEY_PAGES = [
  { title: 'Find My Path — Interactive Study Explorer', path: '/find-my-path', keywords: 'path finder eligibility ol al' },
  { title: 'Admissions & Entry Guidance', path: '/admissions', keywords: 'admissions apply entry fees intake' },
  { title: 'All Programmes Directory', path: '/programmes', keywords: 'courses programmes syllabus directory' },
  { title: 'About BIET Campus', path: '/about', keywords: 'about biet institution vision mission' },
  { title: 'Student Life & Learning Support', path: '/student-life', keywords: 'student life facilities campus' },
  { title: 'Contact & Consultation Request', path: '/contact', keywords: 'contact colombo kandy phone email' },
];

export const SiteSearch: React.FC<SiteSearchProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
  returnFocusRef,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [isOpen, onClose, returnFocusRef]);

  const matchedProgrammes = useMemo(() => searchCatalogue(query).slice(0, 8), [query]);

  const matchedPages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return KEY_PAGES;
    return KEY_PAGES.filter(
      (p) => p.title.toLowerCase().includes(q) || p.keywords.includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search BIET Programmes and Information"
      className="fixed inset-0 z-[60] bg-black/80 flex items-start justify-center pt-10 sm:pt-16 px-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-[4px] border-2 border-[#111111] shadow-2xl overflow-hidden text-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Charcoal Search Bar */}
        <div className="bg-[#111111] text-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <label
              htmlFor="site-search-input"
              className="text-xs font-mono uppercase tracking-widest text-[#FFCC00] font-bold"
            >
              Search BIET Campus
            </label>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="inline-flex items-center gap-1.5 min-w-[44px] min-h-[44px] px-3 rounded-[4px] bg-[#1A1A1A] hover:bg-[#FFCC00] text-white hover:text-[#111111] border border-[#262626] text-xs font-bold cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-[4px] px-3.5 border-2 border-[#FFCC00]">
            <Search className="w-5 h-5 text-[#111111] shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              id="site-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programmes or subjects (e.g. Business, Computing, Engineering, English, Psychology)"
              className="w-full min-h-[52px] text-base text-[#111111] placeholder-[#666666] bg-transparent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[4px] bg-[#F4F4F5] hover:bg-[#111111] hover:text-white text-xs font-bold text-[#111111] cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Surface */}
        <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#666666] font-bold">
                Programmes ({matchedProgrammes.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/programmes${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
                }}
                className="text-xs font-bold text-[#111111] underline cursor-pointer"
              >
                View all programmes →
              </button>
            </div>

            {matchedProgrammes.length === 0 ? (
              <div className="p-6 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] text-center space-y-3">
                <p className="text-sm font-bold text-[#111111]">
                  No programmes matched &ldquo;{query}&rdquo;.
                </p>
                <p className="text-xs text-[#666666]">
                  Explore programmes guided by your qualifications or speak directly with BIET admissions.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/find-my-path');
                    }}
                    className="biet-btn-primary text-xs min-h-[44px]"
                  >
                    <Compass className="w-4 h-4" aria-hidden="true" />
                    <span>Open Find My Path</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenConsultation();
                    }}
                    className="biet-btn-secondary-light text-xs min-h-[44px]"
                  >
                    Request a Consultation
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedProgrammes.map((prog) => (
                  <button
                    key={prog.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/programmes/${prog.slug}`);
                    }}
                    className="text-left p-4 bg-[#F4F4F5] hover:bg-[#FFF0B3] border border-[#E2E2E6] hover:border-[#111111] rounded-[4px] transition-colors cursor-pointer flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                          {prog.category}
                        </span>
                        {prog.marketingPriority && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#111111] text-[#FFCC00] rounded-[4px]">
                            Priority
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-extrabold text-[#111111] leading-snug">
                        {prog.title}
                      </div>
                      <p className="text-xs text-[#666666] mt-1 line-clamp-2">
                        {prog.shortDescription}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#111111] inline-flex items-center gap-1">
                      View Programme <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {matchedPages.length > 0 && (
            <div className="pt-4 border-t border-[#E2E2E6]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#666666] font-bold mb-2.5">
                Quick Destinations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedPages.map((pg) => (
                  <button
                    key={pg.path}
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(pg.path);
                    }}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-[4px] border border-[#E2E2E6] hover:border-[#111111] hover:bg-[#F4F4F5] text-left text-xs font-bold text-[#111111] cursor-pointer"
                  >
                    <span>{pg.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
