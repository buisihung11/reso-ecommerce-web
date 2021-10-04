import { SelectedOptions, TProduct } from '@/types/product';

export function getProductVariant(
  product: TProduct,
  opts: SelectedOptions | null,
) {
  if (!opts) return product;
  const variant = product.variants?.find((variant) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.options.find((option) => {
        if (option.displayName.toLowerCase() === key.toLowerCase()) {
          return option.values.find((v) => v.value.toLowerCase() === value);
        }
      }),
    );
  });
  return variant;
}

export function getDefaultOptionFromProduct(product: TProduct) {
  // Selects the default option
  let defaultOpt = {};
  if (!product.variants) return null;

  product.variants[0].options?.forEach((v) => {
    defaultOpt = {
      ...defaultOpt,
      [v.displayName.toLowerCase()]: v.values[0].value.toLowerCase(),
    };
  });
  return defaultOpt;
}
