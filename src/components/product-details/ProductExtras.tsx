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
} from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import ProductQuantity from './ProductQuantity';

type Props = {
  extras: TExtraGroup[];
  selected: SelectedExtra[];
  onSelect: (selected: SelectedExtra) => boolean;
  onRemove: (productId: number) => any;
  // selectedOptions: SelectedOptions | null;
};

const ProductExtras = ({ extras, selected, onRemove, onSelect }: Props) => {
  if (!extras.length) {
    return <></>;
  }

  return (
    <Stack spacing={2}>
      {extras?.map((extra) => (
        <ExtraGroup
          key={extra.extra_cate_id}
          extra={extra}
          selected={selected}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      ))}
    </Stack>
  );
};

const ExtraGroup = ({
  extra,
  selected = [],
  onSelect,
  onRemove,
}: {
  extra: TExtraGroup;
  selected: SelectedExtra[];
  onSelect: (selected: SelectedExtra) => boolean;
  onRemove: (productId: number) => any;
}) => {
  const min = +get(extra.min_max?.split('-'), [0], 0);
  const max = +get(extra.min_max?.split('-'), [1], 1);
  const isOptional = min === 0;

  const totalSelectedExtra = selected.reduce(
    (total, selection) => total + selection.quantity,
    0,
  );

  const handleSelection = (newSelect: SelectedExtra) => {
    let selection = selected.find((s) => s.product_id === newSelect.product_id);
    if (selection) {
      selection.quantity = newSelect.quantity;
    } else {
      selection = newSelect;
    }
    if (totalSelectedExtra + selection?.quantity > max) {
      return;
    }

    onSelect(selection);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6">{extra.extra_cate_name ?? '-'}</Typography>
        <Typography variant="subtitle1">
          {isOptional ? 'Optional' : 'Bắt buộc'}, tối đa {max}
        </Typography>
      </Stack>
      <Box maxWidth="340px">
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup sx={{ width: '100%' }}>
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
                      <Radio
                        checked={Boolean(selection)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleSelection({
                              product_id: extraProduct.product_id,
                              quantity: 1,
                            });
                          } else {
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
                      onChange={(quantity) => {
                        if (quantity === 0) {
                          onRemove(extraProduct.product_id);
                        } else {
                          handleSelection({
                            product_id: extraProduct.product_id,
                            quantity,
                          });
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
          </RadioGroup>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default ProductExtras;
