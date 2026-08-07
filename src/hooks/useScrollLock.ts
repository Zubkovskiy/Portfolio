'use client';

import { useEffect } from 'react';

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
