'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_META, type Locale } from '@/lib/i18n';
import { cx } from '@/lib/utils';
import styles from './LanguageSwitch.module.css';

/**
 * EN/UA toggle. Each option is a real <Link> to the same page in the other
 * locale, so both languages are crawlable URLs rather than a client-only
 * state flip — and Next prefetches the other locale on hover.
 */
export function LanguageSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  // '/ua/cv' -> '/cv'; '/en' -> ''
  const rest = pathname.replace(/^\/[^/]+/, '');
  const activeIndex = Math.max(0, LOCALES.indexOf(current));

  return (
    <div
      className={styles.switch}
      role="group"
      aria-label={label}
      style={
        {
          '--switch-index': activeIndex,
          '--switch-slot': `${100 / LOCALES.length}%`,
        } as CSSProperties
      }
    >
      <span className={styles.indicator} aria-hidden="true" />
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest}`}
          hrefLang={LOCALE_META[locale].htmlLang}
          className={cx(styles.option, locale === current && styles.active)}
          aria-current={locale === current ? 'true' : undefined}
        >
          {LOCALE_META[locale].label}
        </Link>
      ))}
    </div>
  );
}
