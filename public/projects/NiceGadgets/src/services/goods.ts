import { Model } from '../types/Model';
import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export const goods = {
  newModelsFetch: async (): Promise<Model[]> => {
    const products = await getData<Model[]>('/products.json');
    const latestYear = Math.max(...products.map(product => product.year));

    const filteredProducts = products.filter(
      product => product.year === latestYear,
    );
    const uniqueColorProducts = filteredProducts.filter(
      (product, index, self) =>
        index === self.findIndex(p => p.color === product.color),
    );

    return uniqueColorProducts;
  },

  hotPricesFetch: async (): Promise<Model[]> => {
    const products = await getData<Model[]>('/products.json');

    return products.sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });
  },

  productDetailsFetch: async (category: string): Promise<Product[]> => {
    return getData<Product[]>(`/${category}.json`);
  },

  getSuggestedProducts: async (): Promise<Model[]> => {
    const products = await getData<Model[]>('/products.json');

    return products.sort(() => Math.random() - 0.5).slice(0, 8);
  },
};
