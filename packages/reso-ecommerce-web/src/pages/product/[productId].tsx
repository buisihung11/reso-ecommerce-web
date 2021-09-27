import { getAllProductPaths } from '@/api/product';
import ProductQuantityInput from '@/components/product-quantity-input';
import useProduct, { getProductDetail } from '@/hooks/product/useProduct';
import Layout from '@/layouts/Layout';
import { Image } from '@chakra-ui/image';
import {
  AspectRatio,
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
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
}: GetStaticPropsContext<{ productId: string }>) {
  const config = { locale, locales };
  const { productId } = params || {};
  const queryClient = new QueryClient();

  if (!productId) {
    return {
      notFound: true,
    };
  }

  await queryClient.prefetchQuery(['products', productId], () =>
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
            arr.push(`/${locale}/product${id}`);
          });
          return arr;
        }, [])
      : products.map((id: number) => `/product/${id}`),
    fallback: 'blocking',
  };
}

const ProductDetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data } = useProduct({ id: Number(productId) });

  if (!data) {
    return <Text>Không tìm thấy sản phẩm với id {productId}</Text>;
  }

  const { pic_url, product_name } = data;

  return (
    <Container px={[4, 12]} maxW="100%" pt={12} pb={100}>
      <NextSeo
        title={product_name}
        description={product_name}
        openGraph={{
          type: 'website',
          title: product_name,
          description: product_name,
          images: [
            {
              url: pic_url!,
              width: 800,
              height: 600,
              alt: product_name,
            },
          ],
        }}
      />
      <Grid templateColumns="repeat(12, 1fr)" gap={8}>
        <GridItem colSpan={[12, 7]}>
          <Image
            src={pic_url}
            height="auto"
            maxW="100%"
            objectFit="cover"
            objectPosition="center center"
            fallback={
              <AspectRatio maxW="100%" ratio={1}>
                <Box p={2} textAlign="center" bg="gray.100" w="100%" h="auto">
                  <Center>
                    <Text fontSize={['md', 'lg']} noOfLines={2}>
                      {product_name}
                    </Text>
                  </Center>
                </Box>
              </AspectRatio>
            }
          />
        </GridItem>
        <GridItem colSpan={[12, 5]}>
          <Stack spacing={4}>
            <Heading fontWeight={400}>{product_name}</Heading>
            <Text fontSize="lg">30 VND</Text>
            <Box maxW="xs">
              <Text color="gray.400">Màu sắc</Text>
              <Select placeholder="Chọn màu sắc">
                <option value="option1">Đỏ</option>
                <option value="option2">Vàng</option>
                <option value="option3">Xanh</option>
              </Select>
            </Box>
            <Box maxW="xs">
              <Text color="gray.400">Kích cỡ</Text>
              <Select placeholder="Chọn kích cỡ">
                <option value="option1">Size M</option>
                <option value="option2">Size L</option>
                <option value="option3">Size XL</option>
              </Select>
            </Box>
            <Box>
              <Text color="gray.400">Số lượng</Text>
              <ProductQuantityInput />
            </Box>

            <Stack spacing={1}>
              <Button variant="outline">Thêm vào giỏ hàng</Button>
              <Button colorScheme="blue" variant="solid">
                Mua ngay
              </Button>
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Container>
  );
};

ProductDetailPage.Layout = Layout;

export default ProductDetailPage;
