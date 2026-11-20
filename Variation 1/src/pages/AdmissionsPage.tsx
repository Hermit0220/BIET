import React from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  FileText,
  CheckCircle2,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/site';
import { photo } from '../lib/assets';

interface AdmissionsPageProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  onApplyClick,
  onProspectusClick,
}) => (
  <div className="bg-white text-[#111111]">
    <section className="relative overflow-hidden text-white py-16 lg:py-24 border-b border-[#1a3b61]/40 bg-[#001733]">
      {/* Background Image with Signature BIET Blue Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={photo('photo-1523240795612-9a054b0db644')}
          alt=""
          className="w-full h-full object-cover object-center transform scale-105"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#001733]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142a]/95 via-[#002147]/85 to-[#001733]/65" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <Link to="/" className="hover:text-white transition-colors text-white/60">
              Home
            </Link>
            <span aria-hidden="true" className="text-white/40">
              /
            </span>
            <span className="font-bold text-white">Admissions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
            Admissions & Enrollment
          </h1>
          <p className="text-base sm:text-lg text-neutral-200 max-w-3xl leading-relaxed">
            Clear entry criteria, structured intakes, and dedicated guidance for prospective students at BIET Colombo Campus.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onApplyClick}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Apply Now
            </button>
            <button
              onClick={onProspectusClick}
              className="px-6 py-3.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#fdc800]" />
              <span>Download Prospectus</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
            <span className="w-6 h-0.5 bg-[#fdc800]" />
            <span>Criteria</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Entry Requirements
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Review minimum qualifications based on your educational background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              pathway: 'Sri Lankan G.C.E. Advanced Level (A/L)',
              minimum: '2 to 3 Passes (S grades or above)',
              details:
                'Mathematics or Physical Science stream for Engineering. Physical Science, Bio Science, Technology, or Commerce for Computing & Quantity Surveying.',
            },
            {
              pathway: 'Cambridge & Edexcel International A-Levels',
              minimum: '2 Passes (Grade D or above)',
              details:
                'Passes in relevant mathematics and science subjects. IGCSE English Grade C / 4 satisfies language proficiency.',
            },
            {
              pathway: 'Engineering Foundation Diploma',
              minimum: 'Recognized Foundation Certificate',
              details:
                'Completion of an approved tertiary Engineering or Technology Foundation Diploma with a GPA of 2.5 or above.',
            },
            {
              pathway: 'Direct Entry / Top-up (HND / NVQ)',
              minimum: 'HND or NVQ Level 4 / 5',
              details:
                'Holders of recognized Diplomas in Engineering or Computing can be considered for Level 5 (Year 2) or Level 6 (Final Year) entry.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-3xl border border-neutral-200 hover:border-[#fdc800] transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#002147]">
                    Pathway 0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#002147] bg-[#002147]/10 px-2.5 py-0.5 rounded border border-[#002147]/20">
                    {item.minimum}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111111] mt-3 mb-2">
                  {item.pathway}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.details}</p>
              </div>
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Colombo Registry</span>
                <button
                  onClick={onApplyClick}
                  className="font-bold text-[#002147] hover:underline cursor-pointer"
                >
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
            <span className="w-6 h-0.5 bg-[#fdc800]" />
            <span>Procedure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            How to Apply
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Simple 4-step application procedure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-white rounded-3xl border border-neutral-200 hover:border-[#fdc800] transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#fdc800] text-[#002147] flex items-center justify-center font-black text-base shadow-2xs">
              1
            </div>
            <h3 className="text-base font-bold text-[#111111]">Select Programme</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Choose your degree track in Engineering, Computing, or Built Environment.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-neutral-200 hover:border-[#fdc800] transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#fdc800] text-[#002147] flex items-center justify-center font-black text-base shadow-2xs">
              2
            </div>
            <h3 className="text-base font-bold text-[#111111]">Submit Details</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Complete the online form with your examination records and contact info.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-neutral-200 hover:border-[#fdc800] transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#fdc800] text-[#002147] flex items-center justify-center font-black text-base shadow-2xs">
              3
            </div>
            <h3 className="text-base font-bold text-[#111111]">Admissions Review</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our faculty advisors evaluate qualifications and discuss your degree pathway.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-neutral-200 hover:border-[#fdc800] transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#fdc800] text-[#002147] flex items-center justify-center font-black text-base shadow-2xs">
              4
            </div>
            <h3 className="text-base font-bold text-[#111111]">Enrolment</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Receive your offer letter, confirm your registration, and attend orientation.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#002147]" />
            <span>Required Documents</span>
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-700">
            {[
              'Certified copies of G.C.E. A/L or London A/L Examination certificates.',
              'Certified copy of G.C.E. O/L certificate with Mathematics pass.',
              'Copy of National Identity Card (N.I.C.) or valid Passport.',
              'Four passport-sized color photographs.',
              'For direct entry: Official academic transcripts and diploma certificates.',
            ].map((doc, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#002147] shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
              <Calendar className="w-4 h-4 text-[#002147]" />
              <span>Intakes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Upcoming Intakes
            </h2>
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-3xl border border-neutral-200 hover:border-[#fdc800] transition-all space-y-2 shadow-xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#111111] uppercase tracking-wider">
                    Autumn Intake
                  </span>
                  <span className="font-bold text-[#002147] bg-[#fdc800]/25 px-2.5 py-0.5 rounded">
                    Open
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111111]">
                  September 2026 Cohort
                </h3>
                <p className="text-xs text-neutral-600">
                  Orientation commences in September. Early registration recommended.
                </p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-neutral-200 hover:border-[#fdc800] transition-all space-y-2 shadow-xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#111111] uppercase tracking-wider">
                    Spring Intake
                  </span>
                  <span className="font-bold text-[#111111] bg-neutral-100 px-2.5 py-0.5 rounded border border-neutral-200">
                    Open
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111111]">
                  February 2027 Cohort
                </h3>
                <p className="text-xs text-neutral-600">
                  Suitable for students receiving late exam results or diploma transfer students.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002147]">
              <CreditCard className="w-4 h-4 text-[#002147]" />
              <span>Fees & Payment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Tuition Plans
            </h2>
            <div className="p-8 bg-white text-[#111111] rounded-3xl border-2 border-neutral-200 space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-[#111111]">
                Flexible Payment Structure
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                BIET offers semester payment options, installment plans, and academic merit scholarships.
              </p>
              <div className="space-y-2.5 pt-2 text-xs text-neutral-700">
                <div className="flex justify-between p-3 bg-white rounded-xl border border-neutral-200">
                  <span>Payment Options:</span>
                  <span className="font-bold text-[#111111]">
                    Semester / Monthly Installments
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-white rounded-xl border border-neutral-200">
                  <span>Merit Scholarships:</span>
                  <span className="font-bold text-[#111111]">
                    Available for high achievers
                  </span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">
                  Request detailed fee sheet
                </span>
                <button
                  onClick={onProspectusClick}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-lg transition-colors cursor-pointer"
                >
                  Fee Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
          Speak with Admissions
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
          Contact our admissions desk in Colombo for guidance on programmes and enrollment.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="font-semibold text-[#002147]">
            Telephone: {INSTITUTION_INFO.telephonePlaceholder}
          </span>
          <span className="text-neutral-300">·</span>
          <span className="font-semibold text-[#002147]">
            Email: {INSTITUTION_INFO.emailPlaceholder}
          </span>
        </div>
        <div className="pt-2">
          <button
            onClick={onApplyClick}
            className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  </div>
);
