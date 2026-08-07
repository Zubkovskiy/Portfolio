import { z } from 'zod';

/**
 * Field limits live here so the form, the schema and the copy that explains
 * them can never drift apart.
 */
export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 200,
  phoneMax: 40,
  interestMax: 120,
  messageMin: 10,
  messageMax: 5000,
} as const;

/** Fields the UI can attach an inline error to. */
export const CONTACT_FIELDS = ['name', 'email', 'phone', 'message'] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

/**
 * One schema, used by both the browser and the API route — the client cannot
 * drift from what the server accepts.
 */
export const contactSchema = z
  .object({
    name: z.string().trim().min(CONTACT_LIMITS.nameMin).max(CONTACT_LIMITS.nameMax),
    email: z.string().trim().email().max(CONTACT_LIMITS.emailMax).or(z.literal('')).optional(),
    phone: z.string().trim().max(CONTACT_LIMITS.phoneMax).or(z.literal('')).optional(),
    interest: z.string().trim().max(CONTACT_LIMITS.interestMax).optional(),
    message: z.string().trim().min(CONTACT_LIMITS.messageMin).max(CONTACT_LIMITS.messageMax),
    /**
     * Honeypot. Real people never see this field, so anything in it is a bot.
     *
     * Deliberately permissive: rejecting it here would answer 422 and tell the
     * bot the submission failed, which is exactly the feedback a honeypot is
     * meant to withhold. The route accepts the request and answers "sent"
     * instead, then drops it.
     */
    company: z.string().max(500).optional(),
  })
  .refine((data) => Boolean(data.email) || Boolean(data.phone), {
    message: 'Provide an email address or a phone number.',
    path: ['email'],
  });

export type ContactPayload = z.infer<typeof contactSchema>;

/**
 * Which fields failed, without any wording — the message shown to the visitor
 * comes from the locale dictionary, so validation stays language-agnostic.
 */
export type ContactFieldErrors = Partial<Record<ContactField, true>>;

/** Reduces zod issues to the set of field names that failed. */
export function collectFieldErrors(error: z.ZodError): ContactFieldErrors {
  const fields: ContactFieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && (CONTACT_FIELDS as readonly string[]).includes(key)) {
      fields[key as ContactField] = true;
    }
  }

  return fields;
}

export type ContactResponse =
  | { status: 'sent' }
  /** Delivery is not configured on this deployment — the UI offers mailto instead. */
  | { status: 'unconfigured' }
  | {
      status: 'error';
      message: 'invalid_json' | 'invalid_payload' | 'rate_limited' | 'delivery_failed';
      /** Present for `invalid_payload`, so the UI can mark the offending inputs. */
      fields?: ContactFieldErrors;
    };
