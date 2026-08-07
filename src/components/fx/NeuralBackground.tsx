'use client';

import { useEffect, useRef } from 'react';
import styles from './NeuralBackground.module.css';

const LINK_DISTANCE = 130;
const MOUSE_DISTANCE = 170;
const ALPHA_BUCKETS = 6;
const NODE_COLOR = 'rgba(246,247,242,.35)';

type Node = { x: number; y: number; vx: number; vy: number; r: number };

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let resizeTimer = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = coarsePointer ? 34000 : 23000;
      const count = Math.min(coarsePointer ? 45 : 90, Math.max(24, Math.round((width * height) / density)));

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const buckets: Path2D[] = [];

    const paint = () => {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < ALPHA_BUCKETS; i += 1) buckets[i] = new Path2D();

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]!;

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq >= LINK_DISTANCE * LINK_DISTANCE) continue;

          const strength = 1 - Math.sqrt(distanceSq) / LINK_DISTANCE;
          const bucket = Math.min(ALPHA_BUCKETS - 1, Math.floor(strength * ALPHA_BUCKETS));
          const path = buckets[bucket]!;
          path.moveTo(a.x, a.y);
          path.lineTo(b.x, b.y);
        }

        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < MOUSE_DISTANCE * MOUSE_DISTANCE) {
            const strength = 1 - Math.sqrt(distanceSq) / MOUSE_DISTANCE;
            context.strokeStyle = `rgba(162,255,1,${(strength * 0.5).toFixed(3)})`;
            context.lineWidth = 1.2;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
          }
        }
      }

      context.lineWidth = 1;
      for (let i = 0; i < ALPHA_BUCKETS; i += 1) {
        const alpha = (((i + 0.5) / ALPHA_BUCKETS) * 0.18).toFixed(3);
        context.strokeStyle = `rgba(162,255,1,${alpha})`;
        context.stroke(buckets[i]!);
      }

      const dots = new Path2D();
      for (const node of nodes) {
        dots.moveTo(node.x + node.r, node.y);
        dots.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      }
      context.fillStyle = NODE_COLOR;
      context.fill(dots);
    };

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
      paint();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (!frame && !reducedMotion) frame = requestAnimationFrame(step);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reducedMotion) paint();
      }, 150);
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };
    const handlePointerLeave = () => {
      mouse.active = false;
    };
    const handleVisibility = () => (document.hidden ? stop() : start());

    build();
    if (reducedMotion) paint();
    else start();

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    if (!coarsePointer) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      document.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
