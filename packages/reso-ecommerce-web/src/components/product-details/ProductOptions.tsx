import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  InputLabel,
} from '@mui/material';
import ColorSinglePicker from '../ColorSinglePicker';
import { SelectedOptions, ProductOption } from '@/types/product';
import { get } from 'lodash';

type Props = {
  options: ProductOption[];
  selectedOptions: SelectedOptions | null;
  onSelectOption: (selected: SelectedOptions) => void;
};

const ProductOptions = ({
  options,
  selectedOptions = {},
  onSelectOption,
}: Props) => {
  const renderInputOption = (opt: ProductOption) => {
    if (opt.displayName.toLowerCase() === 'color') {
      const colors = opt.values.map((o) => o.value);
      return (
        <ColorSinglePicker
          onChange={(e) => {
            onSelectOption({
              ...selectedOptions,
              [opt.displayName.toLowerCase()]: e.target.value as string,
            });
          }}
          colors={colors}
          sx={{
            ...(colors.length > 4 && {
              maxWidth: 144,
              justifyContent: 'flex-end',
            }),
          }}
        />
      );
    }

    if (opt.type === 'radio') {
      return (
        <FormControl component="fieldset">
          <RadioGroup
            onChange={(e) => {
              onSelectOption({
                ...selectedOptions,
                [opt.displayName.toLowerCase()]: e.target.value as string,
              });
            }}
            value={get(selectedOptions, [opt.displayName.toLowerCase()], '')}
            row
            aria-label={`radio-${opt.displayName}`}
          >
            {opt.values.map((v, i: number) => {
              return (
                <FormControlLabel
                  key={`${opt.id}-${i}`}
                  value={v.value}
                  control={<Radio />}
                  label={v.label}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      );
    }

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>{opt.displayName}</InputLabel>
          <Select
            onChange={(e) => {
              onSelectOption({
                ...selectedOptions,
                [opt.displayName.toLowerCase()]: e.target.value as string,
              });
            }}
            value={get(selectedOptions, [opt.displayName.toLowerCase()], '')}
            size="small"
            placeholder={opt.displayName}
            label={opt.displayName}
          >
            {opt.values.map((v, i: number) => {
              return (
                <MenuItem key={`${opt.id}-${i}`} value={v.value}>
                  {v.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <Stack spacing={2}>
      {options.map((opt) => (
        <Box
          key={`product-form-option-${opt.displayName}`}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            {opt.displayName}
          </Typography>
          {renderInputOption(opt)}
        </Box>
      ))}
    </Stack>
  );
};

export default ProductOptions;
