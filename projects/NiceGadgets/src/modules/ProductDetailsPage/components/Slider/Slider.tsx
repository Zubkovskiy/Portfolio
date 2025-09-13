import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Thumbs } from 'swiper/modules';

import styles from './Slider.module.scss';
import { Product } from '../../../../types/Product';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type Props = {
  product: Product;
};

export const Slider: React.FC<Props> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={styles.container}>
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="horizontal"
        slidesPerView="auto"
        spaceBetween={8}
        modules={[Thumbs]}
        watchSlidesProgress
        // watchOverflow
        initialSlide={0}
        className={styles.thumbs}
        breakpoints={{
          640: {
            spaceBetween: 8,
            direction: 'vertical',
          },
          1199.9: {
            spaceBetween: 16,
            direction: 'vertical',
          },
        }}
      >
        {product.images.map((img, i) => (
          <SwiperSlide key={i} className={styles.thumbs__slide}>
            <img src={img} alt={`thumb-${i}`} className={styles.thumbs__img} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        watchSlidesProgress
        watchOverflow
        initialSlide={0}
        className={styles.main}
      >
        {product.images.map((img, i) => (
          <SwiperSlide key={i} className={styles.main__slide}>
            <img src={img} alt={`main-${i}`} className={styles.main__img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
