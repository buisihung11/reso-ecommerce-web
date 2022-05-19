import Slider from 'react-slick';
import React, { useRef } from 'react';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
// utils
//
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const CAROUSELSMAIN = [
  {
    title: 'Main banner',
    image: 'images/bannermain.png',
  },
  {
    title: 'Main banner ',
    image: 'images/bannermain_2.png',
  },
];
const CAROUSELS1 = [
  {
    title: 'Subbanner 1',
    image: 'images/banner1_1.png',
  },
  {
    title: 'Subbanner 1',
    image: 'images/banner1_2.png',
  },
];

const CAROUSELS2 = [
  {
    title: 'Subbanner 2 ',
    image: 'images/banner2_1.png',
  },
  {
    title: 'Subbanner 2',
    image: 'images/banner2_2.png',
  },
];

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  image: string;
};

function CarouselItemMain({ item }: { item: CarouselItemProps }) {
  const { image, title } = item;

  return (
    <Box
      component="img"
      alt={title}
      src={image}
      sx={{
        width: '100%',
        height: '54.5vh',
        objectFit: 'cover',
      }}
    />
  );
}

function CarouselItemSub({ item }: { item: CarouselItemProps }) {
  const { image, title } = item;

  return (
    <Box
      component="img"
      alt={title}
      src={image}
      sx={{ width: '100%', height: '25vh', objectFit: 'cover' }}
    />
  );
}

export default function CarouselBasic3() {
  const theme = useTheme();
  const router = useRouter();
  const carouselRef = useRef<Slider | null>(null);

  const settingsMain = {
    speed: 1500,
    autoplaySpeed: 4000,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: 'ease-out',
    rtl: true,
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  const settingsSecondary = {
    speed: 1500,
    autoplaySpeed: 4000,
    dots: false,
    arrows: false,
    vertical: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    easing: 'ease-out',
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  const settingsThird = {
    speed: 1500,
    autoplaySpeed: 4000,
    dots: false,
    arrows: false,
    vertical: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: 'ease-out',
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    // <Stack width={'100%'}>
    //   <Slider ref={carouselRef} {...settingsMain}>
    //     {CAROUSELSMAIN.map((item) => (
    //       <CarouselItem key={item.title} item={item} />
    //     ))}
    //   </Slider>
    //   <Stack>
    //     <Box width={'100%'}>
    //       <Slider ref={carouselRef} {...settingsSecondary}>
    //         {CAROUSELS1.map((item) => (
    //           <CarouselItem key={item.title} item={item} />
    //         ))}
    //       </Slider>
    //     </Box>
    //     <Slider ref={carouselRef} {...settingsThird}>
    //       {CAROUSELS2.map((item) => (
    //         <CarouselItem key={item.title} item={item} />
    //       ))}
    //     </Slider>
    //   </Stack>
    // </Stack>
    <Container sx={{ paddingBottom: '2rem' }} maxWidth="lg">
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Slider ref={carouselRef} {...settingsMain}>
            {CAROUSELSMAIN.map((item) => (
              <CarouselItemMain key={item.title} item={item} />
            ))}
          </Slider>
        </Grid>
        <Grid item container xs={12} sm={6} spacing={4}>
          <Grid item xs={12}>
            <Slider ref={carouselRef} {...settingsSecondary}>
              {CAROUSELS1.map((item) => (
                <CarouselItemSub key={item.title} item={item} />
              ))}
            </Slider>
          </Grid>
          <Grid item xs={12}>
            <Slider ref={carouselRef} {...settingsThird}>
              {CAROUSELS2.map((item) => (
                <CarouselItemSub key={item.title} item={item} />
              ))}
            </Slider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
