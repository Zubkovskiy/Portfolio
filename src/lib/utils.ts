/**
 * Base path the site is served from — '' when it owns the domain root,
 * '/Portfolio' on GitHub Pages. Set at build time via NEXT_PUBLIC_BASE_PATH
 * and mirrored into `basePath` in next.config.ts.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/**
 * Prefixes a root-relative URL with the deployment's base path.
 *
 * `next/link` and `next/image` do this themselves; plain <a href> and any
 * hand-written asset URL do not, so those call sites go through here.
 */
export function withBasePath(path: string): string {
  if (!BASE_PATH || !path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}

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
