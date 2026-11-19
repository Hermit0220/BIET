import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Compass } from 'lucide-react';
import { HeroVideo } from '../components/hero/HeroVideo';
import { StructuredData } from '../components/seo/StructuredData';
import { SmartImage } from '../components/ui/SmartImage';
import { WhatsAppLink } from '../components/common/WhatsAppLink';
import { getPriorityProgrammes, searchCatalogue } from '../data/catalogue';
import { siteConfig } from '../config/siteConfig';
import { photo } from '../lib/assets';
import { usePathway } from '../context/PathwayContext';
import { useSwissAnimations } from '../lib/gsap';
import type { StartingPointId } from '../types/pathway';

interface HomePageProps {
  onOpenConsultation: (programmeId?: string) => void;
}

const STARTING_STAGE_CARDS: {
  id: StartingPointId;
  title: string;
  tag: string;
  description: string;
}[] = [
  {
    id: 'after-ol',
    title: 'After O/Ls',
    tag: 'Foundation & Entry-Level Study',
    description:
      'Completed your O/L examinations? Explore foundation and introductory learning opportunities that may help you prepare for further study.',
  },
  {
    id: 'after-al',
    title: 'After A/Ls',
    tag: 'Diploma & Higher Education',
    description:
      'Planning your next academic step? Explore diploma, higher-level and other study opportunities aligned with your interests and qualifications.',
  },
  {
    id: 'holding-qualification',
    title: 'Continuing Your Education',
    tag: 'Academic Progression',
    description:
      'Already hold a qualification? Discover opportunities to build on your existing knowledge and explore further academic progression.',
  },
  {
    id: 'professional-skills',
    title: 'Developing Professional Skills',
    tag: 'Skills & Career Development',
    description:
      'Looking to strengthen your knowledge or explore a new field? Find learning opportunities that may support your professional development.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { presetStartingPointFromHome } = usePathway();
  const pageRef = useRef<HTMLDivElement>(null);

  useSwissAnimations(pageRef);

  const priorityProgrammes = useMemo(() => getPriorityProgrammes(), []);

  const liveSearchPreview = useMemo(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return [];
    return searchCatalogue(trimmed).slice(0, 4);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/programmes?q=${encodeURIComponent(q)}` : '/programmes');
  };

  const handleSelectStartingCard = (stageId: StartingPointId) => {
    presetStartingPointFromHome(stageId);
    navigate('/find-my-path');
  };

  return (
    <main id="main-content" ref={pageRef} className="surface-light bg-white text-[#111111]">
      <StructuredData
        pageTitle="Foundation, Diploma & Degree Programmes"
        pageDescription="Explore foundation, diploma and higher education programmes at BIET Campus Sri Lanka across business, computing, engineering, English and psychology."
      />

      {/* H01 — Cinematic Video Hero */}
      <HeroVideo />

      {/* H02 — Programme Search & Starting Point */}
      <section aria-labelledby="discover-heading" className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-14 lg:space-y-16">
          {/* Upper TCU-inspired prominent search block */}
          <div data-gsap="reveal" className="space-y-5">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#666666] block">
                Explore Your Options
              </span>
              <h2 id="discover-heading" className="heading-section text-[#111111]">
                Discover Your Programme
              </h2>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
                Explore study options across business, computing, engineering, English and
                psychology.
              </p>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4"
              role="search"
              aria-label="Search BIET programmes"
            >
              <div className="tcu-search-panel flex-1 px-5 sm:px-7 py-4 sm:py-5 border border-[#E2E2E6]">
                <label
                  htmlFor="home-programme-search"
                  className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5"
                >
                  Search BIET Study Options
                </label>
                <div className="flex items-center gap-3 border-b-2 border-[#111111] pb-2">
                  <Search className="w-5 h-5 text-[#111111] shrink-0" aria-hidden="true" />
                  <input
                    id="home-programme-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search programmes or subjects"
                    className="w-full text-lg sm:text-2xl font-extrabold text-[#111111] placeholder-[#666666]/70 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 shrink-0">
                <button
                  type="submit"
                  className="tcu-go-btn min-h-[54px] px-8 bg-[#FFCC00] hover:bg-[#E6B800] text-[#111111] font-extrabold text-sm sm:text-base uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Search
                </button>
                <Link
                  to="/programmes"
                  className="text-sm font-extrabold uppercase tracking-wider text-[#111111] underline underline-offset-4 hover:text-[#666666] whitespace-nowrap py-2"
                >
                  View All Programmes
                </Link>
              </div>
            </form>

            {/* Instant live search matches backed by canonical catalogue */}
            {liveSearchPreview.length > 0 && (
              <div
                aria-live="polite"
                className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
              >
                {liveSearchPreview.map((p) => (
                  <Link
                    key={p.id}
                    to={`/programmes/${p.slug}`}
                    className="p-3 bg-white border border-[#E2E2E6] hover:border-[#111111] rounded-[4px] flex flex-col justify-between gap-1"
                  >
                    <span className="text-[11px] font-bold uppercase text-[#666666]">
                      {p.category}
                    </span>
                    <span className="text-sm font-extrabold text-[#111111]">{p.title}</span>
                    <span className="text-xs font-bold text-[#111111] underline mt-1">
                      View Programme →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Starting Point Discovery Strip */}
          <div data-gsap="reveal" className="pt-8 border-t border-[#E2E2E6] space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#666666] block">
                  Your Academic Journey
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                  Every journey has a starting point.
                </h3>
              </div>
              <Link
                to="/find-my-path"
                className="inline-flex items-center gap-2 min-h-[46px] px-5 bg-[#111111] hover:bg-[#1A1A1A] text-[#FFCC00] font-bold text-sm rounded-[4px] shrink-0 self-start md:self-auto"
              >
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Not sure? Find My Path</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STARTING_STAGE_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleSelectStartingCard(card.id)}
                  className="text-left p-6 bg-[#F4F4F5] hover:bg-[#FFF0B3] border border-[#E2E2E6] hover:border-[#111111] rounded-[4px] transition-colors flex flex-col justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-2">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#666666] group-hover:text-[#111111]">
                      {card.tag}
                    </span>
                    <h4 className="text-xl font-extrabold text-[#111111] leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-sm text-[#666666] group-hover:text-[#111111] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#111111] underline underline-offset-4">
                    <span>Explore Your Options</span>
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* H03 — Five Priority Programmes (Equal Visual Weight: 3 top + 2 centered bottom on desktop) */}
      <section aria-labelledby="priority-programmes-heading" className="py-16 lg:py-24 bg-[#F4F4F5] border-y border-[#E2E2E6]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10">
          <div data-gsap="reveal" className="max-w-3xl mb-12 space-y-3">
            <div className="diagonal-accent-rule" aria-hidden="true" />
            <h2 id="priority-programmes-heading" className="heading-section text-[#111111]">
              Priority Study Programmes
            </h2>
            <p className="text-base sm:text-lg text-[#666666]">
              Explore five core subject areas spanning business, computing, engineering, English
              and human behaviour.
            </p>
          </div>

          <div
            data-gsap-grid
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
          >
            {priorityProgrammes.map((prog, index) => {
              // 3 columns top row (col-span-2 each); 2 equal columns centered on bottom row (col-start-2 & col-start-4)
              const desktopSpanClass =
                index === 3
                  ? 'lg:col-span-2 lg:col-start-2'
                  : index === 4
                    ? 'lg:col-span-2 lg:col-start-4'
                    : 'lg:col-span-2';
              const tabletCenterLast =
                index === 4 ? 'md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto lg:max-w-none lg:mx-0' : '';

              return (
                <article
                  key={prog.id}
                  data-gsap="bento"
                  className={`${desktopSpanClass} ${tabletCenterLast} bg-[#111111] text-white border border-[#262626] rounded-[4px] overflow-hidden flex flex-col justify-between group`}
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-[#1A1A1A]">
                      <SmartImage
                        src={prog.media.imageUrl}
                        alt={prog.media.alt}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-[#FFCC00]">
                        {prog.category}
                      </span>
                      <h3 className="heading-card text-white">
                        <Link
                          to={`/programmes/${prog.slug}`}
                          className="hover:text-[#FFCC00] transition-colors"
                        >
                          {prog.title}
                        </Link>
                      </h3>
                      <div className="w-10 h-[2px] bg-[#FFCC00]" aria-hidden="true" />
                      <p className="text-sm text-white/80 leading-relaxed">
                        {prog.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#262626]">
                    <Link
                      to={`/programmes/${prog.slug}`}
                      className="inline-flex items-center gap-2 min-h-[44px] text-sm font-extrabold text-[#FFCC00] hover:underline"
                    >
                      <span>View Programme</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <span className="text-[11px] font-mono text-white/60">
                      {prog.qualificationLevel}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link to="/programmes" className="biet-btn-secondary-light px-8">
              <span>View All Programmes</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* H04 — About BIET and The Learning Experience (Two Alternating Large Image/Text Compositions) */}
      <section aria-labelledby="ambitions-heading" className="bg-white">
        {/* Composition 1: Light surface with subtle diagonal photo crop */}
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-16 lg:py-24">
          <div
            data-gsap="reveal"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          >
            <div className="lg:col-span-5 space-y-5">
              <div className="diagonal-accent-rule" aria-hidden="true" />
              <span className="block text-xs font-bold uppercase tracking-widest text-[#666666]">
                About Our Institution
              </span>
              <h2 id="ambitions-heading" className="heading-section text-[#111111]">
                Education shaped around your ambitions.
              </h2>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
                At BIET Campus, education brings together subject knowledge and structured pathways
                across business, computing, engineering, English and psychology to help learners
                take their next step with confidence.
              </p>
              <div className="pt-2">
                <Link to="/about" className="biet-btn-secondary-light">
                  <span>Learn About BIET</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <figure className="space-y-2">
                <div className="tcu-diagonal-photo-left aspect-[16/10] w-full overflow-hidden bg-[#1A1A1A] border border-[#E2E2E6]">
                  <SmartImage
                    src={photo('photo-1531482615713-2afd69097998')}
                    alt="Academic instructor and students reviewing technical study material"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-xs text-[#666666]">
                  Illustrative learning imagery showing classroom academic collaboration.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Composition 2: Full-bleed Charcoal Editorial Split + Overlapping Inset Image */}
        <div className="bg-[#111111] text-white border-y border-[#262626]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px]">
              <SmartImage
                src={photo('photo-1516321318423-f06f85e504b3')}
                alt="Illustrative admissions guidance and academic study planning session"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between gap-10">
              <div data-gsap="reveal" className="space-y-5">
                <div className="diagonal-accent-rule" aria-hidden="true" />
                <span className="block text-xs font-bold uppercase tracking-widest text-[#FFCC00]">
                  Learning Support
                </span>
                <h3 className="heading-section text-white">Guidance Along the Way.</h3>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                  Receive academic and admissions guidance as you compare qualifications, review
                  entry requirements and map your study options with our advisory team.
                </p>
                <div className="pt-2">
                  <Link to="/admissions" className="biet-btn-primary">
                    <span>Get Admissions Guidance</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Quiet rectangular inset composition echoing TCU's split sub-panel without fabricated stats */}
              <div className="p-4 sm:p-5 bg-[#1A1A1A] border border-[#262626] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-full sm:w-40 aspect-[16/10] shrink-0 overflow-hidden bg-[#0A0A0A]">
                  <SmartImage
                    src={photo('photo-1522071820081-009f0129c71c')}
                    alt="Illustrative group coursework discussion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#FFCC00]">
                    Individual Admissions Review
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Every prospective student is encouraged to check programme-specific entry rules
                    directly with admissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H05 — Student Life */}
      <section aria-labelledby="student-life-heading" className="py-16 lg:py-24 bg-[#F4F4F5] border-b border-[#E2E2E6]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-10">
          <div
            data-gsap="reveal"
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="diagonal-accent-rule" aria-hidden="true" />
              <span className="block text-xs font-bold uppercase tracking-widest text-[#666666]">
                Student Life
              </span>
              <h2 id="student-life-heading" className="heading-section text-[#111111]">
                More than what you study. It&apos;s who you become.
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                Discover the learning environment and student experiences that support academic
                growth at BIET Campus.
              </p>
            </div>
            <Link to="/student-life" className="biet-btn-secondary-light self-start lg:self-auto">
              <span>Explore Student Experience</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <figure className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 aspect-[16/10] bg-[#1A1A1A] border border-[#E2E2E6] overflow-hidden">
                <SmartImage
                  src={photo('photo-1522202176988-66273c2fd55f')}
                  alt="Illustrative collaborative student study discussion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4">
                <div className="aspect-[16/10] md:aspect-[21/10] bg-[#1A1A1A] border border-[#E2E2E6] overflow-hidden">
                  <SmartImage
                    src={photo('photo-1524178232363-1fb2b075b655')}
                    alt="Illustrative interactive classroom presentation session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[16/10] md:aspect-[21/10] bg-[#1A1A1A] border border-[#E2E2E6] overflow-hidden">
                  <SmartImage
                    src={photo('photo-1517694712202-14dd9538aa97')}
                    alt="Illustrative computing workstation practice"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <figcaption className="text-xs text-[#666666]">
              Illustrative learning photographs used while official BIET campus gallery photography
              is compiled.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* H07 — Consultation & WhatsApp CTA Band (H06 News omitted per brief until approved stories exist) */}
      <section aria-labelledby="next-opportunity-heading" className="surface-yellow py-16 lg:py-20 bg-[#FFCC00] text-[#111111]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
              Admissions &amp; Student Guidance
            </span>
            <h2 id="next-opportunity-heading" className="heading-section text-[#111111]">
              Ready to explore your next opportunity?
            </h2>
            <p className="text-base sm:text-lg text-[#111111]/85 font-medium">
              Talk to BIET about programmes, entry requirements and your next step.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="min-h-[52px] px-7 bg-[#111111] hover:bg-[#1A1A1A] text-[#FFCC00] font-extrabold text-sm rounded-[4px] border-2 border-[#111111] transition-colors cursor-pointer"
            >
              Request a Consultation
            </button>

            {siteConfig.whatsapp.isConfigured ? (
              <WhatsAppLink
                context={{ kind: 'general' }}
                label="Chat on WhatsApp"
                className="min-h-[52px] bg-white hover:bg-[#FFF0B3] text-[#111111] border-[#111111]"
              />
            ) : (
              <Link
                to="/contact"
                className="min-h-[52px] px-6 inline-flex items-center justify-center rounded-[4px] border-2 border-[#111111] bg-white hover:bg-[#111111] hover:text-white text-[#111111] font-extrabold text-sm transition-colors"
              >
                Contact Admissions
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
