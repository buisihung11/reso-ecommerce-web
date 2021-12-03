import useProducts from '@/hooks/product/useProducts';
import React from 'react';
import TemplateFactory from './template';

interface Props {
  collections?: any[];
}

const HomeTemplate = (props: Props) => {
  return (
    <TemplateFactory<Props>
      layout="default"
      sections={[
        {
          name: 'home-carousel',
          settings: {
            carouselType: 'type3',
          },
        },
        {
          name: 'home-content',
          settings: {
            bgColor: 'inherit',
          },
        },
        {
          name: 'call-to-action',
        },
      ]}
    />
  );
};

export default HomeTemplate;
