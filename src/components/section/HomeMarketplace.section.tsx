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
  InputAdornment,
  styled,
  Divider,
  Card,
  Paper,
} from '@mui/material';

import React, { FC } from 'react';

import useCategories from '@/hooks/category/useCategories';
import { MultiCarousel } from '../carousel';
import ProductGridSection from './ProductGrid.section';
import usePagination from '@/hooks/usePagination';
import useMenu from '@/hooks/menu/useMenu';
import CateImageButton from '../category/CateImageButton';
import CategoryCarousel from '../carousel/CategoryCarousel';
interface Props {
  settings?: {
    [key: string]: any;
  };
}

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#00AB55',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#000000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#000000',
    },
    '&:hover fieldset': {
      borderColor: '#000000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00AB55',
    },
  },
});

const HomeMarketSection: FC<Props> = ({ settings = {} }) => {
  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 15 },
  });
  const { data, isLoading, metadata, error } = useProducts({
    params: { page: page, size },
  });
  const { data: categories, isLoading: cateLoading } = useCategories({});
  const { data: menu } = useMenu({ id: 40 });
  const totalPage = Math.ceil((metadata?.total ?? 1) / size);
  const bgColorSetting = settings['bgColor'];
  console.log(menu);

  return (
    <Box bgcolor={bgColorSetting} alignItems="center">
      <Box width={'100%'} sx={{ backgroundColor: '#00AB5590' }}>
        <Container maxWidth="lg">
          <Stack
            flexDirection={'row'}
            width={'100%'}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">CH??? C?? D??N</Typography>
            <Box display="flex" marginY="0.5rem">
              <StyledTextField
                sx={{ width: '50vw' }}
                id="search"
                placeholder="T??m ki???m"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                color="primary"
              />
            </Box>
            <IconButton>
              <ShoppingCart />
            </IconButton>
          </Stack>
        </Container>
      </Box>

      <MultiCarousel />

      <Stack spacing={[2, 4]}>
        <Container maxWidth="lg">
          {/* <Divider sx={{ borderBottomWidth: 'medium' }}>
            <Typography variant="h2" sx={{ paddingBottom: '1rem' }}>
              Ch??? C?? D??n c??
            </Typography>
          </Divider> */}

          <Grid
            container
            direction="row"
            sx={{
              justifyContent: 'space-between',
              borderStyle: 'solid',
              borderWidth: 'thin',
              borderColor: '#00000030',
              paddingY: '2rem',
              textAlign: 'center',
            }}
          >
            <Grid item xs={6} md={3}>
              <Category fontSize="large" />
              <Typography variant="h5">S???n ph???m an to??n</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <SentimentSatisfied fontSize="large" />
              <Typography variant="h5">Ch???t l?????ng cam k???t</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <DeliveryDining fontSize="large" />
              <Typography variant="h5">Giao h??ng nhanh ch??ng</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <SupportAgent fontSize="large" />
              <Typography variant="h5">D???ch v??? v?????t tr???i</Typography>
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
            <Typography variant="h3" sx={{ paddingBottom: '3rem' }}>
              Danh m???c ph??? bi???n
            </Typography>

            {cateLoading ? (
              <Container sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Container>
            ) : (
              categories && <CategoryCarousel categories={categories} />
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
          <Divider />
          <Typography variant="h3" sx={{ paddingBottom: '1rem' }}>
            S???n ph???m g???i ??
          </Typography>

          {isLoading ? (
            <Container sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </Container>
          ) : (
            data && (
              <Box paddingY={{ xs: '5rem', md: '3rem' }}>
                <ProductGridSection products={data.slice(0, 6)} />
              </Box>
            )
          )}
        </Container>

        <Container
          maxWidth="lg"
          style={{
            alignContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Typography variant="h3" sx={{ paddingBottom: '1rem' }}>
            S???n ph???m n???i b???t
          </Typography>

          {isLoading ? (
            <Container sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </Container>
          ) : (
            data && (
              <Box paddingY={{ xs: '5rem', md: '3rem' }}>
                <ProductGridSection products={data.slice(6, data.length)} />
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
              </Box>
            )
          )}
        </Container>
      </Stack>
    </Box>
  );
};

export default HomeMarketSection;
