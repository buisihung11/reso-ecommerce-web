import {
  ProductDetailsCarousel,
  ProductDetailsSummary,
} from '@/components/product-details';
import useProduct from '@/hooks/product/useProduct';
import useProducts from '@/hooks/product/useProducts';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { ProductCarousel } from '../carousel';

interface Props {
  imgStyle?: any;
}

const ProductViewSection = ({ imgStyle }: Props) => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: product, status } = useProduct({ id: Number(productId) });
  const { data: relatedProducts } = useProducts({});

  if (status === 'loading') {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return <Typography>Không tìm thấy sản phẩm với id {productId}</Typography>;
  }

  const { pic_url, product_name } = product;

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

      {product && (
        <Box>
          <Grid container spacing={[2, 4, 6]}>
            <Grid item xs={12} md={6} lg={7}>
              <ProductDetailsCarousel product={product} />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <ProductDetailsSummary
                product={product}
                quantity={1}
                // onAddCart={handleAddCart}
                // onGotoStep={handleGotoStep}
              />
            </Grid>
          </Grid>
        </Box>
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
