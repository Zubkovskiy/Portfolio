import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button, SocialIconButton } from '@/components/ui';
import type { Dictionary } from '@/lib/i18n';
import { mailtoHref, siteConfig, telHref } from '@/lib/site';
import { Logo } from './Logo';
import styles from './Footer.module.css';

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  telegram: Send,
} as const;

/** Animated hairline rule with a travelling node. Purely decorative. */
function Divider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span className={styles.dividerNode} />
    </div>
  );
}

export function Footer({ dict }: { dict: Dictionary }) {
  const { footer, contact, nav } = dict;
  const year = new Date().getFullYear();

  const contactItems = [
    { key: 'email', href: mailtoHref, label: siteConfig.contact.email, Icon: Mail },
    { key: 'phone', href: telHref, label: siteConfig.contact.phone, Icon: Phone },
    { key: 'address', href: '#contact', label: contact.info.address, Icon: MapPin },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.top}>
        <div className={styles.cta}>
          <div className={styles.ctaCopy}>
            <div className={styles.eyebrow}>{contact.eyebrow}</div>
            <h2 className={styles.ctaTitle}>
              {footer.ctaTitle}
              <span className={styles.ctaAccent}>.</span>
            </h2>
            <a href={mailtoHref} className={styles.mailLink}>
              <Mail size={15} aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
          </div>

          <Button href="#contact" shine>
            {nav.cta}
          </Button>
        </div>

        <Divider />
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          <Logo />
          <p className={styles.tagline}>{footer.tagline}</p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>
            <span className={styles.columnBullet} aria-hidden="true" />
            {footer.navTitle}
          </h3>
          <nav className={styles.navGrid} aria-label={footer.navTitle}>
            {nav.links.map((link) => (
              <a key={link.key} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>
            <span className={styles.columnBullet} aria-hidden="true" />
            {footer.contactTitle}
          </h3>

          <div className={styles.contactList}>
            {contactItems.map(({ key, href, label, Icon }) => (
              <a key={key} href={href} className={styles.contactLink}>
                <span className={styles.contactIcon}>
                  <Icon size={16} aria-hidden="true" />
                </span>
                {label}
              </a>
            ))}
          </div>

          <div className={styles.socials}>
            {siteConfig.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.id];
              return (
                <SocialIconButton
                  key={social.id}
                  href={social.href}
                  label={social.label}
                  size="sm"
                  tone="outline"
                  icon={<Icon size={16} aria-hidden="true" />}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.bottomWrap}>
        <Divider />
        <div className={styles.bottom}>
          <span className={styles.fine}>
            © {year} {siteConfig.name}. {footer.copyright}
          </span>
          <span className={styles.builtWith}>{footer.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
