import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  Typography,
  Stack,
  DialogProps,
  Dialog,
  Container,
} from '@mui/material';
import Link from '../Link';
//
import { OrderCompleteIllustration } from '../../assets';
import { useRouter } from 'next/router';

const OrderContentSection = () => {
  const router = useRouter();
  const { id, status } = router.query;
  return (
    <Container maxWidth="md">
      <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" paragraph>
            Đặt hàng thành công
          </Typography>

          <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

          <Typography align="left" paragraph>
            Mã đơn hàng của bạn là
            <Link href="#">
              <Typography fontWeight="bold" color="primary">
                {id}
              </Typography>
            </Link>
          </Typography>
          <Typography align="left">
            Vui lòng đợi nhân viên xác nhận đơn hàng và liên lạc cho bạn.
          </Typography>
        </Box>
        <Typography pt={4} variant="h5">
          {status}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            onClick={() => router.replace('/')}
            color="inherit"
            startIcon={<Icon icon={arrowIosBackFill} />}
          >
            Tiếp tục mua sắm
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default OrderContentSection;
