import { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ControlsPanel.module.scss';
import { CustomSelect } from '../CustomSelect';

const SORT_OPTIONS = ['Newest', 'Alphabetically', 'Cheapest'];
const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const ControlsPanel: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevSortRef = useRef(searchParams.get('sort'));

  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[2]);

  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const perPageParam = searchParams.get('perPage');

    if (sortParam && SORT_OPTIONS.includes(sortParam)) {
      setSort(sortParam);
    }

    if (perPageParam && PER_PAGE_OPTIONS.includes(perPageParam)) {
      setPerPage(perPageParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const currentSort = searchParams.get('sort');
    const currentPage = searchParams.get('page');

    if (prevSortRef.current !== currentSort && currentPage !== '1') {
      prevSortRef.current = currentSort;
      const newParams = new URLSearchParams(searchParams);

      newParams.set('page', '1');
      setSearchParams(newParams);

      window.scrollTo({ top: 0 });
    }
  }, [searchParams, setSearchParams]);

  const updateParam = (key: string, value: string) => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  return (
    <div className={styles.panel}>
      <div className={`${styles.panel__item} ${styles.panel__item_sort}`}>
        <CustomSelect
          title="Sort by"
          options={SORT_OPTIONS}
          selected={sort}
          onSelect={value => {
            setSort(value);
            updateParam('sort', value);
          }}
        />
      </div>

      <div className={`${styles.panel__item} ${styles.panel__item_perPage}`}>
        <CustomSelect
          title="Items on page"
          options={PER_PAGE_OPTIONS}
          selected={perPage}
          onSelect={value => {
            setPerPage(value);
            updateParam('perPage', value);
          }}
        />
      </div>
    </div>
  );
};
