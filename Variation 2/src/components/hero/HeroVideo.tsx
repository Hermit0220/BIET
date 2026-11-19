import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Pause, Play } from 'lucide-react';
import { HERO_MEDIA } from '../../data/mediaManifest';

export const HeroVideo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [saveData, setSaveData] = useState<boolean>(() => {
    if (typeof navigator === 'undefined') return false;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    return Boolean(conn?.saveData);
  });
  const [userPaused, setUserPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mqMotion.addEventListener('change', onMotionChange);

    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) setSaveData(true);

    return () => {
      mqMotion.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const shouldRenderVideo = !prefersReducedMotion && !saveData && !videoFailed;

  // Pause automatically when out of viewport or tab is hidden
  useEffect(() => {
    const video = videoRef.current;
    const container = sectionRef.current;
    if (!video || !container || !shouldRenderVideo) return;

    const tryPlay = () => {
      if (!userPaused && !document.hidden) {
        video.play().catch(() => {
          // Autoplay blocked: poster remains visible cleanly
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            video.pause();
          } else {
            tryPlay();
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [shouldRenderVideo, userPaused, isMobile]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) {
      setUserPaused((p) => !p);
      return;
    }
    if (userPaused || video.paused) {
      setUserPaused(false);
      video.play().catch(() => setVideoFailed(true));
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  const activePoster = isMobile ? HERO_MEDIA.posterMobile : HERO_MEDIA.posterDesktop;
  const activeMp4 = isMobile ? HERO_MEDIA.mobileMp4 : HERO_MEDIA.desktopMp4;

  return (
    <section
      ref={sectionRef}
      aria-label="BIET Campus Introduction"
      className="relative bg-[#0A0A0A] text-white overflow-hidden min-h-[min(calc(100svh-140px),820px)] flex flex-col justify-between"
    >
      {/* Full-bleed Video / Poster Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={activePoster}
          alt={HERO_MEDIA.posterAlt}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {shouldRenderVideo && (
          <video
            key={activeMp4}
            ref={videoRef}
            src={activeMp4}
            poster={activePoster}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Dark editorial scrims ensuring WCAG AA contrast across every frame */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#111111]/70 to-[#111111]/45"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-[#0A0A0A]/45"
          aria-hidden="true"
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-20 sm:pb-24 flex-1 flex flex-col justify-center">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FFCC00]">
            <span className="diagonal-accent-rule" aria-hidden="true" />
            <span>Explore Your Possibilities · BIET Campus</span>
          </div>

          <h1 className="display-hero text-white max-w-[14ch] sm:max-w-none">
            <span>Your future starts </span>
            <span className="block sm:inline">
              with{' '}
              <span className="display-outline">possibility.</span>
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed font-normal">
            Explore programmes and pathways that match your interests, ambitions and academic
            background.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <Link to="/programmes" className="biet-btn-primary">
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link to="/find-my-path" className="biet-btn-secondary-dark">
              <Compass className="w-4 h-4 text-[#FFCC00] shrink-0" aria-hidden="true" />
              <span>Find My Path</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Right Pause/Resume Control + Illustrative Media Caption */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 pb-12 sm:pb-16 flex items-center justify-between gap-4">
        <span className="text-[11px] text-white/65 tracking-wide">
          {HERO_MEDIA.posterCaption}
        </span>

        {shouldRenderVideo && (
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-pressed={userPaused}
            aria-label={userPaused ? 'Play background video' : 'Pause background video'}
            className="inline-flex items-center gap-2 min-w-[44px] min-h-[44px] px-3.5 rounded-[4px] bg-[#111111]/90 hover:bg-[#FFCC00] text-white hover:text-[#111111] border border-white/30 text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            {userPaused ? (
              <>
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Play video</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Pause video</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Controlled Frosted Diagonal Transition Wedge into Section H02 */}
      <div className="relative z-20 pointer-events-none select-none -mt-6 sm:-mt-12" aria-hidden="true">
        <div className="hidden md:block w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 72"
            preserveAspectRatio="none"
            className="w-full h-[56px] lg:h-[72px] block"
          >
            <polygon points="0,72 1380,0 1440,0 1440,72" fill="rgba(255,255,255,0.28)" />
            <polygon points="72,72 1440,6 1440,72" fill="#FFFFFF" />
          </svg>
        </div>
        <div className="md:hidden h-4 bg-white w-full" />
      </div>
    </section>
  );
};
