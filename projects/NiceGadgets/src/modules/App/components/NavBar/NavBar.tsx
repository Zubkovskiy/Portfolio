import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './NavBar.module.scss';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navbar__item, {
    [styles.active]: isActive,
  });

export const NavBar = () => (
  <nav className={styles.navbar}>
    <NavLink to={'/'} className={getNavLinkClass}>
      home
    </NavLink>
    <NavLink to={'phones'} className={getNavLinkClass}>
      Phones
    </NavLink>
    <NavLink to={'tablets'} className={getNavLinkClass}>
      tablets
    </NavLink>
    <NavLink to={'accessories'} className={getNavLinkClass}>
      accessories
    </NavLink>
  </nav>
);
