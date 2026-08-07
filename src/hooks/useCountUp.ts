'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { easeOutCubic } from '@/lib/utils';
import { useReducedMotion } from './useMediaQuery';

const FAILSAFE_MS = 5000;

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function useCountUp<T extends HTMLElement>(durationMs = 1200) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(1);
  const reducedMotion = useReducedMotion();
  const startedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (startedRef.current) return;
    if (reducedMotion || !('IntersectionObserver' in window)) return;

    const element = ref.current;
    if (!element) return;

    startedRef.current = true;
    setProgress(0);

    let frame = 0;

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        setProgress(easeOutCubic(t));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        window.clearTimeout(failsafe);
        run();
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    const failsafe = window.setTimeout(() => {
      observer.disconnect();
      setProgress(1);
    }, FAILSAFE_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [durationMs, reducedMotion]);

  return { ref, progress };
}
