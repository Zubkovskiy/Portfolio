import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

import logo from '/img/logo.svg';
import arrow_up from '/public/img/icons/arrow-up.svg';

export const Footer = () => {
  return (
    <>
      <div className={styles.decor}></div>
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <Link to={'/'}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className={styles.links}>
          <li>
            <a href="https://github.com/Zubkovskiy">Github</a>
          </li>
          <li>
            <a href="#">Contacts</a>
          </li>
          <li>
            <a href="#">rights</a>
          </li>
        </ul>
        <div
          className={styles.scroll}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <p className={styles.scroll__txt}>Back to top</p>
          <div className={styles.scroll__img_wrap}>
            <img src={arrow_up} alt="arrow_up" />
          </div>
        </div>
      </footer>
    </>
  );
};
