'use client';

import { Button } from '@/components/ui';

/** Triggers the browser's print dialog, where "Save as PDF" lives. */
export function PrintButton({ label }: { label: string }) {
  return (
    <Button onClick={() => window.print()} shine>
      {label}
    </Button>
  );
}
