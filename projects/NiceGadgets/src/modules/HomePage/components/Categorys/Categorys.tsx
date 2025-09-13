import { useEffect, useState } from 'react';

import { Model } from '../../../../types/Model';

import styles from './Categorys.module.scss';
import globalStyles from '../../../shared/globalStyles.module.scss';

import phones from '/img/category/category-phones.jpg';
import tablets from '/img/category/category-tablets.jpg';
import accessories from '/img/category/category-accessories.jpg';
import { getData } from '../../../../utils/httpClient';
import { CategoryCard } from '../CategoryCard';
import { Link } from 'react-router-dom';

export const Categorys = () => {
  const [phonesSum, setPhonesSum] = useState<number>();
  const [tabletsSum, setTabletsSum] = useState<number>();
  const [accessoriesSum, setAccessoriesSum] = useState<number>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categoryNames = ['phones', 'tablets', 'accessories'];
  const categoryCounts = [phonesSum, tabletsSum, accessoriesSum];
  const categoryImg = [phones, tablets, accessories];

  useEffect(() => {
    const fetchData = async () => {
      try {
        getData('/phones.json').then(response =>
          setPhonesSum((response as Model[]).length),
        );

        getData('/tablets.json').then(response =>
          setTabletsSum((response as Model[]).length),
        );

        getData('/accessories.json').then(response =>
          setAccessoriesSum((response as Model[]).length),
        );

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && !loading) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.category}>
      <h2 className={`${globalStyles.subtitle} ${styles.category__subtitle}`}>
        Shop by category
      </h2>

      <ul className={styles.category__wrapper}>
        {categoryNames.map((category, index) => (
          <li key={index} className={styles.category__item}>
            <Link to={`/${category}`}>
              <CategoryCard
                name={category}
                img={categoryImg[index]}
                count={categoryCounts[index]}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
