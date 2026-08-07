import type { MetadataRoute } from 'next';
import { LOCALES, LOCALE_META } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';

/** Written to a file at build time — the static export has no server to ask. */
export const dynamic = 'force-static';

/** Both locales of both pages, cross-linked with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const alternatesFor = (path: string) =>
    Object.fromEntries(
      LOCALES.map((locale) => [LOCALE_META[locale].htmlLang, `${siteConfig.url}/${locale}${path}`]),
    );

  return LOCALES.flatMap((locale) => [
    {
      url: `${siteConfig.url}/${locale}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
      alternates: { languages: alternatesFor('') },
    },
    {
      url: `${siteConfig.url}/${locale}/cv`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: { languages: alternatesFor('/cv') },
    },
  ]);
}
