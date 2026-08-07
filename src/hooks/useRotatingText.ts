'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from './useMediaQuery';

export function useRotatingText(items: readonly string[], intervalMs = 2600): string {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || items.length < 2) return;

    let timer = 0;

    const start = () => {
      timer = window.setInterval(() => setIndex((current) => (current + 1) % items.length), intervalMs);
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = 0;
    };
    const handleVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [items.length, intervalMs, reducedMotion]);

  return items[index % items.length] ?? items[0] ?? '';
}
