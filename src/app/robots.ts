import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/** Written to a file at build time — the static export has no server to ask. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
