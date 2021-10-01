import { getAllCollections } from '@/api/collection';
import { getAllProduct } from '@/api/product';
import useProducts from '@/hooks/product/useProducts';
import { getTemplateInstance } from '@/templates/template';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';

const CollectionTemplate = getTemplateInstance({ name: 'collection' });

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

  // if (status === 'loading') {
  //   return (
  //     <Container px={[4, 12]} maxW="100%" pt={50} pb={100}>
  //       <SimpleGrid
  //         columns={{ base: 2, sm: 3, md: 3, lg: 4 }}
  //         spacingY={10}
  //         spacingX={[2, 4]}
  //       >
  //         {[...new Array(4)].map((_, idx) => (
  //           <Skeleton key={`skeleton-${idx}`} width="100%" height="240px" />
  //         ))}
  //       </SimpleGrid>
  //     </Container>
  //   );
  // }

  return (
    <div>
      <Head>
        <title>Reso website</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CollectionTemplate />
    </div>
  );
}
