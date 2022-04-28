import { TStore } from '@/types/store';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Container,
  Grid,
  Box,
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  Icon,
  Stack,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import { TSetting } from './Section';

interface StoreGridProps {
  settings?: TSetting;
  stores: TStore[];
}

const MOCK_SHOPS = {
  store_id: 1,
  store_name: 'Reso Store',
  rate: 4.5,
  email: 'resostore@reso.vn',
  phone: '0678333777',
  icon_image: 'https://unibean.net/_next/static/media/huyhieu.ad29107d.png',
  banner_image:
    'https://cdn.shopify.com/s/files/1/1915/7471/files/Cover-good_edb89fc7-35e2-449c-9a38-7e363a44b595_2048x.jpg?v=1516989371',
};

const StoreGridSection = ({ stores }: StoreGridProps) => {
  return (
    <Grid container spacing={[2, 8]}>
      {stores?.map((store) => (
        <Grid key={store.id} item xs={12} md={6}>
          <Card sx={{ maxWidth: 800 }} elevation={3}>
            <Box
              height={{ xs: 200, md: 300 }}
              sx={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage:
                  'url(https://avatars.mds.yandex.net/get-zen_doc/1881616/pub_5d3922bdce44a000aca3c722_5d3923af78125e00acc0414f/scale_1200)',
              }}
            >
              <CardActionArea
                href={`/stores/${store.id}`}
                sx={{ height: 'inherit' }}
              >
                <CardContent sx={{ color: 'white' }}>
                  <Typography gutterBottom variant="h3" component="div">
                    {store.name}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={4.8}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <Box display="flex">
                    <EmailIcon />
                    <Typography
                      variant="body2"
                      color="grey.400"
                      paddingLeft={'1rem'}
                    >
                      {'resostoreoffical@reso.vn'}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <PhoneIcon />
                    <Typography
                      variant="body2"
                      color="grey.400"
                      paddingLeft={'1rem'}
                    >
                      {MOCK_SHOPS.phone}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
              <Box
                display="block"
                position="absolute"
                zIndex={1}
                bottom={15}
                right={50}
                marginRight="0"
                borderRadius={30}
                sx={{
                  height: 80,
                  width: 80,
                  backgroundColor: 'white',
                }}
              >
                <Box
                  sx={{
                    bottom: 0,
                    ':hover': { bottom: 20 },
                    transition: 'bottom 0.5s ease 0s',
                  }}
                  position="relative"
                >
                  <img
                    src={MOCK_SHOPS.icon_image}
                    alt={store.name}
                    loading="lazy"
                  />
                </Box>
              </Box>
            </Box>

            <CardActions>
              <Button
                size="medium"
                color="primary"
                href={`/stores/${store.id}`}
              >
                Xem
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StoreGridSection;
