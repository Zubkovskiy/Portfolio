'use client';

import { useEffect } from 'react';

/**
 * Locks page scrolling while an overlay is open.
 *
 * Uses a counter on the module scope so two overlays (boot screen + easter
 * egg) can overlap without the first one to close releasing the lock for both.
 */
let lockCount = 0;

export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    document.documentElement.setAttribute('data-scroll-locked', '');

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) document.documentElement.removeAttribute('data-scroll-locked');
    };
  }, [locked]);
}
