import {
  ProductDetailsCarousel,
  ProductDetailsSummary,
} from '@/components/product-details';
import ProductBuilderProvider from '@/contexts/ProductBuilderContext';
import useProduct from '@/hooks/product/useProduct';
import useProducts from '@/hooks/product/useProducts';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
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
              maxWidth="md"
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
              <Box>
                <Grid container spacing={[2, 4, 6]}>
                  <Grid item xs={12} sm={5} lg={5} xl={4}>
                    <ProductDetailsCarousel product={product} />
                  </Grid>
                  <Grid item xs={12} sm={7} lg={7} xl={8}>
                    <ProductDetailsSummary
                      product={product}
                      quantity={1}
                      // onAddCart={handleAddCart}
                      // onGotoStep={handleGotoStep}
                    />
                  </Grid>
                </Grid>
              </Box>
            </ProductBuilderProvider>
          ) : (
            <Typography>Không tìm thấy sản phẩm</Typography>
          )}
        </>
      )}

      {relatedProducts && (
        <Box textAlign="center" py={[2, 4]}>
          <Typography variant="h4" mb={2}>
            Có thể bạn thích
          </Typography>
          <ProductCarousel
            CardProps={{
              imgStyle,
            }}
            products={relatedProducts}
          />
        </Box>
      )}
    </Container>
  );
};

export default ProductViewSection;
