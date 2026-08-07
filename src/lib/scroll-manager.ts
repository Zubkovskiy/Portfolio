/**
 * One passive scroll/resize listener for the whole page, throttled to a
 * single requestAnimationFrame tick, broadcasting a pre-computed snapshot.
 *
 * The design export attached a separate listener + its own rAF gate per
 * effect (progress bar, parallax, scroll-to-top ring…). Each one re-read
 * scrollTop/scrollHeight/clientHeight independently, so a single scroll
 * frame forced several layout reads. Here the metrics are measured once and
 * handed to every subscriber.
 */

export type ScrollSnapshot = {
  /** Pixels scrolled from the top of the document. */
  scrollY: number;
  /** Scroll position as a 0–1 fraction of the maximum scrollable distance. */
  progress: number;
  /** Viewport height in CSS pixels. */
  viewportHeight: number;
};

type Listener = (snapshot: ScrollSnapshot) => void;

const listeners = new Set<Listener>();

let frame = 0;
let attached = false;
let snapshot: ScrollSnapshot = { scrollY: 0, progress: 0, viewportHeight: 0 };

function measure(): ScrollSnapshot {
  const doc = document.documentElement;
  const scrollY = window.scrollY || doc.scrollTop || 0;
  const max = doc.scrollHeight - doc.clientHeight;
  return {
    scrollY,
    progress: max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0,
    viewportHeight: doc.clientHeight,
  };
}

function flush(): void {
  frame = 0;
  snapshot = measure();
  for (const listener of listeners) listener(snapshot);
}

function schedule(): void {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

function attach(): void {
  if (attached) return;
  attached = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

function detach(): void {
  if (!attached) return;
  attached = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

/**
 * Subscribes to scroll updates. The listener fires once immediately with the
 * current position so callers never render a stale initial state.
 * Returns an unsubscribe function.
 */
export function onScroll(listener: Listener): () => void {
  listeners.add(listener);
  attach();
  listener(measure());

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) detach();
  };
}
