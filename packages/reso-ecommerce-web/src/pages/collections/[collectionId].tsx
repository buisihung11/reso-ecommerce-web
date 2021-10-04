import React from 'react';
import {
  getAllCollectionPaths,
  getProductInCollection,
} from '@/api/collection';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { getTemplateInstance } from '@/templates/template';

const CollectionTemplate = getTemplateInstance({ name: 'collection' });

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ collectionId: string }>) {
  const config = { locale, locales };
  const { collectionId } = params || {};
  const queryClient = new QueryClient();

  if (!collectionId) {
    return {
      notFound: true,
    };
  }

  await queryClient.prefetchQuery(['collections', +collectionId], () =>
    getProductInCollection(+collectionId, { page: 0, size: 20 }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 2,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const collections = await getAllCollectionPaths({ page: 1, size: 100 });
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          collections.forEach((id: number) => {
            arr.push(`/${locale}/collections${id}`);
          });
          return arr;
        }, [])
      : collections.map((id: number) => `/collections/${id}`),
    fallback: 'blocking',
  };
}

const ColelctionDetailPage = () => {
  return <CollectionTemplate />;
};

export default ColelctionDetailPage;
