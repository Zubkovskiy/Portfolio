import { notFound } from 'next/navigation';
import { SiteEffects } from '@/components/fx/SiteEffects';
import { Footer } from '@/components/layout/Footer';
import { NavBar } from '@/components/layout/NavBar';
import { About } from '@/components/sections/About';
import { Certificates } from '@/components/sections/Certificates';
import { Contact } from '@/components/sections/Contact';
import { Education } from '@/components/sections/Education';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';
import { Marquee } from '@/components/ui';
import { getDictionary, isLocale } from '@/lib/i18n';
import { cvDownloadHref } from '@/lib/site';
import { PersonJsonLd } from './PersonJsonLd';
import styles from './page.module.css';

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <PersonJsonLd lang={lang} dict={dict} />
      <SiteEffects dict={dict} />

      <a className="skip-link" href="#main">
        {dict.a11y.skipToContent}
      </a>

      <div className={styles.shell}>
        <NavBar locale={lang} nav={dict.nav} a11y={dict.a11y} />

        <main id="main">
          <Hero hero={dict.hero} cvHref={cvDownloadHref(lang)} />

          <Marquee items={dict.marquee} />

          <Services services={dict.services} />
          <About about={dict.about} contact={dict.contact} />
          <Skills skills={dict.skills} languages={dict.languages} />

          <Marquee items={dict.marquee} tone="dark" />

          <Certificates certificates={dict.certificates} />
          <Projects projects={dict.projects} />
          <Education education={dict.education} />
          <Contact contact={dict.contact} />
        </main>

        <Marquee items={dict.marquee} />
        <Footer dict={dict} />
      </div>
    </>
  );
}
