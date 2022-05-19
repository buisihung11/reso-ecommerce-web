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
  Tabs,
  Typography,
} from '@mui/material';
import ProductGridSection from '../section/ProductGrid.section';
import useProducts from '@/hooks/product/useProducts';
import usePagination from '@/hooks/usePagination';
import { TStore } from '@/types/store';

interface StoreTabsProps {
  store: TStore;
}

export default function StoreTabs({ store }: StoreTabsProps) {
  const [value, setValue] = React.useState('1');

  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 6 },
  });

  const { data, isLoading, metadata, error } = useProducts({
    params: { page: page, size },
  });

  const totalPage = Math.ceil((metadata?.total ?? 1) / size);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box width="100%" typography={'body2'} paddingTop={'2rem'}>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        paddingBottom={'1rem'}
        marginBottom={{ xs: '1rem', md: 0 }}
        typography={'h5'}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          //scrollButtons
          allowScrollButtonsMobile
          aria-label="visible arrows tabs example"
        >
          <Tab label="Sản phẩm" value="1" />
          <Tab label="Bán chạy" value="2" />
          <Tab label="Giới thiệu" value="3" />
          <Tab label="Đánh giá" value="4" />
        </Tabs>
      </Box>
      <TabContext value={value}>
        <Box>
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
                    page={page}
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
          <TabPanel value="2">
            {data && (
              <>
                <ProductGridSection products={data.slice(8, 16)} />
              </>
            )}
            {isLoading && (
              <Container sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Container>
            )}
          </TabPanel>
          <TabPanel value="3">
            Reso chuyên cung cấp các sản phẩm tốt nhất trên thị trường với giá
            cả hợp lý, chính sách ưu đãi thường xuyên cho các khách hàng thân
            thiết
          </TabPanel>
          <TabPanel value="4">Đánh giá</TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
