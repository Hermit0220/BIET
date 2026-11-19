import React, { useState, useEffect, useId, useMemo } from 'react';
import {
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Mail,
} from 'lucide-react';
import { getActiveCatalogue } from '../../data/catalogue';
import { siteConfig } from '../../config/siteConfig';
import {
  createIdempotencyKey,
  submitConsultationRequest,
  validateConsultationInput,
  type ContactMethod,
  type ConsultationSubmissionOutcome,
} from '../../services/consultationService';
import { WhatsAppLink } from '../common/WhatsAppLink';

interface ConsultationFormProps {
  initialProgrammeId?: string;
  initialQuestion?: string;
  onSuccess?: (outcome: ConsultationSubmissionOutcome) => void;
  variant?: 'light' | 'modal';
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialProgrammeId = '',
  initialQuestion = '',
  onSuccess,
}) => {
  const formId = useId();
  const catalogue = useMemo(() => getActiveCatalogue(), []);

  const resolvedInitialProgramme = useMemo(() => {
    if (!initialProgrammeId) return 'not-sure';
    const found = catalogue.find(
      (p) =>
        p.id === initialProgrammeId ||
        p.slug === initialProgrammeId ||
        p.title === initialProgrammeId ||
        (p.legacyIds && p.legacyIds.includes(initialProgrammeId))
    );
    return found ? found.id : 'not-sure';
  }, [initialProgrammeId, catalogue]);

  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [programmeId, setProgrammeId] = useState<string>(resolvedInitialProgramme);
  const [campusPreference, setCampusPreference] = useState('no-preference');
  const [preferredTime, setPreferredTime] = useState('');
  const [question, setQuestion] = useState(initialQuestion);
  const [showOptional, setShowOptional] = useState(false);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [optionalUpdatesOptIn, setOptionalUpdatesOptIn] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<ConsultationSubmissionOutcome | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState<string>(() => createIdempotencyKey());

  useEffect(() => {
    setProgrammeId(resolvedInitialProgramme);
  }, [resolvedInitialProgramme]);

  const selectedProgrammeObj = useMemo(
    () => catalogue.find((p) => p.id === programmeId),
    [catalogue, programmeId]
  );

  const selectedProgrammeTitle =
    programmeId === 'not-sure'
      ? 'Not Sure Yet'
      : selectedProgrammeObj?.title || 'Programme Enquiry';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const validationErrors = validateConsultationInput({
      name,
      contactMethod,
      contactValue,
      programmeId,
      privacyAcknowledged,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setOutcome(null);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setOutcome(null);

    const result = await submitConsultationRequest({
      name: name.trim(),
      contactMethod,
      contactValue: contactValue.trim(),
      programmeId,
      programmeTitle: selectedProgrammeTitle,
      campusPreference: campusPreference !== 'no-preference' ? campusPreference : undefined,
      preferredTime: preferredTime.trim() || undefined,
      question: question.trim() || undefined,
      privacyAcknowledged,
      optionalUpdatesOptIn,
      idempotencyKey,
    });

    setSubmitting(false);
    setOutcome(result);

    if (result.status === 'accepted') {
      setIdempotencyKey(createIdempotencyKey());
      if (onSuccess) onSuccess(result);
    }
  };

  if (outcome?.status === 'accepted') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="surface-light p-6 sm:p-8 bg-[#F4F4F5] border-2 border-[#111111] rounded-[4px] space-y-4"
      >
        <div className="flex items-center gap-3 text-[#15803D]">
          <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
          <h3 className="text-xl font-extrabold text-[#111111]">
            {outcome.message}
          </h3>
        </div>
        {outcome.reference && (
          <p className="text-sm font-mono font-semibold text-[#111111]">
            Reference: {outcome.reference}
          </p>
        )}
        <p className="text-sm text-[#111111]">
          Summary recorded for <strong>{selectedProgrammeTitle}</strong> via{' '}
          <span className="capitalize">{contactMethod}</span>. This consultation request is for
          academic guidance and is not a confirmed appointment or formal admission decision.
        </p>
        <button
          type="button"
          onClick={() => {
            setOutcome(null);
            setQuestion('');
          }}
          className="biet-btn-secondary-light text-sm"
        >
          Submit another consultation request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="surface-light space-y-5"
      aria-labelledby={`${formId}-heading`}
    >
      <div>
        <h3 id={`${formId}-heading`} className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
          Request a consultation
        </h3>
        <p className="text-sm sm:text-base text-[#666666] mt-1">
          Share a few details so BIET can contact you about your study options.
        </p>
      </div>

      {/* Outcome alerts (failed, uncertain, unconfigured) */}
      {outcome && (
        <div
          role="alert"
          aria-live="assertive"
          className={`p-4 rounded-[4px] border-2 text-sm space-y-2 ${
            outcome.status === 'uncertain'
              ? 'bg-[#FFF0B3] border-[#A16207] text-[#111111]'
              : 'bg-red-50 border-[#B91C1C] text-[#111111]'
          }`}
        >
          <div className="flex items-start gap-2.5 font-bold">
            <AlertCircle
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                outcome.status === 'uncertain' ? 'text-[#A16207]' : 'text-[#B91C1C]'
              }`}
              aria-hidden="true"
            />
            <span>{outcome.message}</span>
          </div>
          <div className="pl-7 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#111111]">
            <a href={`tel:${siteConfig.telephone.replace(/[^+0-9]/g, '')}`} className="inline-flex items-center gap-1 underline">
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              {siteConfig.telephone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1 underline">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              {siteConfig.email}
            </a>
            {siteConfig.whatsapp.isConfigured && (
              <WhatsAppLink
                context={
                  selectedProgrammeObj
                    ? { kind: 'programme', programmeTitle: selectedProgrammeObj.title }
                    : { kind: 'general' }
                }
                label="Message via WhatsApp"
                className="min-h-[36px] px-3 py-1 text-xs border-[#111111]"
              />
            )}
          </div>
        </div>
      )}

      {/* Field 1: Name */}
      <div>
        <label
          htmlFor={`${formId}-name`}
          className="block text-sm font-bold text-[#111111] mb-1.5"
        >
          Your name <span className="text-[#B91C1C]">*</span>
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-err` : undefined}
          className={`w-full min-h-[52px] px-4 rounded-[4px] border-2 bg-white text-base text-[#111111] focus:outline-none ${
            errors.name ? 'border-[#B91C1C]' : 'border-[#111111]/25 focus:border-[#111111]'
          }`}
        />
        {errors.name && (
          <p id={`${formId}-name-err`} className="mt-1 text-xs font-semibold text-[#B91C1C]">
            {errors.name}
          </p>
        )}
      </div>

      {/* Field 2: Preferred Contact Method */}
      <div>
        <span className="block text-sm font-bold text-[#111111] mb-2">
          Preferred contact method <span className="text-[#B91C1C]">*</span>
        </span>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: 'whatsapp', label: 'WhatsApp' },
              { id: 'phone', label: 'Phone Call' },
              { id: 'email', label: 'Email' },
            ] as const
          ).map((method) => {
            const active = contactMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => {
                  setContactMethod(method.id);
                  setErrors((prev) => ({ ...prev, contactValue: '' }));
                }}
                aria-pressed={active}
                className={`min-h-[48px] px-3 py-2 rounded-[4px] border-2 text-sm font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#111111] text-[#FFCC00] border-[#111111]'
                    : 'bg-white text-[#111111] border-[#E2E2E6] hover:border-[#111111]'
                }`}
              >
                {method.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Field 3: Single Contact Detail Required for Chosen Method */}
      <div>
        <label
          htmlFor={`${formId}-contact`}
          className="block text-sm font-bold text-[#111111] mb-1.5"
        >
          {contactMethod === 'email'
            ? 'Email address'
            : contactMethod === 'whatsapp'
              ? 'WhatsApp mobile number'
              : 'Telephone / mobile number'}{' '}
          <span className="text-[#B91C1C]">*</span>
        </label>
        <input
          id={`${formId}-contact`}
          type={contactMethod === 'email' ? 'email' : 'tel'}
          inputMode={contactMethod === 'email' ? 'email' : 'tel'}
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
          placeholder={contactMethod === 'email' ? 'name@example.com' : '+94 7X XXX XXXX'}
          aria-invalid={Boolean(errors.contactValue)}
          aria-describedby={errors.contactValue ? `${formId}-contact-err` : undefined}
          className={`w-full min-h-[52px] px-4 rounded-[4px] border-2 bg-white text-base text-[#111111] focus:outline-none ${
            errors.contactValue
              ? 'border-[#B91C1C]'
              : 'border-[#111111]/25 focus:border-[#111111]'
          }`}
        />
        {errors.contactValue && (
          <p id={`${formId}-contact-err`} className="mt-1 text-xs font-semibold text-[#B91C1C]">
            {errors.contactValue}
          </p>
        )}
      </div>

      {/* Field 4: Programme / Subject Interest */}
      <div>
        <label
          htmlFor={`${formId}-programme`}
          className="block text-sm font-bold text-[#111111] mb-1.5"
        >
          Programme or subject interest <span className="text-[#B91C1C]">*</span>
        </label>
        <select
          id={`${formId}-programme`}
          value={programmeId}
          onChange={(e) => setProgrammeId(e.target.value)}
          aria-invalid={Boolean(errors.programmeId)}
          className="w-full min-h-[52px] px-4 rounded-[4px] border-2 border-[#111111]/25 bg-white text-base text-[#111111] focus:border-[#111111] focus:outline-none"
        >
          <option value="not-sure">Not Sure Yet — Advise on Study Options</option>
          {catalogue.map((prog) => (
            <option key={prog.id} value={prog.id}>
              {prog.title} ({prog.category})
            </option>
          ))}
        </select>
      </div>

      {/* Expandable Optional Details */}
      <div className="border-t border-[#E2E2E6] pt-3">
        <button
          type="button"
          onClick={() => setShowOptional((prev) => !prev)}
          aria-expanded={showOptional}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#111111] hover:underline cursor-pointer py-1"
        >
          {showOptional ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
          <span>Optional campus, preferred time &amp; question</span>
        </button>

        {showOptional && (
          <div className="mt-4 space-y-4 p-4 bg-[#F4F4F5] rounded-[4px] border border-[#E2E2E6]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={`${formId}-campus`}
                  className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5"
                >
                  Campus preference (optional)
                </label>
                <select
                  id={`${formId}-campus`}
                  value={campusPreference}
                  onChange={(e) => setCampusPreference(e.target.value)}
                  className="w-full min-h-[48px] px-3 rounded-[4px] border border-[#E2E2E6] bg-white text-base text-[#111111]"
                >
                  <option value="no-preference">No Preference</option>
                  <option value="Colombo Campus">Colombo</option>
                  <option value="Kandy Campus">Kandy</option>
                  <option value="Online / Phone Consultation">Online / Phone Consultation</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor={`${formId}-time`}
                  className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5"
                >
                  Preferred contact window (optional)
                </label>
                <select
                  id={`${formId}-time`}
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full min-h-[48px] px-3 rounded-[4px] border border-[#E2E2E6] bg-white text-base text-[#111111]"
                >
                  <option value="">Any time during office hours</option>
                  <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM – 3:00 PM)</option>
                  <option value="Late Afternoon (3:00 PM - 5:30 PM)">
                    Late Afternoon (3:00 PM – 5:30 PM)
                  </option>
                </select>
              </div>
            </div>
            <p className="text-xs text-[#666666] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>
                Preferred times guide our admissions team and are not a confirmed appointment slot.
              </span>
            </p>
            <div>
              <label
                htmlFor={`${formId}-question`}
                className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5"
              >
                Your question (optional)
              </label>
              <textarea
                id={`${formId}-question`}
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about entry requirements, study schedules, or fees..."
                className="w-full p-3 rounded-[4px] border border-[#E2E2E6] bg-white text-base text-[#111111]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Separate Privacy Acknowledgement & Optional Marketing Consent */}
      <div className="space-y-3 pt-1">
        <label className="flex items-start gap-3 cursor-pointer text-sm text-[#111111]">
          <input
            type="checkbox"
            checked={privacyAcknowledged}
            onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
            className="mt-1 w-5 h-5 accent-[#111111] shrink-0"
          />
          <span>
            I acknowledge that BIET will use these details solely to respond to my admissions
            consultation request. <span className="text-[#B91C1C] font-bold">*</span>
          </span>
        </label>
        {errors.privacyAcknowledged && (
          <p className="text-xs font-semibold text-[#B91C1C] pl-8">
            {errors.privacyAcknowledged}
          </p>
        )}

        <label className="flex items-start gap-3 cursor-pointer text-xs text-[#666666]">
          <input
            type="checkbox"
            checked={optionalUpdatesOptIn}
            onChange={(e) => setOptionalUpdatesOptIn(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[#111111] shrink-0"
          />
          <span>
            Optional: Share future BIET intake announcements or open-day invitations when confirmed.
          </span>
        </label>
      </div>

      <div className="pt-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="biet-btn-primary disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto px-8"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          <span>{submitting ? 'Sending Request...' : 'Request Consultation'}</span>
        </button>

        {siteConfig.whatsapp.isConfigured && (
          <WhatsAppLink
            context={
              selectedProgrammeObj
                ? { kind: 'programme', programmeTitle: selectedProgrammeObj.title }
                : { kind: 'general' }
            }
            label="Chat on WhatsApp Instead"
            className="w-full sm:w-auto text-[#111111] border-[#111111] hover:bg-[#111111] hover:text-white"
          />
        )}
      </div>
    </form>
  );
};
