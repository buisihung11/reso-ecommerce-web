import Filter from '@/components/filter';
import ProductGridSection from '@/components/section/ProductGrid.section';
import useCollection from '@/hooks/collection/useCollection';
import usePagination from '@/hooks/usePagination';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Empty from '@/components/Empty';
import useCombos from '@/hooks/combos/useCombos';
import Link from '@/components/Link';
import ProductCard from '@/components/product-card';

interface Props {}

const ComboListSection = (props: Props) => {
  const router = useRouter();
  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 20 },
  });

  const { data, status, isLoading, metadata, error } = useCombos({
    params: { page: page - 1, size },
  });

  const totalPage = Math.ceil((metadata?.total ?? 1) / size);

  return (
    <Box maxWidth="xl" px={[4, 12]} pt={{ xs: 6, md: 12 }} pb={10}>
      <NextSeo
        title={'Danh sách combo'}
        description={'Tập hợp các khuyến mãi hot nhất.'}
        openGraph={{
          type: 'website',
          title: 'Tập hợp các khuyến mãi hot nhất.',
          description: 'Tập hợp các khuyến mãi hot nhất.',
        }}
      />
      <Typography variant="h1" mb={[4, 6]}>
        Danh sách combo
      </Typography>
      {error && (
        <Stack>
          <Typography variant="h4">{(error as any).message}</Typography>
          <Empty />
        </Stack>
      )}
      {data && (
        <>
          <Stack direction="row" mb={4} justifyContent="flex-end">
            <Stack direction="row" spacing={2}>
              {(isLoading || router.isFallback) && (
                <CircularProgress size={6} />
              )}
              <Typography color="grey.400">
                {data?.length} / {metadata?.total} sản phẩm
              </Typography>
            </Stack>
          </Stack>
          <Grid container spacing={[2, 4]}>
            {data?.map((p) => (
              <Grid key={`combo-${p.product_id}`} item xs={6} sm={4} md={3}>
                <Link
                  href={`/combos/${p.product_id}`}
                  aria-label={`View ${p.product_name} product page`}
                >
                  <ProductCard product={p} navigate={false} />
                </Link>
              </Grid>
            ))}
          </Grid>
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

export default ComboListSection;
