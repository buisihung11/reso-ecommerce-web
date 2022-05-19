import { TCategory } from '@/types/category';
import React from 'react';
import TemplateFactory from './template';

interface Props {
  category?: TCategory[];
}

const CategoryMarketTemplate = (props: Props) => {
  return (
    <TemplateFactory<Props>
      layout="default"
      sections={[
        {
          name: 'cate-market-view',
        },
        {
          name: 'call-to-action',
        },
      ]}
    />
  );
};

export default CategoryMarketTemplate;
