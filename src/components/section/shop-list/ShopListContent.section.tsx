import Filter from '@/components/filter';

import usePagination from '@/hooks/usePagination';
import { TProductQuery } from '@/types/product';

import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  Button,
} from '@mui/material';

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import ShopGridSection from '../StoreListGrid.section';

interface Props {}

const StoreListContentSection = (props: Props) => {
  //States
  const router = useRouter();
  const queryCate = router.query.cateid;

  const filterForm = useForm<TProductQuery>({
    defaultValues: {
      'cat-id': queryCate?.toString(),
      price: '',
      sort: '',
    },
  });
  const [openFilter, setOpenFilter] = useState(false);
  const filters = useWatch({ control: filterForm.control });
  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 12 },
  });
  //API
  const MOCK_SHOPS = [...Array(6)].map((_, index) => {
    return {
      store_id: index,
      store_name: 'Reso Store',
      rate: 4.5,
      email: 'resostore@reso.vn',
      phone: '0678333777',
      icon_image: 'https://unibean.net/_next/static/media/huyhieu.ad29107d.png',
      banner_image:
        'https://cdn.shopify.com/s/files/1/1915/7471/files/Cover-good_edb89fc7-35e2-449c-9a38-7e363a44b595_2048x.jpg?v=1516989371',
    };
  });

  //const totalPage = Math.ceil((metadata?.total ?? 1) / size);

  const handleResetFilter = useCallback(() => {
    filterForm.reset({ 'cat-id': '', price: '', sort: '' });
    setOpenFilter(false);
  }, [filterForm]);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

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
        <Stack direction="row">
          <Filter
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={handleResetFilter}
            control={filterForm.control}
          />
          {/* {currentfilteredCate && (
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
          )} */}
        </Stack>

        <Stack direction="row" spacing={2}>
          {/* {(isLoading || router.isFallback) && <CircularProgress size={6} />} */}
          <Typography color="grey.400">
            {/* {data?.length} / {metadata?.total} sản phẩm */}
            {6} / {12} cửa hàng
          </Typography>
        </Stack>
      </Stack>
      {/* {data && ( */}
      <>
        <ShopGridSection stores={MOCK_SHOPS} />
        <Box py={4} textAlign="center" display="flex" justifyContent="center">
          <Pagination
            onChange={(_: any, page: number) => onPageChange(page)}
            count={2}
            shape="rounded"
          />
        </Box>
      </>
      {/* )} */}
    </Box>
  );
};

export default StoreListContentSection;
