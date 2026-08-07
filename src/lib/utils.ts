export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

export function withBasePath(path: string): string {
  if (!BASE_PATH || !path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}

export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function parseCountUpValue(raw: string): { value: number; decimals: number; suffix: string } {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(raw.trim());
  if (!match?.[1]) return { value: Number.NaN, decimals: 0, suffix: raw };

  const [, digits, suffix = ''] = match;
  const decimals = digits.includes('.') ? (digits.split('.')[1]?.length ?? 0) : 0;
  return { value: Number.parseFloat(digits), decimals, suffix };
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
