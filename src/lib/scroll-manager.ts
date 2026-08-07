export type ScrollSnapshot = {
  scrollY: number;
  progress: number;
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

export function onScroll(listener: Listener): () => void {
  listeners.add(listener);
  attach();
  listener(measure());

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) detach();
  };
}
