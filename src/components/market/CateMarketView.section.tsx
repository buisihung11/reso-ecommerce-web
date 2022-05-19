import Empty from '@/components/Empty';
import Filter from '@/components/filter';
import useProducts from '@/hooks/product/useProducts';
import useCategories from '@/hooks/category/useCategories';
import usePagination from '@/hooks/usePagination';
import { TProduct, TProductQuery } from '@/types/product';
import { ErrorResponse } from '@/types/request';
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CateProductGridSection from '../section/CateProductGrid.section';
import { useForm, useWatch } from 'react-hook-form';
import useCategory from '@/hooks/category/useCategory';

const CateMarketView = () => {
  //States
  const router = useRouter();
  const { categoryId } = router.query;
  const { data: cate } = useCategory({ id: Number(categoryId) });
  const filterForm = useForm<TProductQuery>({
    defaultValues: {
      'cat-id': categoryId?.toString(),
      price: '',
      sort: '',
    },
  });
  const filters = useWatch({ control: filterForm.control });
  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 12 },
  });
  //API
  const { data, isLoading, metadata, error } = useProducts({
    params: { ...filters, page: page, size },
  });
  //
  const totalPage = Math.ceil((metadata?.total ?? 1) / size);

  return (
    <Container maxWidth="xl">
      <Card>
        <Stack direction="row" justifyContent={'flex-end'}>
          {(isLoading || router.isFallback) && <CircularProgress size={6} />}
          <Typography color="grey.400">
            {data?.length} / {metadata?.total} sản phẩm
          </Typography>
        </Stack>

        {data && cate && (
          <CateProductGridSection products={data} category={cate} />
        )}
        <Box py={4} textAlign="center" display="flex" justifyContent="center">
          <Pagination
            page={page}
            onChange={(_: any, page: number) => onPageChange(page)}
            count={totalPage}
            shape="rounded"
          />
        </Box>
      </Card>
    </Container>
  );
};

export default CateMarketView;
