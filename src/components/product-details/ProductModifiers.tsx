import { SelectedOptions, SelectType, TModifier } from '@/types/product';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

type Props = {
  modifiers: TModifier[];
  selected: SelectedOptions;
  onAddModifier: (option: SelectedOptions) => void;
  onRemoveModifier: (optionName: string) => void;
};

const ProductModifiers = ({ modifiers, ...props }: Props) => {
  if (!modifiers.length) {
    return <></>;
  }

  return (
    <Stack spacing={2}>
      {modifiers?.map((modifier) => (
        <ModifierGroup key={modifier.id} modifier={modifier} {...props} />
      ))}
    </Stack>
  );
};

const ModifierGroup = ({
  modifier,
  onAddModifier,
  onRemoveModifier,
  selected,
}: Omit<Props, 'modifiers'> & { modifier: TModifier }) => {
  const isOptional = !modifier.is_required;

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6">{modifier.title ?? '-'}</Typography>
        <Typography variant="subtitle1">
          {isOptional ? 'Optional' : 'Bắt buộc'}
        </Typography>
      </Stack>
      <Box maxWidth="340px">
        <FormGroup sx={{ width: '100%' }}>
          {modifier.options.map((option, i: number) => {
            let control =
              modifier.select_type === SelectType.SINGLE ? (
                <Radio />
              ) : (
                <Checkbox
                  onChange={(e) => {
                    // console.log(`e`, e.target.checked);
                    if (e.target.checked) {
                      onAddModifier({ [option.label]: option.value });
                    } else {
                      onRemoveModifier(option.label);
                    }
                  }}
                />
              );
            const checked = Boolean(selected[option.label]);
            return (
              <Stack
                key={`${modifier.id}-${option.value}`}
                direction="row"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <FormControlLabel
                  key={`${option.value}-${i}`}
                  value={option.value}
                  checked={checked}
                  control={control}
                  label={option.label}
                  onChange={(ev) => console.log(ev)}
                />
              </Stack>
            );
          })}
        </FormGroup>
      </Box>
    </Stack>
  );
};

export default ProductModifiers;
