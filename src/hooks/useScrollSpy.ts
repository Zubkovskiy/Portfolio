'use client';

import { useEffect, useState } from 'react';

/**
 * Reports which section id is currently in the reading band of the viewport.
 *
 * Purely IntersectionObserver-driven — no scroll handler, no getBoundingClientRect
 * per frame. When several sections overlap the band, the one closest to the top
 * wins, which keeps the nav highlight stable while scrolling upward.
 */
export function useScrollSpy(sectionIds: readonly string[], initialId: string): string {
  const [activeId, setActiveId] = useState(initialId);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }

        if (visible.size === 0) return;

        let topId = '';
        let topOffset = Number.POSITIVE_INFINITY;
        for (const [id, offset] of visible) {
          if (offset < topOffset) {
            topOffset = offset;
            topId = id;
          }
        }
        if (topId) setActiveId(topId);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
