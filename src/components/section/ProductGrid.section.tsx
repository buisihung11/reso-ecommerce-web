import { TProduct } from '@/types/product';
import { Container, Grid, Box, Link } from '@mui/material';
import React from 'react';
import ProductCard from '../product-card';
import { TSetting } from './Section';

interface ProductGridProps {
  settings?: TSetting;
  products: TProduct[];
}

const ProductGridSection = ({ products }: ProductGridProps) => {
  return (
    <Box>
      <Grid
        container
        spacing={[4, 8]}
        sx={{ justifyContent: { xs: 'center', md: 'space-between' } }}
      >
        {products?.map((product) => (
          <Grid
            key={product.product_id}
            item
            xs={12}
            sm={5}
            md={4}
            paddingY={{ xs: '2rem', md: '3rem' }}
            maxWidth={{ xs: '18rem', md: '21rem', lg: '23rem' }}
          >
            <Link
              href={`/products/${product.product_id}`}
              aria-label={`View ${product.product_name} product page`}
              sx={{ ':hover': { textDecoration: 'none' } }}
            >
              <ProductCard product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGridSection;
