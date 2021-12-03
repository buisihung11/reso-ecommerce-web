import { Chip, ChipProps, Stack } from '@mui/material';
import { isArray } from 'lodash';
import React from 'react';

interface Props {
  options?: {
    label: string;
    value: any;
  }[];
  onChange?: (value: any) => any;
  value: any;
  multiple?: boolean;
  ChipProps?: ChipProps;
}

const SelectableChipField = ({
  options = [],
  value,
  multiple,
  onChange,
  ChipProps,
}: Props) => {
  const onChangeHandler = (selectedValue: any) => {
    const updateValue = multiple ? [...value, selectedValue] : selectedValue;
    if (onChange) {
      onChange(updateValue);
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      rowGap={1}
      spacing={1}
      flexWrap="wrap"
    >
      {options.map((opt) => {
        const hasSelected = multiple
          ? isArray(value) && value.includes(opt.value)
          : opt.value == value;
        return (
          <Chip
            sx={{
              borderRadius: '8px',
            }}
            variant={hasSelected ? 'filled' : 'outlined'}
            {...ChipProps}
            onClick={() => onChangeHandler(opt.value)}
            clickable
            key={`chip-option-${opt.value}`}
            label={opt.label}
          />
        );
      })}
    </Stack>
  );
};

export default SelectableChipField;
