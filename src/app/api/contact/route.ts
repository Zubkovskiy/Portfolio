import { NextResponse } from 'next/server';
import { collectFieldErrors, contactSchema, type ContactResponse } from '@/lib/contact-schema';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Requests allowed per IP inside the window. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/**
 * In-memory rate limiter. Good enough for a single-instance personal site;
 * swap for Upstash/Redis if this ever runs on more than one instance.
 */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, timestamps] of hits) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

type Message = {
  name: string;
  email?: string | undefined;
  phone?: string | undefined;
  interest?: string | undefined;
  body: string;
  subject: string;
};

/**
 * Builds the Formspree endpoint from the configured value.
 *
 * Formspree shows people a full URL (`https://formspree.io/f/abcd1234`), so
 * that is what tends to get pasted into the variable. Accepting either the
 * bare id or the whole URL avoids a doubled path that fails with a confusing
 * 404 at the first real submission.
 */
function formspreeEndpoint(): string | null {
  const raw = process.env.FORMSPREE_FORM_ID?.trim();
  if (!raw) return null;

  const id = raw.replace(/\/+$/, '').split('/').pop();
  return id ? `https://formspree.io/f/${id}` : null;
}

/**
 * Formspree. Only the form id is needed — no domain verification, no sender
 * address to own — which makes it the quickest provider to switch on.
 *
 * Posted server-side rather than from the browser so the honeypot, the zod
 * schema and the rate limiter all still apply, and the form id never ships
 * to the client.
 */
async function deliverViaFormspree(message: Message): Promise<boolean> {
  const endpoint = formspreeEndpoint();
  if (!endpoint) return false;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: message.name,
      // Formspree uses `email` as the reply-to address on the notification.
      email: message.email ?? '',
      phone: message.phone ?? '',
      interest: message.interest ?? '',
      message: message.body,
      _subject: message.subject,
    }),
  });

  if (!response.ok) {
    console.error('[contact] Formspree rejected the message', response.status, await response.text());
    throw new Error('delivery_failed');
  }

  return true;
}

/**
 * Resend. Needs an API key and a verified sending domain, but the message
 * never leaves infrastructure we control.
 */
async function deliverViaResend(message: Message): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !from) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email],
      subject: message.subject,
      text: message.body,
      ...(message.email ? { reply_to: message.email } : {}),
    }),
  });

  if (!response.ok) {
    console.error('[contact] Resend rejected the message', response.status, await response.text());
    throw new Error('delivery_failed');
  }

  return true;
}

/**
 * Tries each configured provider in order. Returns false only when none is
 * set up, which the client turns into a prefilled mailto: link.
 */
async function deliver(message: Message): Promise<boolean> {
  return (await deliverViaFormspree(message)) || (await deliverViaResend(message));
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ status: 'error', message: 'rate_limited' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ status: 'error', message: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    // Name the offending fields so the form can mark them instead of showing
    // a blanket "something went wrong".
    return NextResponse.json(
      { status: 'error', message: 'invalid_payload', fields: collectFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const { name, email, phone, interest, message, company } = parsed.data;

  // Honeypot filled — accept silently so the bot learns nothing.
  if (company) return NextResponse.json({ status: 'sent' });

  const lines = [
    `Name: ${name}`,
    email ? `Email: ${email}` : '',
    phone ? `Phone: ${phone}` : '',
    interest ? `Interested in: ${interest}` : '',
    '',
    message,
  ].filter(Boolean);

  try {
    const delivered = await deliver({
      name,
      email: email || undefined,
      phone: phone || undefined,
      interest: interest || undefined,
      body: lines.join('\n'),
      subject: `Portfolio inquiry from ${name}`,
    });

    // No provider configured: tell the client so it can offer mailto instead.
    return NextResponse.json({ status: delivered ? 'sent' : 'unconfigured' });
  } catch {
    return NextResponse.json({ status: 'error', message: 'delivery_failed' }, { status: 502 });
  }
}
