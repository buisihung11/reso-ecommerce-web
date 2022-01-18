import Slider from 'react-slick';
import { findIndex } from 'lodash';
import { useState, useRef, useEffect } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// @types
//
import LightboxModal from '@/components/LightboxModal';
import { CarouselControlsArrowsIndex } from '@/components/carousel';
import { TProduct } from '@/types/product';
import { Img } from 'react-image';
import { MHidden } from '../@material-extend';
import ProductThumbnail from '../product-card/product-thumbnail';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

const ThumbWrapperStyle = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  width: THUMB_SIZE,
  overflow: 'hidden',
  height: THUMB_SIZE,
  position: 'relative',
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm,
  '&:hover': {
    opacity: 0.72,
    transition: theme.transitions.create('opacity'),
  },
  '& .isActive': {
    top: 0,
    zIndex: 9,
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: theme.shape.borderRadiusSm,
    border: `solid 3px ${theme.palette.primary.main}`,
    backgroundColor: alpha(theme.palette.grey[900], 0.48),
  },
}));

const ProductThumbnailStyle = styled(ProductThumbnail)(({ theme }) => ({
  top: 0,
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  position: 'absolute',
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}));

// ----------------------------------------------------------------------

type LargeItemProps = {
  item: string;
  onOpenLightbox: (value: string) => void;
  title?: string;
};

function LargeItem({
  item,
  onOpenLightbox,
  title = 'San pham',
}: LargeItemProps) {
  return (
    <Box sx={{ cursor: 'zoom-in', position: 'relative' }}>
      <ProductThumbnailStyle
        src={item}
        title={title}
        ImgProps={{
          onClick: () => onOpenLightbox(item),
        }}
      />
    </Box>
  );
}

function ThumbnailItem({ item, title }: { item: string; title?: string }) {
  return (
    <ThumbWrapperStyle>
      <Box className="isActive" />
      <Img
        src={item!}
        height="auto"
        loader={
          <Box
            p={2}
            bgcolor="grey.100"
            width="100%"
            sx={{
              aspectRatio: '1 / 1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        }
        unloader={
          <Box
            p={2}
            textAlign="center"
            bgcolor="grey.100"
            width="100%"
            position="relative"
            sx={{
              aspectRatio: '1 / 1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography noWrap>{title}</Typography>
          </Box>
        }
      />
      <ThumbImgStyle alt="thumb image" src={item} />
    </ThumbWrapperStyle>
  );
}

type ProductDetailsCarouselProps = {
  product: TProduct;
};

export default function ProductDetailsCarousel({
  product,
}: ProductDetailsCarouselProps) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState<Slider>();
  const [nav2, setNav2] = useState<Slider>();
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);
  const imagesLightbox =
    product.product_image
      ?.map(({ image_url }) => image_url)
      .concat([product.pic_url]) ?? [];
  const totalImage = imagesLightbox?.length ?? 0;

  console.log(`imagesLightbox`, imagesLightbox);
  const handleOpenLightbox = (url: string) => {
    const selectedImage = findIndex(
      imagesLightbox,
      (index: any) => index === url,
    );
    setOpenLightbox(true);
    console.log(`selectedImage`, selectedImage);
    setSelectedImage(selectedImage);
  };

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: imagesLightbox.length > 3 ? 3 : imagesLightbox.length,
  };

  useEffect(() => {
    setNav1(slider1.current || undefined);
    setNav2(slider2.current || undefined);
  }, [currentIndex]);

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2?.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {imagesLightbox?.map((item) => (
              <LargeItem
                title={product.product_name}
                key={item}
                item={item}
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
          </Slider>
          <CarouselControlsArrowsIndex
            index={currentIndex}
            total={totalImage ?? 0}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Box>

      <MHidden width="mdDown">
        <Box
          sx={{
            my: 3,
            mx: 'auto',
            '& .slick-current .isActive': { opacity: 1 },
            ...(totalImage === 1 && {
              maxWidth: THUMB_SIZE * 1 + 16,
            }),
            ...(totalImage === 2 && {
              maxWidth: THUMB_SIZE * 2 + 32,
            }),
            ...(totalImage === 3 && {
              maxWidth: THUMB_SIZE * 3 + 48,
            }),
            ...(totalImage === 4 && {
              maxWidth: THUMB_SIZE * 3 + 48,
            }),
            ...(totalImage >= 5 && {
              maxWidth: THUMB_SIZE * 6,
            }),
            ...(totalImage > 2 && {
              position: 'relative',
              '&:before, &:after': {
                top: 0,
                zIndex: 9,
                content: "''",
                height: '100%',
                position: 'absolute',
                width: (THUMB_SIZE * 2) / 3,
                backgroundImage: (theme) =>
                  `linear-gradient(to left, ${alpha(
                    theme.palette.background.paper,
                    0,
                  )} 0%, ${theme.palette.background.paper} 100%)`,
              },
              '&:after': { right: 0, transform: 'scaleX(-1)' },
            }),
          }}
        >
          <Slider {...settings2} asNavFor={nav1} ref={slider2}>
            {imagesLightbox?.map((item) => (
              <ThumbnailItem key={item} item={item} />
            ))}
          </Slider>
        </Box>
      </MHidden>
      <LightboxModal
        images={imagesLightbox}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </RootStyle>
  );
}
