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

interface Props {}

const CollectionContentSection = (props: Props) => {
  const router = useRouter();
  const { collectionId } = router.query;
  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 20 },
  });

  const { data, status, isFetching, metadata, collectionInfo } = useCollection({
    id: Number(collectionId),
    params: { page: page - 1, size },
  });

  const totalPage = Math.ceil((metadata?.total ?? 1) / size);
  console.log(`totalPage`, metadata?.total, size, totalPage);
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // if (status === 'loading') {
  //   return (
  //     <Box minHeight="40vh" textAlign="center">
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  if (!data) {
    return (
      <Typography variant="h3">
        Không tìm thấy bộ sưu tập với id {collectionId}
      </Typography>
    );
  }

  return (
    <Container px={[4, 12]} maxW="xl" pt={12} pb={100}>
      <NextSeo
        title={collectionInfo?.name ?? 'Bộ sưu tập'}
        description={collectionInfo?.name}
        openGraph={{
          type: 'website',
          title: collectionInfo?.name,
          description: collectionInfo?.name,
        }}
      />
      <Typography variant="h1" mb={[4, 6]}>
        {collectionInfo?.name ?? 'Bộ sưu tập'}
      </Typography>
      <Stack direction="row" mb={4} justifyContent="space-between">
        <Filter
          isOpenFilter={openFilter}
          onOpenFilter={handleOpenFilter}
          onCloseFilter={handleCloseFilter}
        />
        <Stack direction="row" spacing={2}>
          {isFetching && <CircularProgress isIndeterminate size={6} />}
          <Typography color="grey.400">
            {data?.length} / {metadata?.total} sản phẩm
          </Typography>
        </Stack>
      </Stack>
      <ProductGridSection products={data} />
      <Box py={4} textAlign="center" display="flex" justifyContent="center">
        <Pagination
          onChange={(_: never, page: number) => onPageChange(page)}
          count={totalPage}
          shape="rounded"
        />
      </Box>
    </Container>
  );
};

export default CollectionContentSection;
