import type { NextConfig } from 'next';

/**
 * The site ships as a fully static export so it can live on GitHub Pages.
 *
 * That rules out anything needing a Node server at request time — middleware,
 * route handlers, `next/image` optimisation and custom response headers all
 * had to go. The locale redirect that middleware used to do now happens in
 * `public/index.html`; the contact form posts straight to Formspree.
 *
 * `NEXT_PUBLIC_BASE_PATH` is the sub-path the site is served from. GitHub
 * Pages serves this repo at /Portfolio, so `.env.production` sets it there and
 * `next dev` leaves it empty. `src/lib/utils.ts` re-reads the same variable for
 * the handful of URLs Next does not rewrite itself.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  // Every route becomes a directory with an index.html, which is what a plain
  // static file server needs in order to resolve /en/cv without a rewrite.
  trailingSlash: true,

  // Strip console.* from the production bundle, keep errors/warnings.
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    // Only pull the icon components actually imported, not the barrel file.
    optimizePackageImports: ['lucide-react'],
  },

  images: {
    // No image optimiser exists on a static host; files are served as authored.
    unoptimized: true,
    // Local assets only — no remote patterns are allowed on purpose.
  },
};

export default nextConfig;
