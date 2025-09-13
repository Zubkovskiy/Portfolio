import { MainSlider } from './components/MainSlider';
import { Categorys } from './components/Categorys/Categorys';
import { useEffect, useState } from 'react';
import { goods } from '../../services/goods';
import { Model } from '../../types/Model';
import { ProductsSlider } from '../shared/components/ProductsSlider';

import globalStyles from '../shared/globalStyles.module.scss';
import styles from './HomePage.module.scss';
import { Loader } from '../shared/components/Loader';
import { ErrorMessage } from '../shared/components/ErrorMessage';

export const HomePage = () => {
  const [newModels, setNewModels] = useState<Model[]>([]);
  const [hotPrices, setHotPrices] = useState<Model[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('');

  const titleNewModels = 'Brand new models';
  const titleHotPrices = 'Hot prices';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [newModelsData, hotPricesData] = await Promise.all([
          goods.newModelsFetch(),
          goods.hotPricesFetch(),
        ]);

        setNewModels(newModelsData);
        setHotPrices(hotPricesData);
      } catch (err) {
        if (err instanceof Error) {
          seterror('Failed to load');
        } else {
          seterror('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading && error) {
    return <ErrorMessage error={error} />;
  }

  if (!newModels.length || (!hotPrices.length && !loading && !error)) {
    return <div>No data</div>;
  }

  return (
    <div className={styles.home}>
      <h1 className={globalStyles.title}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.main_slider}>
        <MainSlider />
      </div>

      <div className={styles.new_models}>
        <ProductsSlider models={newModels} title={titleNewModels} />
      </div>
      <div className={styles.category}>
        <Categorys />
      </div>
      <div className={styles.hot_prices}>
        <ProductsSlider models={hotPrices} title={titleHotPrices} discount />
      </div>
    </div>
  );
};
