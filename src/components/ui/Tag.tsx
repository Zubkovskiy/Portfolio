import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/utils';
import styles from './Tag.module.css';

export type TagTone = 'neutral' | 'accent' | 'outline' | 'soft';

export type TagProps = {
  children: ReactNode;
  tone?: TagTone;
  size?: 'sm' | 'md';
  /** Decorative tilt in degrees, for the hero's tag cloud. */
  rotate?: number;
  className?: string;
  style?: CSSProperties;
};

/** Small pill label. */
export function Tag({ children, tone = 'neutral', size = 'sm', rotate = 0, className, style }: TagProps) {
  return (
    <span
      className={cx(styles.tag, styles[tone], styles[size], className)}
      style={rotate ? { transform: `rotate(${rotate}deg)`, ...style } : style}
    >
      {children}
    </span>
  );
}
