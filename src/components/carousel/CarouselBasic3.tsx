import Slider from 'react-slick';
import React, { useRef } from 'react';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// utils
//
import {
  CarouselControlsPaging2,
  CarouselControlsArrowsBasic2,
} from './controls';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const CAROUSELS = [...Array(5)].map((_, index) => {
  return {
    title:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis eum ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolore est rem deserunt temporibus omnis ea nemo praesentium mollitia reprehenderit voluptas recusandae aliquam veritatis blanditiis tempore dolorum, officiis error repudiandae.',
    image:
      'https://cdn.shopify.com/s/files/1/1915/7471/files/Cover-good_edb89fc7-35e2-449c-9a38-7e363a44b595_2048x.jpg?v=1516989371',
  };
});

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .slick-list': {
    boxShadow: theme.customShadows.z16,
    // borderRadius: theme.shape.borderRadiusMd,
  },
}));

const ActionWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  textAlign: 'center',
  zIndex: 999,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const { image, title } = item;

  return (
    <Box
      component="img"
      alt={title}
      src={image}
      sx={{ width: '100%', height: [480, 680], objectFit: 'cover' }}
    />
  );
}

export default function CarouselBasic3() {
  const theme = useTheme();
  const router = useRouter();
  const carouselRef = useRef<Slider | null>(null);

  const settings = {
    speed: 500,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging2({
      sx: { mt: 3 },
    }),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <ActionWrapper>
        <Container maxWidth="md" sx={{}}>
          <Typography variant="h2" color="white" pb={2}>
            Lorem ipsum dolor sit.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/products')}
          >
            Xem sản phẩm
          </Button>
        </Container>
      </ActionWrapper>
      <Slider ref={carouselRef} {...settings}>
        {CAROUSELS.map((item) => (
          <CarouselItem key={item.title} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </RootStyle>
  );
}
