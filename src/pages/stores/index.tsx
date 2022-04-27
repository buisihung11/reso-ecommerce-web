import { getTemplateInstance } from '@/templates/template';
import React from 'react';

const ShopListTemplate = getTemplateInstance({ name: 'store-list' });

const StoreListPage = () => {
  return <ShopListTemplate />;
};

export default StoreListPage;
