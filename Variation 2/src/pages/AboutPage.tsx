import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass } from 'lucide-react';
import { StructuredData } from '../components/seo/StructuredData';
import { SmartImage } from '../components/ui/SmartImage';
import { photo } from '../lib/assets';
import { siteConfig } from '../config/siteConfig';

interface AboutPageProps {
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => (
  <main id="main-content" className="surface-light bg-white text-[#111111]">
    <StructuredData
      pageTitle="About BIET Campus"
      pageDescription="Learn about BIET Campus Sri Lanka, our academic approach, student pathways and admissions support."
    />

    {/* Editorial Header Band */}
    <section className="bg-[#111111] text-white py-12 lg:py-16 border-b border-[#262626]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-5">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold text-white/70 flex items-center gap-2">
          <Link to="/" className="hover:text-[#FFCC00]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#FFCC00]">About BIET</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="diagonal-accent-rule" aria-hidden="true" />
          <h1 className="heading-section text-white">About {siteConfig.brandDisplay}</h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Education shaped around your ambitions—bringing together subject knowledge,
            structured study pathways and admissions guidance in Sri Lanka.
          </p>
        </div>
      </div>
    </section>

    {/* Institutional Philosophy & Illustrative Story Split */}
    <section className="py-16 lg:py-24 bg-white border-b border-[#E2E2E6]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#666666] block">
            Educational Approach
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] leading-tight">
            Practical Relevance &amp; Academic Mentorship
          </h2>
          <p className="text-base text-[#666666] leading-relaxed">
            At {siteConfig.brandDisplay}, education is about developing the subject understanding
            and confidence needed for your next academic or career step across business,
            computing, engineering, English and human behaviour.
          </p>
          <p className="text-base text-[#666666] leading-relaxed">
            Our teams support learners at distinct starting stages—from foundation study after O/Ls
            and post-A/L diploma programmes through to advanced qualifications and progression
            opportunities subject to approved institutional criteria.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button type="button" onClick={onOpenConsultation} className="biet-btn-primary text-sm">
              Request a Consultation
            </button>
            <Link to="/programmes" className="biet-btn-secondary-light text-sm">
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <figure className="space-y-2">
            <div className="tcu-diagonal-photo-left aspect-[16/10] w-full overflow-hidden bg-[#1A1A1A] border border-[#E2E2E6]">
              <SmartImage
                src={photo('photo-1531482615713-2afd69097998')}
                alt="Illustrative lecturer-led collaborative learning discussion"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-xs text-[#666666]">
              Illustrative classroom mentorship imagery pending approved BIET photography.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    {/* Expandable Institutional Details (No Invented Timelines or Unverified Claims) */}
    <section className="py-16 lg:py-20 bg-[#F4F4F5] border-b border-[#E2E2E6]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            Governance, Partnerships &amp; Transparency
          </h2>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            Programme-level awarding relationships, accreditation documentation and governance
            records are represented strictly per verified institutional confirmation.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          <details className="p-5 bg-white border border-[#E2E2E6] rounded-[4px]" open>
            <summary className="text-base font-extrabold text-[#111111] cursor-pointer">
              Subject Areas &amp; Priority Study Pathways
            </summary>
            <ul className="mt-3 space-y-2 text-sm text-[#666666]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Business &amp; Management, Computing &amp; Technology, Engineering Foundation, English and Psychology priority programmes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Reconciled higher-level engineering, AI, cyber security, software engineering and built environment pathways in the full directory.</span>
              </li>
            </ul>
          </details>

          <details className="p-5 bg-white border border-[#E2E2E6] rounded-[4px]">
            <summary className="text-base font-extrabold text-[#111111] cursor-pointer">
              Awarding Bodies &amp; Academic Relationships
            </summary>
            <p className="mt-3 text-sm text-[#666666] leading-relaxed">
              Academic partnerships, credit-transfer arrangements and awarding-institution details
              apply at the individual programme level and are shared clearly on each approved
              programme specification or during admissions consultation.
            </p>
          </details>

          <details className="p-5 bg-white border border-[#E2E2E6] rounded-[4px]">
            <summary className="text-base font-extrabold text-[#111111] cursor-pointer">
              Campus Locations
            </summary>
            <div className="mt-3 space-y-2 text-sm text-[#666666]">
              {siteConfig.campuses.map((c) => (
                <div key={c.id}>
                  <strong className="text-[#111111]">{c.name}:</strong> {c.address}
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>

    {/* Bottom Action */}
    <section className="py-14 bg-[#111111] text-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">Explore Study Pathways</h2>
          <p className="text-sm text-white/75">
            Find study options tailored to your qualifications or request guidance.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/find-my-path" className="biet-btn-primary text-sm">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Find My Path</span>
          </Link>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="biet-btn-secondary-dark text-sm"
          >
            Request Consultation
          </button>
        </div>
      </div>
    </section>
  </main>
);
