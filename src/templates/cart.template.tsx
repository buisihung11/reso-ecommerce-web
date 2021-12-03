import React from 'react';
import TemplateFactory from './template';

interface Props {}

const CartTemplate = () => {
  return (
    <TemplateFactory
      layout="default"
      sections={[
        {
          name: 'cart-content',
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

export default CartTemplate;
