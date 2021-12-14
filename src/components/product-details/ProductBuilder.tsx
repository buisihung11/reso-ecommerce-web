import useItemBuilder from '@/hooks/cart/useItemBuilder';
import useProductPrice from '@/hooks/product/useProductPrice';
import { TProductDetail } from '@/types/product';
import { fCurrency } from '@/utils/formatNumber';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { ProductExtras, ProductModifiers } from '.';
import ProductOptions from './ProductOptions';

interface Props {
  product: TProductDetail;
}

const ProductBuilder = () => {
  const {
    options,
    selectedOptions,
    selectOption,
    hasVariant,
    selectedExtras,
    extras,
    addExtra,
    removeExtra,
    updateExtra,
    modifiers,
    selectedModifiers,
    addModifier,
    removeModifier,
    hasExtra,
    hasModifier,
  } = useItemBuilder();

  return (
    <>
      {hasVariant && (
        <>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box py={2}>
            {/* START ATTRIBUTES */}
            {hasVariant && (
              <ProductOptions
                options={options!}
                selectedOptions={selectedOptions}
                onSelectOption={selectOption}
              />
            )}
            {/* END ATTRIBUTES */}
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}
      {hasExtra && (
        <>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box py={2}>
            <ProductExtras
              extras={extras!}
              selected={selectedExtras}
              onSelect={addExtra}
              onRemove={removeExtra}
              onUpdate={updateExtra}
            />
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}
      {hasModifier && (
        <>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box py={2}>
            <ProductModifiers
              onAddModifier={addModifier}
              onRemoveModifier={removeModifier}
              selected={selectedModifiers}
              modifiers={modifiers!}
            />
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}
    </>
  );
};

export default ProductBuilder;
