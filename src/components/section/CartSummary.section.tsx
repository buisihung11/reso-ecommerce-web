import { UseCartReturnValue } from '@/hooks/cart/useCart';
import { fCurrency } from '@/utils/formatNumber';
import {
  Badge,
  Button,
  Container,
  Divider,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ProductThumbnail from '../product-card/product-thumbnail';

interface Props {
  cart: UseCartReturnValue['cart'];
}

const HStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const CartSummarySeciton = ({ cart }: Props) => {
  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        {cart.items.map((item, idx) => (
          <HStack key={`checkout-item-${item.product_id}-${idx}`} pr={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Badge color="secondary" badgeContent={2}>
                <Box width={72} height={72}>
                  <ProductThumbnail
                    imgStyle="square"
                    src={item.pic_url}
                    title={item.product_name}
                  />
                </Box>
              </Badge>
              <Box>
                <Typography variant="body1" mb={1}>
                  {item.product_name}
                </Typography>
                {item.selectedVariant?.options?.map((opt) => (
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
            <Typography>{fCurrency(item.price)}</Typography>
          </HStack>
        ))}

        <Divider />

        <Stack direction="row" spacing={1}>
          <Box flex={1}>
            <TextField label="Mã khuyến mãi" fullWidth />
          </Box>
          <Button variant="contained">Áp dụng</Button>
        </Stack>

        <Divider />

        <Box>
          <HStack>
            <Typography>Tổng</Typography>
            <Typography fontWeight={400}>
              {fCurrency(cart?.total_amount!)}
            </Typography>
          </HStack>
          <HStack>
            <Typography>Giảm giá</Typography>
            <Typography fontWeight={400}>
              {fCurrency(cart?.discount ?? 0)}
            </Typography>
          </HStack>
          <HStack>
            <Typography>Phí vận chuyển</Typography>
            <Typography fontWeight={400}>{fCurrency(0)}</Typography>
          </HStack>
        </Box>

        <Divider />

        <HStack>
          <Typography variant="h5">Tổng cộng</Typography>
          <Typography variant="h4">{fCurrency(cart?.final_amount!)}</Typography>
        </HStack>
      </Stack>
    </Container>
  );
};

export default CartSummarySeciton;
