import useProducts from '@/hooks/product/useProducts';
import { fCurrency } from '@/utils/formatNumber';
import { DeleteOutline } from '@mui/icons-material';
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Img } from 'react-image';
import { MHidden } from '../@material-extend';
import { ProductCarousel } from '../carousel';
import ProductQuantity from '../product-details/ProductQuantity';

interface Props {
  imgStyle?: any;
}

const useCartStyles = makeStyles((theme: Theme) => ({
  tableHeading: {
    ...theme.typography.caption,
    color: theme.palette.grey[400],
    textTransform: 'uppercase',
  },
  thumbnail: {
    width: '70px',
    height: '70px',
    [theme.breakpoints.up('md')]: {
      width: '100px',
      height: '100px',
    },
  },
}));

const CartContentSection = ({ imgStyle }: Props) => {
  const classes = useCartStyles();
  const { data: relatedProducts } = useProducts({
    params: { page: 1, size: 10 },
  });

  const cartItems = ['San pham 1', 'San pham 2'];

  const imagePlaceHolder = (title: string) => (
    <Box
      p={2}
      bgcolor="grey.100"
      width="100%"
      sx={{
        aspectRatio: '1 / 1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {title}
    </Box>
  );

  const emptyCart = (
    <Stack p={[4, 8]} spacing={4} alignItems="center">
      <Typography variant="h3">Giỏ hàng trống</Typography>
      <Box>
        <Button
          size="large"
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
        >
          Tiếp tục mua sắm
        </Button>
      </Box>
    </Stack>
  );

  return (
    <Container maxWidth="xl">
      <NextSeo title="Giỏ hàng của bạn" description="Giỏ hàng của bạn" />

      {cartItems.length === 0 && emptyCart}

      {cartItems.length !== 0 && (
        <Box>
          <Stack
            alignItems="flex-end"
            direction="row"
            pt={4}
            pb={4}
            justifyContent="space-between"
          >
            <Typography variant="h3" component="h1">
              Giỏ hàng của bạn
            </Typography>
            <Link href="/">
              <a>
                <Typography
                  variant="h6"
                  fontWeight="300"
                  sx={{ textDecoration: 'underline' }}
                >
                  Tiếp tục mua sắm
                </Typography>
              </a>
            </Link>
          </Stack>

          {/* HEADING */}
          <Grid container spacing={4} pb={2}>
            <Grid item xs={8} md={7}>
              <Typography className={classes.tableHeading}>Sản phẩm</Typography>
            </Grid>
            <MHidden width="mdDown">
              <Grid item md={3}>
                <Typography className={classes.tableHeading}>
                  Số lượng
                </Typography>
              </Grid>
            </MHidden>
            <Grid item xs={4} md={2} textAlign="right">
              <Typography className={classes.tableHeading}>Tổng</Typography>
            </Grid>
          </Grid>
          {/* END HEADING */}

          <Divider />

          {/* PRODUCT ITEMS */}
          <Stack py={4} spacing={[2, 4, 6]}>
            {[...new Array(3)].map((_, idx) => (
              <Box key={`cart-item-${idx}`}>
                <Grid container spacing={2}>
                  <Grid item xs={8} md={7}>
                    <Stack direction="row" spacing={[2, 4]}>
                      <Img
                        className={classes.thumbnail}
                        src={
                          'https://cdn.shopify.com/s/files/1/0551/7626/5784/products/mlouye-bo-ivy-emerald-1_73c3987e-5ec7-4e72-879a-2ba2e560648f_150x.jpg?v=1630363134'
                        }
                        loader={imagePlaceHolder('Tên sp')}
                        unloader={imagePlaceHolder('Tên sp')}
                      />
                      <Stack spacing={2}>
                        <Box>
                          <Typography noWrap variant="body1" mb={1}>
                            Áo thun T-shirt
                          </Typography>
                          <Typography variant="caption">
                            Màu sắc: Đen
                          </Typography>
                        </Box>
                        <MHidden width="mdUp">
                          <Stack direction="row">
                            <ProductQuantity />
                            <IconButton>
                              <DeleteOutline />
                            </IconButton>
                          </Stack>
                        </MHidden>
                      </Stack>
                    </Stack>
                  </Grid>

                  <MHidden width="mdDown">
                    <Grid item md={3}>
                      <Stack direction="row">
                        <ProductQuantity />
                        <IconButton>
                          <DeleteOutline />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </MHidden>

                  <Grid item xs={4} md={2} textAlign="right">
                    <Typography>{fCurrency(1000000)}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Stack>
          {/* END PRODUCT ITEMS */}
          <Divider />

          <Box
            width={['100%', '35rem']}
            ml="auto"
            pt={4}
            textAlign={['center', 'right']}
          >
            <Stack spacing={2}>
              <Box display="flex" justifyContent={['center', 'end']}>
                <Typography variant="h5" pr={2}>
                  Tổng cộng
                </Typography>
                <Typography variant="h5">{fCurrency(3000000)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption">
                  Thuế và phí vận chuyển sẽ được tính khi thanh toán.
                </Typography>
              </Box>
              <Box>
                <Link href="/checkout" passHref>
                  <a>
                    <Button size="large" fullWidth variant="contained">
                      THANH TOÁN
                    </Button>
                  </a>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}

      {relatedProducts && (
        <Box textAlign="left" pt={[8, 10]}>
          <Typography fontWeight="400" variant="h4" mb={4}>
            Sản phẩm nổi bật
          </Typography>
          <ProductCarousel
            CardProps={{
              imgStyle,
            }}
            products={relatedProducts}
          />
        </Box>
      )}
    </Container>
  );
};

export default CartContentSection;