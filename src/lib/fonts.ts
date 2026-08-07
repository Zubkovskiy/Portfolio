import { IBM_Plex_Mono, Inter, Unbounded } from 'next/font/google';

/**
 * Self-hosted at build time by next/font — no Google CDN request at runtime,
 * no render-blocking @import, and the exact glyph subsets we need.
 *
 * Cyrillic is required: the site ships a full Ukrainian translation.
 */

export const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-unbounded',
  display: 'swap',
  preload: true,
  fallback: ['Arial Rounded MT Bold', 'Segoe UI', 'sans-serif'],
});

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
  // Only used inside code/terminal ornaments — never blocks first paint.
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
});

export const fontVariables = `${unbounded.variable} ${inter.variable} ${plexMono.variable}`;
