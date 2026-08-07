'use client';

import { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { onScroll } from '@/lib/scroll-manager';
import styles from './ScrollToTop.module.css';

const RADIUS = 23;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Back-to-top button whose ring doubles as a scroll-progress indicator. */
export function ScrollToTop({ label }: { label: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() =>
    onScroll(({ progress, scrollY, viewportHeight }) => {
      const button = buttonRef.current;
      const ring = ringRef.current;
      const shouldShow = scrollY > viewportHeight * 0.6;

      if (button && (button.dataset.visible === 'true') !== shouldShow) {
        button.dataset.visible = String(shouldShow);
      }
      // Skip the DOM write entirely while the button is off screen.
      if (ring && shouldShow) {
        ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
      }
    }),
  );

  const handleClick = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.button}
      aria-label={label}
      data-visible="false"
      onClick={handleClick}
    >
      <svg className={styles.ring} viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r={RADIUS} fill="none" stroke="var(--border-default)" strokeWidth="2" />
        <circle
          ref={ringRef}
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          className={styles.ringFg}
        />
      </svg>
      <ArrowUp className={styles.icon} size={18} aria-hidden="true" />
    </button>
  );
}
