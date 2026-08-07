'use client';

import { useEffect } from 'react';

/**
 * Feeds `--mx` / `--my` to whichever `[data-shine]` element the pointer is
 * currently over, so its radial highlight follows the cursor.
 *
 * One delegated document listener for the entire page instead of a pair of
 * listeners per button, and writes are batched into a single rAF.
 * Renders nothing.
 */
export function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    let target: HTMLElement | null = null;
    let position = { x: 50, y: 50 };

    const apply = () => {
      frame = 0;
      if (!target) return;
      target.style.setProperty('--mx', `${position.x}%`);
      target.style.setProperty('--my', `${position.y}%`);
    };

    const handleMove = (event: PointerEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>('[data-shine]') ?? null;

      if (element !== target) {
        target?.style.removeProperty('--mx');
        target?.style.removeProperty('--my');
        target = element;
      }
      if (!target) return;

      const rect = target.getBoundingClientRect();
      position = {
        x: Number((((event.clientX - rect.left) / rect.width) * 100).toFixed(1)),
        y: Number((((event.clientY - rect.top) / rect.height) * 100).toFixed(1)),
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', handleMove, { passive: true });

    return () => {
      document.removeEventListener('pointermove', handleMove);
      if (frame) cancelAnimationFrame(frame);
      target?.style.removeProperty('--mx');
      target?.style.removeProperty('--my');
    };
  }, []);

  return null;
}
