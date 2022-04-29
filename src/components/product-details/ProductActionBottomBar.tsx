import { AddShoppingCart } from '@mui/icons-material';

import { Button, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import * as React from 'react';
import ProductContactDialog from './ProductContactDialog';
import ProductQuantity, { ProductQuantityProps } from './ProductQuantity';

type Props = {
  onAddToCart: () => void;
  /** Name control for quantity field */
  controlProps?: ProductQuantityProps;
  btnProps: {
    disabled: boolean;
  };
  message: any;
};

const ProductActionBottomBar = ({
  onAddToCart,
  controlProps = {},
  btnProps,
  message,
}: Props) => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: '#fff',
        color: 'black',
        p: 2,
      }}
    >
      <Stack direction="row" spacing={2}>
        {!message ? (
          <>
            <ProductQuantity {...controlProps} />
            <Button
              fullWidth
              disabled={btnProps.disabled}
              size="large"
              type="button"
              variant="contained"
              startIcon={<AddShoppingCart />}
              onClick={onAddToCart}
              sx={{ whiteSpace: 'nowrap', flex: 1 }}
            >
              Thêm vào giỏ hàng
            </Button>
          </>
        ) : (
          <ProductContactDialog />
        )}
      </Stack>
    </AppBar>
  );
};

export default ProductActionBottomBar;
