import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { photo, asset } from '../lib/assets';

interface HeroSlideCta {
  label: string;
  type: 'link' | 'apply';
  to?: string;
}

interface HeroSlide {
  id: number;
  kicker: string;
  headlinePrefix: string;
  headlineHighlight: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  imageAlt: string;
  tabLabel: string;
  primaryCta: HeroSlideCta;
  secondaryCta?: HeroSlideCta;
}

interface HeroSliderProps {
  onExploreProgrammes?: () => void;
  onApplyClick: () => void;
  onProspectusClick?: () => void;
}

const SLIDES: HeroSlide[] = [
  {
    id: 0,
    kicker: 'Welcome to BIET',
    headlinePrefix: 'Building Skills. ',
    headlineHighlight: 'Engineering Futures.',
    description:
      'Degree pathways in engineering and technology with British academic benchmarks in Sri Lanka.',
    imageUrl: photo('photo-1562774053-701939374585'),
    videoUrl: asset('assets/media/hero-welcome.mp4'),
    imageAlt: 'BIET university academic campus and lecture quadrangle',
    tabLabel: 'Welcome',
    primaryCta: { label: 'Explore Programmes', type: 'link', to: '/programmes' },
    secondaryCta: { label: 'About BIET', type: 'link', to: '/about' },
  },
  {
    id: 1,
    kicker: 'Engineering Education',
    headlinePrefix: 'Learn Beyond ',
    headlineHighlight: 'the Classroom.',
    description:
      'Practical laboratory training and industry-focused skills for modern engineering.',
    imageUrl: photo('photo-1581092160607-ee22621dd758'),
    videoUrl: asset('assets/media/hero-engineering.mp4'),
    imageAlt: 'Engineering precision laboratory and prototyping equipment at BIET',
    tabLabel: 'Engineering',
    primaryCta: { label: 'Explore Programmes', type: 'link', to: '/programmes' },
  },
  {
    id: 2,
    kicker: 'Technology & Innovation',
    headlinePrefix: 'Shape the Future with ',
    headlineHighlight: 'Technology.',
    description: 'Innovative computing and software degree programmes designed for industry.',
    imageUrl: photo('photo-1531482615713-2afd69097998'),
    videoUrl: asset('assets/media/hero-technology.mp4'),
    imageAlt: 'Students and lecturers collaborating in technology innovation lab',
    tabLabel: 'Technology',
    primaryCta: { label: 'Explore Programmes', type: 'link', to: '/programmes' },
  },
  {
    id: 3,
    kicker: 'Admissions Open',
    headlinePrefix: 'Take the Next Step Towards ',
    headlineHighlight: 'Your Future.',
    description: 'Enrol in undergraduate programmes for the 2026/2027 academic year.',
    imageUrl: photo('photo-1523240795612-9a054b0db644'),
    videoUrl: asset('assets/media/hero-admissions.mp4'),
    imageAlt: 'University students consulting on admissions and academic pathways',
    tabLabel: 'Admissions',
    primaryCta: { label: 'Apply Now', type: 'apply' },
    secondaryCta: { label: 'Contact Us', type: 'link', to: '/contact' },
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onApplyClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  }, []);

  // Synchronize background video playback with active slide state
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex && !paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, paused]);

  // Respect user reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          nextSlide();
          return 0;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [paused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderCta = (cta: HeroSlideCta | undefined, isPrimary: boolean) => {
    if (!cta) return null;
    if (cta.type === 'apply') {
      return (
        <button
          key={cta.label}
          onClick={onApplyClick}
          className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg ${
            isPrimary
              ? 'text-[#002147] bg-[#fdc800] hover:bg-[#e6b800]'
              : 'text-white bg-[#001a39]/60 hover:bg-[#002147]/80 border border-white/30 backdrop-blur-sm'
          }`}
        >
          <span>{cta.label}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      );
    }
    return (
      <Link
        key={cta.label}
        to={cta.to || '/programmes'}
        className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg ${
          isPrimary
            ? 'text-[#002147] bg-[#fdc800] hover:bg-[#e6b800]'
            : 'text-white bg-[#001a39]/60 hover:bg-[#002147]/80 border border-white/30 hover:border-white backdrop-blur-sm'
        }`}
      >
        <span>{cta.label}</span>
        {isPrimary && <ArrowRight className="w-3.5 h-3.5 text-[#002147]" />}
      </Link>
    );
  };

  return (
    <section
      id="home"
      aria-label="BIET Institutional Hero Showcase"
      className="relative w-full bg-[#001a39] text-white overflow-hidden min-h-screen h-[100dvh] flex flex-col justify-between select-none pt-28 sm:pt-32 pb-6 sm:pb-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 4-Category Video/Image Background Stage */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {SLIDES.map((slide, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              {slide.videoUrl ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                    isCurrent ? 'scale-105' : 'scale-100'
                  }`}
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.imageUrl}
                  alt={slide.imageAlt}
                  loading="eager"
                  className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                    isCurrent ? 'scale-105' : 'scale-100'
                  }`}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              )}
            </div>
          );
        })}
        {/* Layered Oxford Navy Gradients ensuring 100% WCAG AAA Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a39]/92 via-[#001a39]/70 to-[#002147]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a39]/95 via-transparent to-[#001a39]/65 pointer-events-none" />
        <div className="absolute inset-0 bg-[#001a39]/25 backdrop-blur-[0.5px] pointer-events-none" />
      </div>

      {/* Hero Content Stage (Vertically Centered across Full Screen) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="relative min-h-[260px] sm:min-h-[300px] flex items-center max-w-3xl">
          {SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${
                  isCurrent
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
                aria-hidden={!isCurrent}
              >
                <div className="space-y-5">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] text-balance">
                    {slide.headlinePrefix}
                    <span className="text-[#fdc800]">{slide.headlineHighlight}</span>
                  </h1>
                  <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {renderCta(slide.primaryCta, true)}
                    <Link
                      to="/find-my-path"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider rounded-full text-white bg-[#002147]/70 hover:bg-[#002147]/90 border border-[#fdc800]/50 hover:border-[#fdc800] backdrop-blur-md transition-all duration-200 shadow-lg cursor-pointer"
                    >
                      <Compass className="w-4 h-4 text-[#fdc800]" />
                      <span>Find My Path</span>
                    </Link>
                    {slide.secondaryCta && renderCta(slide.secondaryCta, false)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Category Selector & Slide Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full shrink-0">
        <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
            {SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`relative py-1.5 px-3 sm:px-4 rounded-lg text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'text-white font-bold'
                      : 'text-white/60 hover:text-white/90 font-medium'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.tabLabel}`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={isCurrent ? 'text-[#fdc800] font-mono' : 'text-white/40 font-mono'}
                    >
                      0{idx + 1}
                    </span>
                    <span className="hidden sm:inline text-xs">{slide.tabLabel}</span>
                  </div>
                  <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-0.5 bg-white/15 rounded-full overflow-hidden">
                    {isCurrent && (
                      <div
                        className="h-full bg-[#fdc800] transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setPaused((p) => !p)}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
            >
              {paused ? (
                <Play className="w-3.5 h-3.5 text-[#fdc800]" />
              ) : (
                <Pause className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-[#001a39]/70 hover:bg-[#fdc800] text-white hover:text-[#002147] border border-white/25 hover:border-[#fdc800] backdrop-blur-sm transition-all cursor-pointer shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-[#001a39]/70 hover:bg-[#fdc800] text-white hover:text-[#002147] border border-white/25 hover:border-[#fdc800] backdrop-blur-sm transition-all cursor-pointer shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
