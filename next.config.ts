import type { NextConfig } from 'next';

// GitHub Pages serves this repo from /Portfolio. `.env.production` sets the
// variable there; `next dev` leaves it empty. `src/lib/utils.ts` reads the same
// value for the URLs Next does not rewrite itself.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  // Each route becomes a directory with an index.html, which is what a plain
  // file server needs to resolve /en/cv without a rewrite.
  trailingSlash: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
