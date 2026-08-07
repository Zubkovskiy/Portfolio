import { siteConfig } from '@/lib/site';
import { cx } from '@/lib/utils';
import styles from './Logo.module.css';

export function Logo({ href = '#top', className }: { href?: string; className?: string }) {
  return (
    <a href={href} className={cx(styles.logo, className)} aria-label={siteConfig.name}>
      <span className={styles.badge} aria-hidden="true">
        {siteConfig.monogram}
      </span>
      <span className={styles.word}>
        {siteConfig.shortName}
        <span className={styles.dot} aria-hidden="true">
          .
        </span>
      </span>
    </a>
  );
}
