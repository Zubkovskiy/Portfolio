import { useEffect, useState } from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loading_wave}>
        <div className={styles.loading_bar} />
        <div className={styles.loading_bar} />
        <div className={styles.loading_bar} />
        <div className={styles.loading_bar} />
      </div>
    </div>
  );
};
