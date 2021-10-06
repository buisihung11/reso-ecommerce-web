import { fCurrency } from '@/utils/formatNumber';
import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {}

const CheckoutShippingStepSection = (props: Props) => {
  const shippingMethod = [
    { label: 'Vận chuyển thường', price: 0 },
    { label: 'Vận chuyển nhanh', price: 10000 },
  ];

  return (
    <Box width="100%">
      <Typography fontWeight={700} mb={2}>
        Hình thức vận chuyển
      </Typography>
      <Paper
        sx={{
          border: '1px solid',
          borderColor: 'grey.400',
          p: 2,
        }}
      >
        <List sx={{ width: '100%' }} disablePadding>
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
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
                    value={label}
                    control={<Radio />}
                    label={label}
                  />
                </ListItem>
              );
            })}
          </RadioGroup>
        </List>
      </Paper>
    </Box>
  );
};

export default CheckoutShippingStepSection;
