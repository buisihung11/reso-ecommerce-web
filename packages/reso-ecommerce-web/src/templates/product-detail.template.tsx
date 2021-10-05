import useProducts from '@/hooks/product/useProducts';
import { TProduct } from '@/types/product';
import React from 'react';
import TemplateFactory from './template';

interface Props {
  product?: TProduct[];
}

const ProductDetailTemplate = (props: Props) => {
  return (
    <TemplateFactory<Props>
      layout="default"
      sections={[
        {
          name: 'product-view',
          props: {
            imgStyle: 'square',
          },
        },
        {
          name: 'call-to-action',
        },
      ]}
    />
  );
};

export default ProductDetailTemplate;
