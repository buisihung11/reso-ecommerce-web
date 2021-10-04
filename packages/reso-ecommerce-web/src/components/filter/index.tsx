import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControlLabel,
  Grid,
} from '@mui/material';
// @types
//
import { MIconButton } from '@/components/@material-extend';
import Scrollbar from '@/components/Scrollbar';
import ColorManyPicker from '@/components/ColorManyPicker';
import { Clear, Filter1Outlined } from '@mui/icons-material';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = [
  'All',
  'Shose',
  'Apparel',
  'Accessories',
];
export const FILTER_RATING_OPTIONS = [
  'up4Star',
  'up3Star',
  'up2Star',
  'up1Star',
];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

type ShopFilterSidebarProps = {
  onOpenFilter: VoidFunction;
  onCloseFilter: VoidFunction;
  onResetFilter?: VoidFunction;
  isOpenFilter: boolean;
};

export default function ShopFilterSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
}: ShopFilterSidebarProps) {
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        variant="text"
        startIcon={<Filter1Outlined />}
        onClick={onOpenFilter}
      >
        Bộ lọc&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Bộ lọc
          </Typography>
          <MIconButton onClick={onCloseFilter}>
            <Icon icon={closeFill} width={20} height={20} />
          </MIconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Gender
              </Typography>
              <FormGroup>
                {FILTER_GENDER_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox value={item} />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Colour
              </Typography>
              <ColorManyPicker
                colors={FILTER_COLOR_OPTIONS}
                sx={{ maxWidth: 36 * 4 }}
              />
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                        sx={{
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '&:hover': { opacity: 0.48 },
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={onCloseFilter}
                startIcon={<Clear />}
              >
                Xóa
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={onCloseFilter}
              >
                Áp dụng
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
