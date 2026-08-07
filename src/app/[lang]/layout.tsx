import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { BOOT_INLINE_SCRIPT } from '@/components/fx/BootOverlay';
import { fontVariables } from '@/lib/fonts';
import { LOCALES, LOCALE_META, getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';
import { withBasePath } from '@/lib/utils';
import '@/styles/globals.css';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  const meta = LOCALE_META[lang];
  const canonical = `${siteConfig.url}/${lang}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.title,
      template: `%s · ${siteConfig.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        LOCALES.map((locale) => [LOCALE_META[locale].htmlLang, `${siteConfig.url}/${locale}`]),
      ),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: siteConfig.name,
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      locale: meta.ogLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    icons: {
      icon: [{ url: withBasePath('/favicon.svg'), type: 'image/svg+xml' }],
      apple: withBasePath('/favicon.svg'),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={LOCALE_META[lang as Locale].htmlLang} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_INLINE_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
