import Filter from '@/components/filter';
import useStores from '@/hooks/store/useStores';

import usePagination from '@/hooks/usePagination';
import { TProductQuery } from '@/types/product';

import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  Button,
  Container,
} from '@mui/material';

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import StoreGridSection from '../StoreListGrid.section';

interface Props {}

const StoreListContentSection = (props: Props) => {
  //States
  const router = useRouter();
  //const queryCate = router.query.cateid;

  // const filterForm = useForm<TProductQuery>({
  //   defaultValues: {
  //     'cat-id': queryCate?.toString(),
  //     price: '',
  //     sort: '',
  //   },
  // });
  // const [openFilter, setOpenFilter] = useState(false);

  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 4 },
  });
  //API
  const { metadata, data, isLoading } = useStores({
    params: { page: page, size },
  });

  const totalPage = Math.ceil((metadata?.total ?? 1) / size);

  // const handleResetFilter = useCallback(() => {
  //   filterForm.reset({ 'cat-id': '', price: '', sort: '' });
  //   setOpenFilter(false);
  // }, [filterForm]);

  // const handleOpenFilter = useCallback(() => {
  //   setOpenFilter(true);
  // }, []);

  // const handleCloseFilter = useCallback(() => {
  //   setOpenFilter(false);
  // }, []);

  return (
    <Box px={[4, 12]} pt={{ xs: 6, md: 12 }} pb={10}>
      <NextSeo title={'Tất cả sản phẩm'} description="Tất cả cửa hàng" />
      <Typography variant="h1" mb={[4, 6]}>
        Tất cả cửa hàng
      </Typography>
      {/* {error && (
        <Stack>
          <Typography variant="h4">
            {(error as ErrorResponse).message}
          </Typography>
          <Empty />
        </Stack>
      )} */}
      <Stack
        direction="row"
        mb={4}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <Stack direction="row">
          <Filter
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={handleResetFilter}
            control={filterForm.control}
          />
          {currentfilteredCate && (
            <Button
              disableRipple
              color="success"
              variant="outlined"
              onClick={() => {
                if (queryCate) setPreviousCate(queryCate.toString());
                filterForm.setValue('cat-id', '');
              }}
              endIcon={<ClearIcon />}
            >
              {categoryFiltered?.cate_name}
            </Button>
          )}
        </Stack> */}

        <Stack direction="row" spacing={2}>
          <Typography color="grey.400">
            {data?.length} / {metadata?.total} cửa hàng
          </Typography>
        </Stack>
      </Stack>
      {isLoading && (
        <Container sx={{ width: '100%', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </Container>
      )}
      {data && (
        <>
          <StoreGridSection stores={data} />
          <Box py={4} textAlign="center" display="flex" justifyContent="center">
            <Pagination
              onChange={(_: any, page: number) => onPageChange(page)}
              count={totalPage}
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default StoreListContentSection;
