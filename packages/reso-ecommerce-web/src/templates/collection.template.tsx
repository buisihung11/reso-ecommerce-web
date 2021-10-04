import React from 'react';
import TemplateFactory from './template';

const CollectionTemplate = () => {
  return (
    <TemplateFactory
      layout="default"
      sections={[
        {
          name: 'collection-content',
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

export default CollectionTemplate;
