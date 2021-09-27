import {
  getAllCollectionPaths,
  getProductInCollection,
} from '@/api/collection';
import Filter from '@/components/filter';
import ProductCard from '@/components/product-card';
import useCollection from '@/hooks/collection/useCollection';
import Layout from '@/layouts/Layout';
import {
  Center,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/react';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

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

  await queryClient.prefetchQuery(['collections', collectionId], () =>
    getProductInCollection(+collectionId, { page: 1, size: 100 }),
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

const CollectionDetailPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  const { data, status, isFetching, metadata, collectionInfo } = useCollection({
    id: Number(collectionId),
  });

  if (status === 'loading') {
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  if (!data) {
    return <Text>Không tìm thấy bộ sưu tập với id {collectionId}</Text>;
  }

  return (
    <Container px={[4, 12]} maxW="100%" pt={12} pb={100}>
      <NextSeo
        title={collectionInfo?.name ?? 'Bộ sưu tập'}
        description={collectionInfo?.name}
        openGraph={{
          type: 'website',
          title: collectionInfo?.name,
          description: collectionInfo?.name,
        }}
      />
      <Heading as="h1" mb={[4, 6]}>
        {collectionInfo?.name ?? 'Bộ sưu tập'}
      </Heading>
      <HStack mb={4} justifyContent="space-between">
        <Filter />
        <HStack spacing={2}>
          {isFetching && <CircularProgress isIndeterminate size={6} />}
          <Text color="gray">{metadata?.total} sản phẩm</Text>
        </HStack>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 3, lg: 4 }}
        spacingY={10}
        spacingX={[2, 4]}
      >
        {data?.map((data, idx) => (
          <ProductCard product={data} key={`item-${idx}`} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

CollectionDetailPage.Layout = Layout;

export default CollectionDetailPage;
