'use client';

import { useEffect } from 'react';

/**
 * If `ready` never flips (a stalled boot overlay, a thrown effect upstream),
 * reveal everything anyway after this long. Content being visible always beats
 * content being animated.
 */
const FAILSAFE_MS = 4000;

function revealAll(): void {
  document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((element) => {
    element.classList.add('is-visible');
  });
}

/**
 * Fades every `.reveal` element in as it enters the viewport.
 *
 * One IntersectionObserver for the whole page, and each element is unobserved
 * the moment it has played — so the observer's work shrinks to zero by the
 * time the visitor reaches the footer.
 *
 * `ready` is false while the boot overlay is up: elements revealed behind a
 * full-screen overlay would have burned their animation unseen.
 */
export function useReveal(ready = true): void {
  useEffect(() => {
    if (!ready) {
      const failsafe = window.setTimeout(revealAll, FAILSAFE_MS);
      return () => window.clearTimeout(failsafe);
    }

    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
    if (elements.length === 0) return;

    // No IntersectionObserver (or a browser that never delivers callbacks):
    // show everything rather than gamble on the animation.
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
