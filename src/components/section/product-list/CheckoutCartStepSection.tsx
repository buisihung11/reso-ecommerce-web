import useProducts from '@/hooks/product/useProducts';
import useDeleteItem from '@/hooks/cart/useDeleteItem';
import { fCurrency, fNumber } from '@/utils/formatNumber';
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
import useCart from '@/hooks/cart/useCart';
import { LoadingButton } from '@mui/lab';
import useUpdateItem from '@/hooks/cart/useUpdateItem';
import { CartItem } from '@/types/cart';
import ProductQuantity from '@/components/product-details/ProductQuantity';
import { MHidden } from '@/components/@material-extend';
import { ProductCarousel } from '@/components/carousel';
import ProductThumbnail from '@/components/product-card/product-thumbnail';
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

const CheckoutCartSection = ({ imgStyle }: Props) => {
  const classes = useCartStyles();
  const { cart, processing, error, getCartItemPrice } = useCart();
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
        <Link href="/">
          <Button
            size="large"
            variant="contained"
            sx={{ textTransform: 'uppercase' }}
          >
            Tiếp tục mua sắm
          </Button>
        </Link>
      </Box>
    </Stack>
  );

  const deleteBtn = (cartItem: CartItem) => {
    return (
      <IconButton
        onClick={() => {
          deleteCartItem({
            productId: cartItem.product_id,
            productVariantId: cartItem.selectedVariant?.product_id,
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
            productVariantId: cartItem.selectedVariant?.product_id,
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
            <Typography fontWeight={700}>Giỏ hàng của bạn</Typography>
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
            {cartItems.map((cartItem, idx) => {
              const cartItemPrice = getCartItemPrice(
                cartItem.selectedVariant
                  ? cartItem.selectedVariant.product_id
                  : cartItem.product_id,
              );
              return (
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
                            {cartItem.selectedVariant?.options?.map((opt) => (
                              <Typography
                                key={`selected-${cartItem.product_id}-opt-${opt.value}`}
                                variant="caption"
                                color="GrayText"
                              >
                                <Typography pr={2}>
                                  {opt.display_name}: {opt.value}
                                </Typography>
                              </Typography>
                            ))}
                            {cartItem.selectedExtras?.map((extra) => (
                              <Typography
                                key={`selected-${cartItem.product_id}-opt-${extra.extra_id}`}
                                variant="caption"
                                color="GrayText"
                              >
                                <Typography pr={2}>
                                  x {extra.quantity} - {fCurrency(5000)}
                                </Typography>
                              </Typography>
                            ))}
                            {Object.values(
                              cartItem?.selectedModifiers ?? {},
                            )?.join('-')}
                          </Box>
                          <MHidden width="mdUp">
                            <Stack direction="row">
                              {fNumber(cartItem?.quantity)}
                            </Stack>
                          </MHidden>
                        </Stack>
                      </Stack>
                    </Grid>

                    <MHidden width="mdDown">
                      <Grid item md={3}>
                        <Stack direction="row">
                          {fNumber(cartItem?.quantity)}
                        </Stack>
                      </Grid>
                    </MHidden>

                    <Grid item xs={4} md={2} textAlign="right">
                      <Typography>
                        {fCurrency(cartItemPrice?.final_amount)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
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
                  {fCurrency(cart.final_amount)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption">
                  Thuế và phí vận chuyển sẽ được tính khi thanh toán.
                </Typography>
                {error && (
                  <Typography
                    sx={{ color: 'error.main' }}
                    variant="h6"
                    display="block"
                  >
                    {(error as Error).message}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CheckoutCartSection;
