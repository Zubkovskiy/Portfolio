import React from 'react';
import { Product } from '../../../../types/Product';
import styles from './Description.module.scss';

type Props = {
  product: Product;
};

export const Description: React.FC<Props> = ({ product }) => {
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <div className={styles.description}>
      <div className={styles.about}>
        <h3 className={styles.name}>About</h3>
        <div className={styles.line}></div>

        {product.description.map((item, index) => (
          <div key={index} className={styles.wrapper}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.text}>
              {item.text.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.specs}>
        <h3 className={styles.name}>Tech specs</h3>
        <div className={styles.line}></div>

        <ul className={styles.specs_list}>
          {specs.map(({ label, value }) => (
            <li key={label} className={styles.specs_item}>
              <div className={styles.left}>{label}</div>
              <div className={styles.right}>{value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
