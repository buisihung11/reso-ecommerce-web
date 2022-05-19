import Empty from '@/components/Empty';
import Filter from '@/components/filter';
import ProductGridSection from '@/components/section/ProductGrid.section';
import useProducts from '@/hooks/product/useProducts';

import usePagination from '@/hooks/usePagination';
import { TProductQuery } from '@/types/product';
import { ErrorResponse } from '@/types/request';
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useCategory from '@/hooks/category/useCategory';

interface Props {}

const ProductListContentSection = (props: Props) => {
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
  const { data, isLoading, metadata, error } = useProducts({
    params: { ...filters, page: page, size },
  });
  const { data: categoryFiltered } = useCategory({ id: Number(queryCate) });
  const currentfilteredCate = filters['cat-id'];
  //
  const totalPage = Math.ceil((metadata?.total ?? 1) / size);
  const [previousCate, setPreviousCate] = useState('');
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

  useEffect(() => {
    if (currentfilteredCate) setPreviousCate(currentfilteredCate);
    filterForm.setValue('cat-id', queryCate?.toString());
  }, [queryCate]);
  //console.log('current: ' + currentfilteredCate + ', previous: ' + previousCate,);
  return (
    <Box px={[4, 12]} pt={{ xs: 6, md: 12 }} pb={10}>
      <NextSeo title={'Tất cả sản phẩm'} description="Tất cả sản phẩm" />
      <Typography variant="h1" mb={[4, 6]}>
        Tất cả sản phẩm
      </Typography>
      {error && (
        <Stack>
          <Typography variant="h4">
            {(error as ErrorResponse).message}
          </Typography>
          <Empty />
        </Stack>
      )}
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
        </Stack>

        <Stack direction="row" spacing={2}>
          {(isLoading || router.isFallback) && <CircularProgress size={6} />}
          <Typography color="grey.400">
            {data?.length} / {metadata?.total} sản phẩm
          </Typography>
        </Stack>
      </Stack>
      {data && (
        <>
          <ProductGridSection products={data} />
          <Box py={4} textAlign="center" display="flex" justifyContent="center">
            <Pagination
              page={page}
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

export default ProductListContentSection;
