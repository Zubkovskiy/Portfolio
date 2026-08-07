import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/utils';
import styles from './Card.module.css';

export type CardProps = {
  children: ReactNode;
  /** Lift + brighten the border on hover. */
  hoverable?: boolean;
  /** Lime accent bar on the left edge. */
  accent?: boolean;
  /** Stretch to the height of its grid row. */
  fill?: boolean;
  padding?: number;
  className?: string;
  style?: CSSProperties;
};

/** Base dark surface card — the building block behind every other card. */
export function Card({
  children,
  hoverable = false,
  accent = false,
  fill = false,
  padding,
  className,
  style,
}: CardProps) {
  return (
    <div
      className={cx(styles.card, hoverable && styles.hoverable, fill && styles.fill, className)}
      style={padding === undefined ? style : ({ '--card-pad': `${padding}px`, ...style } as CSSProperties)}
    >
      {accent ? <span className={styles.accentBar} aria-hidden="true" /> : null}
      {children}
    </div>
  );
}
