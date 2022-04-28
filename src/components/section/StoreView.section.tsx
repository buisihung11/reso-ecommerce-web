import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  EmailOutlined,
  Facebook,
  Instagram,
  PhoneOutlined,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import {
  Box,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import React from 'react';
import StoreTabs from '../store-detail/StoreTabs';
import StoreCatesList from '../store-detail/StoreCatesList';
import { useRouter } from 'next/router';
import useStore from '@/hooks/store/useStore';
import Empty from '../Empty';

//API

const MOCK_SHOP = {
  store_id: 1,
  store_name: 'Reso Store',
  rate: 4.8,
  email: 'resostore@reso.vn',
  phone: '0678333777',
  icon_image: 'https://demo-sale.reso.vn/static/reso_logo.png',
  banner_image:
    'https://avatars.mds.yandex.net/get-zen_doc/1881616/pub_5d3922bdce44a000aca3c722_5d3923af78125e00acc0414f/scale_1200',
};

const StoreViewSection = () => {
  const router = useRouter();
  const { storeId } = router.query;
  const { data: store, isLoading, error } = useStore({ id: Number(storeId) });

  const SocialMedias = () => (
    <Box>
      <IconButton
        aria-label="Facebook"
        sx={{ color: '#1B4F9B' }}
        href="https://facebook.com/"
      >
        <Facebook />
      </IconButton>
      <IconButton
        aria-label="Twitter"
        sx={{ color: '#00ADEF' }}
        href="https://twitter.com/"
      >
        <Twitter />
      </IconButton>
      <IconButton
        aria-label="Youtube"
        sx={{ color: 'red' }}
        href="https://youtube.com/"
      >
        <YouTube />
      </IconButton>
      <IconButton
        aria-label="Instagram"
        sx={{ color: 'pink' }}
        href="https://instagram.com/"
      >
        <Instagram />
      </IconButton>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: [2, 6] }}>
      {/* Header */}
      {isLoading || router.isFallback ? (
        <Container>
          <LinearProgress />
        </Container>
      ) : (
        <>
          {error && (
            <Stack
              maxWidth="md"
              textAlign="center"
              mx="auto"
              alignItems="center"
            >
              <Typography variant="h4">
                {error.message ?? 'Không tìm thấy sản phẩm'}
              </Typography>
              <Empty />
            </Stack>
          )}
          {!error && store ? (
            <>
              <Stack display="flex" paddingBottom="2rem">
                <Box
                  width={'100%'}
                  height={{ xs: 700, md: 500 }}
                  sx={{
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage:
                      'url(https://avatars.mds.yandex.net/get-zen_doc/1881616/pub_5d3922bdce44a000aca3c722_5d3923af78125e00acc0414f/scale_1200)',
                  }}
                />
                <Box
                  paddingLeft={{ md: '3rem' }}
                  marginBottom={'1rem'}
                  color="white"
                  flexWrap="wrap"
                  marginTop={{ xs: '-21.5rem', md: '-10rem' }}
                  sx={{ backgroundColor: '#22222295' }}
                  display="flex"
                  justifyContent={{ xs: 'center', md: 'space-between' }}
                >
                  <Box
                    flexDirection={{ xs: 'column', md: 'row' }}
                    display="flex"
                  >
                    <Stack
                      paddingRight={{ md: '3rem' }}
                      paddingBottom={'1rem'}
                      justifyContent="space-between"
                      alignItems="center"
                      height="10rem"
                    >
                      <Box
                        height={80}
                        width={80}
                        sx={{
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundImage: `url(${MOCK_SHOP.icon_image})`,
                        }}
                      />{' '}
                      <Box display="flex">
                        <Rating
                          name="read-only"
                          value={MOCK_SHOP.rate}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography>{MOCK_SHOP.rate}</Typography>
                      </Box>
                    </Stack>

                    <Box marginBottom={'1rem'}>
                      <Typography
                        gutterBottom
                        variant="h3"
                        textAlign={{ xs: 'center', md: 'left' }}
                      >
                        {store.name}
                      </Typography>
                      <Box
                        paddingLeft={{ xs: 0, md: '1rem' }}
                        display="block"
                        justifyContent={{ xs: 'center', md: 'flex-start' }}
                      >
                        <Box display="flex">
                          <EmailOutlined />
                          <Typography
                            variant="body2"
                            color="grey.400"
                            paddingLeft={'1rem'}
                          >
                            {MOCK_SHOP.email}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <PhoneOutlined />
                          <Typography
                            variant="body2"
                            color="grey.400"
                            paddingLeft={'1rem'}
                          >
                            {MOCK_SHOP.phone}
                          </Typography>
                        </Box>
                      </Box>

                      <Stack
                        paddingTop={'1rem'}
                        display={{ xs: 'flex', md: 'none' }}
                      >
                        <SocialMedias />
                      </Stack>
                    </Box>
                  </Box>
                  <Stack display={{ xs: 'none', md: 'flex' }}>
                    <SocialMedias />
                  </Stack>
                </Box>
              </Stack>
              {/* Body */}
              <Box flexDirection={{ xs: 'column', md: 'row' }} display="flex">
                <Box
                  width={{ md: '30%' }}
                  display={{ xs: 'none', md: 'block' }}
                >
                  <StoreCatesList store={store} />
                </Box>

                <StoreTabs store={store} />
                {/* Mobile cate section */}
                <Box
                  width={{ xs: '100%', xl: '30%' }}
                  display={{ xs: 'block', md: 'none' }}
                >
                  <StoreCatesList store={store} />
                </Box>
              </Box>
            </>
          ) : (
            <Typography>Không tìm thấy cửa hàng</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default StoreViewSection;
