import { useReducer, useEffect } from 'react';
import { ProductVariant, SelectedOptions, TProduct } from '@/types/product';
import { useMutation, useQuery } from 'react-query';
import { getProductVariant } from '../product/helpers';
import { getCookie, setCookie } from '@/utils/utils';
import CartStorage from './cartStorage';

type CartItem = Omit<TProduct, 'variants'> & {
  quantity: number;
  /**
   * if the product doesn't have variant this will be null
   * */
  selectedVariant?: ProductVariant | null;
};

export type Cart = {
  items: CartItem[];
};

const DEFAULT_CART: Cart = {
  items: [],
};

/**  Change this by fetching `Cart` from your `API` */
const getCart = () => {
  try {
    const raw = CartStorage.get();
    console.log('raw', raw);
    if (!raw) return DEFAULT_CART;
    const cart = JSON.parse(raw) as Cart;
    return cart;
  } catch (error) {
    return DEFAULT_CART;
  }
};

// const actionTypes = {
//   addItem: 'ADD_ITEM',
//   on: 'ON',
//   off: 'OFF',
// };

// function reducer(
//   state: Cart = DEFAULT_CART,
//   action: { type: string; payload: any },
// ): Cart {
//   switch (action.type) {
//     case actionTypes.addItem: {
//       return { ...state, items: [...state.items, action.payload] };
//     }
//     default:
//       return state;
//   }
// }

const addItem = (
  product: TProduct,
  quantity: number,
  selectedOptions?: SelectedOptions | null,
) => {
  let variant = getProductVariant(product, selectedOptions);

  // TODO check if product is not single product
  if (!variant && product.variants?.length) {
    variant = product.variants[0];
  }
  return;
};

const useCart = () => {
  const { data,  } = useQuery(['cart'], () => getCart(), {
    cacheTime: 30000,
    refetchOnWindowFocus: false,
    // enabled: false,
    initialData: DEFAULT_CART,
    placeholderData: DEFAULT_CART,
  });

  useEffect(() => {
    // TODO: Update price when cart is change
    console.log('Update price');
  }, [data]);

  // const [cart, dispatch] = useReducer(reducer, data ?? DEFAULT_CART);

  return {
    cart: data ?? DEFAULT_CART,
  };
};

export default useCart;
