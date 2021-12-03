// @types
//
import { MIconButton } from '@/components/@material-extend';
import Scrollbar from '@/components/Scrollbar';
import useCategories from '@/hooks/category/useCategories';
import { TProductQuery } from '@/types/product';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Clear, Filter1Outlined } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
// material
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import SelectableChipField from '../form/SelectableChip';

// ----------------------------------------------------------------------

export const FILTER_PRICE_OPTIONS = [
  { value: '[0,100000]', label: '< 100.000VND>' },
  { value: '[100000,200000]', label: '100.000 - 200.000VND' },
  { value: '[200000]', label: '> 200.000VND' },
];

export const FILTER_SORT_OPTIONS = [
  { value: 'best,desc', label: 'Bán chạy' },
  { value: 'product_name,asc', label: 'Bảng chữ cái A-Z' },
  { value: 'product_name,desc', label: 'Bảng chữ cái Z-A' },
  { value: 'price,asc', label: 'Giá Thấp-Cao' },
  { value: 'price,desc', label: 'Giá Cao-Thấp' },
];

// ----------------------------------------------------------------------

type ShopFilterSidebarProps<T = TProductQuery> = {
  onOpenFilter: VoidFunction;
  onCloseFilter: VoidFunction;
  onResetFilter?: VoidFunction;
  isOpenFilter: boolean;
  control: Control<T>;
};

export default function ShopFilterSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  control,
}: ShopFilterSidebarProps) {
  const { data: categoriesFilter } = useCategories();

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          disableRipple
          color="inherit"
          variant="text"
          startIcon={<Filter1Outlined />}
          onClick={onOpenFilter}
        >
          Bộ lọc&nbsp;
        </Button>
      </Stack>

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
          <Stack spacing={2} sx={{ p: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Sắp xếp</Typography>
              <Box flex={1}>
                <Controller
                  control={control}
                  name="sort"
                  render={({ field }) => (
                    <Select
                      fullWidth
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Bộ lọc"
                    >
                      {FILTER_SORT_OPTIONS.map((opt) => (
                        <MenuItem key={`sort-${opt.label}`} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Box>
            </Stack>
            <FilterGroup title="Giá">
              <Controller
                control={control}
                name="price"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onChange={field.onChange}
                      value={field.value}
                      ref={field.ref}
                    >
                      {FILTER_PRICE_OPTIONS.map((item) => (
                        <FormControlLabel
                          key={item.value}
                          value={item.value}
                          control={<Radio />}
                          label={item.label}
                        />
                      ))}
                    </RadioGroup>
                  );
                }}
              />
            </FilterGroup>

            <FilterGroup title="Loại">
              <Controller
                control={control}
                name="cat-id"
                render={({ field }) => (
                  <SelectableChipField
                    onChange={field.onChange}
                    value={field.value}
                    options={categoriesFilter?.map((c) => ({
                      label: c.cate_name,
                      value: c.cate_id,
                    }))}
                  />
                )}
              />
            </FilterGroup>
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
                onClick={onResetFilter}
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

type FilterGroupProps = {
  title: any;
};

const FilterGroup: React.FC<FilterGroupProps> = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  const expandIcon = open ? (
    <DoDisturbOnOutlinedIcon />
  ) : (
    <AddCircleOutlineIcon />
  );

  return (
    <Accordion
      disableGutters
      onChange={() => setOpen(!open)}
      elevation={0}
      sx={{
        padding: 0,
        boxShadow: 'none',
      }}
      expanded={open}
    >
      <AccordionSummary
        expandIcon={expandIcon}
        sx={{
          backgroundColor: 'transparent',
          padding: 0,
        }}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};
