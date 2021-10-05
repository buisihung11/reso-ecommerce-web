import { getTemplateInstance } from '@/templates/template';
import { GetServerSideProps } from 'next';
import React from 'react';

export async function getServersideProps(context: GetServerSideProps) {}

interface Props {}

const CheckoutTemplate = getTemplateInstance({ name: 'checkout' });

const CheckoutPage = (props: Props) => {
  return <CheckoutTemplate />;
};

export default CheckoutPage;
