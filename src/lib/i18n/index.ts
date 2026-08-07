import { en } from './dictionaries/en';
import { ua } from './dictionaries/ua';
import { DEFAULT_LOCALE, type Locale } from './config';
import type { Dictionary } from './types';

const DICTIONARIES: Record<Locale, Dictionary> = { en, ua };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export { DEFAULT_LOCALE, LOCALES, LOCALE_META, isLocale, localePath } from './config';
export type { Locale } from './config';
export type * from './types';
