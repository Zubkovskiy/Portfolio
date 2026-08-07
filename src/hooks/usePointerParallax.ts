'use client';

import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from './useMediaQuery';

/**
 * Depth parallax driven by the pointer inside a zone element.
 *
 * Children opt in with `data-parallax-depth="24"`. Positions are written
 * straight to `style.transform` inside a single rAF — never through React
 * state, so moving the mouse across the hero costs zero re-renders.
 */
export function usePointerParallax<T extends HTMLElement>() {
  const zoneRef = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone || reducedMotion || !finePointer) return;

    const items = Array.from(zone.querySelectorAll<HTMLElement>('[data-parallax-depth]'));
    if (items.length === 0) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;
      for (const item of items) {
        const depth = Number.parseFloat(item.dataset.parallaxDepth ?? '10') || 10;
        item.style.transform = `translate3d(${(x * depth).toFixed(1)}px, ${(y * depth).toFixed(1)}px, 0)`;
      }
    };

    const handleMove = (event: PointerEvent) => {
      const rect = zone.getBoundingClientRect();
      pending = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const handleLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      pending = null;
      for (const item of items) item.style.transform = '';
    };

    zone.addEventListener('pointermove', handleMove, { passive: true });
    zone.addEventListener('pointerleave', handleLeave, { passive: true });

    return () => {
      zone.removeEventListener('pointermove', handleMove);
      zone.removeEventListener('pointerleave', handleLeave);
      if (frame) cancelAnimationFrame(frame);
      for (const item of items) item.style.transform = '';
    };
  }, [reducedMotion, finePointer]);

  return zoneRef;
}
