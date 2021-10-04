import { TProduct } from '@/types/product';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { CarouselControlsArrowsBasic2, CarouselControlsArrowsIndex } from '.';
import ProductCard from '../product-card';

interface Props {
  products: TProduct[];
}

const ProductCarousel = ({ products }: Props) => {
  const carouselRef = useRef<Slider | null>(null);
  const settings = {
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box
      sx={{
        zIndex: 0,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Slider {...settings} ref={carouselRef}>
        {products?.map((item) => (
          <ProductCard
            key={`relate-product-${item.product_id}`}
            product={item}
          />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Box>
  );
};

export default ProductCarousel;
