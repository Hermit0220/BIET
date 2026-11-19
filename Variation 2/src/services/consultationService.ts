import { siteConfig } from '../config/siteConfig';

export type ContactMethod = 'whatsapp' | 'phone' | 'email';

export interface ConsultationRequestPayload {
  name: string;
  contactMethod: ContactMethod;
  contactValue: string;
  programmeId: string;
  programmeTitle: string;
  campusPreference?: string;
  preferredTime?: string;
  question?: string;
  privacyAcknowledged: boolean;
  optionalUpdatesOptIn: boolean;
  idempotencyKey: string;
}

export type ConsultationSubmissionOutcome =
  | { status: 'accepted'; reference?: string; message: string }
  | { status: 'failed'; message: string }
  | { status: 'uncertain'; message: string }
  | { status: 'unconfigured'; message: string };

export function createIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `req-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function validateConsultationInput(payload: {
  name: string;
  contactMethod: ContactMethod;
  contactValue: string;
  programmeId: string;
  privacyAcknowledged: boolean;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  const trimmedName = payload.name.trim();
  const trimmedContact = payload.contactValue.trim();

  // Accept single-word and international Unicode names (Section 14)
  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!trimmedContact) {
    errors.contactValue =
      payload.contactMethod === 'email'
        ? 'Please enter your email address.'
        : 'Please enter a valid contact number.';
  } else if (payload.contactMethod === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedContact)) {
      errors.contactValue = 'Please enter a valid email address (e.g. name@example.com).';
    }
  } else {
    const digitsOnly = trimmedContact.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 9 || digitsOnly.length > 15) {
      errors.contactValue =
        'Please enter a valid phone or WhatsApp number (9 to 15 digits, e.g. +94 7X XXX XXXX).';
    }
  }

  if (!payload.programmeId) {
    errors.programmeId = 'Please select a programme or choose "Not Sure Yet".';
  }

  if (!payload.privacyAcknowledged) {
    errors.privacyAcknowledged =
      'Please acknowledge how your details will be used to respond to your consultation request.';
  }

  return errors;
}

/**
 * Submits a consultation request to the configured BIET receiving endpoint.
 * Never fakes acceptance with setTimeout, localStorage, or browser-generated references.
 */
export async function submitConsultationRequest(
  payload: ConsultationRequestPayload,
  fetchImpl: typeof fetch = fetch,
  endpointOverride?: string
): Promise<ConsultationSubmissionOutcome> {
  const endpoint = endpointOverride ?? siteConfig.consultation.endpoint;

  if (!endpoint) {
    return {
      status: 'unconfigured',
      message:
        'Online consultation delivery is not yet connected to a live admissions inbox. Your entered details have been kept below so you can contact BIET directly by telephone or email.',
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Idempotency-Key': payload.idempotencyKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        status: 'failed',
        message:
          'We could not submit your consultation request right now. Please try again or contact BIET admissions directly.',
      };
    }

    let reference: string | undefined;
    try {
      const data = await response.json();
      if (data && typeof data.reference === 'string' && data.reference.trim()) {
        reference = data.reference.trim();
      }
    } catch {
      // Server returned 2xx without JSON reference body
    }

    return {
      status: 'accepted',
      reference,
      message: 'Your consultation request has been received.',
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        status: 'uncertain',
        message:
          'The request timed out before confirmation was received from our admissions service. Please retry safely or contact BIET directly so your request is not missed.',
      };
    }
    return {
      status: 'failed',
      message:
        'Network error prevented delivery of your consultation request. Your details have been preserved below so you can retry.',
    };
  }
}
