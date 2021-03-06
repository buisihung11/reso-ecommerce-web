import { fCurrency } from '@/utils/formatNumber';
import { ErrorMessage } from '@hookform/error-message';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  List,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckoutFormState } from '../CheckoutContent.section';

interface Props {}

const CheckoutShippingStepSection = (props: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CheckoutFormState>();

  const shippingMethod = [
    { label: 'Vận chuyển thường', price: 0 },
    { label: 'Vận chuyển nhanh', price: 10000 },
  ];

  return (
    <Box width="100%">
      <Typography fontWeight={700} mb={2}>
        Hình thức vận chuyển
      </Typography>
      <ErrorMessage
        errors={errors}
        name="shippingMethod"
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
            <Controller
              control={control}
              name="shippingMethod"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <RadioGroup
                  aria-label="shipping method"
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  {shippingMethod.map(({ label, price }) => {
                    return (
                      <ListItem
                        key={label}
                        secondaryAction={
                          <Typography fontWeight="bold" variant="body2">
                            {price === 0 ? 'Free' : fCurrency(price)}
                          </Typography>
                        }
                        disablePadding
                      >
                        <FormControlLabel
                          key={label}
                          value={label}
                          label={label}
                          control={<Radio />}
                        />
                      </ListItem>
                    );
                  })}
                </RadioGroup>
              )}
            />
          </List>
        </Paper>
      </FormControl>
    </Box>
  );
};

export default CheckoutShippingStepSection;
