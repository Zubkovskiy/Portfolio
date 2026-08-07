'use client';

import { useSyncExternalStore } from 'react';

const stores = new Map<string, { subscribe: (cb: () => void) => () => void; getSnapshot: () => boolean }>();

function getStore(query: string) {
  let store = stores.get(query);
  if (store) return store;

  const list = window.matchMedia(query);
  store = {
    subscribe: (callback) => {
      list.addEventListener('change', callback);
      return () => list.removeEventListener('change', callback);
    },
    getSnapshot: () => list.matches,
  };
  stores.set(query, store);
  return store;
}

/**
 * SSR-safe media query hook. Returns `serverFallback` during server render and
 * the first client paint, then the real value — so the markup never mismatches.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    (callback) => (typeof window === 'undefined' ? () => {} : getStore(query).subscribe(callback)),
    () => getStore(query).getSnapshot(),
    () => serverFallback,
  );
}

/** True when the visitor asked the OS to reduce motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', false);
}

/** True for mouse/trackpad pointers — gates hover-only effects like tilt. */
export function useFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)', false);
}
