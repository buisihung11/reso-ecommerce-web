import faker from 'faker';
import Slider from 'react-slick';
import { useState, useRef } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Card } from '@mui/material';
// utils
//
import {
  CarouselControlsArrowsBasic2,
  CarouselControlsArrowsIndex,
} from './controls';
import { TCategory } from '@/types/category';
import CateImageButton from '../category/CateImageButton';

// ----------------------------------------------------------------------

interface CategoryCarouselProps {
  categories: TCategory[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  const theme = useTheme();
  const carouselRef = useRef<Slider | null>(null);
  //   const [currentIndex, setCurrentIndex] = useState(
  //     theme.direction === 'rtl' ? CAROUSELS.length - 1 : 0,
  //   );

  const settings = {
    infinite: false,
    slidesToShow: 6,
    speed: 500,
    rows: 2,
    slidesToScroll: 6,
    slidesPerRow: 1,
    zIndex: 2,
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box position={'relative'}>
      <Slider ref={carouselRef} {...settings}>
        {categories.map((cate: TCategory) => (
          <Box paddingX={'2rem'}>
            <CateImageButton key={cate.cate_id} category={cate} />
          </Box>
        ))}
      </Slider>

      {/* <CarouselControlsArrowsIndexs
        index={currentIndex}
        total={CAROUSELS.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      /> */}
      <Box>
        <CarouselControlsArrowsBasic2
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </Box>
    </Box>
  );
}
