import { getAllCollections } from '@/api/collection';
import { getAllProduct } from '@/api/product';
import { getTemplateInstance } from '@/templates/template';
import { GetStaticPropsContext } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['products'], () =>
    getAllProduct({ page: 1, size: 50 }),
  );

  await queryClient.prefetchQuery(['collections'], () =>
    getAllCollections({ page: 1, size: 50 }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 2,
  };
}

interface Props {}

const CartTemplate = getTemplateInstance({ name: 'cart' });

const CartPage = (props: Props) => {
  return <CartTemplate />;
};

export default CartPage;
