import React from 'react';
import TemplateFactory from './template';

const ComboListTemplate = () => {
  return (
    <TemplateFactory
      layout="default"
      sections={[
        {
          name: 'combo-list',
          settings: {
            bgColor: 'inherit',
          },
        },
      ]}
    />
  );
};

export default ComboListTemplate;
