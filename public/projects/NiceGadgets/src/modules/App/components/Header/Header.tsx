import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { BurgerMenu } from '../BurgerMenu';

import styles from './Header.module.scss';

import logo from '/img/logo.svg';

import { Activity } from '../Activity';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={'/'}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className={styles.header__nav_bar}>
        <NavBar />
      </div>

      <div className={styles.header__activity}>
        <Activity />
      </div>

      <BurgerMenu />
    </header>
  );
};
