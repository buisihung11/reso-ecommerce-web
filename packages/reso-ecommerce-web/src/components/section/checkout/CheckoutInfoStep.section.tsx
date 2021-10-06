import React from 'react';
import { Box, Stack, Typography, TextField, Grid, Button } from '@mui/material';

interface Props {}

const CheckoutInfoStepSection = (props: Props) => {
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

        <TextField label="Email" placeholder="Email" fullWidth />
      </Box>

      <Box width="100%">
        <Typography fontWeight={700} mb={2}>
          Thông tin giao hàng
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Tên" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Họ" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              helperText="Số điện thoại để liên lạc khi giao hàng"
              label="Số điện thoại"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Địa chỉ" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Chung cư, căn hộ" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CheckoutInfoStepSection;
