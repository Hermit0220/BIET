import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { StructuredData } from '../components/seo/StructuredData';
import { ConsultationForm } from '../components/consultation/ConsultationForm';
import { WhatsAppLink } from '../components/common/WhatsAppLink';
import { siteConfig } from '../config/siteConfig';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const programmeParam = searchParams.get('programme') || '';

  return (
    <main id="main-content" className="surface-light bg-white text-[#111111]">
      <StructuredData
        pageTitle="Contact & Consultation"
        pageDescription="Contact BIET Campus in Colombo or Kandy, view campus directions, and submit an admissions consultation request."
      />

      {/* Header Band */}
      <section className="bg-[#111111] text-white py-12 lg:py-16 border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 space-y-5">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-white/70 flex items-center gap-2">
            <Link to="/" className="hover:text-[#FFCC00]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#FFCC00]">Contact</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="diagonal-accent-rule" aria-hidden="true" />
            <h1 className="heading-section text-white">Contact BIET Campus</h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              Reach our admissions team by consultation form, telephone, email or in person at our
              Colombo and Kandy locations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Split: Campus Info + Shared Consultation Form */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left 5 Cols: Verified/Draft Campus Locations & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#111111] text-white rounded-[4px] border border-[#262626] space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFCC00] block mb-1">
                  Campus Locations
                </span>
                <h2 className="text-2xl font-extrabold text-white">Colombo &amp; Kandy</h2>
                <p className="text-xs text-white/65 mt-1">
                  Addresses and phone contacts supplied in BIET content documentation (awaiting
                  final confirmation).
                </p>
              </div>

              <div className="space-y-5">
                {siteConfig.campuses.map((campus) => (
                  <div
                    key={campus.id}
                    className="p-4 bg-[#1A1A1A] border border-[#262626] rounded-[4px] space-y-2"
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#FFCC00] shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <h3 className="text-base font-extrabold text-white">{campus.name}</h3>
                        <p className="text-sm text-white/80 mt-0.5">{campus.address}</p>
                      </div>
                    </div>
                    <a
                      href={campus.mapQueryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFCC00] hover:underline pl-6"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#262626] space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FFCC00] shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.telephone.replace(/[^+0-9]/g, '')}`}
                    className="font-bold text-white hover:text-[#FFCC00]"
                  >
                    {siteConfig.telephone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FFCC00] shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-bold text-white hover:text-[#FFCC00]"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <p className="text-xs text-white/60">
                  Office hours: Subject to confirmation by BIET management.
                </p>
              </div>

              {siteConfig.whatsapp.isConfigured && (
                <div className="pt-2">
                  <WhatsAppLink
                    context={{ kind: 'general' }}
                    label="Chat on WhatsApp"
                    className="w-full bg-[#1A1A1A] hover:bg-[#262626] text-white border-white/30"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right 7 Cols: Reusable Shared Consultation Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F4F4F5] border-2 border-[#111111] rounded-[4px]">
            <ConsultationForm initialProgrammeId={programmeParam} />
          </div>
        </div>
      </section>
    </main>
  );
};
