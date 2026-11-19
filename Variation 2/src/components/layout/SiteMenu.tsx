import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight, Compass, Phone, Mail, MapPin } from 'lucide-react';
import { LOGO, photo } from '../../lib/assets';
import { siteConfig } from '../../config/siteConfig';
import { SmartImage } from '../ui/SmartImage';

interface SiteMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

const MENU_DESTINATIONS = [
  { label: 'Programmes', path: '/programmes', tag: 'Directory & Syllabi' },
  { label: 'Admissions & Support', path: '/admissions', tag: 'Entry Routes & FAQs' },
  { label: 'About BIET', path: '/about', tag: 'Institution' },
  { label: 'Student Life', path: '/student-life', tag: 'Learning Environment' },
  { label: 'News & Events', path: '/news', tag: 'Announcements' },
  { label: 'Contact', path: '/contact', tag: 'Colombo & Kandy' },
];

export const SiteMenu: React.FC<SiteMenuProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
  returnFocusRef,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Auto-close on route navigation
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Body scroll lock, focus trap, Escape, focus restore
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Menu"
      className="fixed inset-0 z-[50] bg-[#111111] text-white overflow-y-auto"
    >
      {/* Top Bar inside Overlay */}
      <div className="border-b border-[#262626] h-[68px] md:h-[80px] flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between">
          <Link
            to="/"
            onClick={onClose}
            className="bg-white px-2.5 py-1.5 rounded-[4px] inline-flex items-center"
            aria-label="BIET Campus Home"
          >
            <img
              src={LOGO}
              alt="BIET Campus logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex items-center gap-2 min-w-[44px] min-h-[44px] px-4 rounded-[4px] bg-[#1A1A1A] hover:bg-[#FFCC00] text-white hover:text-[#111111] border border-[#262626] font-bold text-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Navigation Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Prominent Find My Path Banner near top */}
            <Link
              to="/find-my-path"
              onClick={onClose}
              className="flex items-center justify-between gap-4 p-5 bg-[#FFCC00] hover:bg-[#E6B800] text-[#111111] rounded-[4px] transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <Compass className="w-6 h-6 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-lg sm:text-xl font-extrabold leading-tight">
                    Find My Path
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#111111]/85">
                    Explore study options matching your background
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="w-6 h-6 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </Link>

            <nav aria-label="Full Site Navigation" className="divide-y divide-[#262626]">
              {MENU_DESTINATIONS.map((item) => {
                const active = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 group"
                  >
                    <div>
                      <span
                        className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                          active
                            ? 'text-[#FFCC00]'
                            : 'text-white group-hover:text-[#FFCC00]'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="block text-xs text-white/60 mt-0.5">{item.tag}</span>
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 text-white/50 group-hover:text-[#FFCC00] transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="biet-btn-primary w-full sm:w-auto px-8"
              >
                Request a Consultation
              </button>
            </div>
          </div>

          {/* Right Quiet Desktop Visual & Verified Contacts */}
          <div className="hidden lg:block lg:col-span-5 space-y-6">
            <div className="bg-[#1A1A1A] border border-[#262626] rounded-[4px] overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <SmartImage
                  src={photo('photo-1522202176988-66273c2fd55f')}
                  alt="Illustrative collaborative higher-education learning session"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFCC00]">
                  BIET Campus Sri Lanka
                </span>
                <p className="text-sm text-white/80 leading-relaxed">
                  Explore foundation, diploma and higher education programmes across business,
                  computing, engineering, English and psychology.
                </p>
              </div>
            </div>

            <div className="p-5 bg-[#1A1A1A] border border-[#262626] rounded-[4px] space-y-3 text-xs text-white/80">
              <div className="font-bold uppercase tracking-wider text-white">
                Campus Locations (Pending Confirmation)
              </div>
              {siteConfig.campuses.map((c) => (
                <div key={c.id} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-white">{c.name}:</strong> {c.address}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#262626] flex flex-wrap gap-4">
                <a
                  href={`tel:${siteConfig.telephone.replace(/[^+0-9]/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#FFCC00]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FFCC00]" aria-hidden="true" />
                  <span>{siteConfig.telephone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#FFCC00]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FFCC00]" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
