import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, CheckCircle2, Info } from 'lucide-react';
import { StructuredData } from '../components/seo/StructuredData';

interface AdmissionsPageProps {
  onOpenConsultation: () => void;
}

const ENTRY_PATHWAYS = [
  {
    title: 'After G.C.E. O/Ls',
    subtitle: 'Foundation & Entry-Level Study',
    description:
      'Explore foundational and introductory programmes intended to prepare eligible learners for further diploma or technical education. Admission depends on specific programme entry rules.',
  },
  {
    title: 'After G.C.E. A/Ls',
    subtitle: 'Diploma & Higher Qualification Entry',
    description:
      'Local Sri Lankan A/L or Cambridge / Edexcel International A-Level holders can explore aligned diploma and higher-level qualifications subject to programme-specific subject criteria.',
  },
  {
    title: 'Holding Prior Qualifications',
    subtitle: 'Continuing Education & Progression',
    description:
      'Holders of recognised certificates, diplomas, or HNDs can discuss further study or progression routes with our admissions team. Credit transfer and advanced standing are never automatic.',
  },
  {
    title: 'Developing Professional Skills',
    subtitle: 'Skill Building & Part-Time Options',
    description:
      'Working learners looking to strengthen business, computing, English or technical knowledge can consult BIET admissions on confirmed weekend or blended availability.',
  },
];

const ADMISSIONS_FAQS = [
  {
    q: 'Can students apply for BIET programmes after completing O/Ls?',
    a: 'Yes—students who have completed G.C.E. O/Ls (Local or Cambridge/Edexcel IGCSE) can explore foundation and introductory study options. Exact subject grade criteria vary by programme and are reviewed by admissions.',
  },
  {
    q: 'What if I am awaiting my O/L or A/L examination results?',
    a: 'You can still use Find My Path or submit a consultation enquiry with BIET admissions. Your pending results are never treated as a failure; our team will explain what happens once official grades are released.',
  },
  {
    q: 'How do I check confirmed fees and upcoming intake schedules?',
    a: 'Fee structures, installment options and confirmed intake commencement dates are shared directly by our admissions advisors for your selected programme. No online checkout or card payment occurs on this website.',
  },
  {
    q: 'Does completing one qualification guarantee entry or credit transfer into a degree?',
    a: 'No. Entry and progression requirements vary per qualification and depend on confirmed institutional criteria and academic review.',
  },
];

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onOpenConsultation }) => (
  <main id="main-content" className="surface-light bg-white text-[#111111]">
    <StructuredData
      pageTitle="Admissions & Student Support"
      pageDescription="Explore entry points after O/Ls, A/Ls or prior qualifications, request an admissions consultation, and check enquiry guidance at BIET Campus."
    />

    <section className="bg-[#111111] text-white py-12 lg:py-16 border-b border-[#262626]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-5">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold text-white/70 flex items-center gap-2">
          <Link to="/" className="hover:text-[#FFCC00]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#FFCC00]">Admissions &amp; Support</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="diagonal-accent-rule" aria-hidden="true" />
          <h1 className="heading-section text-white">Admissions &amp; Consultation Guidance</h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Understand how to explore programmes, review academic entry requirements and request
            personal guidance from BIET&apos;s admissions team.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button type="button" onClick={onOpenConsultation} className="biet-btn-primary text-sm">
            Request a Consultation
          </button>
          <Link to="/find-my-path" className="biet-btn-secondary-dark text-sm">
            <Compass className="w-4 h-4 text-[#FFCC00]" aria-hidden="true" />
            <span>Open Find My Path</span>
          </Link>
        </div>
      </div>
    </section>

    {/* Entry Pathways */}
    <section className="py-16 lg:py-20 bg-white border-b border-[#E2E2E6]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#666666] block">
            Starting Stages
          </span>
          <h2 className="heading-section text-[#111111]">Academic Entry Points</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENTRY_PATHWAYS.map((p) => (
            <div
              key={p.title}
              className="p-6 sm:p-8 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                  {p.subtitle}
                </span>
                <h3 className="text-xl font-extrabold text-[#111111]">{p.title}</h3>
                <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                  {p.description}
                </p>
              </div>
              <Link
                to="/find-my-path"
                className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#111111] underline pt-2"
              >
                <span>Check options in Find My Path</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Consultation Steps (Honest phase boundary: no formal document upload or payment gateway) */}
    <section className="py-16 bg-[#F4F4F5] border-b border-[#E2E2E6]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            How the Admissions Enquiry Process Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Explore Programmes or Find My Path',
              text: 'Browse the full programme directory or answer four quick steps to narrow down study options aligned with your interests.',
            },
            {
              step: '02',
              title: 'Request an Admissions Consultation',
              text: 'Share your name, preferred contact method and programme of interest so BIET admissions can advise on entry requirements, schedules and fees.',
            },
            {
              step: '03',
              title: 'Individual Qualification Review',
              text: 'Admissions advisors confirm eligibility, intake availability and next formal enrolment steps directly with you.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 bg-white border border-[#E2E2E6] rounded-[4px] space-y-2"
            >
              <span className="inline-block px-2.5 py-1 bg-[#111111] text-[#FFCC00] font-mono text-xs font-extrabold rounded-[4px]">
                STEP {item.step}
              </span>
              <h3 className="text-lg font-extrabold text-[#111111] pt-1">{item.title}</h3>
              <p className="text-sm text-[#666666] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#FFF0B3] border-2 border-[#111111] rounded-[4px] flex items-start gap-3 text-sm text-[#111111]">
          <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            Submitting a consultation request on this website starts an admissions enquiry and is
            not an automatic academic admission or confirmed appointment slot. Programme-specific
            intake availability (including future 2027 cohorts) is confirmed by admissions.
          </p>
        </div>
      </div>
    </section>

    {/* FAQs */}
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 max-w-4xl space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {ADMISSIONS_FAQS.map((faq) => (
            <details
              key={faq.q}
              className="p-5 bg-[#F4F4F5] border border-[#E2E2E6] rounded-[4px]"
            >
              <summary className="text-sm sm:text-base font-extrabold text-[#111111] cursor-pointer flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{faq.q}</span>
              </summary>
              <p className="text-sm text-[#666666] mt-2.5 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  </main>
);
