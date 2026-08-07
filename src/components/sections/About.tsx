import { Bot, Code2, Network, UserRound } from 'lucide-react';
import { TiltCard } from '@/components/fx/TiltCard';
import { Section } from '@/components/layout/Section';
import { Card, IconBadge, SectionHeading } from '@/components/ui';
import type { Dictionary } from '@/lib/i18n';
import styles from './About.module.css';

const PILLAR_ICONS = [Code2, Bot, Network, UserRound] as const;

/** Profile section: bio + career objective beside a profile.json terminal card. */
export function About({ about, contact }: { about: Dictionary['about']; contact: Dictionary['contact'] }) {
  const card = about.profileCard;

  const rows = [
    { key: card.location, value: contact.info.address },
    { key: card.focus, value: card.focusValue },
    { key: card.learning, value: card.learningValue },
  ];

  return (
    <Section id="about" labelledBy="about-title" className={styles.section}>
      <div className="reveal">
        <SectionHeading
          id="about-title"
          eyebrow={about.eyebrow}
          ghostText={about.ghost}
          title={about.title}
          highlight={about.highlight}
        />

        <p className={styles.bio}>{about.bio}</p>

        <TiltCard className={styles.goalCard}>
          <Card accent>
            <div className={styles.goalTitle}>{about.goalTitle}</div>
            <p className={styles.goalText}>{about.goal}</p>
          </Card>
        </TiltCard>
      </div>

      <div className={`reveal reveal-delay-2 ${styles.visual}`}>
        <TiltCard className={styles.tiltHost}>
          <div className={styles.window}>
            <div className={styles.windowBar}>
              <span className={styles.dot} style={{ background: 'var(--color-danger)' }} />
              <span className={styles.dot} style={{ background: 'var(--color-warning)' }} />
              <span className={styles.dot} style={{ background: 'var(--accent)' }} />
              <span className={styles.fileName}>{card.fileName}</span>
            </div>

            <dl className={styles.rows}>
              {rows.map((row) => (
                <div key={row.key} className={styles.row}>
                  <dt className={styles.key}>{row.key}</dt>
                  <dd className={styles.value}>{row.value}</dd>
                </div>
              ))}

              <div className={styles.row}>
                <dt className={styles.key}>{card.status}</dt>
                <dd className={styles.statusValue}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {contact.labels.statusShort}
                </dd>
              </div>
            </dl>

            <div className={styles.pillars}>
              {card.pillars.map((pillar, index) => {
                const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length]!;
                return (
                  <div key={pillar} className={styles.pillar}>
                    <IconBadge tone="solid" size="sm" icon={<Icon size={16} aria-hidden="true" />} />
                    <span className={styles.pillarLabel}>{pillar}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </TiltCard>
      </div>
    </Section>
  );
}
