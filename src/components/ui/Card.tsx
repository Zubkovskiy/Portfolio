import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/utils';
import styles from './Card.module.css';

export type CardProps = {
  children: ReactNode;
  hoverable?: boolean;
  accent?: boolean;
  fill?: boolean;
  padding?: number;
  className?: string;
  style?: CSSProperties;
};

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
