import { CartPrepareRequest } from '@/types/cart';
import { Cart } from './useCart';

export const mapCartModelToPrepare = (cartModel: Cart | undefined) => {
  if (!cartModel) {
    return null;
  }
  const order_details = cartModel.items.map((cartItem) => ({
    product_id: Number(
      cartItem.selectedVariant?.product_id ?? cartItem.product_id,
    ),
    quantity: cartItem.quantity,
  }));
  // other data

  const prepareCart: CartPrepareRequest = {
    order_details,
  };

  return prepareCart;
};

export const mapCartModelToCheckout = (cartModel: Cart | undefined) => {
  if (!cartModel) {
    return null;
  }
  const order_details = cartModel.items.map((cartItem) => ({
    product_id: Number(
      cartItem.selectedVariant?.product_id ?? cartItem.product_id,
    ),
    quantity: cartItem.quantity,
  }));
  // other data

  const prepareCart: CartPrepareRequest = {
    order_details,
  };

  return prepareCart;
};
