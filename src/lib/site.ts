/**
 * Single source of truth for everything that is the same in both languages:
 * identity, contact details, links. Locale-specific copy lives in
 * `src/lib/i18n/dictionaries`.
 */

export const siteConfig = {
  name: 'Bohdan Zubkivskiy',
  shortName: 'Zubkivskiy',
  monogram: 'ZB',

  /** Canonical origin. Override per deployment with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zubkivskiy.dev').replace(/\/$/, ''),

  contact: {
    email: 'zubkovvsbogdan@gmail.com',
    /** Display form. `telHref` below strips it down to a dialable string. */
    phone: '+380 63 778 11 44',
    city: 'Chernihiv',
    country: 'Ukraine',
    countryCode: 'UA',
  },

  /**
   * Social links. Replace the `#` placeholders with real profiles — the UI
   * renders whatever is here, so an unset link stays visibly a placeholder
   * rather than silently pretending to be real.
   */
  socials: [
    { id: 'github', label: 'GitHub', href: '#' },
    { id: 'linkedin', label: 'LinkedIn', href: '#' },
    { id: 'telegram', label: 'Telegram', href: '#' },
  ],

  /** Year the copyright line starts from. */
  foundedYear: 2026,
} as const;

export const mailtoHref = `mailto:${siteConfig.contact.email}`;

export const telHref = `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`;

export type SocialLink = (typeof siteConfig.socials)[number];
