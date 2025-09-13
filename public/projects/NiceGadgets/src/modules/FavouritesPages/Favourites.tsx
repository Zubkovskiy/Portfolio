import { useStore } from '../../store/store';
import { Nesting } from '../shared/components/Nesting/Nesting';

import globalStyles from '../shared/globalStyles.module.scss';
import { ProductCarts } from '../shared/components/ProductCards';
import styles from './Favourites.module.scss';
import { AmountModels } from '../shared/components/AmountModels';

export const Favourites = () => {
  const favorites = useStore(state => state.favorites);

  return (
    <div className={styles.main}>
      <Nesting category="Favourites" />

      <h1 className={globalStyles.title}>Favourites</h1>

      <AmountModels
        models={favorites.map(model => ({ ...model, quantity: 1 }))}
      />

      {favorites.length === 0 ? (
        <p className={styles.no_items}>You have no favorite items.</p>
      ) : (
        <div className={styles.product_carts}>
          <ProductCarts model={favorites} />
        </div>
      )}
    </div>
  );
};
