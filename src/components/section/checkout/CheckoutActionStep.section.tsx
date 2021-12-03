import React, { useState } from 'react';
import { Box, Stack, Button } from '@mui/material';
import Link from '@/components/Link';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

interface Props {
  onNextStep?: () => Promise<any>;
  btnTitle: string;
}

const CheckoutActionStepSection = ({ btnTitle, onNextStep }: Props) => {
  const [loading, setLoading] = useState(false);

  const nextStepHandler = () => {
    if (onNextStep) {
      setLoading(true);
      return onNextStep().finally(() => setLoading(false));
    }
  };

  return (
    <Box width="100%">
      <Stack
        direction={['column-reverse', 'row']}
        justifyContent="space-between"
        alignItems="center"
        spacing={[2, 2]}
      >
        <Link passHref href="/cart">
          <Button color="inherit" variant="text" startIcon={<ArrowBack />}>
            Giỏ hàng
          </Button>
        </Link>
        <Box width={['100%', 'auto']} pb={[2, 0]}>
          <LoadingButton
            fullWidth
            onClick={nextStepHandler}
            loading={loading}
            variant="contained"
            size="large"
            disableElevation
          >
            {btnTitle}
          </LoadingButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default CheckoutActionStepSection;
