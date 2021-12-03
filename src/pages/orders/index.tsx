import { getTemplateInstance } from '@/templates/template';
import React from 'react';

interface Props {}
const OrderTemplate = getTemplateInstance({ name: 'order' });

const OrderDetailPage = (props: Props) => {
  return <OrderTemplate />;
};

export default OrderDetailPage;
