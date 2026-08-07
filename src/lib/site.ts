import type { Locale } from '@/lib/i18n/config';
import { withBasePath } from '@/lib/utils';

export const siteConfig = {
  name: 'Bohdan Zubkivskiy',
  shortName: 'Zubkivskiy',
  monogram: 'ZB',

  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://zubkivskiy.dev').replace(/\/$/, ''),

  contact: {
    email: 'zubkovvsbogdan@gmail.com',
    phone: '+380 63 778 11 44',
    city: 'Chernihiv',
    country: 'Ukraine',
    countryCode: 'UA',
  },

  socials: [
    { id: 'github', label: 'GitHub', href: '#' },
    { id: 'linkedin', label: 'LinkedIn', href: '#' },
    { id: 'telegram', label: 'Telegram', href: '#' },
  ],

  foundedYear: 2026,
} as const;

export const cvFile = {
  en: '/cv/Bohdan-Zubkivskiy-CV-EN.pdf',
  ua: '/cv/Bohdan-Zubkivskiy-CV-UA.pdf',
} as const satisfies Record<Locale, string>;

export function cvDownloadHref(locale: Locale): string {
  return withBasePath(cvFile[locale]);
}

export const mailtoHref = `mailto:${siteConfig.contact.email}`;

export const telHref = `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`;

export type SocialLink = (typeof siteConfig.socials)[number];
