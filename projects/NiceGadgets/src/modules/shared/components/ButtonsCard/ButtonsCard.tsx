import React from 'react';
import { Model } from '../../../../types/Model';
import { useStore } from '../../../../store/store';

import styles from './ButtonsCard.module.scss';

type Props = {
  model: Model;
};

export const ButtonsCard: React.FC<Props> = ({ model }) => {
  const {
    isInCart,
    addToCart,
    removeFromCart,
    isInFavorites,
    addToFavorites,
    removeFromFavorites,
  } = useStore();

  const inCart = isInCart(model.id);
  const inFavorites = isInFavorites(model.id);

  const handleCartClick = () => {
    return inCart ? removeFromCart(model.id) : addToCart(model);
  };

  const handleFavoriteClick = () => {
    return inFavorites ? removeFromFavorites(model.id) : addToFavorites(model);
  };

  return (
    <div className={styles.buttons}>
      <div
        className={`${styles.cart} ${inCart ? styles.active_cart : ''}`}
        onClick={handleCartClick}
      >
        {inCart ? 'Added' : 'Add to cart'}
      </div>

      <div
        className={`${styles.button} ${styles.favorite} ${inFavorites ? styles.active_favorite : ''}`}
        onClick={handleFavoriteClick}
      ></div>
    </div>
  );
};
