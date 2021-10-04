import { getAllProductPaths } from '@/api/product';
import { getProductDetail } from '@/hooks/product/useProduct';
import ProductDetailTemplate from '@/templates/product-detail.template';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ productId: string }>) {
  const config = { locale, locales };
  const { productId } = params || {};
  const queryClient = new QueryClient();

  if (!productId) {
    return {
      notFound: true,
    };
  }

  await queryClient.prefetchQuery(['products', +productId], () =>
    getProductDetail(productId),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 2,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const products = await getAllProductPaths();
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((id: number) => {
            arr.push(`/${locale}/products/${id}`);
          });
          return arr;
        }, [])
      : products.map((id: number) => `/products/${id}`),
    fallback: 'blocking',
  };
}

const ProductDetailPage = () => {
  return <ProductDetailTemplate />;
};

export default ProductDetailPage;
