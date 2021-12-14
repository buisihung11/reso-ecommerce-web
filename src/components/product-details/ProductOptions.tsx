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
  onSelectOption: (optionName: string, value: string) => void;
};

const ProductOptions = ({
  options,
  selectedOptions = {},
  onSelectOption,
}: Props) => {
  const renderInputOption = (opt: ProductOption) => {
    const handleSelect = (e: any) => {
      onSelectOption(optionName.toLowerCase(), e.target.value as string);
    };

    const optionName = opt.display_name ?? 'Lựa chọn';
    if (optionName?.toLowerCase() === 'color') {
      const colors = opt.values;
      return (
        <ColorSinglePicker
          onChange={(e) => {
            handleSelect(e);
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

    const type = opt.type ?? 'radio';

    if (type === 'radio') {
      return (
        <FormControl component="fieldset">
          <RadioGroup
            onChange={handleSelect}
            value={get(
              selectedOptions,
              [optionName.toLowerCase()],
              '',
            )?.toLowerCase()}
            row
            aria-label={`radio-${optionName}`}
          >
            {opt.values.map((v, i: number) => {
              return (
                <FormControlLabel
                  key={`${opt.id}-${i}`}
                  value={v.toLowerCase()}
                  control={<Radio />}
                  label={v}
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
          <InputLabel>{optionName}</InputLabel>
          <Select
            onChange={handleSelect}
            value={get(selectedOptions, [optionName.toLowerCase()], '')}
            size="small"
            placeholder={optionName}
            label={optionName}
          >
            {opt.values.map((v, i: number) => {
              return (
                <MenuItem key={`${opt.id}-${i}`} value={v}>
                  {v}
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
          key={`product-form-option-${opt.display_name}`}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            {opt.display_name}
          </Typography>
          {renderInputOption(opt)}
        </Box>
      ))}
    </Stack>
  );
};

export default ProductOptions;
