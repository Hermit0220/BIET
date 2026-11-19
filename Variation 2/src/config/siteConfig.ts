export interface CampusContactInfo {
  id: 'colombo' | 'kandy';
  name: string;
  address: string;
  classificationNote: string;
  mapQueryUrl: string;
  status: 'pending-confirmation' | 'confirmed';
}

const AUDITED_PLACEHOLDER_WHATSAPP = new Set(['94112345678', '0112345678']);

function resolveVerifiedWhatsAppDigits(): string | null {
  const raw = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').toString().trim();
  if (!raw) return null;
  const digits = raw.replace(/[^0-9]/g, '');
  if (AUDITED_PLACEHOLDER_WHATSAPP.has(digits)) return null;
  if (!/^[1-9][0-9]{9,14}$/.test(digits)) return null;
  return digits;
}

const verifiedWhatsAppDigits = resolveVerifiedWhatsAppDigits();

export type WhatsAppMessageContext =
  | { kind: 'general' }
  | { kind: 'programme'; programmeTitle: string }
  | { kind: 'finder'; subjectOrProgramme: string };

export function buildWhatsAppMessage(context: WhatsAppMessageContext): string {
  switch (context.kind) {
    case 'programme':
      return `Hello BIET, I would like to discuss ${context.programmeTitle} and request a consultation.`;
    case 'finder':
      return `Hello BIET, I used Find My Path and would like to discuss ${context.subjectOrProgramme}.`;
    case 'general':
    default:
      return 'Hello BIET, I would like to request a consultation about your programmes.';
  }
}

export function buildWhatsAppUrl(context: WhatsAppMessageContext): string | null {
  if (!verifiedWhatsAppDigits) return null;
  const text = encodeURIComponent(buildWhatsAppMessage(context));
  return `https://wa.me/${verifiedWhatsAppDigits}?text=${text}`;
}

export const siteConfig = {
  brandDisplay: 'BIET Campus',
  legalName: 'British Institute of Engineering and Technology (BIET)',
  tagline: 'Explore Your Possibilities',
  websiteUrl: 'https://biet.edu.lk',
  telephone: '+94 71 873 4226',
  telephoneStatus: 'pending-confirmation' as const,
  email: 'info@biet.edu.lk',
  emailStatus: 'pending-confirmation' as const,
  officeHours: null as string | null, // Awaiting official confirmation per BIET Website Content.docx

  campuses: [
    {
      id: 'colombo',
      name: 'Colombo Campus',
      address: 'No. 2, Castle Lane, Colombo 04, Sri Lanka',
      classificationNote: 'Main campus details supplied in draft documentation — awaiting final confirmation.',
      mapQueryUrl: 'https://maps.google.com/?q=No.+2,+Castle+Lane,+Colombo+04,+Sri+Lanka',
      status: 'pending-confirmation',
    },
    {
      id: 'kandy',
      name: 'Kandy Campus',
      address: 'No. 675, William Gopallawa Mawatha, Kandy, Sri Lanka',
      classificationNote: 'Kandy location details supplied in draft documentation — awaiting final confirmation.',
      mapQueryUrl:
        'https://maps.google.com/?q=No.+675,+William+Gopallawa+Mawatha,+Kandy,+Sri+Lanka',
      status: 'pending-confirmation',
    },
  ] satisfies CampusContactInfo[],

  whatsapp: {
    isConfigured: Boolean(verifiedWhatsAppDigits),
    digits: verifiedWhatsAppDigits,
    statusNote: verifiedWhatsAppDigits
      ? 'Configured via environment settings.'
      : 'Verified WhatsApp admissions number pending BIET confirmation.',
  },

  consultation: {
    endpoint: (import.meta.env.VITE_CONSULTATION_ENDPOINT ?? '').toString().trim(),
    get isConfigured(): boolean {
      return Boolean(this.endpoint);
    },
  },

  studentServices: {
    studentPortalUrl: null as string | null,
    certificateVerificationUrl: null as string | null,
  },

  socials: [
    // Only populate once official verified BIET URLs are confirmed
  ] as { label: string; url: string }[],
} as const;
