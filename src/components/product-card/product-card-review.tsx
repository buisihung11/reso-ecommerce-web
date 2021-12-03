import { StoreContext } from '@/contexts/store-context';
import useCart from '@/hooks/cart/useCart';
import { ProductVariant } from '@/types/product';
import { fCurrency } from '@/utils/formatNumber';
import { AddShoppingCart, ShoppingBagOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import {
  Badge,
  Box,
  Button,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import { MIconButton } from '../@material-extend';
import MenuPopover from '../MenuPopover';
import Scrollbar from '../Scrollbar';
import ProductThumbnail from './product-thumbnail';

const HStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 20,
    backgroundColor: `${theme.palette.grey[400]}`,
    padding: '0 4px',
  },
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
}));

type TNotificationPopover = {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  selectedVariant?: ProductVariant | null;
};

function NotificationItem({
  id,
  img,
  name,
  price,
  quantity,
  selectedVariant,
}: TNotificationPopover) {
  return (
    <ListItemButton disableGutters key={id}>
      <Stack px={2}>
        <HStack key={`checkout-item-${id}`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Badge color="secondary" badgeContent={quantity}>
              <Box width={72} height={72}>
                <ProductThumbnail imgStyle="square" src={img} title={name} />
              </Box>
            </Badge>
            <Box>
              <Typography noWrap variant="body1" mb={1}>
                {name}
              </Typography>
              {selectedVariant?.options?.map((opt) => (
                <Typography
                  key={`${opt.displayName}`}
                  variant="caption"
                  color="GrayText"
                  pr={2}
                >
                  {opt.display_name}: {opt.value}
                </Typography>
              ))}
            </Box>
          </Stack>
        </HStack>
      </Stack>
    </ListItemButton>
  );
}

export default function ProductCardReview() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { cart } = useCart();
  const anchorRef = useRef(null);
  const totalItem = cart.totalItem;
  const context = useContext(StoreContext);
  const router = useRouter();
  const handleOpen = () => {
    context.setChangeShowReviewCart(true);
  };

  const handleClose = () => {
    context.setChangeShowReviewCart(false);
  };

  const handleViewCartClick = () => {
    context.setChangeShowReviewCart(false);
    router.push('/cart');
  };
  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={context.isShowReviewCart ? 'primary' : 'default'}
        onClick={handleOpen}
        onMouseOver={() => {
          if (!isMobile) {
            handleOpen();
          }
        }}
      >
        <StyledBadge badgeContent={totalItem}>
          <ShoppingBagOutlined />
        </StyledBadge>
      </MIconButton>
      <MenuPopover
        open={context.isShowReviewCart}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
        onMouseLeave={() => {
          if (!isMobile) {
            handleClose();
          }
        }}
      >
        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <>
                <CardHeader
                  title={'Giỏ hàng'}
                  action={
                    <IconButton size="medium" onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  }
                  sx={{
                    mb: 1,
                    pt: 2,
                    px: 2,
                  }}
                />
              </>
            }
          >
            {cart.items.map((el, idx) => (
              <NotificationItem
                key={`cart-item-popup-${el.product_id}-${idx}`}
                id={el.code}
                quantity={el.quantity}
                name={el.product_name}
                img={el.pic_url}
                price={el.price}
                selectedVariant={el.selectedVariant}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Stack spacing={2}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              startIcon={<AddShoppingCart />}
              onClick={handleViewCartClick}
              sx={{ whiteSpace: 'nowrap', flex: 1 }}
            >
              {`Xem Giỏ Hàng (${totalItem})`}
            </Button>
            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<PaymentIcon />}
              sx={{ whiteSpace: 'nowrap', flex: 1 }}
              onClick={() => router.push('/checkout')}
            >
              Thanh Toán
            </Button>
          </Stack>
        </Box>
      </MenuPopover>
    </>
  );
}
