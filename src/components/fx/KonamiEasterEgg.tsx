'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { Dictionary } from '@/lib/i18n';
import styles from './KonamiEasterEgg.module.css';

const DURATION_MS = 6000;
const MAX_FRAMES = 420;
const FONT_SIZE = 16;
const GLYPHS = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';

export function KonamiEasterEgg({ copy }: { copy: Dictionary['easterEgg'] }) {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useKonamiCode(useCallback(() => setActive(true), []));
  useScrollLock(active);

  useEffect(() => {
    if (!active) return;

    const dismiss = () => setActive(false);
    const autoClose = window.setTimeout(dismiss, DURATION_MS);
    const armDismiss = window.setTimeout(() => {
      document.addEventListener('pointerdown', dismiss, { once: true });
      document.addEventListener('keydown', dismiss, { once: true });
    }, 400);

    return () => {
      window.clearTimeout(autoClose);
      window.clearTimeout(armDismiss);
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!active || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const columns = Math.floor(width / FONT_SIZE);
    const drops = Array.from({ length: columns }, () => Math.random() * -40);
    let frames = 0;
    let frame = 0;

    const draw = () => {
      context.fillStyle = 'rgba(10,10,10,.16)';
      context.fillRect(0, 0, width, height);
      context.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!;
        context.fillStyle = Math.random() > 0.94 ? '#F6F7F2' : '#A2FF01';
        context.fillText(glyph, i * FONT_SIZE, drops[i]! * FONT_SIZE);
        if (drops[i]! * FONT_SIZE > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] = drops[i]! + 1;
      }

      frames += 1;
      if (frames < MAX_FRAMES) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    console.log(`%c${copy.consoleHint}`, 'color:#A2FF01;font-family:monospace;font-size:12px');
  }, [copy.consoleHint]);

  if (!active) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-label={copy.title}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.titleText}>{copy.title}</span>
          <span className={styles.titleGlitch} aria-hidden="true">
            {copy.title}
          </span>
        </div>
        <p className={styles.subtitle}>{copy.subtitle}</p>
      </div>
    </div>
  );
}
