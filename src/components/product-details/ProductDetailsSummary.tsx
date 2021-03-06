import { MHidden, MIconButton } from '@/components/@material-extend';
// routes
// utils
import {
  getDefaultOptionFromProduct,
  getProductVariant,
} from '@/hooks/product/helpers';
import {
  ProductOption,
  ProductVariant,
  SelectedExtra,
  SelectedOptions,
  TProduct,
  TProductDetail,
} from '@/types/product';
import useCart from '@/hooks/cart/useCart';
import { fCurrency } from '@/utils/formatNumber';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import { Icon } from '@iconify/react';
import { AddShoppingCart } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, Divider, Grid, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
// material
import { styled, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { useContext, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import ProductActionBottomBar from './ProductActionBottomBar';
import ProductOptions from './ProductOptions';
import ProductQuantity from './ProductQuantity';
import { toast } from 'react-toastify';
import useAddItem from '@/hooks/cart/useAddItem';
import { StoreContext } from '@/contexts/store-context';
import { ProductExtras, ProductModifiers } from '.';
import useItemBuilder from '@/hooks/cart/useItemBuilder';
import useProductPrice from '@/hooks/product/useProductPrice';
import ProductBuilder from './ProductBuilder';
import ProductContactDialog from './ProductContactDialog';
import useIframeMessage from '@/hooks/useIframeMessage';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(0),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

type ProductDetailsSumaryprops = {
  product: TProductDetail;
  quantity: number;
  onAddCart?: (prod: TProduct) => void;
  onGotoStep?: (step: number) => void;
};

export default function ProductDetailsSummary({
  product,
  quantity,
  onAddCart,
  onGotoStep,
  ...other
}: ProductDetailsSumaryprops) {
  const theme = useTheme();
  const addItem = useAddItem();
  const context = useContext(StoreContext);
  const { message } = useIframeMessage();

  const { buildItem, variant } = useItemBuilder();
  const status = 'sale';
  const { product_name, priceSale, pic_url: cover } = product;

  const isMaxQuantity = false;

  const form = useForm({
    defaultValues: {
      quantity: quantity ?? 1,
      selectedExtras: [] as SelectedExtra[],
    },
  });
  const { control, getValues, watch } = form;

  const currentQuantity = watch('quantity');
  const finalPrice = useProductPrice(
    (variant ?? product) as TProduct,
    currentQuantity,
  );

  const handleAddCart = async () => {
    try {
      const { quantity } = getValues();
      const itemCart = buildItem();
      await addItem.mutateAsync({ ...itemCart, quantity });
      context.setChangeShowReviewCart(true);
    } catch (error) {
      toast((error as any).message, {
        type: 'error',
      });
    }
  };

  return (
    <RootStyle {...other}>
      <FormProvider {...form}>
        <Typography
          variant="overline"
          sx={{
            mt: 2,
            mb: 1,
            display: 'block',
            color: status === 'sale' ? 'error.main' : 'info.main',
          }}
        >
          {status}
        </Typography>

        <Typography variant="h5" paragraph>
          {product_name}
        </Typography>

        <Typography variant="h4" sx={{ mb: 3 }}>
          <Box
            component="span"
            sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
          >
            {priceSale && fCurrency(priceSale)}
          </Box>
          {fCurrency(finalPrice)}
        </Typography>

        <ProductBuilder />

        <MHidden width="mdDown">
          <Box
            sx={{
              my: 3,
              display: message ? 'none' : 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              S??? l?????ng
            </Typography>

            <div>
              <Controller
                control={control}
                name="quantity"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <ProductQuantity value={value} onChange={onChange} />
                )}
              />
            </div>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              {message ? (
                <ProductContactDialog />
              ) : (
                <>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      size="large"
                      type="submit"
                      variant="outlined"
                    >
                      Mua ngay
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      disabled={isMaxQuantity}
                      size="large"
                      type="button"
                      variant="contained"
                      startIcon={<AddShoppingCart />}
                      onClick={handleAddCart}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Th??m v??o gi??? h??ng
                    </Button>
                  </Grid>
                </> 
              )}
            </Grid>
          </Box>
        </MHidden>

        <Box sx={{ mt: 3 }}>
          <ProductDetailDescription product={product} />
          <Box>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>

        <MHidden width="mdUp">
          <>
            <Controller
              control={control}
              name="quantity"
              render={({ field: { onChange, value } }) => (
                <ProductActionBottomBar
                  message={message}
                  onAddToCart={handleAddCart}
                  btnProps={{
                    disabled: isMaxQuantity,
                  }}
                  controlProps={{
                    value,
                    onChange,
                  }}
                />
              )}
            />
          </>
        </MHidden>
      </FormProvider>
    </RootStyle>
  );
}

const ProductDetailDescription = ({ product }: { product: TProduct }) => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tab1Content = [
    product.description,
    `<div class="tab-pane active" id="proTabs3">
  <p><strong>1. ??i???u ki???n ?????i tr???</strong></p><p>Qu?? Kh??ch h??ng c???n ki???m tra t??nh tr???ng h??ng h??a v?? c?? th??? ?????i h??ng/ tr??? l???i h??ng&nbsp;ngay t???i th???i ??i???m giao/nh???n h??ng&nbsp;trong nh???ng tr?????ng h???p sau:</p><ul><li>H??ng kh??ng ????ng ch???ng lo???i, m???u m?? trong ????n h??ng ???? ?????t ho???c nh?? tr??n website t???i th???i ??i???m ?????t h??ng.</li><li>Kh??ng ????? s??? l?????ng, kh??ng ????? b??? nh?? trong ????n h??ng.</li><li>T??nh tr???ng b??n ngo??i b??? ???nh h?????ng nh?? r??ch bao b??, bong tr??c, b??? v??????</li></ul><p>&nbsp;Kh??ch h??ng c?? tr??ch nhi???m tr??nh gi???y t??? li??n quan ch???ng minh s??? thi???u s??t tr??n ????? ho??n th??nh vi???c&nbsp;ho??n tr???/?????i tr??? h??ng h??a.&nbsp;</p><p><br></p><p><strong>2. Quy ?????nh v??? th???i gian th??ng b??o v?? g???i s???n ph???m ?????i tr???</strong></p><ul><li><strong>Th???i gian th??ng b??o ?????i tr???</strong>:&nbsp;trong v??ng 48h k??? t??? khi nh???n s???n ph???m ?????i v???i tr?????ng h???p s???n ph???m thi???u ph??? ki???n, qu?? t???ng ho???c b??? v???.</li><li><strong>Th???i gian g???i chuy???n tr??? s???n ph???m</strong>: trong v??ng 14 ng??y k??? t??? khi nh???n s???n ph???m.</li><li><strong>?????a ??i???m ?????i tr??? s???n ph???m</strong>: Kh??ch h??ng c?? th??? mang h??ng tr???c ti???p ?????n v??n ph??ng/ c???a h??ng c???a ch??ng t??i ho???c chuy???n qua ???????ng b??u ??i???n.</li></ul><p>Trong tr?????ng h???p Qu?? Kh??ch h??ng c?? ?? ki???n ????ng g??p/khi???u n???i li??n quan ?????n ch???t l?????ng s???n ph???m, Qu?? Kh??ch h??ng vui l??ng li??n h??? ???????ng d??y ch??m s??c kh??ch h??ng&nbsp;c???a ch??ng t??i.</p>
</div>`,
  ];

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="M?? t???" value="1" />
          <Tab label="Ch??nh s??ch" value="2" />
        </TabList>
      </Box>
      {tab1Content.map((content, idx) => (
        <TabPanel key={`tabconent-${idx}`} value={`${idx + 1}`}>
          <Box p={2}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Box>
        </TabPanel>
      ))}
    </TabContext>
  );
};
