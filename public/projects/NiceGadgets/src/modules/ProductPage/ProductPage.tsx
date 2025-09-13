import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Nesting } from '../shared/components/Nesting/Nesting';
import { Loader } from '../shared/components/Loader/Loader';
import { getData } from '../../utils/httpClient';
import { Model } from '../../types/Model';
import { ControlsPanel } from './components/ControlsPanel';

import globalStyles from '../shared/globalStyles.module.scss';
import styles from './ProductPage.module.scss';
import { ProductCarts } from '../shared/components/ProductCards';
import { AmountModels } from '../shared/components/AmountModels';
import { ErrorMessage } from '../shared/components/ErrorMessage';

export const ProductPage: React.FC = () => {
  const [allModels, setAllModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { category } = useParams();

  const allowedCategories = useMemo(
    () => ['phones', 'tablets', 'accessories'],
    [],
  );

  useEffect(() => {
    setLoading(true);
    getData('/products.json')
      .then(response => {
        setAllModels(response as Model[]);
        setError(null);
      })
      .catch(() => {
        setError('Failed to fetch data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!category || !allowedCategories.includes(category)) {
    return <Navigate to="not-found" replace />;
  }

  const filteredModels = allModels.filter(model => model.category === category);

  if (loading) {
    return <Loader />;
  }

  if (filteredModels.length === 0) {
    return <ErrorMessage error="No products available" />;
  }

  if (error && !loading) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className={styles.product}>
      <Nesting category={category} />

      <h1 className={globalStyles.title}>
        {category === 'phones' ? 'Mobile phones' : category}
      </h1>

      <AmountModels
        models={filteredModels.map(model => ({ ...model, quantity: 1 }))}
      />

      <ControlsPanel />

      <div className={styles.product__cards}>
        <ProductCarts model={filteredModels} pagination />
      </div>
    </div>
  );
};
