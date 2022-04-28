import { getAllProductPaths } from '@/api/product';
import { getProductDetail } from '@/hooks/product/useProduct';
import ProductDetailTemplate from '@/templates/product-detail.template';
import { getTemplateInstance } from '@/templates/template';
import { ProductTypeEnum } from '@/types/product';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

const ComboDetailTemplate = getTemplateInstance({ name: 'combo-detail' });

// export async function getStaticProps({
//   params,
//   locale,
//   locales,
//   preview,
// }: GetStaticPropsContext<{ comboId: string }>) {
//   const config = { locale, locales };
//   const { comboId } = params || {};
//   const queryClient = new QueryClient();

//   if (!comboId) {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     console.log(`GENERATING_PAGE_FOR_PRODUCT_ID `, comboId);
//     await queryClient.prefetchQuery(['combos', +comboId], () =>
//       getProductDetail(comboId),
//     );
//   } catch (error) {
//     console.log('PRODUCT_DETAIL_ERROR : ', comboId, error);
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: 60,
//   };
// }

// export async function getStaticPaths({ locales }: GetStaticPathsContext) {
//   const combos = await getAllProductPaths({
//     'product-type': ProductTypeEnum.Combo,
//   });
//   return {
//     paths: locales
//       ? locales.reduce<string[]>((arr, locale) => {
//           // Add a product path for every locale
//           combos.forEach((id: number) => {
//             arr.push(`/${locale}/combos/${id}`);
//           });
//           return arr;
//         }, [])
//       : combos.map((id: number) => `/combos/${id}`),
//     fallback: true,
//   };
// }

const ComboDetailPage = () => {
  return <ComboDetailTemplate />;
};

export default ComboDetailPage;
