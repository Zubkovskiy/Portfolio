import { Model } from '../../../../types/Model';
import styles from './AmountModels.module.scss';

type CartItem = Model & { quantity: number };

type Props = {
  models: CartItem[];
  totalPrice?: boolean;
};

export const AmountModels: React.FC<Props> = ({ models, totalPrice }) => {
  const totalQuantity = models.reduce((sum, item) => sum + item.quantity, 0);

  return totalPrice ? (
    <p className={`${styles.amount_models} ${styles.total}`}>
      Total for {totalQuantity} items
    </p>
  ) : (
    <p className={styles.amount_models}>{models.length} models</p>
  );
};
