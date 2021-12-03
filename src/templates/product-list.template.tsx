import useProducts from '@/hooks/product/useProducts';
import { TProduct } from '@/types/product';
import React from 'react';
import TemplateFactory from './template';

interface Props {
  product?: TProduct[];
}

const ProductListTemplate = (props: Props) => {
  return (
    <TemplateFactory<Props>
      layout="default"
      sections={[
        {
          name: 'productlist-content',
        },
        {
          name: 'call-to-action',
        },
      ]}
    />
  );
};

export default ProductListTemplate;
