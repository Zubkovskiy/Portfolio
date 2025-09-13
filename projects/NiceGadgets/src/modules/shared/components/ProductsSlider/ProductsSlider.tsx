// ? Зробити кнопку reload при errorMessage.

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

import { Model } from '../../../../types/Model';

import 'swiper/css';
import 'swiper/css/navigation';

import global from '../../../shared/globalStyles.module.scss';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';

type Props = {
  models: Model[];
  title: string;
  discount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  models,
  title,
  discount,
}) => {
  return (
    <div className={styles.models_list}>
      <div className={styles.models_top}>
        <h2 className={global.subtitle}>{title}</h2>

        <div className={styles.models_nav}>
          <div className={styles.prev}></div>
          <div className={styles.next}></div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        className={styles.products_slider}
        slidesPerView={'auto'}
        spaceBetween={16}
        navigation={{
          nextEl: `.${styles.next}`,
          prevEl: `.${styles.prev}`,
          disabledClass: styles.disabled,
        }}
        breakpoints={{
          640: { slidesPerView: 'auto' },
          1200: { slidesPerView: 4 },
        }}
      >
        {models.map(model => (
          <SwiperSlide key={model.id} className={styles.products_slide}>
            <ProductCard model={model} discount={discount} slider />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
