import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, type WhatsAppMessageContext } from '../../config/siteConfig';

interface WhatsAppLinkProps {
  context: WhatsAppMessageContext;
  label?: string;
  className?: string;
  fallbackToContact?: boolean;
  onFallbackClick?: () => void;
}

export const WhatsAppLink: React.FC<WhatsAppLinkProps> = ({
  context,
  label = 'Chat on WhatsApp',
  className = '',
  fallbackToContact = false,
  onFallbackClick,
}) => {
  const url = buildWhatsAppUrl(context);

  if (!url) {
    if (fallbackToContact && onFallbackClick) {
      return (
        <button
          type="button"
          onClick={onFallbackClick}
          className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-[4px] border-2 border-neutral-400 text-sm font-semibold cursor-pointer ${className}`}
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>WhatsApp Pending Confirmation</span>
        </button>
      );
    }
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens WhatsApp in a new tab)`}
      className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-[4px] border-2 border-current font-bold text-sm transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
};
