import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import {
  Box,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import React from 'react';
import StoreTabs from '../store-detail/StoreTabs';
import StoreCatesList from '../store-detail/StoreCatesList';

const MOCK_SHOP = {
  store_id: 1,
  store_name: 'Reso Store',
  rate: 4.5,
  email: 'resostore@reso.vn',
  phone: '0678333777',
  icon_image: 'https://demo-sale.reso.vn/static/reso_logo.png',
  banner_image:
    'https://avatars.mds.yandex.net/get-zen_doc/1881616/pub_5d3922bdce44a000aca3c722_5d3923af78125e00acc0414f/scale_1200',
};

const StoreViewSection = () => {
  return (
    <Container maxWidth="xl" sx={{ py: [2, 6] }}>
      {/* Header */}
      <Stack display="flex" paddingBottom="2rem">
        <Box
          width={'100%'}
          height="500px"
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage:
              'url(https://avatars.mds.yandex.net/get-zen_doc/1881616/pub_5d3922bdce44a000aca3c722_5d3923af78125e00acc0414f/scale_1200)',
          }}
        />
        <Box
          paddingLeft="3rem"
          paddingBottom={'1rem'}
          marginBottom={'1rem'}
          color="white"
          flexWrap="wrap"
          marginTop="-11rem"
          sx={{ backgroundColor: '#22222280' }}
          display="flex"
          justifyContent="space-between"
        >
          <Box flexDirection={'row'} display="flex">
            <Stack
              paddingRight="3rem"
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
              <Typography gutterBottom variant="h3">
                {MOCK_SHOP.store_name}
              </Typography>

              <Box display="flex">
                <EmailIcon />
                <Typography
                  variant="body2"
                  color="grey.400"
                  paddingLeft={'1rem'}
                >
                  {MOCK_SHOP.email}
                </Typography>
              </Box>
              <Box display="flex">
                <PhoneIcon />
                <Typography
                  variant="body2"
                  color="grey.400"
                  paddingLeft={'1rem'}
                >
                  {MOCK_SHOP.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Stack justifyContent={'space-between'} alignItems="center">
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
          </Stack>
        </Box>
      </Stack>
      {/* Body */}
      <Box display="flex">
        <Box width="30%">
          <StoreCatesList />
        </Box>
        <StoreTabs />
      </Box>
    </Container>
  );
};

export default StoreViewSection;
