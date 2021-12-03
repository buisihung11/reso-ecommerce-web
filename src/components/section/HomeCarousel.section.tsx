import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import {
  CarouselBasic1,
  CarouselBasic2,
  CarouselBasic3,
  CarouselBasic4,
} from '../carousel';
import { TSetting } from './Section';

interface Props {
  settings?: TSetting & {
    carouselType?: 'type1' | 'type2' | 'type3' | 'type4';
  };
}

const HomeCarouselSection = ({ settings = {} }: Props) => {
  const { carouselType } = settings;
  const carousel = useMemo(() => {
    switch (carouselType) {
      case 'type1':
        return <CarouselBasic1 />;
      case 'type2':
        return <CarouselBasic2 />;
      case 'type3':
        return <CarouselBasic3 />;
      case 'type4':
        return <CarouselBasic4 />;
      default:
        return <CarouselBasic3 />;
    }
  }, [carouselType]);

  return (
    <Box maxHeight="100vh" sx={{ position: 'relative', width: '100%' }}>
      {carousel}
    </Box>
  );
};

export default HomeCarouselSection;
