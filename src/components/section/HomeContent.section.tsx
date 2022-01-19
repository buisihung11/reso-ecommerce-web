import useProducts from '@/hooks/product/useProducts';
import { TCollection } from '@/types/collection';
import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Img } from 'react-image';
import ProductCard from '../product-card';
import { ProductCarousel } from '../carousel';
interface Props {
  settings?: {
    [key: string]: any;
  };
  imgStyle?: any;
}
const CollectionGridSection: FC<Props> = ({ imgStyle, settings = {} }) => {
  const { data } = useProducts({});
  const bgColorSetting = settings['bgColor'];
  const { data: relatedProducts } = useProducts({
    params: { page: 1, size: 10 },
  });
  return (
    <Box bgcolor={bgColorSetting} py={[6, 10]}>
      <Stack spacing={[4, 8]}>
        <Box>
          <Container
            maxWidth="md"
            sx={{ textAlign: 'center', margin: '0 auto' }}
          >
            {relatedProducts && (
              <Box textAlign="center" py={[2, 4]}>
                <Typography
                  fontWeight="bold"
                  variant="h2"
                  mb={2}
                  paddingBottom={7}
                >
                  Sản phẩm nổi bật
                </Typography>
                <ProductCarousel
                  CardProps={{
                    imgStyle,
                  }}
                  products={relatedProducts}
                />
              </Box>
            )}
          </Container>
        </Box>
      </Stack>
    </Box>
  );
};

type CollectionProps = {
  collection: Partial<TCollection> & {
    pic_url: string;
  };
};
const CollectionCard = ({
  collection: { pic_url, name, id },
}: CollectionProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      borderWidth: `1px`,
      borderColor: 'grey.400',
      borderStyle: 'solid',
      height: '100%',
    }}
  >
    <Box flex={1}>
      <Img
        src={pic_url!}
        style={{
          height: '100%',
          width: '100%',
        }}
        loader={
          <Box
            p={2}
            bgcolor="grey.100"
            width="100%"
            sx={{
              aspectRatio: '1 / 1',
            }}
          />
        }
        unloader={
          <Box
            p={2}
            textAlign="center"
            bgcolor="grey.100"
            width="100%"
            position="relative"
            sx={{
              aspectRatio: '1 / 1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography noWrap>{name}</Typography>
          </Box>
        }
      />
    </Box>

    <Box p={[2, 4]} bgcolor="grey.100">
      <Typography variant="h6" noWrap>
        {name}
      </Typography>
    </Box>
  </Box>
);

export default CollectionGridSection;
