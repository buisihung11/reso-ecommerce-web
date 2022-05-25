import {
  ProductDetailsCarousel,
  ProductDetailsSummary,
} from '@/components/product-details';
import ProductBuilderProvider from '@/contexts/ProductBuilderContext';
import useProduct from '@/hooks/product/useProduct';
import useProducts from '@/hooks/product/useProducts';
import { EmailOutlined, PhoneOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { ProductCarousel } from '../carousel';
import Empty from '../Empty';

interface Props {
  imgStyle?: any;
}

const ShopOfProductViewSection = () => {
  const MOCK_SHOP = {
    store_id: 1,
    store_name: 'Reso Store',
    rate: 4.8,
    email: 'resostore@reso.vn',
    phone: '0678333777',
    icon_image: 'https://demo-sale.reso.vn/static/reso_logo.png',
    banner_image:
      'https://avatars.mds.yandex.net/get-zen_doc/1881616/pub_5d3922bdce44a000aca3c722_5d3923af78125e00acc0414f/scale_1200',
  };

  return (
    <Container maxWidth="md">
      <Box flexWrap="wrap" display="flex">
        <Stack
          // borderBottom={'groove'}
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
          direction={{ xs: 'column', md: 'row' }}
          spacing={5}
          paddingY="1rem"
          width="100%"
        >
          <Box
            height={80}
            width={80}
            sx={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundImage: `url(${MOCK_SHOP.icon_image})`,
            }}
          />
          <Stack
            flexDirection={{ xs: 'column', md: 'row' }}
            width="100%"
            justifyContent={{ xs: 'center', md: 'space-between' }}
            alignItems={'center'}
          >
            <Typography
              gutterBottom
              variant="h3"
              textAlign={{ xs: 'center', md: 'left' }}
            >
              {MOCK_SHOP.store_name}
            </Typography>

            {/* <Button href="/stores/1260">Xem cửa hàng</Button> */}
            <Link
              href="/stores/1260"
              sx={{ ':hover': { textDecoration: 'none' } }}
            >
              <Box
                display="block"
                //position="absolute"
                zIndex={1}
                bottom={50}
                right={20}
                marginRight="0"
                borderRadius={30}
                sx={{
                  height: 80,
                  width: 80,
                  backgroundColor: '#00000050',
                }}
              >
                <Box
                  sx={{
                    right: 0,
                    ':hover': { right: -15 },
                    transition: 'right 0.5s ease 0s',
                    backgroundColor: '#00AB5590',
                    color: '#000000',
                    borderRadius: '50%',
                    height: 80,
                    width: 80,
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <Typography paddingTop={'15px'} variant="body1">
                    Xem cửa hàng
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

const ProductViewSection = ({ imgStyle }: Props) => {
  const router = useRouter();
  const { productId } = router.query;
  const {
    data: product,
    isLoading,
    error,
  } = useProduct({ id: Number(productId) });
  const { data: relatedProducts } = useProducts({});

  const { pic_url, product_name } = product || {};

  return (
    <Container maxWidth="xl" sx={{ py: [2, 6] }}>
      <NextSeo
        title={product_name}
        description={product_name}
        openGraph={{
          type: 'website',
          title: product_name,
          description: product_name,
          images: [
            {
              url: pic_url!,
              width: 800,
              height: 600,
              alt: product_name,
            },
          ],
        }}
      />
      {isLoading || router.isFallback ? (
        <Container>
          <CircularProgress />
        </Container>
      ) : (
        <>
          {error && (
            <Stack
              maxWidth="lg"
              textAlign="center"
              mx="auto"
              alignItems="center"
            >
              <Typography variant="h4">
                {error.message ?? 'Không tìm thấy sản phẩm'}
              </Typography>
              <Empty />
            </Stack>
          )}
          {!error && product ? (
            <ProductBuilderProvider product={product}>
              <Card>
                <Grid container spacing={[2, 4, 6]}>
                  <Grid item xs={12} lg={5} xl={4}>
                    <ProductDetailsCarousel product={product} />
                  </Grid>
                  <Grid item xs={12} lg={7} xl={8}>
                    <ProductDetailsSummary
                      product={product}
                      quantity={1}
                      // onAddCart={handleAddCart}
                      // onGotoStep={handleGotoStep}
                    />
                  </Grid>
                </Grid>
              </Card>
            </ProductBuilderProvider>
          ) : (
            <Typography>Không tìm thấy sản phẩm</Typography>
          )}
        </>
      )}

      <Box paddingY="2rem">
        <Card>
          <ShopOfProductViewSection />
        </Card>
      </Box>

      <Box paddingY="2rem">
        <Card>
          {relatedProducts && (
            <Box textAlign="center" py={[2, 4]}>
              <Typography variant="h4" mb={2}>
                Có thể bạn cần từ cửa hàng
              </Typography>
              <ProductCarousel
                CardProps={{
                  imgStyle,
                }}
                products={relatedProducts}
              />
            </Box>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default ProductViewSection;
