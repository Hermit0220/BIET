import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowUpRight,
  X,
  Menu,
  Search,
  ChevronDown,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { LOGO } from '../../lib/assets';
import { PROGRAMMES } from '../../data/programmes';

interface HeaderProps {
  onApplyClick: () => void;
  onProspectusClick?: () => void;
  onOpenCommandPalette?: () => void;
}

const SCHOOL_CATEGORIES = [
  {
    id: 'engineering',
    label: 'School of Engineering',
    sub: 'Civil, Mechanical, Electrical & Mechatronics',
  },
  {
    id: 'computing',
    label: 'School of Computing & IT',
    sub: 'Software Engineering, AI, Cloud & Cyber Security',
  },
  {
    id: 'built-environment',
    label: 'School of Built Environment',
    sub: 'Quantity Surveying & Construction Management',
  },
] as const;

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Programmes', path: '/programmes', hasMega: true },
  { label: 'Admissions', path: '/admissions' },
  { label: 'About BIET', path: '/about' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'News & Events', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

export const Header: React.FC<HeaderProps> = ({
  onApplyClick,
  onProspectusClick,
  onOpenCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeMegaCat, setActiveMegaCat] = useState<string>('engineering');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const megaRef = useRef<HTMLDivElement>(null);
  const megaHoverTsRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const isLinkActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const megaProgrammes = PROGRAMMES.filter((p) => p.category === activeMegaCat);
  const activeSchoolObj =
    SCHOOL_CATEGORIES.find((s) => s.id === activeMegaCat) || SCHOOL_CATEGORIES[0];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#fdc800] focus:text-[#002147] focus:font-extrabold focus:rounded-xl"
      >
        Skip to main content
      </a>

      {/* Top Institutional Telemetry & Webometrics Verification Bar */}
      <div
        className={`bg-[#00142b] text-white/80 border-b border-white/10 text-[11px] transition-all duration-300 overflow-hidden ${scrolled ? 'max-h-0 opacity-0 border-none' : 'max-h-10 opacity-100 py-1.5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#fdc800] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              TVEC REG: P01/0542
            </span>
            <span className="text-white/25">|</span>
            <span className="inline-flex items-center gap-1.5 text-white/80 font-medium">
              <Award className="w-3.5 h-3.5 text-[#fdc800]" />
              ISO 9001:2015 Academic Quality Certified
            </span>
            <span className="hidden md:inline text-white/25">|</span>
            <span className="hidden md:inline text-white/70">
              British Engineering, Computing &amp; Built Environment • Colombo Campus
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {onProspectusClick && (
              <button
                type="button"
                onClick={onProspectusClick}
                className="inline-flex items-center gap-1 text-[11px] text-white/80 hover:text-[#fdc800] font-semibold transition-colors cursor-pointer"
              >
                <FileText className="w-3 h-3 text-[#fdc800]" />
                <span>2026 Prospectus</span>
              </button>
            )}
            <span className="text-white/25">•</span>
            <Link
              to="/admissions"
              className="text-[11px] font-bold text-[#fdc800] hover:underline flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#fdc800] animate-ping" />
              <span>September 2026 / Feb 2027 Intake</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Swiss Architectural Header */}
      <header
        ref={megaRef}
        className={`sticky z-40 w-full px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300 ease-out ${scrolled ? 'top-2' : 'top-3 sm:top-4'
          }`}
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div
            className={`liquid-glass-panel rounded-2xl sm:rounded-full transition-all duration-300 ease-out relative flex items-center justify-between gap-2 sm:gap-4 overflow-hidden ${scrolled
              ? 'liquid-glass-scrolled px-3.5 sm:px-5 py-2'
              : 'px-4 sm:px-6 py-2.5 sm:py-3'
              }`}
          >
            <div
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
              aria-hidden="true"
            >
              <div className="absolute -inset-y-4 w-44 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent animate-glass-sweep pointer-events-none" />
            </div>

            <div className="flex items-center shrink-0 relative z-10">
              <Link
                to="/"
                className={`flex items-center justify-center shrink-0 bg-white rounded-full shadow-xs focus-visible:outline-2 focus-visible:outline-[#fdc800] focus-visible:outline-offset-4 transition-all duration-300 hover:scale-[1.01] ${scrolled
                  ? 'pl-3 pr-2.5 sm:pl-4 sm:pr-3 py-1'
                  : 'pl-3.5 pr-3 sm:pl-4.5 sm:pr-3.5 py-1.5'
                  }`}
                aria-label="British Institute of Engineering and Technology (BIET) - Homepage"
              >
                <img
                  src={LOGO}
                  alt="British Institute of Engineering and Technology (BIET) Official Logo"
                  className={`w-auto object-contain transition-all duration-300 block shrink-0 ${scrolled
                    ? 'h-7 sm:h-8 max-w-[140px] sm:max-w-[180px]'
                    : 'h-8 sm:h-9.5 max-w-[160px] sm:max-w-[210px]'
                    }`}
                  loading="eager"
                  decoding="async"
                />
              </Link>
            </div>

            <nav
              className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-white/90 relative z-10"
              aria-label="Primary navigation"
            >
              {NAV_LINKS.map((item) => {
                const active = isLinkActive(item.path);
                if (item.hasMega) {
                  return (
                    <div key={item.label} className="relative flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (megaOpen && Date.now() - megaHoverTsRef.current < 400) {
                            return;
                          }
                          setMegaOpen((prev) => !prev);
                        }}
                        onMouseEnter={() => {
                          if (!megaOpen) {
                            megaHoverTsRef.current = Date.now();
                            setMegaOpen(true);
                          }
                        }}
                        className={`nav-link-item inline-flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer ${active || megaOpen
                          ? 'active-link text-[#fdc800] font-bold bg-white/10'
                          : 'text-white/90 hover:text-[#fdc800] hover:bg-white/[0.08]'
                          }`}
                        aria-expanded={megaOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? 'rotate-180 text-[#fdc800]' : ''
                            }`}
                        />
                      </button>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onMouseEnter={() => setMegaOpen(false)}
                    className={`nav-link-item px-3 py-1.5 rounded-full whitespace-nowrap ${active
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
              aria-label="Primary navigation compact"
            >
              {NAV_LINKS.slice(0, 5).map((item) => {
                const active = isLinkActive(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`nav-link-item px-2.5 py-1.5 rounded-full whitespace-nowrap ${active
                      ? 'active-link text-[#fdc800] font-bold bg-white/10'
                      : 'text-white/90 hover:text-[#fdc800] hover:bg-white/[0.08]'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 relative z-10 shrink-0">
              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-xs font-medium transition-all cursor-pointer"
                  aria-label="Quick programme search (Ctrl+K)"
                  title="Quick Search Programmes (Ctrl+K)"
                >
                  <Search className="w-3.5 h-3.5 text-[#fdc800]" />
                  <span className="hidden md:inline text-white/80">Search</span>
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#00142b]/70 text-[#fdc800] rounded border border-white/15">
                    ⌘K
                  </kbd>
                </button>
              )}

              <Link
                to="/find-my-path"
                className={`inline-flex items-center gap-1.5 font-bold text-[#fdc800] bg-[#fdc800]/15 hover:bg-[#fdc800]/25 border border-[#fdc800]/45 hover:border-[#fdc800] rounded-full backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer ${scrolled ? 'px-3 py-1.5 text-[11px]' : 'px-3.5 py-2 text-xs'
                  }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#fdc800] shrink-0" />
                <span className="hidden sm:inline">Pathway Finder</span>
                <span className="sm:hidden">Path</span>
              </Link>

              <button
                type="button"
                onClick={onApplyClick}
                className={`liquid-yellow-btn relative inline-flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#002147] rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer group overflow-hidden ${scrolled
                  ? 'px-3.5 sm:px-4 py-1.5 text-[11px]'
                  : 'px-4 sm:px-5 py-2'
                  }`}
              >
                <span className="relative z-10">Apply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Architectural Bento Mega-Menu Drawer for Programmes */}
          {megaOpen && (
            <div
              onMouseLeave={() => setMegaOpen(false)}
              className="hidden xl:block mt-2.5 bg-white rounded-3xl border border-[#002147]/15 shadow-2xl overflow-hidden animate-fadeIn text-[#0f172a]"
            >
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#f4f7fc] p-5 border-r border-[#002147]/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#002147]/70">
                        {SCHOOL_CATEGORIES.length} Academic Schools • {PROGRAMMES.length} Programmes
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {SCHOOL_CATEGORIES.map((cat) => {
                        const count = PROGRAMMES.filter((p) => p.category === cat.id).length;
                        const isSelected = activeMegaCat === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onMouseEnter={() => setActiveMegaCat(cat.id)}
                            onClick={() => {
                              setMegaOpen(false);
                              navigate(`/programmes?category=${encodeURIComponent(cat.id)}`);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left transition-all cursor-pointer ${isSelected
                              ? 'bg-[#002147] text-white shadow-sm'
                              : 'text-[#0f172a] hover:bg-[#002147]/10'
                              }`}
                          >
                            <div className="min-w-0 pr-2">
                              <div className="text-xs font-extrabold">{cat.label}</div>
                              <div
                                className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-white/75' : 'text-neutral-500'
                                  }`}
                              >
                                {cat.sub}
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 ${isSelected
                                ? 'bg-[#fdc800] text-[#002147] font-extrabold'
                                : 'bg-white text-neutral-600'
                                }`}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#002147]/10 flex items-center justify-between">
                    <Link
                      to="/programmes"
                      onClick={() => setMegaOpen(false)}
                      className="text-xs font-extrabold text-[#002147] hover:underline inline-flex items-center gap-1"
                    >
                      Browse Full Directory ({PROGRAMMES.length}) <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="col-span-8 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#002147] font-bold">
                          Departmental Qualifications
                        </span>
                        <h3 className="text-base font-extrabold text-[#002147]">
                          {activeSchoolObj.label}
                        </h3>
                      </div>
                      <Link
                        to={`/programmes?category=${encodeURIComponent(activeMegaCat)}`}
                        onClick={() => setMegaOpen(false)}
                        className="text-xs font-bold text-[#002147] bg-[#f4f7fc] hover:bg-[#fdc800] px-3 py-1.5 rounded-xl transition-colors"
                      >
                        Filter {activeSchoolObj.label} →
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-1">
                      {megaProgrammes.map((prog) => (
                        <Link
                          key={prog.id}
                          to={`/programmes/${prog.id}`}
                          onClick={() => setMegaOpen(false)}
                          className="group p-3.5 rounded-2xl border border-neutral-200 hover:border-[#002147] hover:bg-[#f4f7fc] transition-all flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#002147] text-[#fdc800]">
                                {prog.qualification.split('/')[0].trim()}
                              </span>
                              <span className="text-[10px] font-semibold text-neutral-500 truncate">
                                {prog.school.replace('School of ', '')}
                              </span>
                            </div>
                            <div className="text-xs font-extrabold text-[#0f172a] group-hover:text-[#002147] line-clamp-1">
                              {prog.title}
                            </div>
                            <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                              {prog.duration} • {prog.studyMode.split('/')[0].trim()}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 p-4 rounded-2xl bg-[#002147] text-white flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#fdc800] text-[#002147] flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white">
                          Not sure which qualification level fits your O/L or A/L results?
                        </div>
                        <div className="text-[11px] text-white/75">
                          Use our Interactive Live-Split Pathway Explorer for instant eligibility matching.
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/find-my-path"
                      onClick={() => setMegaOpen(false)}
                      className="px-4 py-2 rounded-xl bg-[#fdc800] hover:bg-[#e6b800] text-[#002147] text-xs font-extrabold whitespace-nowrap shrink-0"
                    >
                      Launch Pathway Explorer →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2.5 liquid-glass-drawer rounded-3xl p-4 text-white shadow-2xl">
              <Link
                to="/find-my-path"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#fdc800]/25 to-[#fdc800]/15 border border-[#fdc800]/50 text-[#fdc800] font-extrabold text-sm mb-3"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-[#fdc800]" />
                  <span>Interactive Pathway Explorer</span>
                </div>
                <span className="text-[10px] bg-[#fdc800] text-[#002147] px-2 py-0.5 rounded-full font-black uppercase">
                  Live Tool
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
                      className={`block px-4 py-2.5 rounded-2xl text-sm transition-all ${active
                        ? 'bg-white/15 text-[#fdc800] font-bold border-l-4 border-[#fdc800]'
                        : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2">
                {onProspectusClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onProspectusClick();
                    }}
                    className="py-3 px-3 rounded-2xl bg-white/10 text-white text-xs font-bold text-center cursor-pointer"
                  >
                    2026 Prospectus
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onApplyClick();
                  }}
                  className="liquid-yellow-btn py-3 px-4 inline-flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#002147] rounded-2xl cursor-pointer col-span-1"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-4 h-4 text-[#002147]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
