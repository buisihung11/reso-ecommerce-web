import useProducts from '@/hooks/product/useProducts';
import useDeleteItem from '@/hooks/cart/useDeleteItem';
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
import Link from '@/components/Link';
import { Img } from 'react-image';
import { MHidden } from '../@material-extend';
import { ProductCarousel } from '../carousel';
import ProductQuantity from '../product-details/ProductQuantity';
import useCart, { CartItem } from '@/hooks/cart/useCart';
import ProductThumbnail from '../product-card/product-thumbnail';
import { LoadingButton } from '@mui/lab';
import useUpdateItem from '@/hooks/cart/useUpdateItem';

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
  const { cart, processing, error } = useCart();
  const { mutate: deleteCartItem } = useDeleteItem();
  const { mutate: updateCartItem } = useUpdateItem();

  const { data: relatedProducts } = useProducts({
    params: { page: 1, size: 10 },
  });

  const cartItems = cart.items;

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

  const deleteBtn = (cartItem: CartItem) => {
    return (
      <IconButton
        onClick={() => {
          deleteCartItem({
            productId: cartItem.product_id,
            productVariantId: cartItem.selectedVariant?.id,
          });
        }}
      >
        <DeleteOutline />
      </IconButton>
    );
  };

  const quantityInputBtn = (cartItem: CartItem) => {
    return (
      <ProductQuantity
        onChange={(quantity) => {
          updateCartItem({
            productId: cartItem.product_id,
            productVariantId: cartItem.selectedVariant?.id,
            quantity,
          });
        }}
        defaultValue={cartItem.quantity}
      />
    );
  };

  return (
    <Container maxWidth="lg">
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
              <Typography
                variant="h6"
                fontWeight="300"
                sx={{ textDecoration: 'underline' }}
              >
                Tiếp tục mua sắm
              </Typography>
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
            {cartItems.map((cartItem, idx) => (
              <Box key={`cart-item-${idx}`}>
                <Grid container spacing={2}>
                  <Grid item xs={8} md={7}>
                    <Stack direction="row" spacing={[2, 4]}>
                      <ProductThumbnail
                        title={cartItem.product_name}
                        ImgProps={{
                          className: classes.thumbnail,
                        }}
                        UnloaderProps={{
                          width: '75px',
                          height: '75px',
                        }}
                        src={cartItem.pic_url}
                      />
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="body1" mb={1}>
                            {cartItem.product_name}
                          </Typography>
                          <Typography variant="caption">
                            {cartItem.selectedVariant?.options.map((opt) => (
                              <>
                                {opt.displayName}: {opt.value}
                              </>
                            ))}
                          </Typography>
                        </Box>
                        <MHidden width="mdUp">
                          <Stack direction="row">
                            {quantityInputBtn(cartItem)}
                            {deleteBtn(cartItem)}
                          </Stack>
                        </MHidden>
                      </Stack>
                    </Stack>
                  </Grid>

                  <MHidden width="mdDown">
                    <Grid item md={3}>
                      <Stack direction="row">
                        {quantityInputBtn(cartItem)}
                        {deleteBtn(cartItem)}
                      </Stack>
                    </Grid>
                  </MHidden>

                  <Grid item xs={4} md={2} textAlign="right">
                    <Typography>{fCurrency(cartItem.price)}</Typography>
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
                <Typography variant="h5">
                  {fCurrency(cart.finalAmount)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption">
                  Thuế và phí vận chuyển sẽ được tính khi thanh toán.
                </Typography>
                {error && (
                  <Typography sx={{ color: 'error.main' }} variant="caption">
                    {(error as Error).message}
                  </Typography>
                )}
              </Box>
              <Box>
                <Link href="/checkout" passHref>
                  <LoadingButton
                    loading={processing}
                    size="large"
                    fullWidth
                    variant="contained"
                  >
                    THANH TOÁN
                  </LoadingButton>
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
