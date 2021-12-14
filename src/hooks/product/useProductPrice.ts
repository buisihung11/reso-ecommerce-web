import { TProduct } from '@/types/product';
import { useMemo } from 'react';
/**
 * Process logic for calculate price of product base on quantity
 * @param  {TProduct} product
 */
const useProductPrice = (product: TProduct, quantity: number) => {
  const price = useMemo(() => {
    const productInMenu = product.product_in_menu;
    if (!productInMenu) return product.price * quantity;

    let basePrice = productInMenu?.price1 ?? product.price;
    if (productInMenu?.is_fixed_price) return basePrice * quantity;

    let totalPrice = 0;
    let lastPrice = basePrice;

    for (let index = 0; index < quantity; index++) {
      const priceIndex = `price${index + 1}`;
      let currentPrice = (productInMenu as any)![priceIndex] ?? lastPrice;
      totalPrice += currentPrice;
    }
    return totalPrice;
  }, [quantity, product.product_in_menu, product.price]);

  return price;
};

export default useProductPrice;
