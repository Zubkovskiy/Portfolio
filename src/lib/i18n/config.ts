export const LOCALES = ['en', 'ua'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META: Record<Locale, { htmlLang: string; label: string; ogLocale: string }> = {
  en: { htmlLang: 'en', label: 'EN', ogLocale: 'en_US' },
  ua: { htmlLang: 'uk', label: 'UA', ogLocale: 'uk_UA' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localePath(locale: Locale, path = ''): string {
  const suffix = path && path !== '/' ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `/${locale}${suffix}`;
}
