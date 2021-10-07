import React from 'react';
import { Box, Stack, Typography, TextField, Grid, Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { CheckoutFormState } from '../CheckoutContent.section';
import RHKTextField from '@/components/form/RHKTextField';

interface Props {}

const CheckoutInfoStepSection = (props: Props) => {
  const { register, control } = useFormContext<CheckoutFormState>();

  return (
    <>
      <Box width="100%">
        <Stack
          pb={2}
          direction={['column', 'row']}
          justifyContent="space-between"
        >
          <Typography fontWeight={700}>Thông tin liên hệ</Typography>
          <Typography fontWeight={200}>
            Đã có tài khoản?{' '}
            <Typography sx={{ cursor: 'pointer' }} component="span">
              Đăng nhập
            </Typography>
          </Typography>
        </Stack>

        <RHKTextField
          label="Email"
          placeholder="Email"
          fullWidth
          name="email"
          control={control}
        />
      </Box>

      <Box width="100%">
        <Typography fontWeight={700} mb={2}>
          Thông tin giao hàng
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <RHKTextField
              control={control}
              label="Tên"
              fullWidth
              name="lastName"
            />
          </Grid>
          <Grid item xs={6}>
            <RHKTextField
              control={control}
              label="Họ"
              fullWidth
              name="firstName"
            />
          </Grid>
          <Grid item xs={12}>
            <RHKTextField
              control={control}
              helperText="Số điện thoại để liên lạc khi giao hàng"
              label="Số điện thoại"
              fullWidth
              name="phone"
            />
          </Grid>
          <Grid item xs={12}>
            <RHKTextField
              control={control}
              label="Địa chỉ"
              fullWidth
              name="address"
            />
          </Grid>
          <Grid item xs={12}>
            <RHKTextField
              control={control}
              label="Chung cư, căn hộ"
              fullWidth
              name="apartment"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CheckoutInfoStepSection;
