import { Code2, GitBranch, GraduationCap, Languages, Palette } from 'lucide-react';
import { Section, sectionStyles } from '@/components/layout/Section';
import { IconBadge, SectionHeading } from '@/components/ui';
import type { Dictionary } from '@/lib/i18n';
import { cx } from '@/lib/utils';
import styles from './Skills.module.css';

const GROUP_ICONS = [Code2, Palette, GitBranch, GraduationCap] as const;

export type SkillsProps = {
  skills: Dictionary['skills'];
  languages: Dictionary['languages'];
};

/** Skill groups as chip clouds, plus a language proficiency panel. */
export function Skills({ skills, languages }: SkillsProps) {
  return (
    <Section id="skills" labelledBy="skills-title">
      <div className={`reveal ${sectionStyles.heading}`}>
        <SectionHeading
          id="skills-title"
          eyebrow={skills.eyebrow}
          ghostText={skills.ghost}
          title={skills.title}
          highlight={skills.highlight}
          align="center"
        />
      </div>

      <div className={styles.stack}>
        <div className={`reveal reveal-delay-1 ${styles.grid}`}>
          {skills.groups.map((group, index) => {
            const Icon = GROUP_ICONS[index % GROUP_ICONS.length]!;

            return (
              <div key={group.label} className={styles.panel} data-cursor-hover="">
                <span className={styles.notch} aria-hidden="true" />

                <div className={styles.panelHead}>
                  <IconBadge tone="solid" size="sm" icon={<Icon size={16} aria-hidden="true" />} />
                  <h3 className={styles.panelTitle}>{group.label}</h3>
                  <span className={styles.panelIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <ul className={styles.chips}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.chip}>
                      <span className={styles.chipMark} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={cx('reveal reveal-delay-2', styles.panel, styles.wide)} data-cursor-hover="">
          <span className={styles.notch} aria-hidden="true" />

          <div className={styles.panelHead}>
            <IconBadge tone="solid" size="sm" icon={<Languages size={16} aria-hidden="true" />} />
            <h3 className={styles.panelTitle}>{languages.title}</h3>
          </div>

          <div className={styles.languages}>
            {languages.items.map((language) => (
              <div key={language.name} className={styles.language}>
                <div className={styles.languageHead}>
                  <span className={styles.languageName}>{language.name}</span>
                  <span className={styles.languageLevel}>{language.level}</span>
                </div>
                <div
                  className={styles.meter}
                  role="meter"
                  aria-label={language.name}
                  aria-valuenow={language.proficiency}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuetext={language.level}
                >
                  <div className={styles.meterFill} style={{ width: `${language.proficiency}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
