import classNames from 'classnames';

import { NavLink } from 'react-router-dom';

import styles from './Activity.module.scss';

import favourites from '/img/icons/favourites.svg';
import cart from '/img/icons/shopping-bag.svg';
import { useStore } from '../../../../store/store';

export const Activity = () => {
  const favouritesCount = useStore(state => state.favorites.length);
  const cartCount = useStore(state => state.cart).length;

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.activity__link, {
      [styles.active]: isActive,
    });

  return (
    <div className={styles.activity}>
      <div className={styles.activity__favourites}>
        <NavLink to="favourites" className={getNavLinkClass}>
          <span className={styles.activity__icon}>
            <img src={favourites} alt="favourites" />
            {favouritesCount > 0 && (
              <span className={styles.activity__badge}>{favouritesCount}</span>
            )}
          </span>
        </NavLink>
        <NavLink to="cart" className={getNavLinkClass}>
          <span className={styles.activity__icon}>
            <img src={cart} alt="cart" />
            {cartCount > 0 && (
              <span className={styles.activity__badge}>{cartCount}</span>
            )}
          </span>
        </NavLink>
      </div>
      <div className={styles.activity__cart}></div>
    </div>
  );
};
