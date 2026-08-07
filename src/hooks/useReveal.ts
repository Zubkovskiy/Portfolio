'use client';

import { useEffect } from 'react';

const FAILSAFE_MS = 4000;

function revealAll(): void {
  document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((element) => {
    element.classList.add('is-visible');
  });
}

export function useReveal(ready = true): void {
  useEffect(() => {
    if (!ready) {
      const failsafe = window.setTimeout(revealAll, FAILSAFE_MS);
      return () => window.clearTimeout(failsafe);
    }

    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
    if (elements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((element) => observer.observe(element));

    const failsafe = window.setTimeout(revealAll, FAILSAFE_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [ready]);
}
