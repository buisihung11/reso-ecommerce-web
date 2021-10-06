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
  SelectedOptions,
  TProduct,
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
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import ProductActionBottomBar from './ProductActionBottomBar';
import ProductOptions from './ProductOptions';
import ProductQuantity from './ProductQuantity';
import { toast } from 'react-toastify';
import useAddItem from '@/hooks/cart/useAddItem';

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

const DEFAULT_VARIANTS: ProductVariant[] = [
  {
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjAss=',
    options: [
      {
        id: 'asd',
        displayName: 'Size',
        value: 'S',
      },
      {
        id: 'asd',
        displayName: 'Color',
        value: '#222',
      },
    ],
  },
];

const DEFAULT_OPTIONS: ProductOption[] = [
  {
    id: 'option-color',
    displayName: 'Color',
    values: [
      {
        label: 'color',
        value: '#222',
      },
    ],
  },
  {
    id: 'option-size',
    displayName: 'Size',
    type: 'radio',
    values: [
      {
        label: 'S',
        value: 'S',
      },
      {
        label: 'M',
        value: 'M',
      },
      {
        label: 'L',
        value: 'L',
      },
    ],
  },
];

type ProductDetailsSumaryprops = {
  product: TProduct;
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

  const status = 'sale';
  const available = 100;
  const {
    product_id,
    product_name,
    price = 10000,
    priceSale = 8000,
    pic_url: cover,
    options = DEFAULT_OPTIONS,
    variants = DEFAULT_VARIANTS,
  } = product;

  const alreadyProduct = null;
  const isMaxQuantity = false;
  const hasVariant = options?.length && variants?.length;

  const [selectedOptions, setSelectedOptions] =
    useState<SelectedOptions | null>({});

  useEffect(() => {
    setSelectedOptions(
      getDefaultOptionFromProduct({
        ...product,
        options: DEFAULT_OPTIONS,
        variants: DEFAULT_VARIANTS,
      }),
    );
  }, [product]);

  const variant = getProductVariant(
    { options: DEFAULT_OPTIONS, variants: DEFAULT_VARIANTS, ...product },
    selectedOptions,
  );

  const form = useForm({
    defaultValues: {
      quantity: quantity ?? 1,
    },
  });
  const { control, getValues } = form;

  const handleAddCart = () => {
    try {
      const { quantity } = getValues();
      addItem.mutate({ product, quantity, selectedOptions });
      toast('Thêm vào giỏ hàng thành công', {
        type: 'success',
      });
    } catch (error) {
      // setSubmitting(false);
      toast('Có lỗi khi thêm sản phẩm', {
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
          &nbsp;{fCurrency(price)}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box py={2}>
          {/* START ATTRIBUTES */}
          {hasVariant && (
            <ProductOptions
              options={options}
              selectedOptions={selectedOptions}
              onSelectOption={setSelectedOptions}
            />
          )}
          {/* END ATTRIBUTES */}
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
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
            <Grid item xs={12} sm={6}>
              <Button fullWidth size="large" type="submit" variant="outlined">
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
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <ProductDetailDescription />
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

const ProductDetailDescription = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tab1Content = [
    `<div class="description-productdetail">
  <p>Dòng sản phẩm&nbsp;xuất khẩu&nbsp;được sản xuất tại Nhà Máy Việt Nam&nbsp;theo tiêu chuẩn Châu Âu. Nguồn gốc nguyên vật liệu cũng như chất lượng,&nbsp;độ bền sản phẩm đã được kiểm chứng bởi các nhà nhập khẩu Âu Mỹ</p><p><img src="//file.hstatic.net/1000409762/file/4620-tischleuchte_1333x1333-id1123239-94b0fbbf17e1b83a9329355b063d55c0_1741e09d520247fa9b3ed320b31f1f90_grande.jpg" alt=""></p><p>CHẤT LIỆU</p><p>Khung sườn: gỗ dầu&nbsp;(Việt Nam) đã xử lý mối mọt theo tiêu chuẩn xuất khẩu Châu Âu<br>Nệm mút: nhập khẩu từ Malaysia<br>Chỉ may: nhập khẩu từ Anh Quốc<br>Da/ PVC/ Vải:&nbsp;Da Bò nhập khẩu từ Ý/ PVC nhập khẩu từ Thái Lan/ Vải nhập khẩu từ Hàn Quốc</p><p>Hướng dẫn bảo quản</p><ul><li>Tránh để đồ quá nóng hoặc quá lạnh trực tiếp lên bề mặt gỗ, hãy dùng miếng lót bên dưới</li><li>Sử dụng vải khô để làm sạch bề mặt gỗ ngay khi bị bẩn</li><li>Đối với đồ nội thất làm từ gỗ, chúng tôi khuyến nghị nên dùng sáp và xi bóng gỗ để chà sạch và làm mới ít nhất 6 tháng một lần</li><li>Đồ nội thất bằng gỗ sẽ có sự khác nhau về vân gỗ hoặc những tì vết tự nhiên mà không làm ảnh hưởng đến chất lượng và tính thẩm mỹ của sản phẩm</li></ul><p>Chất liệu cao cấp, sử dụng lâu bền</p><p>Chân ghế được làm từ chất liệu thép mạ chrome bền đẹp, ít bị hoen gỉ qua thời gian sử dụng. 5 bánh xe dưới các thanh đỡ giúp bạn dễ dàng xoay và di chuyển ghế một cách dễ dàng. Ghế có thể điều chỉnh độ cao cho phù hợp với người sử dụng nhờ bộ piston khí nén. Sản phẩm chịu được trọng lượng cao mà vẫn đảm bảo độ bền qua thời gian sử dụng.&nbsp;</p>
</div>`,
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
