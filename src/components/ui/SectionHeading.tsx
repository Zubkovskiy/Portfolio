import { cx } from '@/lib/utils';
import styles from './SectionHeading.module.css';

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  ghostText?: string;
  align?: 'left' | 'center';
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  ghostText,
  align = 'left',
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cx(styles.heading, align === 'center' && styles.center, className)}>
      {ghostText ? (
        <span className={styles.ghost} aria-hidden="true">
          {ghostText}
        </span>
      ) : null}

      {eyebrow ? (
        <span className={styles.eyebrowWrap}>
          <span className={styles.eyebrow}>
            <span className={cx(styles.corner, styles.cornerTl)} aria-hidden="true" />
            <span className={cx(styles.corner, styles.cornerTr)} aria-hidden="true" />
            <span className={cx(styles.corner, styles.cornerBl)} aria-hidden="true" />
            <span className={cx(styles.corner, styles.cornerBr)} aria-hidden="true" />
            {eyebrow}
          </span>
        </span>
      ) : null}

      <h2 id={id} className={styles.title}>
        {title}
        {highlight ? <span className={styles.highlight}> {highlight}</span> : null}
      </h2>
    </div>
  );
}
