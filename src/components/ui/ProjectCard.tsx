import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Tag } from './Tag';
import { ImageSlot } from './ImageSlot';
import styles from './ProjectCard.module.css';

export type ProjectCardProps = {
  title: string;
  tags: readonly string[];
  description: string;
  linkLabel: string;
  href?: string;
  imageSrc?: string;
  imageCaption: string;
  meta?: string;
};

function MediaWrapper({
  href,
  title,
  children,
}: {
  href?: string;
  title: string;
  children: ReactNode;
}) {
  if (!href) return <div className={styles.media}>{children}</div>;

  return (
    <a
      className={styles.media}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      title={title}
    >
      {children}
    </a>
  );
}

export function ProjectCard({
  title,
  tags,
  description,
  linkLabel,
  href,
  imageSrc,
  imageCaption,
  meta,
}: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <MediaWrapper href={href} title={title}>
        <ImageSlot
          src={imageSrc}
          alt={`${title} — screenshot`}
          caption={imageCaption}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        {href ? (
          <span className={styles.mediaOverlay} aria-hidden="true">
            <ArrowUpRight size={22} />
          </span>
        ) : null}
      </MediaWrapper>

      <div className={styles.body}>
        {tags.length > 0 ? (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}

        <h3 className={styles.title}>{title}</h3>
        {meta ? <div className={styles.meta}>{meta}</div> : null}
        <p className={styles.description}>{description}</p>

        {href ? (
          <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
            {linkLabel}
            <span className={styles.arrow} aria-hidden="true">
              <ArrowUpRight size={15} />
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
