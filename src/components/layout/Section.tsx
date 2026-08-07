import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
import styles from './Section.module.css';

export type SectionProps = {
  id: string;
  children: ReactNode;
  /** Narrower measure — used by the education timeline. */
  narrow?: boolean;
  /** Id of the heading that names this section, for screen readers. */
  labelledBy?: string;
  className?: string;
};

/** Standard page section: centred container, vertical rhythm, scroll anchor. */
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
