import { TProduct } from '@/types/product';
import { Box, styled } from '@mui/system';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { CarouselControlsArrowsBasic2, CarouselControlsArrowsIndex } from '.';
import ProductCard, { ProductCardProps } from '../product-card';
import Link from '@/components/Link';

interface Props {
  products: TProduct[];
  CardProps?: Omit<ProductCardProps, 'product'>;
}

const RootStyle = styled(Box)(({ theme }) => ({
  zIndex: 0,
  borderRadius: 2,
  overflow: 'hidden',
  position: 'relative',
  '& .slick-slide': {
    transition: 'all 300ms ease-in-out',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 1),
    },
  },
  '& .slick-slide[aria-hidden="true"]': {
    filter: `blur(4px)`,
  },
}));

const ProductCarousel = ({ products, CardProps = {} }: Props) => {
  const carouselRef = useRef<Slider | null>(null);
  const settings = {
    slidesToShow: 4,
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
        settings: { slidesToShow: 2, centerPadding: '0' },
      },
      {
        breakpoint: 340,
        settings: { slidesToShow: 2, centerPadding: '0' },
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
    <RootStyle>
      <Slider {...settings} ref={carouselRef}>
        {products?.map((item) => (
          <Link
            href={`/products/${item.product_id}`}
            aria-label={`View ${item.product_name} product page`}
          >
            <ProductCard
              key={`relate-product-${item.product_id}`}
              product={item}
              {...CardProps}
            />
          </Link>
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </RootStyle>
  );
};

export default ProductCarousel;
