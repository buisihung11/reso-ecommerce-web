import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { CheckoutFormState } from '../CheckoutContent.section';

interface Props {
  show?: boolean;
}

const CheckoutReviewSection = ({ show }: Props) => {
  const { watch } = useFormContext<CheckoutFormState>();
  const email = watch('email');
  const address = watch('address');
  const shippingMethod = watch('shippingMethod');

  if (!show) return <></>;

  return (
    <Paper
      sx={{
        border: '1px solid',
        borderColor: 'grey.400',
        p: 2,
      }}
    >
      <Stack spacing={2}>
        {email && <CheckoutReviewRow title="Liên hệ" value={email} />}
        {address && <CheckoutReviewRow title="Giao hàng" value={address} />}
        {shippingMethod && (
          <CheckoutReviewRow title="Phương thức" value={shippingMethod} />
        )}
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
