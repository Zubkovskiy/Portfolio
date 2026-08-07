'use client';

import type { ReactNode } from 'react';
import { useTilt } from '@/hooks/useTilt';

export type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Turn the effect off without changing the markup. */
  enabled?: boolean;
};

/**
 * Adds pointer-driven 3D tilt to whatever it wraps.
 *
 * Isolated as its own client component so the sections that use it can stay
 * server components — only this wrapper ships to the browser.
 */
export function TiltCard({ children, className, enabled = true }: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>(enabled);

  return (
    <div ref={ref} className={className} data-cursor-hover="">
      {children}
    </div>
  );
}
