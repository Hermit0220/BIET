import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  BookOpen,
  Cpu,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { HeroSlider } from '../sections/HeroSlider';
import { SmartImage } from '../components/ui/SmartImage';
import { PROGRAMMES, type Programme } from '../data/programmes';
import { NEWS_ARTICLES, type NewsArticle } from '../data/site';
import { photo, asset } from '../lib/assets';

interface HomePageProps {
  onApplyClick: (programmeTitle?: string) => void;
  onProspectusClick: () => void;
  onSelectProgramme: (programme: Programme) => void;
  onSelectArticle: (article: NewsArticle) => void;
}

const WelcomeSection: React.FC = () => (
  <section id="about" className="py-24 lg:py-32 bg-white text-[#111111] border-b border-neutral-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
            <span className="w-6 h-0.5 bg-[#fdc800]" />
            <span>Welcome to BIET</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-[1.15] text-balance">
            British Standards. Practical Engineering.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            BIET delivers industry-aligned higher education across Engineering, Computing, and the
            Built Environment in Sri Lanka. We combine British curricula with hands-on laboratory
            practice to prepare future-ready engineers.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] hover:text-[#fdc800] transition-colors group cursor-pointer"
            >
              <span>About BIET</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#fdc800]" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] border border-neutral-200 group">
            <SmartImage
              src={asset('assets/biet-campus-building.webp')}
              alt="BIET institutional campus building in Colombo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-2.5 py-1 rounded bg-[#fdc800] text-[#002147] text-[10px] font-bold uppercase tracking-wider">
                Colombo Campus
              </span>
              <p className="text-sm font-bold mt-2 text-white">
                Institute of Engineering and Technology Colombo Campus
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FEATURED_PROGRAMME_IDS = [
  'civil-engineering',
  'mechanical-engineering',
  'hndme',
  'hndeee',
  'software-engineering',
  'beng-mechanical-mechatronics',
  'quantity-surveying',
];

const FeaturedProgrammesSection: React.FC<{
  onSelectProgramme: (p: Programme) => void;
  onApplyForProgramme: (title: string) => void;
}> = ({ onSelectProgramme, onApplyForProgramme }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const featured = useMemo(() => {
    return FEATURED_PROGRAMME_IDS.map((id) => PROGRAMMES.find((p) => p.id === id)).filter(
      (p): p is Programme => Boolean(p)
    );
  }, []);

  // Seamless continuous auto-drift from right to left
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = scrollRef.current;
    if (!container) return;

    let animId: number;
    const scrollSpeed = 0.85; // smooth and readable drift speed

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  const scrollByAmount = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft -= container.scrollWidth / 2;
    } else if (container.scrollLeft <= 0 && isPaused) {
      container.scrollLeft += container.scrollWidth / 2;
    }
  };

  const displayList = useMemo(() => [...featured, ...featured], [featured]);

  return (
    <section
      id="programmes"
      className="py-24 lg:py-32 bg-white text-[#111111] border-b border-neutral-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
              <span className="w-6 h-0.5 bg-[#fdc800]" />
              <span>Programmes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
              Explore Our Programmes
            </h2>
            <p className="text-base text-neutral-600">
              Undergraduate degrees combining British academic rigor with hands-on laboratory
              application.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByAmount(-320)}
                className="p-2.5 rounded-full border border-neutral-200 hover:border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white transition-colors cursor-pointer shadow-2xs"
                aria-label="Previous programme cards"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(320)}
                className="p-2.5 rounded-full border border-neutral-200 hover:border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white transition-colors cursor-pointer shadow-2xs"
                aria-label="Next programme cards"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link
              to="/programmes"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-white hover:bg-[#fdc800]/15 border border-neutral-300 hover:border-[#002147] rounded-full transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#002147]" />
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4 text-[#002147]" />
            </Link>
          </div>
        </div>

        {/* Sliding Carousel Container with Soft Edge Fades */}
        <div className="relative w-full">
          <div
            className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-4 select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayList.map((prog, idx) => (
              <div
                key={`${prog.id}-${idx}`}
                onClick={() => onSelectProgramme(prog)}
                className="w-[285px] sm:w-[305px] shrink-0 bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#fdc800] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
                    <SmartImage
                      src={prog.imageUrl}
                      alt={prog.title}
                      imageSvgType={prog.imageSvgType}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-[#002147]/85 backdrop-blur-md text-[10px] font-bold text-[#fdc800] uppercase tracking-wider">
                        {prog.qualification.split('/')[0]}
                      </span>
                    </div>

                    {/* Top-Right Corner Notch: 2 straight edges (1 vertical, 1 horizontal) & 1 rounded curve */}
                    <div className="absolute top-0 right-0 z-10 w-[64px] h-[64px] bg-white rounded-bl-[28px] pointer-events-none select-none" />
                    <Link
                      to={`/programmes/${prog.id}`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View details for ${prog.title}`}
                      className="absolute top-2 right-2 z-20 w-11 h-11 rounded-full bg-[#171d33] hover:bg-[#fdc800] text-white hover:text-[#002147] flex items-center justify-center transition-all duration-300 shadow-md group/btn hover:scale-105 cursor-pointer"
                    >
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                      {prog.school.replace('School of ', '')}
                    </span>
                    <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#002147] leading-snug line-clamp-2">
                      <Link
                        to={`/programmes/${prog.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:underline"
                      >
                        {prog.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {prog.overview}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-neutral-500">
                    {prog.duration.split('/')[0].trim()}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplyForProgramme(prog.title);
                    }}
                    className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#e6b800] rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseBietSection: React.FC = () => (
  <section className="py-24 lg:py-32 bg-gradient-to-b from-[#001a39] via-[#002147] to-[#001733] text-white border-y border-[#1a3b61]/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fdc800]">
          <span className="w-6 h-0.5 bg-[#fdc800]" />
          <span>Why Choose BIET</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Built for Academic & Career Success
        </h2>
        <p className="text-base text-neutral-300">
          A focused learning environment combining international standards with practical
          application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {[
          {
            icon: <BookOpen className="w-6 h-6 text-[#002147]" />,
            title: 'British Curriculum',
            description:
              'Curricula calibrated to UK engineering benchmarks, combining mathematical depth with practical problem-solving.',
          },
          {
            icon: <Cpu className="w-6 h-6 text-[#002147]" />,
            title: 'Hands-On Labs',
            description:
              'Specialized testing bays, robotics equipment, and computational suites providing practical laboratory experience.',
          },
          {
            icon: <Briefcase className="w-6 h-6 text-[#002147]" />,
            title: 'Industry Readiness',
            description:
              'Capstone projects, professional development, and mentorship structured for career success in modern engineering.',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-[#001a39]/70 border border-[#1a3b61]/50 hover:border-[#fdc800]/60 transition-all duration-300 space-y-4 shadow-xl group backdrop-blur-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#fdc800] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CampusLifeSection: React.FC = () => (
  <section
    id="student-life"
    className="py-24 lg:py-32 bg-white text-[#111111] border-b border-neutral-100"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
            <span className="w-6 h-0.5 bg-[#fdc800]" />
            <span>Campus Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
            Life & Learning at BIET
          </h2>
          <p className="text-base text-neutral-600">
            Specialized laboratories, collaborative spaces, and an active student community in
            Colombo.
          </p>
        </div>
        <Link
          to="/student-life"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] hover:text-[#fdc800] transition-colors group shrink-0 cursor-pointer"
        >
          <span>Student Life</span>
          <ArrowRight className="w-4 h-4 text-[#fdc800] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {[
          {
            title: 'Robotics & Automation Labs',
            caption: 'Hardware test benches, microcontrollers, and precision robotics equipment.',
            imageUrl: photo('photo-1581092160607-ee22621dd758'),
          },
          {
            title: 'Computing & Cyber Suites',
            caption: 'Modern workstations and collaborative network infrastructure.',
            imageUrl: photo('photo-1558494949-ef010cbdcc31'),
          },
          {
            title: 'Digital Library & Study Commons',
            caption: 'Quiet academic study spaces and engineering research resources.',
            imageUrl: photo('photo-1521587760476-6c12a4b040da'),
          },
          {
            title: 'Student Societies & Clubs',
            caption: 'Student-led engineering societies, hackathons, and activities.',
            imageUrl: photo('photo-1522202176988-66273c2fd55f'),
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-200 hover:border-[#fdc800] transition-all duration-300 aspect-[16/10]"
          >
            <SmartImage
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded bg-[#fdc800] text-[#002147] text-[10px] font-bold uppercase tracking-wider">
                Campus
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{card.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-200 max-w-lg leading-relaxed">
                {card.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const LatestNewsSection: React.FC<{ onSelectArticle: (a: NewsArticle) => void }> = ({
  onSelectArticle,
}) => {
  const recent = NEWS_ARTICLES.slice(0, 3);

  return (
    <section id="news" className="py-24 lg:py-32 bg-white text-[#111111] border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
              <span className="w-6 h-0.5 bg-[#fdc800]" />
              <span>News & Events</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
              Latest News & Events
            </h2>
            <p className="text-base text-neutral-600">
              Campus updates, intake announcements, and upcoming events.
            </p>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] hover:text-[#fdc800] transition-colors group shrink-0 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-[#fdc800] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {recent.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#fdc800] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <SmartImage
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#002147]/85 backdrop-blur-md text-[10px] font-bold text-[#fdc800] uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#002147] leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 pt-2 flex items-center justify-between border-t border-neutral-100 text-xs">
                <span className="text-neutral-500 font-medium">{article.readTime}</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#002147] group-hover:text-black">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#fdc800] group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StartYourJourneyCta: React.FC<{ onApplyClick: () => void }> = ({ onApplyClick }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const videoUrl = asset('assets/media/admissions-cta.mp4');
  const posterUrl = photo('photo-1522202176988-66273c2fd55f');

  return (
    <section className="relative overflow-hidden text-white py-24 lg:py-32 border-y border-[#1a3b61]/40 bg-[#001733]">
      {/* Background Ambient Video with Blue BIET Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={posterUrl}
          className="w-full h-full object-cover object-center transform scale-105"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Blue gradient overlays matching BIET brand palette */}
        <div className="absolute inset-0 bg-[#001733]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00142a]/95 via-[#002147]/65 to-[#001733]/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002147]/80 border border-[#fdc800]/50 text-xs font-bold uppercase tracking-wider text-[#fdc800] backdrop-blur-sm shadow-sm">
          <span>Admissions 2026 / 2027</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Start Your Journey in Engineering & Technology.
        </h2>
        <p className="text-base sm:text-lg text-neutral-100 max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
          Applications are open for 2026/2027 academic intakes at BIET Colombo Campus.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onApplyClick}
            className="w-full sm:w-auto px-9 py-4 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#e6b800] rounded-full transition-all shadow-xl active:scale-[0.98] cursor-pointer"
          >
            Apply Now
          </button>
          <Link
            to="/admissions"
            className="text-xs font-bold text-white hover:text-[#fdc800] transition-colors flex items-center gap-1.5 py-2 cursor-pointer drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          >
            <span>Entry Requirements</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#fdc800]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export const HomePage: React.FC<HomePageProps> = ({
  onApplyClick,
  onProspectusClick,
  onSelectProgramme,
  onSelectArticle,
}) => {
  const scrollToProgrammes = () => {
    const el = document.getElementById('programmes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <HeroSlider
        onExploreProgrammes={scrollToProgrammes}
        onApplyClick={() => onApplyClick()}
        onProspectusClick={onProspectusClick}
      />
      <WelcomeSection />
      <section className="bg-white py-10 sm:py-14 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#001a39] via-[#002147] to-[#001a39] border border-[#1a3b61]/50 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden animate-card-float hover:-translate-y-1.5 transition-all duration-500 ease-out hover:border-[#fdc800]/60 hover:shadow-[0_24px_48px_-12px_rgba(0,33,71,0.45)] group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fdc800]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdc800]/15 text-[#fdc800] text-xs font-extrabold uppercase tracking-wider border border-[#fdc800]/30">
                <span>NEW</span> • <span>Interactive Pathway Finder</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Not Sure Which BIET Programme Fits Your Qualifications?
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Use our step-by-step pathway discovery tool. Input your G.C.E. O/L, A/L, Cambridge, or vocational qualifications to find direct degree entry or foundation progression routes tailored to your career goals.
              </p>
            </div>
            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <Link
                to="/find-my-path"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#fdc800] hover:bg-[#ffe066] text-[#002147] font-extrabold text-xs sm:text-sm shadow-xl shadow-[#fdc800]/20 hover:scale-105 transition-all"
              >
                Launch Find My Path Tool
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FeaturedProgrammesSection
        onSelectProgramme={onSelectProgramme}
        onApplyForProgramme={(title) => onApplyClick(title)}
      />
      <WhyChooseBietSection />
      <CampusLifeSection />
      <LatestNewsSection onSelectArticle={onSelectArticle} />
      <StartYourJourneyCta onApplyClick={() => onApplyClick()} />
    </main>
  );
};

