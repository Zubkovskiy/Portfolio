import React from 'react';

import styles from './Nesting.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  category: string;
  name?: string;
};

export const Nesting: React.FC<Props> = ({ category, name }) => {
  return (
    <div className={styles.wrapper}>
      <Link to="../" className={styles.home}></Link>
      <div className={styles.arrow}></div>
      {name ? (
        <Link
          to={`/${category}`}
          className={classNames(styles.category, { [styles.active]: name })}
        >
          {category}
        </Link>
      ) : (
        <div className={classNames(styles.category, { [styles.active]: name })}>
          {category}
        </div>
      )}

      {name && (
        <>
          <div className={styles.arrow}></div>
          <div className={styles.name}>{name}</div>
        </>
      )}
    </div>
  );
};
