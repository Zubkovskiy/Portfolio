import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
import styles from './Section.module.css';

export type SectionProps = {
  id: string;
  children: ReactNode;
  narrow?: boolean;
  labelledBy?: string;
  className?: string;
};

export function Section({ id, children, narrow = false, labelledBy, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(styles.section, narrow && styles.narrow, className)}
    >
      {children}
    </section>
  );
}

export { styles as sectionStyles };
