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
const StoreGridSection = ({ stores }: StoreGridProps) => {
  return (
    <Grid container spacing={[2, 8]}>
      {stores ? (
        stores.map((store, index) => (
          <Grid key={index} item xs={12} md={6}>
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
                <CardActionArea href="/stores/1" sx={{ height: 'inherit' }}>
                  <CardContent sx={{ color: 'white' }}>
                    <Typography gutterBottom variant="h3" component="div">
                      {store.store_name}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={store.rate}
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
                        {store.email}
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <PhoneIcon />
                      <Typography
                        variant="body2"
                        color="grey.400"
                        paddingLeft={'1rem'}
                      >
                        {store.phone}
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
                      src={store.icon_image}
                      alt={store.store_name}
                      loading="lazy"
                    />
                  </Box>
                </Box>
              </Box>

              <CardActions>
                <Button size="medium" color="primary" href="/stores/1">
                  Xem
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Container sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      )}
    </Grid>
  );
};

export default StoreGridSection;
