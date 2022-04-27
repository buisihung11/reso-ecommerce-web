import { TStore } from '@/types/store';
import React from 'react';
import TemplateFactory from './template';

interface Props {
  product?: TStore[];
}

const StoreDetailTemplate = (props: Props) => {
  return (
    <TemplateFactory<Props>
      layout="default"
      sections={[
        {
          name: 'store-view',
        },
        {
          name: 'call-to-action',
        },
      ]}
    />
  );
};

export default StoreDetailTemplate;
