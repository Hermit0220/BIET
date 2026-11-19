import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { getActiveCatalogue, getProgrammeBySlugOrId } from '../data/catalogue';
import { StructuredData } from '../components/seo/StructuredData';
import { SmartImage } from '../components/ui/SmartImage';
import { WhatsAppLink } from '../components/common/WhatsAppLink';
import { siteConfig } from '../config/siteConfig';

interface ProgrammeDetailPageProps {
  onOpenConsultation: (programmeId?: string) => void;
}

export const ProgrammeDetailPage: React.FC<ProgrammeDetailPageProps> = ({
  onOpenConsultation,
}) => {
  const { programmeId } = useParams<{ programmeId: string }>();
  const programme = useMemo(() => getProgrammeBySlugOrId(programmeId), [programmeId]);
  const [modulesExpanded, setModulesExpanded] = useState(false);

  const activeCatalogue = useMemo(() => getActiveCatalogue(), []);

  if (!programme) {
    return (
      <main id="main-content" className="surface-light bg-white text-[#111111] py-20 px-5">
        <div className="max-w-xl mx-auto p-8 bg-[#F4F4F5] border-2 border-[#111111] rounded-[4px] text-center space-y-4">
          <h1 className="text-2xl font-extrabold text-[#111111]">Programme Not Found</h1>
          <p className="text-sm text-[#666666]">
            The requested programme page could not be located in the current BIET directory.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link to="/programmes" className="biet-btn-primary text-sm">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Browse All Programmes</span>
            </Link>
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="biet-btn-secondary-light text-sm"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Honest archived/unavailable state (Section 03)
  if (programme.availability === 'archived-unavailable') {
    const activeAlternatives = activeCatalogue
      .filter((p) => programme.relatedIds.includes(p.id) || p.marketingPriority)
      .slice(0, 3);

    return (
      <main id="main-content" className="surface-light bg-white text-[#111111] py-16 px-5">
        <StructuredData
          programme={programme}
          pageTitle={programme.title}
          pageDescription="Programme currently unavailable for new enrolment."
        />
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="p-8 bg-[#F4F4F5] border-2 border-[#111111] rounded-[4px] space-y-4">
            <span className="inline-block px-3 py-1 bg-[#111111] text-[#FFCC00] text-xs font-extrabold uppercase rounded-[4px]">
              Currently Unavailable
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              {programme.title}
            </h1>
            <p className="text-base text-[#666666] leading-relaxed">{programme.overview}</p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/programmes" className="biet-btn-primary text-sm">
                View Available Programmes
              </Link>
              <button
                type="button"
                onClick={() => onOpenConsultation()}
                className="biet-btn-secondary-light text-sm"
              >
                Ask Admissions
              </button>
            </div>
          </div>

          {activeAlternatives.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-[#111111]">Active Study Alternatives</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeAlternatives.map((alt) => (
                  <Link
                    key={alt.id}
                    to={`/programmes/${alt.slug}`}
                    className="p-4 bg-[#111111] text-white rounded-[4px] border border-[#262626] hover:border-[#FFCC00]"
                  >
                    <span className="text-[11px] font-bold uppercase text-[#FFCC00] block">
                      {alt.category}
                    </span>
                    <span className="text-sm font-extrabold block mt-1">{alt.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  const relatedProgrammes = useMemo(() => {
    const explicitlyLinked = activeCatalogue.filter(
      (p) => p.id !== programme.id && programme.relatedIds.includes(p.id)
    );
    if (explicitlyLinked.length >= 2) return explicitlyLinked.slice(0, 3);
    const sameCategory = activeCatalogue.filter(
      (p) =>
        p.id !== programme.id &&
        p.category === programme.category &&
        !explicitlyLinked.some((e) => e.id === p.id)
    );
    return [...explicitlyLinked, ...sameCategory].slice(0, 3);
  }, [activeCatalogue, programme]);

  const displayedModules = modulesExpanded
    ? programme.curriculumModules
    : programme.curriculumModules.slice(0, 8);

  return (
    <main id="main-content" className="surface-light bg-white text-[#111111] pb-16">
      <StructuredData
        programme={programme}
        pageTitle={programme.title}
        pageDescription={programme.shortDescription}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-[#111111] text-white border-b border-[#262626] py-3.5 px-5 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4 text-xs">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-white/70">
            <Link to="/" className="hover:text-[#FFCC00]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/programmes" className="hover:text-[#FFCC00]">
              Programmes
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#FFCC00] font-bold">{programme.title}</span>
          </nav>

          <Link
            to="/programmes"
            className="hidden sm:inline-flex items-center gap-1.5 text-white/80 hover:text-[#FFCC00] font-semibold shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Directory</span>
          </Link>
        </div>
      </div>

      {/* Desktop Split Hero Fold: Title, Summary, Verified Quick Facts & Enquiry Actions beside Rectangular Media */}
      <section className="py-12 lg:py-16 border-b border-[#E2E2E6] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wider">
                <span className="px-3 py-1 bg-[#111111] text-[#FFCC00] rounded-[4px]">
                  {programme.category}
                </span>
                <span className="px-3 py-1 bg-[#F4F4F5] text-[#111111] border border-[#E2E2E6] rounded-[4px]">
                  {programme.qualificationLevel}
                </span>
              </div>

              <h1 className="heading-section text-[#111111]">{programme.title}</h1>

              {programme.titleConfirmationNote && (
                <p className="text-xs font-semibold text-[#666666] bg-[#F4F4F5] border-l-4 border-[#FFCC00] px-3.5 py-2">
                  {programme.titleConfirmationNote}
                </p>
              )}

              <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
                {programme.overview}
              </p>

              {/* Verified Quick Facts Strip (omits repeated "TBC" walls; offers one honest admissions prompt if facts await confirmation) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {programme.duration && (
                  <div className="p-3.5 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Duration
                    </div>
                    <div className="text-sm font-extrabold text-[#111111] mt-0.5">
                      {programme.duration}
                    </div>
                  </div>
                )}
                {programme.deliveryModes.length > 0 && (
                  <div className="p-3.5 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Delivery Mode
                    </div>
                    <div className="text-sm font-extrabold text-[#111111] mt-0.5">
                      {programme.deliveryModes.join(' / ')}
                    </div>
                  </div>
                )}
                {programme.awardingBody && (
                  <div className="p-3.5 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Awarding Institution
                    </div>
                    <div className="text-sm font-extrabold text-[#111111] mt-0.5">
                      {programme.awardingBody}
                    </div>
                  </div>
                )}
                {programme.confirmedIntakes.length > 0 && (
                  <div className="p-3.5 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Confirmed Intakes
                    </div>
                    <div className="text-sm font-extrabold text-[#111111] mt-0.5">
                      {programme.confirmedIntakes.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {(!programme.duration ||
                !programme.awardingBody ||
                programme.confirmedIntakes.length === 0) && (
                <p className="text-xs text-[#666666] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                  <span>
                    Ask admissions about confirmed duration, awarding details, schedules and upcoming
                    intake dates for this programme.
                  </span>
                </p>
              )}

              {/* Primary Consultation + Secondary WhatsApp */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(programme.id)}
                  className="biet-btn-primary px-7"
                >
                  Request Consultation
                </button>

                {siteConfig.whatsapp.isConfigured && (
                  <WhatsAppLink
                    context={{ kind: 'programme', programmeTitle: programme.title }}
                    label="WhatsApp About This Programme"
                    className="biet-btn-secondary-light"
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="space-y-2">
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#1A1A1A] border border-[#E2E2E6] rounded-[4px]">
                  <SmartImage
                    src={programme.media.imageUrl}
                    alt={programme.media.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-xs text-[#666666]">
                  {programme.media.caption}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Structured 7 Content Sections below overview */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-14 space-y-12">
        {/* 1. What you will learn */}
        <section aria-labelledby="learn-heading" className="max-w-4xl space-y-4">
          <h2 id="learn-heading" className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            1. What You Will Learn
          </h2>
          {programme.learningOutcomes.length > 0 ? (
            <ul className="space-y-2.5">
              {programme.learningOutcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-[#111111]">
                  <CheckCircle2
                    className="w-5 h-5 text-[#111111] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base text-[#666666]">
              Detailed programme learning outcomes are available upon consultation with BIET
              admissions.
            </p>
          )}
        </section>

        {/* 2. Entry requirements */}
        <section
          aria-labelledby="entry-heading"
          className="max-w-4xl pt-8 border-t border-[#E2E2E6] space-y-4"
        >
          <h2 id="entry-heading" className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            2. Entry Requirements
          </h2>
          {programme.entryRequirements.length > 0 ? (
            <div className="space-y-2.5">
              {programme.entryRequirements.map((req, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-1"
                >
                  <div className="text-sm sm:text-base font-bold text-[#111111]">
                    {req.statement}
                  </div>
                  <div className="text-xs text-[#666666]">Source: {req.source}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] text-sm text-[#111111]">
              Entry requirements vary by academic pathway (after O/Ls, after A/Ls or prior study)
              and are confirmed individually by BIET admissions.{' '}
              <button
                type="button"
                onClick={() => onOpenConsultation(programme.id)}
                className="font-extrabold underline cursor-pointer ml-1"
              >
                Request an eligibility check →
              </button>
            </div>
          )}
        </section>

        {/* 3. Modules / Curriculum and Assessment */}
        <section
          aria-labelledby="curriculum-heading"
          className="max-w-4xl pt-8 border-t border-[#E2E2E6] space-y-4"
        >
          <h2 id="curriculum-heading" className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            3. Curriculum &amp; Assessment
          </h2>

          {programme.assessmentSummary && (
            <p className="text-sm sm:text-base text-[#666666]">
              <strong className="text-[#111111]">Assessment overview:</strong>{' '}
              {programme.assessmentSummary}
            </p>
          )}

          {programme.curriculumModules.length > 0 ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {displayedModules.map((mod, idx) => (
                  <div
                    key={`${mod.title}-${idx}`}
                    className="p-3.5 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] flex items-center justify-between gap-2"
                  >
                    <div>
                      {mod.stage && (
                        <span className="text-[11px] font-mono text-[#666666] block">
                          {mod.stage}
                        </span>
                      )}
                      <span className="text-sm font-bold text-[#111111]">{mod.title}</span>
                    </div>
                    {mod.credits && (
                      <span className="text-xs font-mono font-semibold text-[#666666] shrink-0">
                        {mod.credits}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {programme.curriculumModules.length > 8 && (
                <button
                  type="button"
                  onClick={() => setModulesExpanded((prev) => !prev)}
                  aria-expanded={modulesExpanded}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 bg-[#111111] text-[#FFCC00] text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer"
                >
                  {modulesExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      <span>Show Fewer Modules</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      <span>Show All {programme.curriculumModules.length} Modules</span>
                    </>
                  )}
                </button>
              )}
            </div>
          ) : (
            <p className="text-sm sm:text-base text-[#666666]">
              Detailed module outline is under BIET confirmation and can be requested directly
              from our academic advisors.
            </p>
          )}
        </section>

        {/* 4. Study Arrangements */}
        <section
          aria-labelledby="arrangements-heading"
          className="max-w-4xl pt-8 border-t border-[#E2E2E6] space-y-4"
        >
          <h2 id="arrangements-heading" className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            4. Study Arrangements &amp; Intake Availability
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]">
              <div className="text-xs font-bold uppercase text-[#666666]">Campus Availability</div>
              <div className="text-sm font-bold text-[#111111] mt-1">
                {programme.campuses.length > 0
                  ? programme.campuses.join(', ')
                  : 'Confirmed per intake via admissions'}
              </div>
            </div>
            <div className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]">
              <div className="text-xs font-bold uppercase text-[#666666]">Study Schedule</div>
              <div className="text-sm font-bold text-[#111111] mt-1">
                {programme.schedule || 'Confirmed per intake via admissions'}
              </div>
            </div>
            <div className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]">
              <div className="text-xs font-bold uppercase text-[#666666]">Intake Status</div>
              <div className="text-sm font-bold text-[#111111] mt-1">
                {programme.intakeStatus || 'Ask admissions for confirmed intake dates'}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Progression Opportunities */}
        <section
          aria-labelledby="progression-heading"
          className="max-w-4xl pt-8 border-t border-[#E2E2E6] space-y-4"
        >
          <h2 id="progression-heading" className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            5. Academic Progression Opportunities
          </h2>
          {programme.progressionOpportunities.length > 0 ? (
            <div className="space-y-3">
              {programme.progressionOpportunities.map((opp, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-1"
                >
                  <div className="text-sm font-bold text-[#111111]">{opp.statement}</div>
                  <div className="text-xs text-[#666666]">{opp.conditions}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm sm:text-base text-[#666666]">
              Progression and further study options depend on completed grades and confirmed
              institutional pathways. Speak with admissions to review progression criteria.
            </p>
          )}
        </section>

        {/* 6. Fees or Fee Enquiry (Zero payment collection) */}
        <section
          aria-labelledby="fees-heading"
          className="max-w-4xl pt-8 border-t border-[#E2E2E6] space-y-4"
        >
          <h2 id="fees-heading" className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            6. Fee Information &amp; Enquiry
          </h2>
          <div className="p-5 bg-[#FFF0B3] border-2 border-[#111111] rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm sm:text-base font-semibold text-[#111111]">{programme.feeNote}</p>
            <button
              type="button"
              onClick={() => onOpenConsultation(programme.id)}
              className="biet-btn-secondary-light text-xs min-h-[44px] shrink-0"
            >
              Enquire About Fees
            </button>
          </div>
        </section>

        {/* 7. Relevant FAQs & Real Brochure */}
        <section
          aria-labelledby="faqs-heading"
          className="max-w-4xl pt-8 border-t border-[#E2E2E6] space-y-4"
        >
          <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            7. Frequently Asked Questions &amp; Brochure
          </h2>

          {programme.brochureUrl ? (
            <a
              href={programme.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="biet-btn-primary text-sm inline-flex"
            >
              Download Official Programme Brochure (PDF)
            </a>
          ) : (
            <p className="text-sm text-[#666666]">
              Official PDF brochure awaiting upload.{' '}
              <button
                type="button"
                onClick={() => onOpenConsultation(programme.id)}
                className="font-extrabold text-[#111111] underline cursor-pointer"
              >
                Request full course details from admissions
              </button>
              .
            </p>
          )}

          {programme.faqs.length > 0 && (
            <div className="space-y-3 pt-2">
              {programme.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="p-4 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]"
                >
                  <summary className="text-sm sm:text-base font-extrabold text-[#111111] cursor-pointer">
                    {faq.q}
                  </summary>
                  <p className="text-sm text-[#666666] mt-2 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          )}
        </section>

        {/* Related Programmes (2–3 max) */}
        {relatedProgrammes.length > 0 && (
          <section aria-labelledby="related-heading" className="pt-10 border-t border-[#E2E2E6] space-y-6">
            <h2 id="related-heading" className="text-2xl font-extrabold text-[#111111]">
              Related Programmes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProgrammes.map((rel) => (
                <article
                  key={rel.id}
                  className="bg-[#111111] text-white border border-[#262626] rounded-[4px] overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFCC00]">
                      {rel.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-white">
                      <Link to={`/programmes/${rel.slug}`} className="hover:text-[#FFCC00]">
                        {rel.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-white/75 line-clamp-2">{rel.shortDescription}</p>
                  </div>
                  <div className="px-6 pb-5">
                    <Link
                      to={`/programmes/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FFCC00] hover:underline"
                    >
                      <span>View Programme</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
