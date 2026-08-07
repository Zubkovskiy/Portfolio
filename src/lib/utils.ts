/** Joins class names, dropping anything falsy. */
export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

/** Clamps `value` into the inclusive [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Splits a stat string into its leading number and trailing suffix, so the
 * number can be counted up while '+' / '%' / 'k' stay put.
 * '1.5 yrs' -> { value: 1.5, decimals: 1, suffix: ' yrs' }
 */
export function parseCountUpValue(raw: string): { value: number; decimals: number; suffix: string } {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(raw.trim());
  if (!match?.[1]) return { value: Number.NaN, decimals: 0, suffix: raw };

  const [, digits, suffix = ''] = match;
  const decimals = digits.includes('.') ? (digits.split('.')[1]?.length ?? 0) : 0;
  return { value: Number.parseFloat(digits), decimals, suffix };
}

/** Cubic ease-out — the entrance curve used across the design system. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
