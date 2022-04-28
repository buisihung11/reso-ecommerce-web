import { getAllProduct } from '@/api/product';
import { getTemplateInstance } from '@/templates/template';
import { ProductTypeEnum } from '@/types/product';
import { GetStaticPropsContext } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

const ComboListTemplate = getTemplateInstance({ name: 'combo-list' });

const ComboListPage = () => {
  return <ComboListTemplate />;
};

// export async function getStaticProps({}: GetStaticPropsContext<any>) {
//   const queryClient = new QueryClient();

//   try {
//     await queryClient.prefetchQuery(['combos', { page: 0, size: 20 }], () =>
//       getAllProduct({
//         page: 0,
//         size: 20,
//         'product-type': ProductTypeEnum.Combo,
//       }),
//     );
//   } catch (error) {}

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: 60,
//   };
// }

export default ComboListPage;
