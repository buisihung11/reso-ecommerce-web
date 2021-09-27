import { getAllCollections } from '@/api/collection';
import { getAllProduct, getAllProductPaths } from '@/api/product';
import Filter from '@/components/filter';
import ProductCard from '@/components/product-card';
import useProducts from '@/hooks/product/useProducts';
import Layout from '@/layouts/Layout';
import {
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout';
import { CircularProgress, Skeleton } from '@chakra-ui/react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
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

export default function Home() {
  const [params, setParams] = useState({});
  const { data, metadata, status, isFetching } = useProducts(params);
  console.log(`data`, data, status);

  if (status === 'loading') {
    return (
      <Container px={[4, 12]} maxW="100%" pt={50} pb={100}>
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 3, lg: 4 }}
          spacingY={10}
          spacingX={[2, 4]}
        >
          {[...new Array(4)].map((_, idx) => (
            <Skeleton key={`skeleton-${idx}`} width="100%" height="240px" />
          ))}
        </SimpleGrid>
      </Container>
    );
  }

  return (
    <div>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container px={[4, 12]} maxW="100%" pt={50} pb={100}>
        <Heading as="h1" mb={[4, 6]}>
          Sản phẩm
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
        {/* <ReactPaginate
          pageCount={(metadata?.total / metadata?.size)!}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          previousLabel={'previous'}
          nextLabel={'next'}
        /> */}
      </Container>
    </div>
  );
}

Home.Layout = Layout;
