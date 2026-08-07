import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
import styles from './IconBadge.module.css';

export type IconBadgeProps = {
  icon: ReactNode;
  tone?: 'solid' | 'soft' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/** Icon container using the brand's asymmetric blob corner. */
export function IconBadge({ icon, tone = 'soft', size = 'md', className }: IconBadgeProps) {
  return (
    <span className={cx(styles.badge, styles[tone], styles[size], className)} aria-hidden="true">
      {icon}
    </span>
  );
}
