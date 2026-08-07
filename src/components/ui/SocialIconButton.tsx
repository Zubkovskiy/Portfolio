import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
import styles from './SocialIconButton.module.css';

export type SocialIconButtonProps = {
  icon: ReactNode;
  href: string;
  label: string;
  tone?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/** Circular icon link for social profiles. */
export function SocialIconButton({
  icon,
  href,
  label,
  tone = 'solid',
  size = 'md',
  className,
}: SocialIconButtonProps) {
  // Placeholder links must not advertise a destination they don't have.
  const isPlaceholder = href === '#';
  const external = href.startsWith('http');

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className={cx(styles.link, styles[tone], styles[size], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(isPlaceholder ? { 'aria-disabled': true } : {})}
    >
      {icon}
    </a>
  );
}
