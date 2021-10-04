import { AddShoppingCart } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import ProductQuantity from './ProductQuantity';

type Props = {
  onAddToCart: () => void;
  /** Name control for quantity field */
  controlProps: {
    name: string;
    available?: number;
  };
  btnProps: {
    disabled: boolean;
  };
};

const ProductActionBottomBar = ({
  onAddToCart,
  controlProps,
  btnProps,
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
      </Stack>
    </AppBar>
  );
};

export default ProductActionBottomBar;
