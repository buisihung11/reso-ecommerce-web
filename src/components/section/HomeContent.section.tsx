import useProducts from '@/hooks/product/useProducts';
import { TCollection } from '@/types/collection';
import { ArrowRightAlt, CategoryTwoTone } from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Link,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Divider,
} from '@mui/material';
import React, { FC } from 'react';
import { Img } from 'react-image';
import ProductCard from '../product-card';
import { motion } from 'framer-motion';
import useCollections from '@/hooks/collection/useCollections';

interface Props {
  settings?: {
    [key: string]: any;
  };
}
const boxMotionIn = {
  rest: {
    opacity: 0,
    ease: 'easeOut',
    duration: 0.2,
    display: 'none',
  },
  toggle: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
    display: 'flex',
  },
};
const boxMotionOut = {
  toggle: {
    ease: 'easeOut',
    duration: 0.2,
    display: 'none',
  },
  rest: {
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
    display: 'inherit',
  },
};
const CollectionGridSection: FC<Props> = ({ settings = {} }) => {
  const { data: products, isLoading: proLoading } = useProducts({});
  const { data: collections, isLoading: colLoading } = useCollections();

  const bgColorSetting = settings['bgColor'];

  return (
    <Box bgcolor={bgColorSetting} py={[6, 10]}>
      <Stack spacing={[4, 8]}>
        <Container maxWidth="md" sx={{ textAlign: 'center', py: [4, 6, 10] }}>
          <Typography variant="h2" component="h1">
            Nhanh chóng
          </Typography>
          <Typography variant="body1" component="h1">
            Mang đến những sản phẩm tốt nhất, tiện lợi nhất
          </Typography>
        </Container>

        <Box>
          <Container
            maxWidth="md"
            sx={{ textAlign: 'center', margin: '0 auto' }}
          >
            <Typography variant="h3">Sản phẩm nổi bật</Typography>
          </Container>
        </Box>

        <Container
          maxWidth="xl"
          style={{
            alignContent: 'center',
            alignSelf: 'center',
          }}
        >
          {proLoading ? (
            <Container sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </Container>
          ) : (
            <Grid container spacing={[2, 4]}>
              {products?.slice(10, 30).map((product) => (
                <Grid key={product.product_id} item xs={6} sm={4} md={3}>
                  <Link
                    href={`/products/${product.product_id}`}
                    aria-label={`View ${product.product_name} product page`}
                  >
                    <ProductCard product={product} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        <Stack alignItems="center" direction="row" spacing={2} pl={2}>
          <Typography variant="h3">Bộ sưu tập</Typography>
          <ArrowRightAlt />
        </Stack>

        <Container maxWidth={false}>
          {colLoading ? (
            <Container sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </Container>
          ) : (
            <Grid
              container
              columns={{ xs: 4, sm: 10, md: 16, lg: 16, xl: 16 }}
              display="flex"
              alignItems="center"
              alignSelf="center"
              justifyContent={{
                xs: 'center',
                sm: 'space-between',
              }}
            >
              {collections?.slice(0, 4).map((col) => (
                <>
                  <Grid container item sm={5} md={4} py={5} key={col.id}>
                    <Link href={`/collections/${col.id}`} underline="none">
                      <CollectionCard
                        collection={{
                          id: col.id,
                          name: col.name,
                          description:
                            'This is a description for the collection where you can get the overview info about',
                          //col.description,
                          pic_url:
                            'http://cdn.miscellaneoushi.com/1800x1800/20121026/food%20chickens%201800x1800%20wallpaper_www.miscellaneoushi.com_69.jpg',
                          //col.banner_url,
                        }}
                      />
                    </Link>
                  </Grid>
                </>
              ))}
            </Grid>
          )}
        </Container>
      </Stack>
    </Box>
  );
};

type collectionProps = {
  collection: Partial<TCollection> & { pic_url: string };
};
const CollectionCard = ({
  collection: { pic_url, name, id, description },
}: collectionProps) => (
  <Box
    key={id}
    component={motion.div}
    whileHover="toggle"
    whileFocus="toggle"
    whileTap="toggle"
    initial="rest"
    animate="rest"
    sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Card
      sx={{
        aspectRatio: '0.8',
        objectFit: 'cover',
        borderWidth: `1px`,
        borderColor: 'transparent',
        borderStyle: 'solid',
      }}
    >
      <CardActionArea>
        <CardMedia component="img" image={pic_url!} sx={{ maxWidth: 800 }} />
        <CardContent
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component={motion.div}
            variants={boxMotionOut}
            textAlign="center"
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component={motion.div}
            variants={boxMotionIn}
            textAlign="center"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Box>
);

export default CollectionGridSection;
