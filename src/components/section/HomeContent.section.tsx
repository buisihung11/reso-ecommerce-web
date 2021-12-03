import useProducts from '@/hooks/product/useProducts';
import { TCollection } from '@/types/collection';
import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Img } from 'react-image';
import ProductCard from '../product-card';

interface Props {
  settings?: {
    [key: string]: any;
  };
}

const CollectionGridSection: FC<Props> = ({ settings = {} }) => {
  const { data } = useProducts({});
  const bgColorSetting = settings['bgColor'];

  return (
    <Box bgcolor={bgColorSetting} py={[6, 10]}>
      <Stack spacing={[4, 8]}>
        <Container maxWidth="md" sx={{ textAlign: 'center', py: [4, 6, 10] }}>
          <Typography variant="h2" component="h1">
            Nhanh chóng
          </Typography>
          <Typography variant="body1" component="h1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas minus
            suscipit dolor quia maxime dolore esse aspernatur quis, excepturi
            rerum doloribus eius odio dolores laudantium consectetur nobis.
          </Typography>
        </Container>

        <Box>
          <Container
            maxWidth="md"
            sx={{ textAlign: 'center', margin: '0 auto' }}
          >
            <Typography variant="h3">Sản phẩm nổi bật</Typography>
          </Container>
        </Box>
        <Container maxWidth="xl">
          <Grid container spacing={[2, 4]}>
            {data?.slice(0, 8).map((product) => (
              <Grid key={product.product_id} item xs={6} sm={4} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box sx={{ py: 4 }}>
          <Stack alignItems="center" direction="row" spacing={2} pl={2} pb={2}>
            <Typography variant="h4">Bộ sưu tập</Typography>
            <ArrowRightAlt />
          </Stack>

          <Container maxWidth="xl">
            <Grid container spacing={[2, 4]}>
              <Grid item xs={12} md={8} alignSelf="stretch">
                <CollectionCard
                  collection={{
                    name: 'Bộ sưu tập mùa đông',
                    pic_url:
                      'https://cdn.shopify.com/s/files/1/0551/7626/5784/collections/mlouye-bo-ivy-cognac-8_1800x1800_f2372d12-2a0d-4199-8044-7364730c5677_720x.jpg?v=1628191085',
                  }}
                />
              </Grid>
              <Grid container item xs={12} md={4} spacing={2}>
                <Grid item xs={6} md={12}>
                  <CollectionCard
                    collection={{
                      name: 'Giày Sandal',
                      pic_url:
                        'https://cdn.shopify.com/s/files/1/0551/7626/5784/collections/94304653_229004641764033_642353829510353251_n_720x.jpg?v=1628175941',
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <CollectionCard
                    collection={{
                      name: 'Black Friday',
                      pic_url:
                        'https://cdn.shopify.com/s/files/1/0551/7626/5784/files/mlouye-helix-sand-banner-mobile-l1_52f4783b-0314-4e87-a7ac-3db1acae3ef7_720x.jpg?v=1628536360',
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
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
