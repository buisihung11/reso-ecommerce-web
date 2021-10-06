import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {}

const CheckoutReviewSection = (props: Props) => {
  return (
    <Paper
      sx={{
        border: '1px solid',
        borderColor: 'grey.400',
        p: 2,
      }}
    >
      <Stack spacing={2}>
        <CheckoutReviewRow title="Liên hệ" value="buisihung321@gmail.com" />
        <CheckoutReviewRow
          title="Giao hàng"
          value="129 Tay Hoa Street Disctrict 9, Ho Chi Minh 70000, Vietnam"
        />
        <CheckoutReviewRow title="Phương thức" value="Giao hàng tiết kiệm" />
      </Stack>
    </Paper>
  );
};

type CheckoutReviewRowProps = {
  title: string;
  value: string;
};

const CheckoutReviewRow = ({ title, value }: CheckoutReviewRowProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Stack
        flex={1}
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 1, md: 2 }}
      >
        <Box flex={{ xs: '0', md: '0 1 6em' }}>
          <Typography variant="body2" color="GrayText">
            {title}
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography variant="body2">{value}</Typography>
        </Box>
      </Stack>
      <Typography variant="caption" sx={{ cursor: 'pointer' }}>
        Thay đổi
      </Typography>
    </Stack>
  );
};

export default CheckoutReviewSection;
