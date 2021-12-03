import { getAllProduct } from '@/api/product';
import { getTemplateInstance } from '@/templates/template';
import { GetStaticPropsContext } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

const ProductListTemplate = getTemplateInstance({ name: 'product-list' });

const ProductListPage = () => {
  return <ProductListTemplate />;
};

export async function getStaticProps({}: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery(['products', { page: 0, size: 20 }], () =>
      getAllProduct({ page: 0, size: 20 }),
    );
  } catch (error) {}

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

export default ProductListPage;
