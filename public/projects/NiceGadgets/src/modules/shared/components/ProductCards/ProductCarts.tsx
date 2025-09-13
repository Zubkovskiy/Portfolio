import { useSearchParams } from 'react-router-dom';

import styles from './ProductCarts.module.scss';
import { Model } from '../../../../types/Model';
import { ProductCard } from '../ProductCard';

type Props = {
  model: Model[];
  pagination?: boolean;
};

export const ProductCarts: React.FC<Props> = ({ model, pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') || 'age';

  const sortedModel = [...model].sort((a, b) => {
    switch (sortParam) {
      case 'Alphabetically':
        return a.name.localeCompare(b.name);
      case 'Cheapest':
        return a.price - b.price;
      case 'Newest':
      default:
        return b.year - a.year;
    }
  });

  const pageFromParams = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || '16';
  const PRODUCTS_PER_PAGE =
    perPageParam === 'all' ? sortedModel.length : Number(perPageParam);

  const totalPages = Math.ceil(sortedModel.length / PRODUCTS_PER_PAGE);
  const currentPage = Math.min(Math.max(pageFromParams, 1), totalPages);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const visibleProducts = sortedModel.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('page', page.toString());
      setSearchParams(newParams);
      window.scrollTo({ top: 0 });
    }
  };

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      );
    }

    return pages;
  };

  return (
    <>
      <div className={styles.carts}>
        {visibleProducts.map(item => (
          <ProductCard key={item.id} model={item} discount />
        ))}
      </div>

      {pagination && perPageParam !== 'all' && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.arrow} ${styles['arrow--left']}`}
          ></button>

          <div className={styles.numbers}>
            {generatePages().map((page, index) =>
              typeof page === 'number' ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? styles.active : ''}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className={styles.dots}>
                  ...
                </span>
              ),
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.arrow} ${styles['arrow--right']}`}
          ></button>
        </div>
      )}
    </>
  );
};
