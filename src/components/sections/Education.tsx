import type { CSSProperties } from 'react';
import { Section, sectionStyles } from '@/components/layout/Section';
import { SectionHeading } from '@/components/ui';
import type { Dictionary } from '@/lib/i18n';
import { cx } from '@/lib/utils';
import styles from './Education.module.css';

export function Education({ education }: { education: Dictionary['education'] }) {
  const items = [...education.items].reverse();

  return (
    <Section id="education" labelledBy="education-title" narrow>
      <div className={`reveal ${sectionStyles.heading}`}>
        <SectionHeading
          id="education-title"
          eyebrow={education.eyebrow}
          ghostText={education.ghost}
          title={education.title}
          highlight={education.highlight}
        />
      </div>

      <ol className={`reveal reveal-delay-1 ${styles.timeline}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.period}-${item.title}`}
              className={cx(styles.row, isLast && styles.last)}
              style={
                {
                  '--rail-delay': `${index}s`,
                  '--line-delay': `${index + 0.42}s`,
                } as CSSProperties
              }
            >
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.dot} />
                {!isLast ? <span className={styles.line} /> : null}
              </div>

              <div className={styles.content}>
                <span className={styles.period}>{item.period}</span>
                <h3 className={styles.title}>{item.title}</h3>
                {item.institution ? <div className={styles.institution}>{item.institution}</div> : null}
                {item.description ? <p className={styles.description}>{item.description}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
