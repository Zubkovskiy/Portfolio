import React, { useEffect, useState } from 'react';
import styles from './SettingsSlider.module.scss';
import { Product } from '../../../../types/Product';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { getBaseId } from '../../../shared/utils/getBaseId';
import { Model } from '../../../../types/Model';
import { ButtonsCard } from '../../../shared/components/ButtonsCard';

const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

type Props = {
  product: Product;
};

export const SettingsSlider: React.FC<Props> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacity);

  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    setSelectedColor(product.color);
    setSelectedCapacity(product.capacity);
  }, [product]);

  const handleChange = (newColor: string, newCapacity: string) => {
    const baseId = getBaseId(product.id, product.color, product.capacity);
    const newId = `${baseId}-${normalize(newCapacity)}-${normalize(newColor)}`;

    navigate(`/${category}/${newId}`);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Available colors</h2>
      <div className={styles.list}>
        {product.colorsAvailable.map(color => (
          <div
            key={color}
            className={classNames(styles.circle, {
              [styles.active]: selectedColor === color,
            })}
            style={{ backgroundColor: color }}
            onClick={() => handleChange(color, selectedCapacity)}
          />
        ))}
      </div>

      <div className={styles.line}></div>

      <h3 className={styles.title}>Select capacity</h3>
      <div className={styles.list}>
        {product.capacityAvailable.map(capacity => (
          <div
            key={capacity}
            className={classNames(styles.capacity, {
              [styles.active]: selectedCapacity === capacity,
            })}
            onClick={() => handleChange(selectedColor, capacity)}
          >
            {capacity}
          </div>
        ))}
      </div>

      <div className={styles.line}></div>

      <div className={styles.price}>
        <div className={styles.price__discount}>${product.priceDiscount}</div>
        <div className={styles.price__regular}>${product.priceRegular}</div>
      </div>

      <ButtonsCard model={product as unknown as Model} />

      <div className={styles.characteristics}>
        <div className={styles.characteristics__items}>
          <div className={styles.characteristics__left}>Screen</div>
          <div className={styles.characteristics__right}>{product.screen}</div>
        </div>
        <div className={styles.characteristics__items}>
          <div className={styles.characteristics__left}>Resolution</div>
          <div className={styles.characteristics__right}>
            {product.resolution}
          </div>
        </div>
        <div className={styles.characteristics__items}>
          <div className={styles.characteristics__left}>Processor</div>
          <div className={styles.characteristics__right}>
            {product.processor}
          </div>
        </div>
        <div className={styles.characteristics__items}>
          <div className={styles.characteristics__left}>RAM</div>
          <div className={styles.characteristics__right}>{product.ram}</div>
        </div>
      </div>
    </div>
  );
};
