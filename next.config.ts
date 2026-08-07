import type { NextConfig } from 'next';

/**
 * Security headers. The site ships zero third-party runtime code
 * (fonts are self-hosted by next/font, icons are bundled), so the CSP
 * can stay tight. `unsafe-inline` on styles is required by Next's
 * critical-CSS inlining; scripts are hash/nonce-free but same-origin only.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Strip console.* from the production bundle, keep errors/warnings.
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    // Only pull the icon components actually imported, not the barrel file.
    optimizePackageImports: ['lucide-react'],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    // Local assets only — no remote patterns are allowed on purpose.
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [...securityHeaders],
      },
      {
        // Hashed build output is immutable.
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
