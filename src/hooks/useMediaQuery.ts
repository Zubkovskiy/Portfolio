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

export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    (callback) => (typeof window === 'undefined' ? () => {} : getStore(query).subscribe(callback)),
    () => getStore(query).getSnapshot(),
    () => serverFallback,
  );
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', false);
}

export function useFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)', false);
}
