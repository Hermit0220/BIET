import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, ArrowUpRight, X, Menu } from 'lucide-react';
import { LOGO } from '../../lib/assets';

interface HeaderProps {
  onApplyClick: () => void;
  onProspectusClick?: () => void;
}

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Programmes', path: '/programmes' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'About BIET', path: '/about' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'News & Events', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

export const Header: React.FC<HeaderProps> = ({ onApplyClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isLinkActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={`sticky z-40 w-full px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300 ease-out ${
        scrolled ? 'top-1.5 sm:top-2.5' : 'top-3 sm:top-5'
      }`}
    >
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div
          className={`liquid-glass-panel animate-nav-float rounded-full transition-all duration-300 ease-out relative flex items-center justify-between gap-3 sm:gap-6 overflow-hidden ${
            scrolled
              ? 'liquid-glass-scrolled px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-2xl shadow-black/60'
              : 'px-4 sm:px-6 py-2.5 sm:py-3.5 shadow-xl shadow-black/40'
          }`}
        >
          <div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -inset-y-4 w-44 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent animate-glass-sweep pointer-events-none" />
          </div>
          <div
            className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none rounded-full"
            aria-hidden="true"
          />

          <div className="flex items-center shrink-0 relative z-10">
            <Link
              to="/"
              className={`flex items-center justify-center shrink-0 bg-white rounded-full shadow-xs focus-visible:outline-2 focus-visible:outline-[#fdc800] focus-visible:outline-offset-4 transition-all duration-300 hover:scale-[1.01] ${
                scrolled
                  ? 'pl-3.5 pr-2.5 sm:pl-4 sm:pr-3 py-1 sm:py-1.5'
                  : 'pl-4 pr-3 sm:pl-5 sm:pr-3.5 py-1.5 sm:py-2'
              }`}
              aria-label="British Institute of Engineering and Technology (BIET) - Homepage"
            >
              <img
                src={LOGO}
                alt="British Institute of Engineering and Technology (BIET) Official Logo"
                className={`w-auto object-contain transition-all duration-300 block shrink-0 ${
                  scrolled
                    ? 'h-7 sm:h-8.5 max-w-[145px] sm:max-w-[190px]'
                    : 'h-8 sm:h-10 md:h-11 max-w-[165px] sm:max-w-[225px]'
                }`}
                style={{ objectFit: 'contain' }}
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          <nav
            className="hidden xl:flex items-center gap-1.5 text-[13px] font-medium text-white/90 relative z-10"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`nav-link-item relative px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'active-link text-[#fdc800] font-bold bg-white/10 shadow-xs'
                      : 'text-white/90 hover:text-[#fdc800] hover:bg-white/[0.08]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <nav
            className="hidden lg:flex xl:hidden items-center gap-1 text-xs font-medium text-white/90 relative z-10"
            aria-label="Tablet navigation"
          >
            {NAV_LINKS.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`nav-link-item relative px-2.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'active-link text-[#fdc800] font-bold bg-white/10 shadow-xs'
                      : 'text-white/90 hover:text-[#fdc800] hover:bg-white/[0.08]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative z-10">
            <Link
              to="/find-my-path"
              className={`inline-flex items-center gap-1.5 font-bold text-[#fdc800] bg-[#fdc800]/15 hover:bg-[#fdc800]/25 border border-[#fdc800]/40 hover:border-[#fdc800] rounded-full backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer ${
                scrolled ? 'px-3 py-1.5 text-[11px]' : 'px-3.5 sm:px-4.5 py-2 text-xs'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#fdc800] animate-pulse shrink-0" />
              <span>Find My Path</span>
            </Link>
            <button
              onClick={onApplyClick}
              className={`liquid-yellow-btn relative inline-flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#002147] rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer group overflow-hidden ${
                scrolled
                  ? 'px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs'
                  : 'px-4 sm:px-5 py-2 sm:py-2.5'
              }`}
            >
              <span
                className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-20 -translate-x-[200%] group-hover:translate-x-[260%] transition-transform duration-700 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">Apply Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#fdc800] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 liquid-glass-drawer rounded-3xl p-5 shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-3 duration-200">
            <Link
              to="/find-my-path"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#fdc800]/25 to-[#fdc800]/15 border border-[#fdc800]/50 text-[#fdc800] font-extrabold text-sm mb-3 shadow-lg shadow-[#fdc800]/10"
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#fdc800] animate-pulse" />
                <span>Find My Path Tool</span>
              </div>
              <span className="text-[10px] bg-[#fdc800] text-[#002147] px-2 py-0.5 rounded-full font-black uppercase">
                Interactive
              </span>
            </Link>
            <div className="space-y-1">
              {NAV_LINKS.map((item) => {
                const active = isLinkActive(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-2xl text-sm transition-all duration-150 ${
                      active
                        ? 'bg-white/15 text-[#fdc800] font-bold border-l-4 border-[#fdc800] shadow-xs'
                        : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="pt-4 mt-3 border-t border-white/15 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onApplyClick();
                }}
                className="liquid-yellow-btn w-full py-3 px-4 inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#002147] rounded-2xl transition-all shadow-md cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-4 h-4 text-[#002147]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
