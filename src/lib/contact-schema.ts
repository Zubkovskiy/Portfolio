import { z } from 'zod';

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 200,
  phoneMax: 40,
  interestMax: 120,
  messageMin: 10,
  messageMax: 5000,
} as const;

export const CONTACT_FIELDS = ['name', 'email', 'phone', 'message'] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

export const contactSchema = z
  .object({
    name: z.string().trim().min(CONTACT_LIMITS.nameMin).max(CONTACT_LIMITS.nameMax),
    email: z.string().trim().email().max(CONTACT_LIMITS.emailMax).or(z.literal('')).optional(),
    phone: z.string().trim().max(CONTACT_LIMITS.phoneMax).or(z.literal('')).optional(),
    interest: z.string().trim().max(CONTACT_LIMITS.interestMax).optional(),
    message: z.string().trim().min(CONTACT_LIMITS.messageMin).max(CONTACT_LIMITS.messageMax),
    company: z.string().max(500).optional(),
  })
  .refine((data) => Boolean(data.email) || Boolean(data.phone), {
    message: 'Provide an email address or a phone number.',
    path: ['email'],
  });

export type ContactPayload = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<ContactField, true>>;

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
