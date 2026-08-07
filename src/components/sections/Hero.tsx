'use client';

import type { CSSProperties } from 'react';
import { Download } from 'lucide-react';
import { Button, Tag } from '@/components/ui';
import type { TagTone } from '@/components/ui';
import { useCountUp } from '@/hooks/useCountUp';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { useRotatingText } from '@/hooks/useRotatingText';
import type { Dictionary } from '@/lib/i18n';
import { parseCountUpValue } from '@/lib/utils';
import { HeroCodeWindow } from './HeroCodeWindow';
import styles from './Hero.module.css';

/**
 * Position + motion for each floating tech tag, forming a ring around the
 * code window: four across the top, one down each side, four along the
 * bottom. Weighted top and bottom, where there is actually room.
 *
 * Positions use `left`/`right` percentages rather than a centring
 * `translateX(-50%)` — the parallax effect writes to `style.transform` on
 * these same elements, so any transform set here would be wiped on the first
 * pointer move and the tag would jump.
 *
 * Order matches `hero.floatingTags` in the dictionaries.
 */
const TAG_LAYOUT: Array<{
  style: CSSProperties;
  depth: number;
  tone: TagTone;
  rotate: number;
  duration: number;
  delay: number;
}> = [
  // Top band
  { style: { top: -22, left: '-2%' }, depth: 18, tone: 'soft', rotate: -4, duration: 6.5, delay: 0 },
  { style: { top: -62, left: '25%' }, depth: 26, tone: 'neutral', rotate: 3, duration: 7.6, delay: 1.1 },
  { style: { top: -58, right: '24%' }, depth: 24, tone: 'neutral', rotate: -2, duration: 7.1, delay: 2.2 },
  { style: { top: -18, right: '-3%' }, depth: 30, tone: 'neutral', rotate: 5, duration: 6.8, delay: 3.1 },

  // Sides — vertically centred on the window
  { style: { top: 138, left: '-5%' }, depth: 14, tone: 'accent', rotate: -6, duration: 8.2, delay: 0.8 },
  { style: { top: 196, right: '-5%' }, depth: 16, tone: 'accent', rotate: 6, duration: 7.9, delay: 2.7 },

  // Bottom band
  { style: { top: 366, left: '-1%' }, depth: 22, tone: 'neutral', rotate: -3, duration: 7.2, delay: 0.5 },
  { style: { top: 424, left: '26%' }, depth: 28, tone: 'soft', rotate: 4, duration: 8, delay: 3.4 },
  { style: { top: 420, right: '25%' }, depth: 26, tone: 'neutral', rotate: -4, duration: 6.9, delay: 1.6 },
  { style: { top: 362, right: '-2%' }, depth: 20, tone: 'soft', rotate: 3, duration: 7.4, delay: 2.4 },
];

export type HeroProps = {
  hero: Dictionary['hero'];
  /** URL of the CV PDF for the active locale — English page, English file. */
  cvHref: string;
};

export function Hero({ hero, cvHref }: HeroProps) {
  const activeRole = useRotatingText(hero.roles);
  const zoneRef = usePointerParallax<HTMLElement>();
  const { ref: statsRef, progress } = useCountUp<HTMLDivElement>();

  return (
    <section id="top" className={styles.hero} ref={zoneRef} aria-labelledby="hero-title">
      <div className={styles.wash} aria-hidden="true" />
      <div className={styles.blob} data-parallax-depth="6" aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true">
        <div className={styles.scanline} />
      </div>

      <div className={styles.inner}>
        <div className="reveal">
          <span className={styles.eyebrow}>
            <span className={styles.pulse} aria-hidden="true" />
            {hero.eyebrow}
          </span>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleText}>
              {hero.greeting}
              <br />
              {hero.name}
              <span className={styles.dot}>.</span>
            </span>
            <span className={styles.glitchLime} aria-hidden="true">
              {hero.greeting}
              <br />
              {hero.name}.
            </span>
            <span className={styles.glitchWhite} aria-hidden="true">
              {hero.greeting}
              <br />
              {hero.name}.
            </span>
          </h1>

          {/* aria-live keeps the rotating role announced without re-reading the page. */}
          <div className={styles.roleSlot}>
            <div key={activeRole} className={styles.role} aria-live="polite">
              {activeRole}
            </div>
          </div>

          <p className={styles.bio}>{hero.bio}</p>

          <div className={styles.ctaRow}>
            <Button href="#projects" shine>
              {hero.ctaPrimary}
            </Button>
            <Button
              href={cvHref}
              /* Bare `download` keeps the filename the file already has. */
              download
              type="application/pdf"
              variant="outline"
              shine
              icon={
                <span className={styles.downloadIcon}>
                  <Download size={16} aria-hidden="true" />
                </span>
              }
              iconPosition="left"
            >
              {hero.ctaDownload}
            </Button>
          </div>

          <div className={styles.stats} ref={statsRef}>
            {hero.stats.map((stat) => {
              const { value, decimals, suffix } = parseCountUpValue(stat.value);
              const display = Number.isNaN(value)
                ? stat.value
                : `${(value * progress).toFixed(decimals)}${suffix}`;

              return (
                <div key={stat.label} className={styles.stat}>
                  <div className={styles.statValue}>{display}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`reveal reveal-delay-2 ${styles.visual}`}>
          <div data-parallax-depth="14">
            <HeroCodeWindow caption={hero.codeCaption} className={styles.codeWindow} />
          </div>

          {hero.floatingTags.map((label, index) => {
            const layout = TAG_LAYOUT[index];
            if (!layout) return null;

            return (
              <span
                key={label}
                className={styles.tagAnchor}
                style={layout.style}
                data-parallax-depth={layout.depth}
                aria-hidden="true"
              >
                <span
                  className={styles.tagFloat}
                  style={
                    {
                      '--drift-duration': `${layout.duration}s`,
                      '--drift-delay': `${layout.delay}s`,
                    } as CSSProperties
                  }
                >
                  <Tag tone={layout.tone} rotate={layout.rotate}>
                    {label}
                  </Tag>
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
