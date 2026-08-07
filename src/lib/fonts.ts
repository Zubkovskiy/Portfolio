import { IBM_Plex_Mono, Inter, Unbounded } from 'next/font/google';

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
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
});

export const fontVariables = `${unbounded.variable} ${inter.variable} ${plexMono.variable}`;
