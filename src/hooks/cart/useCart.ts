import { Cart, CartItem, CustomerCartInfo, SelectedChoice } from '@/types/cart';
import { useCallback } from 'react';
import {
  ProductVariant,
  SelectedExtra,
  SelectedOptions,
  TProduct,
} from '@/types/product';
import { useQuery } from 'react-query';
import CartStorage from './cartStorage';
import { mapCartModelToPrepare } from './helper';
import useCartPrice from './useCartPrice';

const DEFAULT_CART: Cart = {
  items: [],
  total: 0,
  totalItem: 0,
};

/**  Change this by fetching `Cart` from your `API` */
const getCart = () => {
  try {
    const raw = CartStorage.get();
    if (!raw) return DEFAULT_CART;
    const cart = JSON.parse(raw) as Cart;
    console.log(`cart`, cart);
    return cart;
  } catch (error) {
    return DEFAULT_CART;
  }
};

const useCart = () => {
  const { data, refetch } = useQuery(['cart'], () => getCart(), {
    cacheTime: 30000,
    refetchOnWindowFocus: false,
    initialData: DEFAULT_CART,
    placeholderData: DEFAULT_CART,
  });

  const {
    data: cartPrice,
    error,
    isLoading,
  } = useCartPrice(mapCartModelToPrepare(data));

  const totalItem =
    data?.items.reduce((acc, cartItem) => acc + cartItem.quantity, 0) ?? 0;

  const cart = Object.assign(DEFAULT_CART, data, cartPrice, { totalItem });

  const getCartItemPrice = useCallback(
    (id: number | string) => {
      const cartItem = cartPrice?.order_details?.find(
        (od) => od.product_id == id,
      );

      if (!cartItem) return null;
      return cartItem;
    },
    [cartPrice],
  );

  const resetCart = useCallback(() => {
    CartStorage.set();
    refetch();
  }, [refetch]);

  return {
    cart,
    getCartItemPrice,
    processing: isLoading,
    error,
    resetCart,
  };
};

export type UseCartReturnValue = ReturnType<typeof useCart>;

export default useCart;
