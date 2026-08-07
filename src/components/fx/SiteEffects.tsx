'use client';

import dynamic from 'next/dynamic';
import { useReveal } from '@/hooks/useReveal';
import type { Dictionary } from '@/lib/i18n';
import { BootOverlay } from './BootOverlay';
import { PointerGlow } from './PointerGlow';
import { ScrollProgress } from './ScrollProgress';
import { ScrollToTop } from './ScrollToTop';

/**
 * Canvas and cursor are pure decoration with no server-render value, so they
 * are split into their own chunks and loaded after hydration — they stay out
 * of the critical bundle entirely.
 */
const NeuralBackground = dynamic(() => import('./NeuralBackground').then((m) => m.NeuralBackground), {
  ssr: false,
});

const CustomCursor = dynamic(() => import('./CustomCursor').then((m) => m.CustomCursor), {
  ssr: false,
});

const KonamiEasterEgg = dynamic(() => import('./KonamiEasterEgg').then((m) => m.KonamiEasterEgg), {
  ssr: false,
});

/**
 * Single mount point for every page-wide effect.
 *
 * Keeping them together means the page itself stays a server component: only
 * this file and its lazily-loaded children ship JavaScript.
 */
export function SiteEffects({ dict }: { dict: Dictionary }) {
  /*
   * Reveals run from mount, deliberately *while* the boot overlay is still up.
   *
   * They used to wait for the overlay to finish, which meant the loader lifted
   * onto a page where every section was still at opacity 0 — it read as a blank
   * screen that then loaded a second time. Playing them behind the overlay
   * costs nothing (nobody can see it) and the page is fully painted by the time
   * the loader clears.
   */
  useReveal();

  return (
    <>
      <ScrollProgress label={dict.a11y.readingProgress} />
      <NeuralBackground />
      <CustomCursor />
      <PointerGlow />
      <ScrollToTop label={dict.a11y.scrollToTop} />
      <KonamiEasterEgg copy={dict.easterEgg} />
      <BootOverlay copy={dict.boot} />
    </>
  );
}
