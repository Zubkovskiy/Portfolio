import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { Section, sectionStyles } from '@/components/layout/Section';
import { SectionHeading, SocialIconButton } from '@/components/ui';
import type { Dictionary } from '@/lib/i18n';
import { mailtoHref, siteConfig, telHref } from '@/lib/site';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.css';

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  telegram: Send,
} as const;

export function Contact({ contact }: { contact: Dictionary['contact'] }) {
  return (
    <Section id="contact" labelledBy="contact-title">
      <div className={`reveal ${sectionStyles.heading}`}>
        <SectionHeading
          id="contact-title"
          eyebrow={contact.eyebrow}
          ghostText={contact.ghost}
          title={contact.title}
          highlight={contact.highlight}
          align="center"
        />
      </div>

      <div className={`reveal reveal-delay-1 ${styles.grid}`}>
        <ContactForm contact={contact} />

        <div className={styles.info}>
          <div className={styles.infoBody}>
            <div>
              <div className={styles.infoLabel}>
                <span className={styles.infoBullet} aria-hidden="true" />
                {contact.labels.address}
              </div>
              <div className={styles.infoValue}>{contact.info.address}</div>
            </div>

            <div>
              <div className={styles.infoLabel}>
                <span className={styles.infoBullet} aria-hidden="true" />
                {contact.labels.contact}
              </div>
              <div className={styles.infoLinks}>
                <a href={telHref} className={styles.infoLink}>
                  {siteConfig.contact.phone}
                </a>
                <a href={mailtoHref} className={styles.infoLink}>
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.infoFoot}>
            <div className={styles.availability}>
              <span className={styles.availabilityDot} aria-hidden="true" />
              <span className={styles.availabilityText}>{contact.info.availability}</span>
            </div>

            <div className={styles.socials}>
              {siteConfig.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <SocialIconButton
                    key={social.id}
                    href={social.href}
                    label={social.label}
                    tone="outline"
                    icon={<Icon size={18} aria-hidden="true" />}
                  />
                );
              })}
              <SocialIconButton
                href={mailtoHref}
                label="Email"
                tone="outline"
                icon={<Mail size={18} aria-hidden="true" />}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
