import { useState } from 'react';

import { MIconButton } from '@/components/@material-extend';
import minusFill from '@iconify/icons-eva/minus-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { useController } from 'react-hook-form';
import { Function } from 'lodash';

export type ProductQuantityProps = {
  onChange?: (quantity: number) => void;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
};

const ProductQuantity = ({
  defaultValue,
  value,
  onChange,
  min = 1,
  max = Infinity,
}: ProductQuantityProps) => {
  const [_counter, setCounter] = useState(defaultValue ?? 1);
  const counter = value ?? _counter;

  const incrementQuantity = () => {
    if (onChange) {
      onChange(counter + 1);
    }
    setCounter(counter + 1);
  };
  const decrementQuantity = () => {
    if (onChange) {
      onChange(counter - 1);
    }
    setCounter(counter - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={counter <= min}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        {counter}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={counter >= max}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

export default ProductQuantity;
