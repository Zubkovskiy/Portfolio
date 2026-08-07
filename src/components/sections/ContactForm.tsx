'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Button, Input, Textarea } from '@/components/ui';
import {
  collectFieldErrors,
  contactSchema,
  type ContactField,
  type ContactFieldErrors,
  type ContactResponse,
} from '@/lib/contact-schema';
import type { Dictionary } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';
import { cx } from '@/lib/utils';
import { InterestSelect } from './InterestSelect';
import styles from './Contact.module.css';

type Status = 'idle' | 'submitting' | 'sent' | 'unconfigured' | 'error' | 'rate-limited';

type Fields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
  interest: string;
};

/** Builds the mailto: fallback used when no delivery provider is configured. */
function buildMailto(fields: Fields): string {
  const body = [
    `Name: ${fields.name}`,
    fields.email ? `Email: ${fields.email}` : '',
    fields.phone ? `Phone: ${fields.phone}` : '',
    fields.interest ? `Interested in: ${fields.interest}` : '',
    '',
    fields.message,
  ]
    .filter(Boolean)
    .join('\n');

  const subject = encodeURIComponent(`Portfolio inquiry from ${fields.name}`);
  return `mailto:${siteConfig.contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
}

/**
 * Success tick that draws itself in.
 *
 * Hand-rolled rather than borrowed from the icon set: lucide renders the ring
 * as a <path> too, so a blanket stroke-dash animation would turn the circle
 * into a dashed arc. Here only the check has a dash, and its length is known.
 */
function SuccessMark() {
  return (
    <span className={styles.successMark} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9.5" opacity="0.35" />
        <path className={styles.checkPath} d="M7.5 12.5 L10.8 15.8 L16.8 8.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Small rotating ring shown on the submit button while the request is out. */
function Spinner() {
  return (
    <span className={styles.spinner} aria-hidden="true">
      <svg viewBox="0 0 20 20" width="16" height="16">
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2.4" opacity="0.25" />
        <path
          d="M10 2 a8 8 0 0 1 8 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * Contact form.
 *
 * Validates in the browser against the same zod schema the API uses, so a
 * problem is reported inline on the offending field instantly — the previous
 * version posted first and answered every rejection with one generic
 * "something went wrong", which told the visitor nothing about what to fix.
 *
 * Falls back to a prefilled mailto: link when no delivery provider is
 * configured, so the form is never a dead end.
 */
export function ContactForm({ contact }: { contact: Dictionary['contact'] }) {
  const copy = contact.form;
  const formRef = useRef<HTMLFormElement>(null);

  const [interest, setInterest] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [missingContact, setMissingContact] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');

  /**
   * Clears a field's error — and any lingering status banner — as soon as the
   * visitor starts fixing things. A stale "sent" or "failed" notice sitting
   * above a half-typed message is just noise.
   */
  const clearError = useCallback((field: ContactField) => {
    setStatus((current) => (current === 'submitting' ? current : 'idle'));
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  const errorFor = (field: ContactField): string | undefined =>
    fieldErrors[field] ? copy.fieldErrors[field] : undefined;

  /*
   * The confirmation fades away on its own so the section returns to a clean
   * form. Banners that carry the mailto: link are left alone — auto-hiding
   * them would take away the visitor's only remaining way to reach out.
   */
  useEffect(() => {
    if (status !== 'sent' && status !== 'rate-limited') return;
    const timer = window.setTimeout(() => setStatus('idle'), status === 'sent' ? 6000 : 10000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fields: Fields = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      company: String(data.get('company') ?? ''),
      interest,
    };

    // Same schema the server runs — no round trip needed to find a typo.
    const parsed = contactSchema.safeParse(fields);
    const needsContact = !fields.email && !fields.phone;

    if (!parsed.success || needsContact) {
      const errors = parsed.success ? {} : collectFieldErrors(parsed.error);
      // The "email or phone" rule is reported on its own, not as a bad email.
      if (needsContact) delete errors.email;

      setFieldErrors(errors);
      setMissingContact(needsContact);
      setStatus('idle');

      // Put the caret on the first thing that needs attention.
      const firstInvalid = (['name', 'email', 'phone', 'message'] as const).find((field) =>
        needsContact ? field === 'email' : errors[field],
      );
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setFieldErrors({});
    setMissingContact(false);
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      const result = (await response.json()) as ContactResponse;

      if (result.status === 'sent') {
        setStatus('sent');
        form.reset();
        setInterest('');
        return;
      }

      if (result.status === 'unconfigured') {
        setMailtoUrl(buildMailto(fields));
        setStatus('unconfigured');
        return;
      }

      if (result.message === 'rate_limited') {
        setStatus('rate-limited');
        return;
      }

      // The server rejected fields the client accepted — surface them anyway.
      if (result.message === 'invalid_payload' && result.fields) {
        setFieldErrors(result.fields);
        setStatus('idle');
        return;
      }

      setMailtoUrl(buildMailto(fields));
      setStatus('error');
    } catch {
      // Offline or the request never landed — offer the mail client instead.
      setMailtoUrl(buildMailto(fields));
      setStatus('error');
    }
  };

  const submitting = status === 'submitting';

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <Input
          label={copy.nameLabel}
          name="name"
          autoComplete="name"
          placeholder={copy.namePh}
          required
          error={errorFor('name')}
          onChange={() => clearError('name')}
        />
        <InterestSelect
          label={copy.interestLabel}
          placeholder={copy.interestPh}
          options={copy.interestOptions}
          value={interest}
          onChange={(value) => {
            setInterest(value);
            setStatus((current) => (current === 'submitting' ? current : 'idle'));
          }}
        />
      </div>

      <div className={styles.contactRow}>
        <Input
          label={copy.emailLabel}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={copy.emailPh}
          error={errorFor('email')}
          onChange={() => {
            clearError('email');
            setMissingContact(false);
          }}
        />
        <span className={styles.orLabel}>{copy.orLabel}</span>
        <Input
          label={copy.phoneLabel}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={copy.phonePh}
          error={errorFor('phone')}
          onChange={() => {
            clearError('phone');
            setMissingContact(false);
          }}
        />
      </div>

      {missingContact ? (
        <p className={cx(styles.alert, styles.alertError, styles.alertShake)} role="alert">
          {copy.contactError}
        </p>
      ) : null}

      <Textarea
        label={copy.messageLabel}
        name="message"
        placeholder={copy.messagePh}
        rows={5}
        required
        error={errorFor('message')}
        onChange={() => clearError('message')}
      />

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <Button
          type="submit"
          shine
          disabled={submitting}
          icon={submitting ? <Spinner /> : undefined}
          iconPosition="left"
        >
          {submitting ? copy.submitting : copy.submit}
        </Button>
      </div>

      <div aria-live="polite">
        {status === 'sent' ? (
          <p className={cx(styles.alert, styles.alertSuccess)}>
            <SuccessMark />
            {copy.successMessage}
          </p>
        ) : null}

        {status === 'unconfigured' ? (
          <p className={cx(styles.alert, styles.alertNotice)}>
            {copy.mailtoFallback}
            <a className={styles.alertAction} href={mailtoUrl}>
              {copy.mailtoFallbackAction} ↗
            </a>
          </p>
        ) : null}

        {status === 'rate-limited' ? (
          <p className={cx(styles.alert, styles.alertNotice, styles.alertShake)} role="alert">
            {copy.rateLimitError}
          </p>
        ) : null}

        {status === 'error' ? (
          <p className={cx(styles.alert, styles.alertError, styles.alertShake)} role="alert">
            {copy.errorMessage}
            {mailtoUrl ? (
              <a className={styles.alertAction} href={mailtoUrl}>
                {copy.mailtoFallbackAction} ↗
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </form>
  );
}
