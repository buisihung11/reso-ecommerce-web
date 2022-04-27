import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import ProductGridSection from '../section/ProductGrid.section';
import useProducts from '@/hooks/product/useProducts';
import usePagination from '@/hooks/usePagination';

export default function StoreTabs() {
  const [value, setValue] = React.useState('1');

  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 12 },
  });

  const { data, isLoading, metadata, error } = useProducts({
    params: { page: page, size },
  });

  const totalPage = Math.ceil((metadata?.total ?? 1) / size);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          paddingBottom={'1rem'}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Sản phẩm" value="1" />
            <Tab label="Danh mục" value="2" />
            <Tab label="Giới thiệu" value="3" />
            <Tab label="Đánh giá" value="4" />
          </TabList>
        </Box>
        <Box minHeight={1000}>
          <TabPanel value="1">
            {data && (
              <>
                <ProductGridSection products={data} />
                <Box
                  py={4}
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                >
                  <Pagination
                    onChange={(_: any, page: number) => onPageChange(page)}
                    count={totalPage}
                    shape="rounded"
                  />
                </Box>
              </>
            )}
            {isLoading && (
              <Container sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Container>
            )}
          </TabPanel>
          <TabPanel value="2">Bán chạy</TabPanel>
          <TabPanel value="3">Giới thiệu</TabPanel>
          <TabPanel value="4">Đánh giá</TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
