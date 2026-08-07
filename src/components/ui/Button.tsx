import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/utils';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  shine?: boolean;
  className?: string;
};

type AnchorProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CommonProps | 'href'
  >;

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof CommonProps
  >;

export type ButtonProps = AnchorProps | NativeButtonProps;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  shine = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], styles[size], shine && styles.shine, className);

  const content = (
    <>
      {icon && iconPosition === 'left' ? <span className={styles.icon}>{icon}</span> : null}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === 'right' ? <span className={styles.icon}>{icon}</span> : null}
    </>
  );

  const shineAttr = shine ? { 'data-shine': '' } : {};

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as AnchorProps;
    return (
      <a href={href} className={classes} {...shineAttr} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as NativeButtonProps;
  return (
    <button type={type} className={classes} {...shineAttr} {...buttonProps}>
      {content}
    </button>
  );
}
