import useProducts from '@/hooks/product/useProducts';
import useIframeMessage from '@/hooks/useIframeMessage';
import React from 'react';
import TemplateFactory from './template';

interface Props {
  collections?: any[];
}

const HomeTemplate = (props: Props) => {
  const { message } = useIframeMessage();

  return (
    <TemplateFactory<Props>
      layout="default"
      sections={
        [
          {
            name: 'home-market',
            settings: {
              bgColor: 'inherit',
            },
          },
        ]
        // message
        //   ? [
        //       {
        //         name: 'home-market',
        //         settings: {
        //           bgColor: 'inherit',
        //         },
        //       },
        //     ]
        //   : [
        //       {
        //         name: 'home-carousel',
        //         settings: {
        //           carouselType: 'type3',
        //         },
        //       },
        //       {
        //         name: 'home-content',
        //         settings: {
        //           bgColor: 'inherit',
        //         },
        //       },
        //       {
        //         name: 'call-to-action',
        //       },
        //     ]
      }
    />
  );
};

export default HomeTemplate;
