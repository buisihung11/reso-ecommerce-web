import { SelectType, TModifier } from '@/types/product';
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
  // selectedOptions: SelectedOptions | null;
};

const ProductModifiers = ({ modifiers }: Props) => {
  if (!modifiers.length) {
    return <></>;
  }

  return (
    <Stack spacing={2}>
      {modifiers?.map((modifier) => (
        <ModifierGroup key={modifier.id} modifier={modifier} />
      ))}
    </Stack>
  );
};

const ModifierGroup = ({ modifier }: { modifier: TModifier }) => {
  const isOptional = modifier.is_required;
  let control =
    modifier.select_type === SelectType.SINGLE ? <Radio /> : <Checkbox />;
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6">{modifier.title ?? '-'}</Typography>
        <Typography variant="subtitle1">
          {isOptional ? 'Optional' : 'Bắt buộc'}
        </Typography>
      </Stack>
      <Box maxWidth="340px">
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormGroup sx={{ width: '100%' }}>
            {modifier.options.map((option, i: number) => {
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
                    control={control}
                    label={option.label}
                  />
                </Stack>
              );
            })}
          </FormGroup>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default ProductModifiers;
