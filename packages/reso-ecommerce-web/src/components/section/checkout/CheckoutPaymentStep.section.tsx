import { MHidden } from '@/components/@material-extend';
import { ErrorMessage } from '@hookform/error-message';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  List,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckoutFormState } from '../CheckoutContent.section';

interface Props {}

const CheckoutPaymentStepSection = (props: Props) => {
  const {
    register,
    control,
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
        {/* <RadioGroupField
          control={control}
          name="paymentType"
          options={paymentMethod.map(
            (x) => ({ id: x.label, name: x.label } as RadioOption),
            [],
          )}
          disabled={false}
          label={'Payment'}
        /> */}
        <FormControl fullWidth component="fieldset">
          <Paper
            sx={{
              border: '1px solid',
              borderColor: 'grey.400',
              p: 2,
            }}
          >
            <List sx={{ width: '100%' }} disablePadding>
              <Controller
                control={control}
                name="paymentType"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <RadioGroup
                    aria-label="payment type"
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  >
                    {paymentMethod.map(({ label, disabled }) => {
                      return (
                        <FormControlLabel
                          key={label}
                          value={label}
                          disabled={disabled}
                          control={<Radio />}
                          label={label}
                        />
                      );
                    })}
                  </RadioGroup>
                )}
              />
            </List>
          </Paper>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default CheckoutPaymentStepSection;
