import { fCurrency } from '@/utils/formatNumber';
import {
  Badge,
  Container,
  Stack,
  styled,
  Typography,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ProductThumbnail from '../product-card/product-thumbnail';

interface Props {}

const HStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const CartSummarySeciton = (props: Props) => {
  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <HStack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Badge color="secondary" badgeContent={2}>
              <ProductThumbnail
                src="https://cdn.shopify.com/s/files/1/0264/0793/products/mlouye-thelma-sandal-gummy-1_small.jpg?v=1620013741"
                title="Sản phẩm 1"
              />
            </Badge>
            <Box>
              <Typography noWrap variant="body1" mb={1}>
                Áo thun T-shirt
              </Typography>
              <Typography variant="caption">Màu sắc: Đen</Typography>
            </Box>
          </Stack>
          <Typography>{fCurrency(1000000)}</Typography>
        </HStack>

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
            <Typography fontWeight={400}>{fCurrency(100000)}</Typography>
          </HStack>
          <HStack>
            <Typography>Phí vận chuyển</Typography>
            <Typography fontWeight={400}>{fCurrency(10000)}</Typography>
          </HStack>
        </Box>

        <Divider />

        <HStack>
          <Typography variant="h5">Tổng cộng</Typography>
          <Typography variant="h4">{fCurrency(1000000)}</Typography>
        </HStack>
      </Stack>
    </Container>
  );
};

export default CartSummarySeciton;
