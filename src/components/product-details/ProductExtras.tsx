import { SelectedExtra, TExtraGroup } from '@/types/product';
import { fCurrency } from '@/utils/formatNumber';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Box,
  Checkbox,
} from '@mui/material';
import { get } from 'lodash';
import React, { useState } from 'react';
import ProductQuantity from './ProductQuantity';

type Props = {
  extras: TExtraGroup[];
  selected: SelectedExtra[];
  onSelect: (selected: SelectedExtra) => void;
  onUpdate: (selected: SelectedExtra) => void;
  onRemove: (productId: number) => any;
  // selectedOptions: SelectedOptions | null;
};

const ProductExtras = ({ extras, ...props }: Props) => {
  if (!extras.length) {
    return <></>;
  }

  return (
    <Stack spacing={2}>
      {extras?.map((extra) => (
        <ExtraGroup key={extra.extra_cate_id} extra={extra} {...props} />
      ))}
    </Stack>
  );
};

const ExtraGroup = ({
  extra,
  selected = [],
  onSelect,
  onRemove,
  onUpdate,
}: Omit<Props, 'extras'> & {
  extra: TExtraGroup;
}) => {
  const [error, setError] = useState<string | null>(null);

  const min = +get(extra.min_max?.split('-'), [0], 0);
  const max = +get(extra.min_max?.split('-'), [1], 1);
  const isOptional = min === 0;

  const totalSelectedExtra = selected.reduce(
    (total, selection) => total + selection.quantity,
    0,
  );

  const handleSelection = (newSelect: SelectedExtra) => {
    try {
      onSelect(newSelect);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">{extra.extra_cate_name ?? '-'}</Typography>
          <Typography variant="subtitle1">
            {isOptional ? 'Optional' : 'Bắt buộc'}, tối đa {max}
          </Typography>
        </Stack>
        <Typography variant="caption" color="error.main">
          {error}
        </Typography>
      </Box>
      <Box maxWidth="340px">
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup
            name="controlled-radio-buttons-group"
            onChange={console.log}
            sx={{ width: '100%' }}
          >
            <Stack spacing={2}>
              {extra.extra_products.map((extraProduct, i: number) => {
                const selection = selected.find(
                  (s) => s.product_id === extraProduct.product_id,
                );
                return (
                  <Stack
                    key={`${extra.extra_cate_id}-${extraProduct.product_id}`}
                    direction="row"
                    width="100%"
                    alignItems="center"
                  >
                    <FormControlLabel
                      key={`${extraProduct.product_id}-${i}`}
                      value={extraProduct.product_id}
                      control={
                        <Checkbox
                          checked={Boolean(selection)}
                          onChange={(e) => {
                            console.log(`e.target.checked`, e.target.checked);
                            if (e.target.checked) {
                              handleSelection({
                                product_id: extraProduct.product_id,
                                quantity: 1,
                                extra_id: extra.cate_id,
                              });
                            } else {
                              console.log(`remove`, extraProduct.product_id);
                              onRemove(extraProduct.product_id);
                            }
                          }}
                        />
                      }
                      label={extraProduct.product_name}
                    />
                    {selection && (
                      <ProductQuantity
                        min={0}
                        max={max}
                        onChange={(quantity) => {
                          try {
                            if (quantity === 0) {
                              onRemove(extraProduct.product_id);
                            } else {
                              onUpdate({
                                product_id: extraProduct.product_id,
                                quantity,
                                extra_id: extra.cate_id,
                              });
                            }
                          } catch (error) {
                            setError((error as Error).message);
                          }
                        }}
                        value={selection.quantity}
                      />
                    )}
                    <Box flex={1} />
                    <Typography fontWeight="bold">
                      {fCurrency(extraProduct.price)}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default ProductExtras;
