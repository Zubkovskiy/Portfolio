'use client';

import { useEffect, useRef } from 'react';
import { clamp } from '@/lib/utils';
import styles from './CustomCursor.module.css';

const HOVER_SELECTOR = 'a, button, input, textarea, select, [data-cursor-hover]';
const MAX_TILT_DEG = 12;

/**
 * Lime arrow cursor that leans into the direction of travel and swaps to a
 * hand over interactive elements.
 *
 * The rAF loop only runs while the pointer is actually moving: it parks itself
 * after the position settles and restarts on the next pointermove. An idle tab
 * therefore costs nothing, which the original always-on loop did not manage.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.setAttribute('data-custom-cursor', '');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevX = mouseX;
    let tilt = 0;
    let pressed = false;
    let frame = 0;
    let idleFrames = 0;

    const tick = () => {
      const velocity = mouseX - prevX;
      prevX = mouseX;

      const targetTilt = clamp(velocity * 0.5, -MAX_TILT_DEG, MAX_TILT_DEG);
      tilt += (targetTilt - tilt) * 0.14;

      const scale = pressed ? 0.85 : 1;
      cursor.style.transform = `translate3d(${mouseX - 7}px, ${mouseY - 3}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${scale})`;

      // Park the loop once the arrow has settled; pointermove wakes it again.
      const settled = Math.abs(velocity) < 0.1 && Math.abs(tilt) < 0.1;
      idleFrames = settled ? idleFrames + 1 : 0;
      if (idleFrames > 12) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      idleFrames = 0;
      if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const handleMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.dataset.visible = 'true';
      wake();
    };

    const handleDown = () => {
      pressed = true;
      wake();
    };
    const handleUp = () => {
      pressed = false;
      wake();
    };

    const handleOver = (event: PointerEvent) => {
      const interactive = (event.target as Element | null)?.closest(HOVER_SELECTOR);
      cursor.dataset.hover = interactive ? 'true' : 'false';
    };

    const handleLeave = () => {
      cursor.dataset.visible = 'false';
    };

    const handleVisibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        wake();
      }
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    document.addEventListener('pointerleave', handleLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      document.removeEventListener('pointerleave', handleLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.removeAttribute('data-custom-cursor');
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <svg width="42" height="46" viewBox="0 0 42 46" className={styles.svg}>
        <g className={styles.arrow}>
          <path
            d="M4.6 4.4 C4 2 6.4 0.2 8.4 1.6 L27.2 15.4 C29.2 16.9 28.3 20 25.8 20.2 L17.6 20.8 C16.2 20.9 15 21.8 14.5 23.1 L11.6 30.8 C10.7 33.2 7.2 32.8 6.8 30.2 Z"
            fill="var(--accent)"
            stroke="var(--color-bg)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
        <g className={styles.hand}>
          <path
            d="M12.4 6.2 a3.5 3.5 0 0 1 7 0 v11.6 a3 3 0 0 1 6 0 v.8 a3 3 0 0 1 6 0 v1 a2.8 2.8 0 0 1 5.6 0 v7.6 a12 12 0 0 1 -12 12 h-5.6 a11 11 0 0 1 -8.4 -3.9 l-6.4 -7.6 a3.3 3.3 0 0 1 4.7 -4.5 l3.1 2.8 Z"
            fill="var(--accent)"
            stroke="var(--color-bg)"
            strokeWidth="1.7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
