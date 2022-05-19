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
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Rating,
  Skeleton,
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
          <Skeleton variant="rectangular" width={'100%'} height={'40vh'} />
          <Skeleton variant="text" height={'10vh'} />
          <Box display="flex">
            <Skeleton variant="rectangular" width={'25%'} height={400} />
            <Box width={'5%'} height={400}></Box>
            <Skeleton variant="rectangular" width={'70%'} height={400} />
          </Box>
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
                {error.message ?? 'Không tìm thấy cửa hàng'}
              </Typography>
              <Empty />
            </Stack>
          )}
          {!error && store ? (
            <>
              <Box flexDirection={{ xs: 'column', md: 'row' }} display="flex">
                <Box
                  width={{ md: '30%' }}
                  display={{ xs: 'none', md: 'block' }}
                >
                  <StoreCatesList store={store} />
                </Box>
                <Box
                  display="flex"
                  alignItems={'center'}
                  width={{ md: '100%' }}
                  flexDirection={'column'}
                >
                  <Card>
                    <Box
                      height={{ md: '20vh' }}
                      width={{ xs: '100vw', md: '70vw' }}
                      flexWrap="wrap"
                      flexDirection={'row'}
                      display="flex"
                      alignItems={'center'}
                      justifyContent={{ xs: 'center', md: 'space-between' }}
                      marginX="2rem"
                    >
                      <Stack alignItems="center" flexDirection={'row'}>
                        <Box
                          paddingRight={{ md: '3rem' }}
                          paddingBottom={'1rem'}
                          height={80}
                          width={80}
                          sx={{
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundImage: `url(${MOCK_SHOP.icon_image})`,
                          }}
                        />
                        <Box marginBottom={'1rem'}>
                          <Typography
                            gutterBottom
                            variant="h3"
                            textAlign={{ xs: 'center', md: 'left' }}
                          >
                            {store.name}
                          </Typography>
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
                        </Box>
                      </Stack>

                      <Box
                        paddingLeft={{ xs: 0, md: '1rem' }}
                        display="block"
                        justifyContent={{ xs: 'center', md: 'flex-start' }}
                      >
                        <Box display="flex">
                          <EmailOutlined />
                          <Typography variant="body2" paddingLeft={'1rem'}>
                            {MOCK_SHOP.email}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <PhoneOutlined />
                          <Typography variant="body2" paddingLeft={'1rem'}>
                            {MOCK_SHOP.phone}
                          </Typography>
                        </Box>
                        <Stack paddingTop={'1rem'}>
                          <SocialMedias />
                        </Stack>
                      </Box>
                    </Box>
                  </Card>
                  {/* Body */}

                  <StoreTabs store={store} />
                </Box>

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
