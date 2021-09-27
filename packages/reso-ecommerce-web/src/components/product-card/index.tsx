import Layout from '@/layouts/Layout';
import { TProduct } from '@/types/product';
import { Image } from '@chakra-ui/image';
import { AspectRatio, Box, Center, Stack, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import * as React from 'react';
import { FC } from 'react';

type Props = {
  product: Partial<TProduct>;
};

const ProductCard: FC<Props> = ({ product }) => {
  const { product_name, pic_url, product_id } = product;

  // const price = formatPrice(
  //   priceRangeV2.minVariantPrice.currencyCode,
  //   priceRangeV2.minVariantPrice.amount,
  // );
  const price = 100;

  const defaultImageHeight = 200;
  const defaultImageWidth = 200;

  const hasImage = pic_url && pic_url?.length !== 0;

  return (
    <Link
      href={`/product/${product_id}` || '#'}
      aria-label={`View ${product_name} product page`}
      passHref
    >
      <Box cursor="pointer">
        <Stack>
          <Image
            src={pic_url}
            height="auto"
            maxW="100%"
            objectFit="cover"
            objectPosition="center center"
            fallback={
              <AspectRatio maxW="100%" ratio={1}>
                <Box p={2} textAlign="center" bg="gray.100" w="100%" h="aut">
                  <Center>
                    <Text fontSize={['md', 'lg']} noOfLines={2}>
                      {product_name}
                    </Text>
                  </Center>
                </Box>
              </AspectRatio>
            }
          />

          {hasImage && (
            <Text py={2} fontSize={['xs']} fontWeight="400" noOfLines={2}>
              {product_name}
            </Text>
          )}

          <Text fontSize={['md', 'lg']} noOfLines={2}>
            Từ 20.000 VND
          </Text>
        </Stack>
      </Box>
    </Link>
  );
};

export default ProductCard;
