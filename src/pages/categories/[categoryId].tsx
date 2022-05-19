import { getAllCatesPath } from '@/api/categories';
import { getCategoryDetail } from '@/hooks/category/useCategory';
import CategoryMarketTemplate from '@/templates/category-market.template';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ categoryId: string }>) {
  const config = { locale, locales };
  const { categoryId } = params || {};
  const queryClient = new QueryClient();

  if (!categoryId) {
    return {
      notFound: true,
    };
  }

  try {
    console.log(`GENERATING_PAGE_FOR_CATEGORY_ID`, categoryId);
    await queryClient.prefetchQuery(['categories', +categoryId], () =>
      getCategoryDetail(categoryId),
    );
  } catch (error) {
    console.log('CATEGORY: ', categoryId, error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const stores = await getAllCatesPath();
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a cate path for every locale
          stores.forEach((id: number) => {
            arr.push(`/${locale}/categories/${id}`);
          });
          return arr;
        }, [])
      : stores.map((id: number) => `/categories/${id}`),
    fallback: true,
  };
}

const CategoryMarketPage = () => {
  return <CategoryMarketTemplate />;
};

export default CategoryMarketPage;
