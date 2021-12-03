import { TProduct } from '@/types/product';
import { Container, Grid, Box } from '@mui/material';
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
      <Grid container spacing={[2, 4]}>
        {products?.map((product) => (
          <Grid key={product.product_id} item xs={6} sm={4} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGridSection;
