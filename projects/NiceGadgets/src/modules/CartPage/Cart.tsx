import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';

import globalStyles from '../shared/globalStyles.module.scss';
import styles from './Cart.module.scss';
import classNames from 'classnames';
import { AmountModels } from '../shared/components/AmountModels';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cart = useStore(state => state.cart);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const increase = useStore(state => state.increaseQuantity);
  const decrease = useStore(state => state.decreaseQuantity);
  const removeFromCart = useStore(state => state.removeFromCart);

  return (
    <div className={styles.main}>
      <div onClick={() => navigate(-1)} className={styles.back}>
        Back
      </div>

      <h1 className={globalStyles.title}>Cart</h1>

      {cart.length === 0 ? (
        <p className={styles.no_items}>Your cart is empty.</p>
      ) : (
        <div className={styles.cart}>
          <div className={styles.cart__cards}>
            {cart.map(item => (
              <div key={item.id} className={styles.cart__items}>
                <div className={styles.cart__left}>
                  <div
                    className={styles.cart__cross}
                    onClick={() => removeFromCart(item.id)}
                  ></div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cart__img}
                  />

                  <h2 className={styles.cart__name}>{item.name}</h2>
                </div>

                <div className={styles.cart__right}>
                  <div className={`${styles.cart__counter} ${styles.counter}`}>
                    <div
                      className={classNames(styles.counter__minus, {
                        [styles.counter__disabled]: item.quantity <= 1,
                      })}
                      onClick={() => decrease(item.id)}
                    ></div>
                    <span className={styles.counter__quantity}>
                      {item.quantity}
                    </span>
                    <div
                      className={styles.counter__plus}
                      onClick={() => increase(item.id)}
                    ></div>
                  </div>

                  <p className={styles.counter__price}>
                    ${Number(item.price) * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            <span className={styles.total__sum}>${totalPrice}</span>
            <AmountModels models={cart} totalPrice />
            <div className={styles.total__line}></div>
            <div className={styles.total__button}>Checkout</div>
          </div>
        </div>
      )}
    </div>
  );
};
