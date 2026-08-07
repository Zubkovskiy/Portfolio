import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cx, withBasePath } from '@/lib/utils';
import styles from './ImageSlot.module.css';

export type ImageSlotProps = {
  src?: string;
  alt?: string;
  caption: string;
  sizes?: string;
  priority?: boolean;
  fit?: 'cover' | 'contain';
  className?: string;
};

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
          src={withBasePath(src)}
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
