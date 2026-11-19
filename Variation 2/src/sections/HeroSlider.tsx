import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Compass,
  Award,
  CheckCircle2,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { SmartImage } from '../components/ui/SmartImage';
import { photo } from '../lib/assets';
import { gsap } from '../lib/gsap';

interface HeroSliderProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    badge: 'Welcome to BIET • September 2026 / Feb 2027 Intake',
    headline: 'Building Skills. Engineering Futures.',
    subheadline:
      'Degree pathways in engineering and technology with British academic benchmarks in Sri Lanka — combining mathematical rigor with intensive hands-on laboratories.',
    image: photo('photo-1541339907198-e08756dedf3f'),
    imageAlt: 'BIET university academic campus and lecture quadrangle',
    ctaPrimary: { label: 'Explore Programmes', link: '/programmes' },
    ctaSecondary: { label: 'Apply for 2026 Intake', action: 'apply' as const },
    highlightTitle: 'British Academic Benchmarks',
    highlightSub: 'Civil • Mechanical • Electrical • Computing • QS',
    telemetryCode: 'SCH-ENG-01',
  },
  {
    id: 2,
    badge: 'Engineering Education • Hands-On Laboratories',
    headline: 'Learn Beyond the Classroom.',
    subheadline:
      'Practical laboratory training and industry-focused skills for modern engineering — including robotics, CNC manufacturing, high-voltage power suites, and structural testing.',
    image: photo('photo-1581092160607-ee22621dd758'),
    imageAlt: 'Engineering precision laboratory and prototyping equipment at BIET',
    ctaPrimary: { label: 'Tour Campus Facilities', link: '/student-life' },
    ctaSecondary: { label: 'Download Prospectus', action: 'prospectus' as const },
    highlightTitle: 'Specialized Engineering Labs',
    highlightSub: 'Hydraulics • CNC & Thermo-Fluids • Cisco Cyber Suite',
    telemetryCode: 'LAB-INF-02',
  },
  {
    id: 3,
    badge: 'Technology & Innovation • School of Computing & IT',
    headline: 'Shape the Future with Technology.',
    subheadline:
      'Innovative computing, software engineering, and cyber security degree pathways engineered for enterprise cloud architecture and real-world deployment.',
    image: photo('photo-1531482615713-2afd69097998'),
    imageAlt: 'Students and lecturers collaborating in technology innovation lab',
    ctaPrimary: { label: 'Explore Computing & IT', link: '/programmes?category=computing' },
    ctaSecondary: { label: 'Start Online Application', action: 'apply' as const },
    highlightTitle: 'Software, Cloud & Cyber Security',
    highlightSub: 'Full-Stack Engineering • Network Defense • AI Systems',
    telemetryCode: 'COMP-TECH-03',
  },
  {
    id: 4,
    badge: 'Admissions Open • 2026/2027 Academic Year',
    headline: 'Take the Next Step Towards Your Future.',
    subheadline:
      'Enrol in undergraduate BEng/BSc, HND, or Foundation Engineering pathways after G.C.E. O/Ls, A/Ls, or technical diplomas with flexible weekday and weekend batches.',
    image: photo('photo-1523240795612-9a054b0db644'),
    imageAlt: 'University students consulting on admissions and academic pathways',
    ctaPrimary: { label: 'View Admission Pathways', link: '/admissions' },
    ctaSecondary: { label: 'Contact Admissions', link: '/contact' },
    highlightTitle: 'Flexible Intakes & Pathways',
    highlightSub: 'Direct A/L Entry • O/L Foundation • HND Top-Up Routes',
    telemetryCode: 'ADM-2026-04',
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onApplyClick, onProspectusClick }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextSlide, 6500);
    return () => clearInterval(timer);
  }, [paused, nextSlide]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const items = el.querySelectorAll('[data-slide-anim]');
    gsap.fromTo(
      items,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform',
      }
    );
  }, [current]);

  const slide = HERO_SLIDES[current];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <section
      className="relative swiss-grid-deep text-white overflow-hidden select-none -mt-20 pt-24 sm:pt-28 pb-12 lg:pb-16 border-b border-white/10"
      aria-roledescription="carousel"
      aria-label="BIET Featured Highlights"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image with architectural framing */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${idx === current ? 'opacity-30 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            aria-hidden={idx !== current}
          >
            <SmartImage
              src={s.image}
              alt={s.imageAlt}
              className="w-full h-full object-cover scale-105 transition-transform duration-[8000ms] ease-out"
            />
          </div>
        ))}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#00142b] via-[#001a39]/90 to-[#002147]/75" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#00142b] via-transparent to-[#00142b]/60" />
      </div>

      {/* Main Swiss Architectural Bento Hero Grid */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left 7 Columns: Kinetic Editorial Content */}
          <div
            ref={contentRef}
            className="lg:col-span-7 flex flex-col justify-between bg-[#001a39]/75 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
            <div>
              <div
                data-slide-anim
                className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-white/10"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdc800]/15 border border-[#fdc800]/45 text-[#fdc800] text-xs font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#fdc800] animate-ping" />
                  <span>{slide.badge}</span>
                </div>
                <span className="text-[11px] font-mono text-white/50 tracking-widest">
                  [{slide.telemetryCode} • 0{current + 1}/0{HERO_SLIDES.length}]
                </span>
              </div>

              <h1
                data-slide-anim
                className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.1] text-white mb-4"
              >
                {slide.headline}
              </h1>

              <p
                data-slide-anim
                className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mb-7 font-normal"
              >
                {slide.subheadline}
              </p>

              {/* Primary CTAs */}
              <div data-slide-anim className="flex flex-wrap items-center gap-3 mb-8">
                <Link
                  to={slide.ctaPrimary.link}
                  className="px-6 py-3.5 bg-[#fdc800] hover:bg-[#e6b800] text-[#002147] font-extrabold text-xs sm:text-sm rounded-2xl transition-all inline-flex items-center gap-2 shadow-lg shadow-[#fdc800]/20 hover:-translate-y-0.5"
                >
                  <span>{slide.ctaPrimary.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {slide.ctaSecondary.action === 'apply' ? (
                  <button
                    type="button"
                    onClick={onApplyClick}
                    className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs sm:text-sm rounded-2xl backdrop-blur-sm transition-all cursor-pointer"
                  >
                    {slide.ctaSecondary.label}
                  </button>
                ) : slide.ctaSecondary.action === 'prospectus' ? (
                  <button
                    type="button"
                    onClick={onProspectusClick}
                    className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs sm:text-sm rounded-2xl backdrop-blur-sm transition-all cursor-pointer"
                  >
                    {slide.ctaSecondary.label}
                  </button>
                ) : (
                  <Link
                    to={slide.ctaSecondary.link || '/contact'}
                    className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs sm:text-sm rounded-2xl backdrop-blur-sm transition-all"
                  >
                    {slide.ctaSecondary.label}
                  </Link>
                )}

                <Link
                  to="/find-my-path"
                  className="px-4 py-3.5 bg-[#002147]/90 hover:bg-[#002147] text-[#fdc800] border border-[#fdc800]/45 hover:border-[#fdc800] font-extrabold text-xs sm:text-sm rounded-2xl transition-all inline-flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#fdc800]" />
                  <span>Find My Path</span>
                </Link>
              </div>
            </div>

            {/* Bottom Quick School Pills & Slide Controls */}
            <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { label: 'School of Engineering', cat: 'engineering' },
                  { label: 'Computing & IT', cat: 'computing' },
                  { label: 'Quantity Surveying', cat: 'built-environment' },
                ].map((tag) => (
                  <button
                    key={tag.label}
                    type="button"
                    onClick={() => navigate(`/programmes?category=${encodeURIComponent(tag.cat)}`)}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/8 hover:bg-[#fdc800] text-white/85 hover:text-[#002147] border border-white/15 transition-colors cursor-pointer"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCurrent(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${idx === current
                        ? 'w-7 bg-[#fdc800]'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                        }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
                >
                  {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Swiss Bento Visual Showcase + Institutional Metrics Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#001a39] h-64 sm:h-72 lg:h-full min-h-[250px] shadow-2xl group">
              <SmartImage
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00142b] via-[#00142b]/35 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#00142b]/85 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-[#fdc800] inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> {slide.highlightTitle}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#fdc800] text-[#002147] text-[10px] font-black uppercase">
                  UK Standards
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#00142b]/90 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-extrabold text-white">{slide.highlightSub}</div>
                  <div className="text-[11px] text-white/70 mt-0.5">
                    Industry-Aligned Higher Education • Colombo, Sri Lanka
                  </div>
                </div>
                <Link
                  to={slide.ctaPrimary.link}
                  className="w-9 h-9 rounded-xl bg-[#fdc800] text-[#002147] flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                  aria-label={slide.ctaPrimary.label}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#001a39]/85 backdrop-blur-md border border-white/15 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fdc800]/15 border border-[#fdc800]/40 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#fdc800]" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-none">British</div>
                  <div className="text-[11px] text-white/70 mt-1">Academic Curriculum</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#001a39]/85 backdrop-blur-md border border-white/15 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fdc800]/15 border border-[#fdc800]/40 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-[#fdc800]" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-none">3 Schools</div>
                  <div className="text-[11px] text-white/70 mt-1">Eng • Computing • QS</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#001a39]/85 backdrop-blur-md border border-white/15 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fdc800]/15 border border-[#fdc800]/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#fdc800]" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-none">Labs</div>
                  <div className="text-[11px] text-white/70 mt-1">Hands-On Practical Suites</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#001a39]/85 backdrop-blur-md border border-white/15 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fdc800]/15 border border-[#fdc800]/40 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 text-[#fdc800]" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-none">Pathways</div>
                  <div className="text-[11px] text-white/70 mt-1">Foundation to Honours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
