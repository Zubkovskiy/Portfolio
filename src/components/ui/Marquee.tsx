import type { CSSProperties } from 'react';
import { cx } from '@/lib/utils';
import styles from './Marquee.module.css';

export type MarqueeProps = {
  items: readonly string[];
  tone?: 'accent' | 'dark';
  durationSec?: number;
  className?: string;
};

/**
 * Full-bleed scrolling ticker used as a section divider.
 *
 * The list is duplicated once and the track translates by exactly -50%, which
 * is what makes the loop seamless. The copy is `aria-hidden` so assistive tech
 * reads the band a single time.
 */
export function Marquee({ items, tone = 'accent', durationSec, className }: MarqueeProps) {
  if (items.length === 0) return null;

  const style = durationSec ? ({ '--marquee-duration': `${durationSec}s` } as CSSProperties) : undefined;

  return (
    <div className={cx(styles.marquee, styles[tone], className)} style={style}>
      <div className={styles.track}>
        {[0, 1].map((copy) =>
          items.map((item, index) => (
            <span
              key={`${copy}-${index}`}
              className={styles.item}
              {...(copy === 1 ? { 'aria-hidden': true } : {})}
            >
              <span className={styles.text}>{item}</span>
              <span className={styles.glyph} aria-hidden="true">
                ✳
              </span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
