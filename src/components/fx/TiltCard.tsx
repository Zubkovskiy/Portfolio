'use client';

import type { ReactNode } from 'react';
import { useTilt } from '@/hooks/useTilt';

export type TiltCardProps = {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
};

export function TiltCard({ children, className, enabled = true }: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>(enabled);

  return (
    <div ref={ref} className={className} data-cursor-hover="">
      {children}
    </div>
  );
}
