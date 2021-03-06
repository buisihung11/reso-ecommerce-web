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
import useMenu from '@/hooks/menu/useMenu';
import useMenuProducts from '@/hooks/menu/useMenuProducts';
import useStoreCurMenu from '@/hooks/store/useStoreCurMenu';
import { TProduct } from '@/types/product';

interface StoreTabsProps {
  store: TStore;
}

export default function StoreTabs({ store }: StoreTabsProps) {
  const [value, setValue] = React.useState('1');

  //API
  const { page, size, onPageChange } = usePagination({
    initValues: { page: 1, size: 10 },
  });

  const { data: storemenu } = useStoreCurMenu({ id: store.id });
  const { data: menuproducts } = useMenuProducts({
    id: storemenu?.menu_id,
    params: { page: page, size },
  });
  const { data: products, isLoading, metadata, error } = useProducts({});
  //
  var productsinmenu: TProduct[] = [];

  const getProductInfos = menuproducts?.map((pro) => {
    let product = products?.find((p) => p.product_id === pro.product_id);
    if (product) productsinmenu.push(product);
  });
  console.log(menuproducts);
  console.log(menuproducts);

  console.log(productsinmenu);

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
          <Tab label="S???n ph???m" value="1" />
          <Tab label="B??n ch???y" value="2" />
          <Tab label="Gi???i thi???u" value="3" />
          <Tab label="????nh gi??" value="4" />
        </Tabs>
      </Box>
      <TabContext value={value}>
        <Box>
          <TabPanel value="1">
            {products && (
              <Box paddingTop="5rem">
                <ProductGridSection products={productsinmenu} />
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
              </Box>
            )}
            {isLoading && (
              <Container sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Container>
            )}
          </TabPanel>
          <TabPanel value="2">
            {products && (
              <Box paddingTop="5rem">
                <ProductGridSection products={productsinmenu.slice(0, 6)} />
              </Box>
            )}
            {isLoading && (
              <Container sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Container>
            )}
          </TabPanel>
          <TabPanel value="3">
            Reso chuy??n cung c???p c??c s???n ph???m t???t nh???t tr??n th??? tr?????ng v???i gi??
            c??? h???p l??, ch??nh s??ch ??u ????i th?????ng xuy??n cho c??c kh??ch h??ng th??n
            thi???t
          </TabPanel>
          <TabPanel value="4">????nh gi??</TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
