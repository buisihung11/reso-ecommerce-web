import { ProductVariant, TProduct } from '@/types/product';
import { useQuery } from 'react-query';
import CartStorage from './cartStorage';
import useCartPrice from './useCartPrice';

export type CartItem = Omit<TProduct, 'variants'> & {
  quantity: number;
  /**
   * if the product doesn't have variant this will be null
   * */
  selectedVariant?: ProductVariant | null;
};

export type Cart = {
  items: CartItem[];
  total: number;
  finalAmount: number;
  totalItem: number;
};

const DEFAULT_CART: Cart = {
  items: [],
  total: 0,
  finalAmount: 0,
  totalItem: 0,
};

/**  Change this by fetching `Cart` from your `API` */
const getCart = () => {
  try {
    const raw = CartStorage.get();
    if (!raw) return DEFAULT_CART;
    const cart = JSON.parse(raw) as Cart;
    console.log(`cart parsed`, cart);
    return cart;
  } catch (error) {
    return DEFAULT_CART;
  }
};

const useCart = () => {
  const { data } = useQuery(['cart'], () => getCart(), {
    cacheTime: 30000,
    refetchOnWindowFocus: false,
    initialData: DEFAULT_CART,
    placeholderData: DEFAULT_CART,
  });

  const {
    data: cartPrice,
    error,
    isLoading,
  } = useCartPrice({
    cartItems:
      data?.items.map((item) => ({
        id: item.selectedVariant?.id ?? item.product_id,
        price: item.price,
        quantity: item.quantity,
      })) ?? [],
  });

  const totalItem =
    data?.items.reduce((acc, cartItem) => acc + cartItem.quantity, 0) ?? 0;

  const cart = Object.assign(DEFAULT_CART, data, cartPrice, { totalItem });

  return {
    cart,
    processing: isLoading,
    error,
  };
};

export default useCart;
