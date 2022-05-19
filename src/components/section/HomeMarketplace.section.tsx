import useProducts from '@/hooks/product/useProducts';
import { TCollection } from '@/types/collection';
import {
  ArrowRightAlt,
  Category,
  CategoryTwoTone,
  DeliveryDining,
  Search,
  SentimentSatisfied,
  ShoppingCart,
  SupportAgent,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Pagination,
  Link,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import React, { FC } from 'react';

import useCategories from '@/hooks/category/useCategories';
import { MultiCarousel } from '../carousel';
import ProductGridSection from './ProductGrid.section';
import usePagination from '@/hooks/usePagination';

interface Props {
  settings?: {
    [key: string]: any;
  };
}
const HomeMarketSection: FC<Props> = ({ settings = {} }) => {
  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 15 },
  });
  const { data, isLoading, metadata, error } = useProducts({
    params: { page: page, size },
  });
  const { data: categories, isLoading: cateLoading } = useCategories({});
  const totalPage = Math.ceil((metadata?.total ?? 1) / size);
  const bgColorSetting = settings['bgColor'];

  return (
    <Box bgcolor={bgColorSetting} py={[6, 10]} alignItems="center">
      <Container maxWidth="lg" sx={{ paddingBottom: '2rem' }}>
        <Stack
          flexDirection={'row'}
          width={'100%'}
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: '#00000010' }}
          paddingX={'2rem'}
        >
          <Box display="flex" alignItems={'flex-end'} marginY="0.5rem">
            <Search />
            <TextField
              sx={{ width: '30vw' }}
              id="search"
              label="Tìm kiếm"
              variant="standard"
            />
          </Box>
          <IconButton>
            <ShoppingCart />
          </IconButton>
        </Stack>
      </Container>

      <MultiCarousel />

      <Stack spacing={[2, 4]}>
        <Container
          maxWidth="lg"
          sx={{ textAlign: 'center', margin: '0 auto', paddingTop: '2rem' }}
        >
          {/* <Typography variant="h1" sx={{ paddingBottom: '1rem' }}>
            Daily essentials delivered in minutes.
          </Typography> */}
          <Grid
            container
            direction="row"
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item xs={3}>
              <Category fontSize="large" />
              <Typography variant="h5">Sản phẩm an toàn</Typography>
            </Grid>
            <Grid item xs={3}>
              <SentimentSatisfied fontSize="large" />
              <Typography variant="h5">Chất lượng cam kết</Typography>
            </Grid>
            <Grid item xs={3}>
              <DeliveryDining fontSize="large" />
              <Typography variant="h5">Giao hàng nhanh chóng</Typography>
            </Grid>
            <Grid item xs={3}>
              <SupportAgent fontSize="large" />
              <Typography variant="h5">Dịch vụ vượt trội</Typography>
            </Grid>
          </Grid>
        </Container>

        <Box>
          <Container
            maxWidth="lg"
            sx={{
              alignContent: 'center',
              alignSelf: 'center',
              paddingY: '5rem',
            }}
          >
            <Container
              maxWidth="lg"
              sx={{
                margin: '0 auto',
                paddingBottom: '1rem',
              }}
            >
              <Typography variant="h2">#Danh mục phổ biến</Typography>
            </Container>
            {cateLoading ? (
              <Container sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Container>
            ) : (
              <Grid container spacing={[2, 4]}>
                {categories?.slice(0, 8).map((cate) => (
                  <Grid key={cate.cate_id} item xs={6} sm={4} md={3}>
                    <Link
                      href={`/categories/${cate.cate_id}`}
                      aria-label={`Xem danh mục ${cate.cate_name}`}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ width: '100%', height: '8vh', borderRadius: 3 }}
                      >
                        <Typography variant="h6">{cate.cate_name}</Typography>
                      </Button>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>

        <Container
          maxWidth="lg"
          style={{
            alignContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              margin: '0 auto',
              paddingBottom: '1rem',
            }}
          >
            <Typography variant="h2">#Sản phẩm nổi bật</Typography>
          </Container>
          {isLoading ? (
            <Container sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </Container>
          ) : (
            data && (
              <>
                <ProductGridSection products={data} />
                <Box
                  py={4}
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                >
                  <Pagination
                    page={page}
                    onChange={(_: any, page: number) => onPageChange(page)}
                    count={totalPage}
                    shape="rounded"
                  />
                </Box>
              </>
            )
          )}
        </Container>
      </Stack>
    </Box>
  );
};

export default HomeMarketSection;
