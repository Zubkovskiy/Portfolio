import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui';
import { LOCALES, getDictionary, isLocale, localePath } from '@/lib/i18n';
import { cvDownloadHref, mailtoHref, siteConfig, telHref } from '@/lib/site';
import { cx, withBasePath } from '@/lib/utils';
import { PrintButton } from './PrintButton';
import styles from './cv.module.css';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return {
    title: dict.cv.documentLabel,
    description: dict.cv.subtitle,
    alternates: { canonical: `${siteConfig.url}${localePath(lang, '/cv')}` },
  };
}

function SheetHeading({ children }: { children: string }) {
  return (
    <h2 className={styles.sectionTitle}>
      <span className={styles.sectionMark} aria-hidden="true" />
      {children}
      <span className={styles.sectionRule} aria-hidden="true" />
    </h2>
  );
}

export default async function CvPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { cv, education, skills, languages, certificates } = dict;

  return (
    <>
      <div className={styles.stage}>
        <article className={styles.sheet}>
          <header className={styles.header}>
            <div className={styles.headerGlow} aria-hidden="true" />

            <div className={styles.headerInner}>
              <div>
                <div className={styles.brand}>
                  <span className={styles.monogram} aria-hidden="true">
                    {siteConfig.monogram}
                  </span>
                  <span className={styles.docLabel}>{cv.documentLabel}</span>
                </div>
                <h1 className={styles.name}>{dict.hero.name}</h1>
                <p className={styles.subtitle}>{cv.subtitle}</p>
              </div>

              <div className={styles.headerContacts}>
                <a href={mailtoHref} className={styles.headerContact}>
                  <span className={styles.bullet} aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
                <a href={telHref} className={styles.headerContact}>
                  <span className={styles.bullet} aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
                <span className={cx(styles.headerContact, styles.headerMuted)}>
                  <span className={styles.bullet} aria-hidden="true" />
                  {dict.contact.info.address}
                </span>
                <span className={styles.headerFine}>{cv.openness}</span>
              </div>
            </div>
          </header>

          <div className={styles.body}>
            <div className={styles.col}>
              <section>
                <SheetHeading>{cv.sections.profile}</SheetHeading>
                {cv.profile.map((paragraph, index) => (
                  <p key={index} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </section>

              <section>
                <SheetHeading>{cv.sections.education}</SheetHeading>
                <div className={styles.timeline}>
                  {education.items.map((item, index) => (
                    <div
                      key={`${item.period}-${item.title}`}
                      className={cx(styles.entry, index === 0 && styles.entryCurrent)}
                    >
                      <span className={styles.entryPeriod}>{item.period}</span>
                      <div className={styles.entryBody}>
                        <div className={styles.entryTitle}>{item.title}</div>
                        <div className={styles.entryMeta}>
                          {[item.institution, item.description].filter(Boolean).join(' · ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SheetHeading>{cv.sections.objective}</SheetHeading>
                <p className={styles.paragraph}>{cv.objective}</p>
              </section>
            </div>

            <div className={cx(styles.col, styles.colTight)}>
              <section>
                <SheetHeading>{cv.sections.skills}</SheetHeading>
                <div className={styles.skillGroups}>
                  {skills.groups.map((group, index) => {
                    const learning = index === skills.groups.length - 1;
                    return (
                      <div key={group.label}>
                        <div className={styles.skillLabel}>{group.label}</div>
                        <div className={styles.chips}>
                          {group.items.map((item) => (
                            <span key={item} className={cx(styles.chip, learning && styles.chipLearning)}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section>
                <SheetHeading>{cv.sections.languages}</SheetHeading>
                <div className={styles.rows}>
                  {languages.items.map((language) => (
                    <div key={language.name} className={styles.rowSplit}>
                      <span className={styles.rowName}>{language.name}</span>
                      <span className={styles.rowValue}>{language.level}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SheetHeading>{cv.sections.certificates}</SheetHeading>
                <div className={styles.certList}>
                  {certificates.items.map((certificate) => (
                    <div key={certificate.title}>
                      <span className={styles.certTitle}>{certificate.title}</span>{' '}
                      <span className={styles.certStatus}>({cv.statusLabels[certificate.status]})</span>
                      <div className={styles.certMeta}>
                        {[certificate.issuer, certificate.meta].filter(Boolean).join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <footer className={styles.sheetFooter}>
            <span>{siteConfig.contact.email}</span>
            <span>{dict.contact.info.address}</span>
          </footer>
        </article>
      </div>

      <div className={cx(styles.actions, 'no-print')}>
        <Button href={withBasePath(localePath(lang))} variant="secondary">
          {cv.backToSite}
        </Button>
        <Button href={cvDownloadHref(lang)} download type="application/pdf" variant="outline">
          {dict.hero.ctaDownload}
        </Button>
        <PrintButton label={cv.savePdf} />
      </div>
    </>
  );
}
