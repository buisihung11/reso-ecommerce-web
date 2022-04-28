import { getAllStoresPath } from '@/api/stores';
import { getStoreDetail } from '@/hooks/store/useStore';
import StoreDetailTemplate from '@/templates/store-detail.template';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ storeId: string }>) {
  const config = { locale, locales };
  const { storeId } = params || {};
  const queryClient = new QueryClient();

  if (!storeId) {
    return {
      notFound: true,
    };
  }

  try {
    console.log(`GENERATING_PAGE_FOR_STORE_ID `, storeId);
    await queryClient.prefetchQuery(['products', +storeId], () =>
      getStoreDetail(storeId),
    );
  } catch (error) {
    console.log('STORE_DETAIL_ERROR : ', storeId, error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const stores = await getAllStoresPath();
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a store path for every locale
          stores.forEach((id: number) => {
            arr.push(`/${locale}/stores/${id}`);
          });
          return arr;
        }, [])
      : stores.map((id: number) => `/stores/${id}`),
    fallback: true,
  };
}

const StoreDetailPage = () => {
  return <StoreDetailTemplate />;
};

export default StoreDetailPage;
