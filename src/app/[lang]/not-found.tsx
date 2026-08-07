import { Button } from '@/components/ui';
import { DEFAULT_LOCALE, getDictionary, localePath } from '@/lib/i18n';
import { withBasePath } from '@/lib/utils';
import styles from './not-found.module.css';

/**
 * 404 page. It cannot read the locale segment (Next renders not-found outside
 * the route params), so it falls back to the default dictionary.
 */
export default function NotFound() {
  const dict = getDictionary(DEFAULT_LOCALE);

  return (
    <div className={styles.wrap}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>That route does not exist on this site.</p>
      <Button href={withBasePath(localePath(DEFAULT_LOCALE))} shine>
        {dict.nav.links[0]?.label ?? 'Home'}
      </Button>
    </div>
  );
}
