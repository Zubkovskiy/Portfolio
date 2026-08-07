import type { Dictionary, Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';

export function PersonJsonLd({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: dict.hero.name,
    alternateName: siteConfig.name,
    url: `${siteConfig.url}/${lang}`,
    email: `mailto:${siteConfig.contact.email}`,
    telephone: siteConfig.contact.phone,
    jobTitle: dict.hero.roles[0],
    description: dict.meta.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.contact.city,
      addressCountry: siteConfig.contact.countryCode,
    },
    knowsLanguage: dict.languages.items.map((language) => language.name),
    knowsAbout: dict.skills.groups.flatMap((group) => group.items),
    sameAs: siteConfig.socials.filter((social) => social.href !== '#').map((social) => social.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
