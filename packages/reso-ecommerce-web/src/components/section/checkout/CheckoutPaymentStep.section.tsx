import { MHidden } from '@/components/@material-extend';
import {
  Box,
  Button,
  FormControlLabel,
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

interface Props {}

const CheckoutPaymentStepSection = (props: Props) => {
  const paymentMethod = [
    {
      label: 'Thẻ tín dụng',
      disabled: false,
    },
    {
      label: 'Ví điện tử Momo',
      disabled: false,
    },
    {
      label: 'ZaloPay',
      disabled: true,
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
      </Box>
    </Stack>
  );
};

export default CheckoutPaymentStepSection;
