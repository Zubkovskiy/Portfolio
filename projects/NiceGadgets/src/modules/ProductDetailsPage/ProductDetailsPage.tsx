import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Nesting } from '../shared/components/Nesting/Nesting';
import { Slider } from './components/Slider';
import { SettingsSlider } from './components/SettingsSlider';
import { Description } from './components/Description';
import { ProductsSlider } from '../shared/components/ProductsSlider';

import styles from './ProductDetailsPage.module.scss';

import { goods } from '../../services/goods';
import { Product } from '../../types/Product';
import { Model } from '../../types/Model';
import { Loader } from '../shared/components/Loader';

export const ProductDetailsPage = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [randomProducts, setRandomProducts] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const data = await goods.productDetailsFetch(category as string);
        const found = data.find(item => item.id === id);

        if (!found) {
          navigate('/not-found', { replace: true });

          return;
        }

        setProduct(found);
      } catch (error) {
        navigate('/not-found', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, id, navigate]);

  useEffect(() => {
    if (!product) {
      return;
    }

    goods
      .getSuggestedProducts()
      .then(setRandomProducts)
      .catch(() => {});
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  return (
    product && (
      <div>
        <Nesting category={category as string} name={product.name} />

        <Link to={`/${category}`} className={styles.back}>
          Back
        </Link>

        <h1 className={styles.name}>{product.name}</h1>

        <div className={styles.slider_wrapper}>
          <Slider product={product} />
          <SettingsSlider product={product} />
        </div>

        <Description product={product} />

        <div className={styles.products_slider}>
          <ProductsSlider
            models={randomProducts}
            title="You may also like"
            discount
          />
        </div>
      </div>
    )
  );
};
