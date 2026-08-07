'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import styles from './BootOverlay.module.css';

const LINE_DELAY_MS = 300;
const FIRST_LINE_DELAY_MS = 260;
const HOLD_AFTER_READY_MS = 900;
const FADE_OUT_MS = 650;
const SKIP_HINT_AFTER_MS = 1000;

export const BOOT_SESSION_KEY = 'zb_booted';

/**
 * Terminal boot sequence shown once per session.
 *
 * Repeat visits and reduced-motion users skip it without a flash: the inline
 * script in <head> (see BootScript) marks <html data-booted> before first
 * paint, and CSS hides the overlay outright.
 */
export function BootOverlay({ copy }: { copy: Dictionary['boot'] }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showReady, setShowReady] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    setExiting(true);
    setProgress(100);

    window.setTimeout(() => {
      setDone(true);
      document.documentElement.setAttribute('data-booted', '');
      document.documentElement.removeAttribute('data-scroll-locked');
      try {
        sessionStorage.setItem(BOOT_SESSION_KEY, '1');
      } catch {
        // Private-mode storage denial is not worth failing the page over.
      }
    }, FADE_OUT_MS);
  }, []);

  useEffect(() => {
    // Already marked as booted by the head script — nothing to play.
    if (document.documentElement.hasAttribute('data-booted')) {
      finishedRef.current = true;
      setDone(true);
      document.documentElement.removeAttribute('data-scroll-locked');
      return;
    }

    const timers: number[] = [];
    const lines = copy.lines;
    let index = 0;

    const step = () => {
      if (finishedRef.current) return;

      if (index < lines.length) {
        const line = lines[index]!;
        setVisibleLines((current) => [...current, line]);
        setProgress(Math.round(((index + 1) / lines.length) * 88));
        index += 1;
        timers.push(window.setTimeout(step, LINE_DELAY_MS));
        return;
      }

      setProgress(100);
      setShowReady(true);
      timers.push(window.setTimeout(finish, HOLD_AFTER_READY_MS));
    };

    timers.push(window.setTimeout(step, FIRST_LINE_DELAY_MS));
    timers.push(window.setTimeout(() => setShowSkipHint(true), SKIP_HINT_AFTER_MS));

    const skip = () => finish();
    document.addEventListener('keydown', skip);
    document.addEventListener('pointerdown', skip);

    return () => {
      timers.forEach(window.clearTimeout);
      document.removeEventListener('keydown', skip);
      document.removeEventListener('pointerdown', skip);
    };
  }, [copy.lines, finish]);

  if (done) return null;

  return (
    <div className={styles.overlay} data-exiting={exiting} role="status" aria-live="polite">
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <span className={styles.dot} style={{ background: 'var(--color-danger)' }} />
          <span className={styles.dot} style={{ background: 'var(--color-warning)' }} />
          <span className={styles.dot} style={{ background: 'var(--accent)' }} />
          <span className={styles.caption}>{copy.caption}</span>
        </div>

        <div className={styles.console}>
          {visibleLines.map((line, index) => (
            <div key={index}>&gt; {line}</div>
          ))}

          {showReady ? (
            <div className={styles.ready}>
              <span className={styles.readyText}>&gt; {copy.ready}</span>
              <span className={styles.readyGlitch} aria-hidden="true">
                &gt; {copy.ready}
              </span>
            </div>
          ) : (
            <span className={styles.caret} aria-hidden="true" />
          )}
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {showSkipHint && !showReady ? <div className={styles.skipHint}>{copy.skip}</div> : null}
    </div>
  );
}

/**
 * Blocking one-liner injected into <head>. It decides — before the first
 * paint — whether this visit should see the boot sequence, and locks scrolling
 * if it should.
 */
export const BOOT_INLINE_SCRIPT = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{var booted=sessionStorage.getItem('${BOOT_SESSION_KEY}')==='1';var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(booted||reduced){d.setAttribute('data-booted','')}else{d.setAttribute('data-scroll-locked','')}}catch(e){d.setAttribute('data-booted','')}})();`;
