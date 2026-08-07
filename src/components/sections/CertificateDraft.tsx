import type { CSSProperties } from 'react';
import { cx } from '@/lib/utils';
import styles from './CertificateDraft.module.css';

/** Registration ticks at the plate corners, as on a real print blank. */
const CORNER_MARKS = [
  'M 18 32 L 18 18 L 32 18',
  'M 368 18 L 382 18 L 382 32',
  'M 18 268 L 18 282 L 32 282',
  'M 382 268 L 382 282 L 368 282',
] as const;

/**
 * Guilloche — the interlaced security waves engraved on certificates and
 * banknotes. Two waves in antiphase cross to form the lattice; the third is a
 * shorter accent below them.
 */
const GUILLOCHE = [
  { d: 'M 92 190 Q 107 180 122 190 T 152 190 T 182 190 T 212 190 T 242 190 T 272 190 T 302 190', delay: 0 },
  { d: 'M 92 190 Q 107 200 122 190 T 152 190 T 182 190 T 212 190 T 242 190 T 272 190 T 302 190', delay: 1.5 },
  { d: 'M 116 208 Q 128 202 140 208 T 164 208 T 188 208 T 212 208 T 236 208 T 260 208 T 284 208', delay: 3 },
] as const;

/**
 * Placeholder for a certificate that does not exist yet.
 *
 * Fills the whole media box and is pure SVG + CSS — no image request, no
 * JavaScript, and every animation stops under `prefers-reduced-motion` along
 * with the rest of the site.
 */
export function CertificateDraft({ caption }: { caption: string }) {
  return (
    <div className={styles.draft} role="img" aria-label={caption}>
      <svg viewBox="0 0 400 300" className={styles.canvas} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        {CORNER_MARKS.map((d) => (
          <path key={d} d={d} fill="none" stroke="var(--accent)" strokeWidth="1.6" opacity="0.45" />
        ))}

        {/* Engraving border */}
        <rect
          className={styles.frame}
          x="46"
          y="30"
          width="308"
          height="210"
          rx="12"
          fill="none"
          stroke="rgb(162 255 1 / 42%)"
          strokeWidth="1.6"
          strokeDasharray="10 7"
        />
        <rect
          x="56"
          y="40"
          width="288"
          height="190"
          rx="8"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1"
        />

        {/* Seal — outer ring turns, inner arc fills to the completed share */}
        <g>
          <circle
            className={styles.sealRing}
            cx="200"
            cy="106"
            r="34"
            fill="none"
            stroke="rgb(162 255 1 / 40%)"
            strokeWidth="1.4"
            strokeDasharray="4 7"
          />
          <circle cx="200" cy="106" r="26" fill="none" stroke="var(--color-border-strong)" strokeWidth="3" />
          <circle
            className={styles.sealProgress}
            cx="200"
            cy="106"
            r="26"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="164"
            strokeDashoffset="164"
            transform="rotate(-90 200 106)"
          />
          <circle cx="200" cy="106" r="15" fill="none" stroke="rgb(162 255 1 / 35%)" strokeWidth="1.2" />
        </g>

        {/* Award ribbons under the seal */}
        <path
          d="M 190 138 L 182 176 L 197 167"
          fill="none"
          stroke="rgb(162 255 1 / 45%)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M 210 138 L 218 176 L 203 167"
          fill="none"
          stroke="rgb(162 255 1 / 45%)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {GUILLOCHE.map((wave) => (
          <path
            key={wave.d}
            className={styles.guilloche}
            style={{ '--wave-delay': `${wave.delay}s` } as CSSProperties}
            d={wave.d}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.1"
          />
        ))}
      </svg>

      <span className={cx(styles.caption)}>{caption}</span>
    </div>
  );
}
