import { MHidden } from '@/components/@material-extend';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  List,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { CheckoutFormState } from '../CheckoutContent.section';

interface Props {}

const CheckoutPaymentStepSection = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormState>();

  const paymentMethod = [
    {
      label: 'Thẻ tín dụng',
      disabled: false,
    },
    {
      label: 'Ví Momo',
      disabled: false,
    },
    {
      label: 'ZaloPay',
      disabled: false,
    },
  ];
  return (
    <Stack spacing={4}>
      <MHidden width="mdUp">
        <Box>
          <Typography fontWeight={700} mb={2}>
            Mã khuyến mãi
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box flex={1}>
              <TextField label="Mã khuyến mãi" fullWidth />
            </Box>
            <Button variant="contained" disableElevation disableTouchRipple>
              Áp dụng
            </Button>
          </Stack>
        </Box>
      </MHidden>

      <Box>
        <Typography fontWeight={700} mb={2}>
          Hình thức thanh toán
        </Typography>
        <ErrorMessage
          errors={errors}
          name="paymentType"
          render={({ message }: { message: string }) => (
            <FormHelperText error sx={{ mb: 2 }}>
              {message}
            </FormHelperText>
          )}
        />
        <FormControl fullWidth component="fieldset">
          <Paper
            sx={{
              border: '1px solid',
              borderColor: 'grey.400',
              p: 2,
            }}
          >
            <List sx={{ width: '100%' }} disablePadding>
              <RadioGroup
                aria-label="payment type"
                {...register('paymentType')}
              >
                {paymentMethod.map(({ label, disabled }) => {
                  return (
                    <ListItem key={label} disablePadding>
                      <FormControlLabel
                        value={label}
                        disabled={disabled}
                        control={<Radio />}
                        label={label}
                      />
                    </ListItem>
                  );
                })}
              </RadioGroup>
            </List>
          </Paper>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default CheckoutPaymentStepSection;
