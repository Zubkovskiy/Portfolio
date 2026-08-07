'use client';

import { useEffect, useId, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import type { Dictionary, Locale } from '@/lib/i18n';
import { cx } from '@/lib/utils';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import styles from './NavBar.module.css';

export type NavBarProps = {
  locale: Locale;
  nav: Dictionary['nav'];
  a11y: Dictionary['a11y'];
};

export function NavBar({ locale, nav, a11y }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const sectionIds = nav.links.map((link) => link.href.slice(1));
  const activeId = useScrollSpy(sectionIds, sectionIds[0] ?? 'top');

  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia('(min-width: 1101px)');
    const close = () => setOpen(false);
    query.addEventListener('change', close);
    return () => query.removeEventListener('change', close);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />

        <nav className={styles.links} aria-label="Primary">
          {nav.links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={styles.link}
              aria-current={link.href.slice(1) === activeId ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitch current={locale} label={a11y.languageSwitch} />

          <span className={styles.cta}>
            <Button size="sm" href="#contact" shine>
              {nav.cta}
            </Button>
          </span>

          <button
            type="button"
            className={styles.toggle}
            aria-label={open ? nav.closeMenuLabel : nav.menuLabel}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={cx(styles.drawer, open && styles.drawerOpen)} inert={!open}>
        <nav id={menuId} className={styles.mobileNav} aria-label="Primary mobile">
          {nav.links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={styles.mobileLink}
              aria-current={link.href.slice(1) === activeId ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
