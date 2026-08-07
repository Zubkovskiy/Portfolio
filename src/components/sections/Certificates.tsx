'use client';

import type { CSSProperties } from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { TiltCard } from '@/components/fx/TiltCard';
import { Section, sectionStyles } from '@/components/layout/Section';
import { ImageSlot, SectionHeading } from '@/components/ui';
import { useCountUp } from '@/hooks/useCountUp';
import type { CertificateItem, Dictionary } from '@/lib/i18n';
import { cx } from '@/lib/utils';
import { CertificateDraft } from './CertificateDraft';
import styles from './Certificates.module.css';

type CardProps = {
  item: CertificateItem;
  index: number;
  labels: Pick<Dictionary['certificates'], 'completedLabel' | 'inProgressLabel'>;
};

function CertificateCard({ item, index, labels }: CardProps) {
  // Only the unfinished card animates its percentage; a finished one is just 100.
  const inProgress = item.status === 'in-progress';
  const { ref, progress } = useCountUp<HTMLElement>();
  const factor = inProgress ? progress : 1;
  const livePercent = Math.round(item.percent * factor);

  return (
    <TiltCard className={styles.tiltHost}>
      <article className={styles.card} ref={ref}>
        <div className={cx(styles.media, item.image && styles.mediaDocument)}>
          {item.image ? (
            <ImageSlot
              src={item.image}
              alt={item.imageCaption}
              caption={item.imageCaption}
              fit="contain"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          ) : (
            <CertificateDraft caption={item.imageCaption} />
          )}

          <div className={styles.scanner} aria-hidden="true">
            <div
              className={styles.scannerBeam}
              style={{ '--scan-delay': `${index * 1.5}s` } as CSSProperties}
            />
          </div>

          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>

          {inProgress ? (
            <span className={cx(styles.badge, styles.badgeProgress)}>
              <span className={styles.badgePulse} aria-hidden="true" />
              {labels.inProgressLabel}
            </span>
          ) : (
            <span className={cx(styles.badge, styles.badgeDone)}>
              <Check size={13} aria-hidden="true" />
              {labels.completedLabel}
            </span>
          )}
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.issuer}>{item.issuer}</div>
          {item.meta ? <div className={styles.meta}>{item.meta}</div> : null}

          {item.verifyUrl ? (
            <a
              className={styles.verify}
              href={item.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.verifyLabel}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          ) : null}

          <div className={styles.rule} aria-hidden="true" />

          {/* A multi-track course shows one bar per track instead of a single total. */}
          {item.parts ? (
            <div className={styles.parts}>
              {item.parts.map((part) => {
                const partPercent = Math.round(part.percent * factor);
                return (
                  <div key={part.label} className={styles.part}>
                    <div className={styles.progressHead}>
                      <span className={styles.partLabel}>{part.label}</span>
                      <span className={styles.partPercent}>{partPercent}%</span>
                    </div>
                    <div
                      className={styles.track}
                      role="progressbar"
                      aria-label={`${item.title} — ${part.label}`}
                      aria-valuenow={part.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div className={styles.fill} style={{ width: `${partPercent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className={styles.progressHead}>
                {/* Nothing to caption on a single-bar card — the title, issuer
                    and badge above already say everything the bar could. */}
                <span className={styles.percent}>{livePercent}%</span>
              </div>
              <div
                className={styles.track}
                role="progressbar"
                aria-label={item.title}
                aria-valuenow={item.percent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className={styles.fill} style={{ width: `${livePercent}%` }} />
              </div>
            </>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

/**
 * Certificate grid, driven entirely by the dictionary.
 *
 * A card with no `image` renders the labelled empty slot rather than a stand-in,
 * and an unfinished course shows its real per-track progress instead of a
 * single made-up number.
 */
export function Certificates({ certificates }: { certificates: Dictionary['certificates'] }) {
  const labels = {
    completedLabel: certificates.completedLabel,
    inProgressLabel: certificates.inProgressLabel,
  };

  return (
    <Section id="certificates" labelledBy="certificates-title">
      <div className={`reveal ${sectionStyles.headingTight}`}>
        <SectionHeading
          id="certificates-title"
          eyebrow={certificates.eyebrow}
          ghostText={certificates.ghost}
          title={certificates.title}
          highlight={certificates.highlight}
          align="center"
        />
      </div>

      <p className={`reveal ${sectionStyles.note}`}>{certificates.note}</p>

      <div className={`reveal reveal-delay-1 ${styles.grid}`}>
        {certificates.items.map((item, index) => (
          <CertificateCard key={item.title} item={item} index={index} labels={labels} />
        ))}
      </div>
    </Section>
  );
}
