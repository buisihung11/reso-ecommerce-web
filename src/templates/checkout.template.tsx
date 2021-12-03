import React from 'react';
import TemplateFactory from './template';

interface Props {}

const CheckoutTemplate = () => {
  return (
    <TemplateFactory
      sections={[
        {
          name: 'checkout-content',
        },
      ]}
    />
  );
};

export default CheckoutTemplate;
