import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { LOGO } from '../../lib/assets';
import { siteConfig } from '../../config/siteConfig';

interface FooterProps {
  onRequestConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestConsultation }) => {
  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-[#262626] pb-actionbar-safe">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#262626]">
          {/* Column 1: BIET Identity */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block bg-white px-3 py-2 rounded-[4px]">
              <img
                src={LOGO}
                alt={`${siteConfig.brandDisplay} official logo`}
                className="h-9 w-auto object-contain block"
              />
            </Link>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              {siteConfig.brandDisplay} provides study pathways across business, computing,
              engineering, English and human behaviour in Sri Lanka.
            </p>
            <button
              type="button"
              onClick={onRequestConsultation}
              className="biet-btn-primary text-xs min-h-[44px] px-5"
            >
              Request a Consultation
            </button>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#FFCC00]">
              Explore BIET
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/programmes" className="hover:text-[#FFCC00] transition-colors">
                  All Programmes
                </Link>
              </li>
              <li>
                <Link to="/find-my-path" className="hover:text-[#FFCC00] transition-colors">
                  Find My Path
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-[#FFCC00] transition-colors">
                  Admissions &amp; Support
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFCC00] transition-colors">
                  About BIET
                </Link>
              </li>
              <li>
                <Link to="/student-life" className="hover:text-[#FFCC00] transition-colors">
                  Student Life
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-[#FFCC00] transition-colors">
                  News &amp; Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFCC00] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Priority Subject Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#FFCC00]">
              Study Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link
                  to="/programmes/diploma-in-business-management"
                  className="hover:text-[#FFCC00] transition-colors"
                >
                  Business Management
                </Link>
              </li>
              <li>
                <Link
                  to="/programmes/diploma-in-computing"
                  className="hover:text-[#FFCC00] transition-colors"
                >
                  Computing
                </Link>
              </li>
              <li>
                <Link
                  to="/programmes/foundation-in-engineering"
                  className="hover:text-[#FFCC00] transition-colors"
                >
                  Engineering
                </Link>
              </li>
              <li>
                <Link
                  to="/programmes/diploma-in-english"
                  className="hover:text-[#FFCC00] transition-colors"
                >
                  English
                </Link>
              </li>
              <li>
                <Link
                  to="/programmes/diploma-in-psychology"
                  className="hover:text-[#FFCC00] transition-colors"
                >
                  Psychology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Distinct Campus Locations & Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#FFCC00]">
              Campus Contact Details
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              {siteConfig.campuses.map((c) => (
                <div key={c.id} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    <div>{c.address}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#FFCC00] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.telephone.replace(/[^+0-9]/g, '')}`}
                  className="hover:text-[#FFCC00] transition-colors"
                >
                  {siteConfig.telephone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFCC00] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[#FFCC00] transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <p className="text-[11px] text-white/55">
                Campus office hours and direct WhatsApp channel subject to confirmation.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 British Institute of Engineering &amp; Technology. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy &amp; Enquiry Notice
            </Link>
            <Link to="/admissions" className="hover:text-white transition-colors">
              Admissions Information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
