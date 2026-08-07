'use client';

import { Button } from '@/components/ui';

export function PrintButton({ label }: { label: string }) {
  return (
    <Button onClick={() => window.print()} shine>
      {label}
    </Button>
  );
}
