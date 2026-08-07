'use client';

import dynamic from 'next/dynamic';
import { useReveal } from '@/hooks/useReveal';
import type { Dictionary } from '@/lib/i18n';
import { BootOverlay } from './BootOverlay';
import { PointerGlow } from './PointerGlow';
import { ScrollProgress } from './ScrollProgress';
import { ScrollToTop } from './ScrollToTop';

const NeuralBackground = dynamic(() => import('./NeuralBackground').then((m) => m.NeuralBackground), {
  ssr: false,
});

const CustomCursor = dynamic(() => import('./CustomCursor').then((m) => m.CustomCursor), {
  ssr: false,
});

const KonamiEasterEgg = dynamic(() => import('./KonamiEasterEgg').then((m) => m.KonamiEasterEgg), {
  ssr: false,
});

export function SiteEffects({ dict }: { dict: Dictionary }) {
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
