import { TProduct } from '@/types/product';
import { TStore } from '@/types/store';
import React from 'react';
import TemplateFactory from './template';

interface Props {
  shop?: TStore[];
}

const StoreListTemplate = (props: Props) => {
  return (
    <TemplateFactory<Props>
      layout="default"
      sections={[
        {
          name: 'storelist-content',
        },
        {
          name: 'call-to-action',
        },
      ]}
    />
  );
};

export default StoreListTemplate;
