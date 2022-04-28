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
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Số lượng
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
                      Thêm vào giỏ hàng
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
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, value } }) => (
              <ProductActionBottomBar
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
  <p><strong>1. Điều kiện đổi trả</strong></p><p>Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng&nbsp;ngay tại thời điểm giao/nhận hàng&nbsp;trong những trường hợp sau:</p><ul><li>Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.</li><li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li><li>Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…</li></ul><p>&nbsp;Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên để hoàn thành việc&nbsp;hoàn trả/đổi trả hàng hóa.&nbsp;</p><p><br></p><p><strong>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</strong></p><ul><li><strong>Thời gian thông báo đổi trả</strong>:&nbsp;trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.</li><li><strong>Thời gian gửi chuyển trả sản phẩm</strong>: trong vòng 14 ngày kể từ khi nhận sản phẩm.</li><li><strong>Địa điểm đổi trả sản phẩm</strong>: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.</li></ul><p>Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng&nbsp;của chúng tôi.</p>
</div>`,
  ];

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Mô tả" value="1" />
          <Tab label="Chính sách" value="2" />
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
