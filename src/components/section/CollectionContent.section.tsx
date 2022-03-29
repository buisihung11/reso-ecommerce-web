import Filter from '@/components/filter';
import ProductGridSection from '@/components/section/ProductGrid.section';
import useCollection from '@/hooks/collection/useCollection';
import usePagination from '@/hooks/usePagination';
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Empty from '../Empty';

interface Props {}

const CollectionContentSection = (props: Props) => {
  const router = useRouter();
  const { collectionId } = router.query;
  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 20 },
  });

  const { data, status, isLoading, metadata, collectionInfo, error } =
    useCollection({
      id: Number(collectionId),
      params: { page: page - 1, size },
    });

  const totalPage = Math.ceil((metadata?.total ?? 1) / size);
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Box maxWidth="xl" px={[4, 12]} pt={{ xs: 6, md: 12 }} pb={10}>
      {/* <NextSeo
        title={collectionInfo?.name ?? 'Bộ sưu tập'}
        description={collectionInfo?.name}
        openGraph={{
          type: 'website',
          title: collectionInfo?.name,
          description: collectionInfo?.name,
        }}
      /> */}

      <Typography variant="h1" mb={[4, 6]}>
        {collectionInfo?.name ?? 'Bộ sưu tập'}
      </Typography>
      {error && (
        <Stack>
          <Typography variant="h4">{error.message}</Typography>
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
          <ProductGridSection products={data} />
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

export default CollectionContentSection;
