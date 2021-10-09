import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
  styled,
  Badge,
  IconButton,
  CardHeader,
  Stack,
} from '@mui/material';
import React, { useState, useRef, useContext } from 'react';
import MenuPopover from '../MenuPopover';
import Scrollbar from '../Scrollbar';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import { MIconButton } from '../@material-extend';
import useCart from '@/hooks/cart/useCart';
import { AddShoppingCart, ShoppingBagOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { StoreContext } from '@/contexts/store-context';
import PaymentIcon from '@mui/icons-material/Payment';
import { useRouter } from 'next/router';

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
};

function NotificationItem({ id, img, name, price }: TNotificationPopover) {
  return (
    <ListItemButton
      disableGutters
      key={id}
      sx={{
        py: 0,
        px: 2.5,
        '&:not(:last-of-type)': { mb: '1px' },
      }}
    >
      <ListItemAvatar>
        <Box
          sx={{
            py: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ThumbImgStyle alt={name} src={img} />
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            {price}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function ProductCardReview() {
  const anchorRef = useRef(null);
  const { cart } = useCart();
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
        onMouseOver={handleOpen}
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
                  style={{ marginBottom: '16px' }}
                />
              </>
            }
          >
            {cart.items
              .slice()
              .reverse()
              .slice(0, 5)
              .map((el) => (
                <NotificationItem
                  id={el.code}
                  name={el.product_name}
                  img={el.pic_url}
                  price={el.price}
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
              type="button"
              variant="contained"
              color="secondary"
              startIcon={<AddShoppingCart />}
              onClick={handleViewCartClick}
              sx={{ whiteSpace: 'nowrap', flex: 1 }}
            >
              {`Xem Giỏ Hàng (${totalItem})`}
            </Button>
            <Button
              fullWidth
              size="large"
              type="button"
              variant="contained"
              startIcon={<PaymentIcon />}
              sx={{ whiteSpace: 'nowrap', flex: 1 }}
            >
              Thanh Toán
            </Button>
          </Stack>
        </Box>
      </MenuPopover>
    </>
  );
}
