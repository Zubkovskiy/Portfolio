import type { CSSProperties, ReactNode } from 'react';
import styles from './Hero.module.css';

/** Syntax-coloured fragments of the fake source file in the hero. */
const CODE_LINES: ReactNode[][] = [
  [
    <span key="a" className={styles.kw}>
      import
    </span>,
    <span key="b" className={styles.id}>
      {' '}
      {'{ useAI }'}{' '}
    </span>,
    <span key="c" className={styles.kw}>
      from
    </span>,
    <span key="d" className={styles.str}>
      {" 'react-ai'"}
    </span>,
  ],
  [
    <span key="a" className={styles.kw}>
      import
    </span>,
    <span key="b" className={styles.id}>
      {' '}
      {'{ motion }'}{' '}
    </span>,
    <span key="c" className={styles.kw}>
      from
    </span>,
    <span key="d" className={styles.str}>
      {" 'framer-motion'"}
    </span>,
  ],
  [
    <span key="a" className={styles.kw}>
      const
    </span>,
    <span key="b" className={styles.id}>
      {' '}
      stack{' '}
    </span>,
    <span key="c" className={styles.punct}>
      ={' '}
    </span>,
    <span key="d" className={styles.str}>
      {"['React', 'AI', 'Node']"}
    </span>,
  ],
  [
    <span key="a" className={styles.kw}>
      const
    </span>,
    <span key="b" className={styles.id}>
      {' '}
      Portfolio{' '}
    </span>,
    <span key="c" className={styles.punct}>
      = ()
    </span>,
    <span key="d" className={styles.kw}>
      {' =>'}
    </span>,
    <span key="e" className={styles.punct}>
      {' {'}
    </span>,
  ],
  [
    <span key="a" className={styles.punct}>
      {'  '}
    </span>,
    <span key="b" className={styles.kw}>
      const
    </span>,
    <span key="c" className={styles.id}>
      {' '}
      ui{' '}
    </span>,
    <span key="d" className={styles.punct}>
      ={' '}
    </span>,
    <span key="e" className={styles.id}>
      useAI
    </span>,
    <span key="f" className={styles.punct}>
      (stack)
    </span>,
  ],
  [
    <span key="a" className={styles.punct}>
      {'  '}
    </span>,
    <span key="b" className={styles.kw}>
      return
    </span>,
    <span key="c" className={styles.id}>
      {' '}
      automate(ui)
    </span>,
  ],
  [
    <span key="a" className={styles.punct}>
      {'}'}
    </span>,
  ],
  [
    <span key="a" className={styles.kw}>
      export
    </span>,
    <span key="b" className={styles.id}>
      {' '}
    </span>,
    <span key="c" className={styles.kw}>
      default
    </span>,
    <span key="d" className={styles.id}>
      {' '}
      Portfolio
    </span>,
  ],
];

/** Mock editor window — the hero's abstract "portrait". Decorative. */
export function HeroCodeWindow({ caption, className }: { caption: string; className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className={styles.codeBar}>
        <span className={styles.codeDot} style={{ background: 'var(--color-danger)' }} />
        <span className={styles.codeDot} style={{ background: 'var(--color-warning)' }} />
        <span className={styles.codeDot} style={{ background: 'var(--accent)' }} />
        <span className={styles.codeCaption}>{caption}</span>
      </div>

      <div className={styles.codeBody}>
        {CODE_LINES.map((fragments, index) => (
          <div key={index} className={styles.codeLine}>
            <span className={styles.codeNumber}>{index + 1}</span>
            <div className={styles.codeText} style={{ '--type-delay': `${index * 0.8}s` } as CSSProperties}>
              {fragments}
            </div>
            {index === CODE_LINES.length - 1 ? <span className={styles.codeCaret} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
