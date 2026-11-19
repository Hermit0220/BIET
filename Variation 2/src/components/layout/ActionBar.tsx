import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MessageCircle, MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl, type WhatsAppMessageContext } from '../../config/siteConfig';

interface ActionBarProps {
  visible: boolean;
  onRequestConsultation: () => void;
  whatsAppContext: WhatsAppMessageContext;
}

/**
 * ONE persistent conversion bar anchored at the bottom viewport edge.
 * - Desktop: Find My Path, Request Consultation (primary yellow), and WhatsApp (when configured)
 * - Mobile: Request Consultation (primary yellow) and WhatsApp / Contact Admissions
 * Suppressed cleanly whenever finder controls, consultation forms, or dialogs are active.
 */
export const ActionBar: React.FC<ActionBarProps> = ({
  visible,
  onRequestConsultation,
  whatsAppContext,
}) => {
  if (!visible) return null;

  const whatsAppUrl = buildWhatsAppUrl(whatsAppContext);

  return (
    <div
      role="region"
      aria-label="Persistent admissions actions"
      className="fixed bottom-0 left-0 right-0 z-[45] bg-[#111111] text-white border-t border-[#262626] shadow-2xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-[68px] sm:h-[72px] flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Left: Find My Path (Desktop) + Helper Label */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/find-my-path"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-[4px] border border-[#262626] bg-[#1A1A1A] hover:border-[#FFCC00] text-white hover:text-[#FFCC00] text-sm font-bold transition-colors whitespace-nowrap"
          >
            <Compass className="w-4 h-4 text-[#FFCC00]" aria-hidden="true" />
            <span>Find My Path</span>
          </Link>
          <span className="hidden lg:inline text-xs text-white/75">
            Explore programmes or request admissions guidance
          </span>
        </div>

        {/* Right (Desktop) / Full Row (Mobile): Request Consultation + WhatsApp */}
        <div className="flex items-center justify-end gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={onRequestConsultation}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 min-h-[46px] px-4 sm:px-6 rounded-[4px] bg-[#FFCC00] hover:bg-[#E6B800] text-[#111111] text-xs sm:text-sm font-extrabold transition-colors cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Request Consultation</span>
          </button>

          {whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with BIET admissions on WhatsApp"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 min-h-[46px] px-4 sm:px-5 rounded-[4px] bg-[#1A1A1A] hover:bg-[#262626] border border-white/25 text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          ) : (
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-4 rounded-[4px] bg-[#1A1A1A] hover:bg-[#262626] border border-white/25 text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
            >
              <span>Contact</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
