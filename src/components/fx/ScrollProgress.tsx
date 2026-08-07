'use client';

import { useEffect, useRef } from 'react';
import { onScroll } from '@/lib/scroll-manager';
import styles from './ScrollProgress.module.css';

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
