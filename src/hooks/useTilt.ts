'use client';

import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from './useMediaQuery';

const MAX_TILT_DEG = 10;

/**
 * 3D tilt-on-hover for a card.
 *
 * The element's bounding rect is measured once per pointer-enter instead of
 * on every pointermove — the card cannot move while you are hovering it, so
 * re-measuring per frame only bought forced layout reflows.
 */
export function useTilt<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled || reducedMotion || !finePointer) return;

    let frame = 0;
    let rect: DOMRect | null = null;
    let pending: { rx: number; ry: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      element.style.transform = `perspective(900px) rotateX(${pending.rx}deg) rotateY(${pending.ry}deg)`;
    };

    const handleEnter = () => {
      rect = element.getBoundingClientRect();
      element.style.transition = 'none';
      element.style.willChange = 'transform';
    };

    const handleMove = (event: PointerEvent) => {
      if (!rect) rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      pending = {
        rx: Number(((py - 0.5) * -MAX_TILT_DEG).toFixed(2)),
        ry: Number(((px - 0.5) * MAX_TILT_DEG).toFixed(2)),
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const handleLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      pending = null;
      rect = null;
      element.style.transition = 'transform .5s var(--ease-out)';
      element.style.transform = '';
      // Drop the compositor layer once the reset transition has finished.
      window.setTimeout(() => {
        element.style.willChange = '';
      }, 550);
    };

    element.addEventListener('pointerenter', handleEnter, { passive: true });
    element.addEventListener('pointermove', handleMove, { passive: true });
    element.addEventListener('pointerleave', handleLeave, { passive: true });

    return () => {
      element.removeEventListener('pointerenter', handleEnter);
      element.removeEventListener('pointermove', handleMove);
      element.removeEventListener('pointerleave', handleLeave);
      if (frame) cancelAnimationFrame(frame);
      element.style.transform = '';
      element.style.willChange = '';
    };
  }, [enabled, reducedMotion, finePointer]);

  return ref;
}
