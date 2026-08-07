import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cx } from '@/lib/utils';
import styles from './ImageSlot.module.css';

export type ImageSlotProps = {
  /** Path under /public. Leave undefined to render the labelled placeholder. */
  src?: string;
  alt?: string;
  /** Text shown while the slot is empty. */
  caption: string;
  /** `sizes` hint for the responsive image — matters for the LCP budget. */
  sizes?: string;
  priority?: boolean;
  /**
   * `cover` crops to fill (screenshots), `contain` fits the whole image
   * (documents like certificate scans, where cropping loses the content).
   */
  fit?: 'cover' | 'contain';
  className?: string;
};

/**
 * Replaces the design export's <image-slot> custom element.
 *
 * Real images go through next/image (AVIF/WebP, correct intrinsic sizing, lazy
 * by default). Until Bohdan drops a file in, the slot renders an honest,
 * labelled placeholder rather than a stock photo standing in for real work.
 */
export function ImageSlot({
  src,
  alt,
  caption,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority,
  fit = 'cover',
  className,
}: ImageSlotProps) {
  return (
    <div className={cx(styles.slot, className)}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? caption}
          fill
          sizes={sizes}
          priority={priority}
          className={cx(styles.image, fit === 'contain' && styles.contain)}
        />
      ) : (
        <div className={styles.placeholder}>
          <ImageIcon className={styles.icon} size={28} strokeWidth={1.5} aria-hidden="true" />
          <span className={styles.caption}>{caption}</span>
        </div>
      )}
    </div>
  );
}
