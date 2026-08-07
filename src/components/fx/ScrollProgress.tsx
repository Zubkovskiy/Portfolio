'use client';

import { useEffect, useRef } from 'react';
import { onScroll } from '@/lib/scroll-manager';
import styles from './ScrollProgress.module.css';

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * Animates `transform: scaleX()` rather than `width`, so the browser never has
 * to lay the element out again — it is a pure compositor change.
 *
 * It is `aria-hidden`: scroll position is already conveyed by the scrollbar,
 * and a live progressbar role here would just chatter at screen readers.
 * `label` is kept for the title attribute and for parity with ScrollToTop.
 */
export function ScrollProgress({ label }: { label: string }) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() =>
    onScroll(({ progress }) => {
      const fill = fillRef.current;
      if (fill) fill.style.transform = `scaleX(${progress})`;
    }),
  );

  return (
    <div className={styles.rail} title={label} aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  );
}
