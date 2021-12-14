import { CartItem } from '@/types/cart';
import {
  DialogContent,
  CircularProgress,
  Stack,
  Dialog,
  DialogProps,
  Box,
  IconButton,
  Typography,
  Button,
  Grid,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from 'react';
import ProductThumbnail from '@/components/product-card/product-thumbnail';
import { ProductDetailsSummary } from '@/components/product-details';
import useProduct from '@/hooks/product/useProduct';
import ProductBuilder from '../product-details/ProductBuilder';
import { TProduct, TProductDetail } from '@/types/product';
import { fCurrency } from '@/utils/formatNumber';
import useProductPrice from '@/hooks/product/useProductPrice';
import useItemBuilder from '@/hooks/cart/useItemBuilder';
import { AddShoppingCart } from '@mui/icons-material';
import { toast } from 'react-toastify';

type Props = Omit<DialogProps, 'onClose' | 'onSubmit'> & {
  product?: TProductDetail;
  onSubmit: (item: CartItem) => any;
  onClose: () => any;
  loading: boolean;
  showBuyNow?: boolean;
  showAddToCart?: boolean;
  renderAction?: (
    buyNowBtn: ReactNode,
    addToCartBtn: ReactNode,
    action: {
      onSubmit: (item: CartItem) => any;
    },
  ) => ReactNode[];
};

const ThumbnailWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    top: 0,
    left: 0,
    alignSelf: 'flex-start',
    width: '450px',
  },
}));

const ProductModal = ({
  product,
  onClose,
  open,
  loading,
  renderAction,
  onSubmit,
  showBuyNow = true,
  showAddToCart = true,
}: Props) => {
  const { buildItem, variant } = useItemBuilder();
  if (!product) return <></>;
  const { product_name, priceSale, pic_url: cover } = product;

  const status = 'sale';
  const currentQuantity = 1;
  const finalPrice = useProductPrice(
    (variant ?? product) as TProduct,
    currentQuantity,
  );

  const handleAddCart = () => {
    try {
      const itemCart = buildItem();
      console.log(`itemCart`, itemCart);
      onSubmit(itemCart);
    } catch (error) {
      toast((error as any).message, {
        type: 'error',
      });
    }
  };

  const actions = () => {
    const buyNowBtn = showBuyNow ? (
      <Button fullWidth size="large" type="submit" variant="outlined">
        Mua ngay
      </Button>
    ) : (
      <></>
    );

    const addToCartBtn = showAddToCart ? (
      <Button
        fullWidth
        // disabled={isMaxQuantity}
        size="large"
        type="button"
        variant="contained"
        startIcon={<AddShoppingCart />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Thêm vào giỏ hàng
      </Button>
    ) : (
      <></>
    );
    if (renderAction) {
      return renderAction(buyNowBtn, addToCartBtn, {
        onSubmit,
      });
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {buyNowBtn}
        </Grid>

        <Grid item xs={12}>
          {addToCartBtn}
        </Grid>
      </Grid>
    );
  };

  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
      <DialogContent sx={{ maxHeight: '100%', position: 'relative' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {onClose && (
              <IconButton
                aria-label="close"
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
                onClick={() => onClose()}
              >
                <CloseIcon />
              </IconButton>
            )}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <ThumbnailWrapper>
                <ProductThumbnail
                  imgStyle="square"
                  ImgProps={{
                    style: {
                      width: '300px',
                    },
                  }}
                  src={product?.pic_url!}
                  title={product?.product_name}
                />
              </ThumbnailWrapper>
              <Box sx={{ overflowY: 'auto' }}>
                <Typography
                  variant="overline"
                  sx={{
                    mt: 2,
                    mb: 1,
                    display: 'block',
                    color: status === 'sale' ? 'error.main' : 'info.main',
                  }}
                >
                  {status}
                </Typography>

                <Typography variant="h5" paragraph>
                  {product_name}
                </Typography>

                <Typography variant="h4" sx={{ mb: 3 }}>
                  <Box
                    component="span"
                    sx={{
                      color: 'text.disabled',
                      textDecoration: 'line-through',
                    }}
                  >
                    {priceSale && fCurrency(priceSale)}
                  </Box>
                  {fCurrency(finalPrice)}
                </Typography>
                <ProductBuilder />
                <Box sx={{ mt: 5 }}>{actions()}</Box>
              </Box>
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
