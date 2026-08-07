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
  /** Live demo URL. Without it the card renders as a non-clickable preview. */
  href?: string;
  imageSrc?: string;
  imageCaption: string;
  /** Short role/scope line under the title. */
  meta?: string;
};

/** Renders the media box as a link when there is somewhere to go. */
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

/** Project tile: screenshot, stack tags, summary and a live-demo link. */
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
      {/*
        The screenshot is a second route to the same page. It is removed from
        the tab order and hidden from assistive tech on purpose — keyboard and
        screen-reader users already get the labelled link below, and a
        duplicate stop with no useful name would only be noise.
      */}
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
