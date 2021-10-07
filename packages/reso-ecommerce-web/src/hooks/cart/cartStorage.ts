import { getCookie, setCookie } from '@/utils/utils';
import { Cart } from './useCart';

const CartStorage = {
  get() {
    return getCookie('CART_LOCALSTORAGE_KEY');
  },
  set(cart: Partial<Cart | null | undefined>) {
    console.log(`save cart`, cart);
    setCookie('CART_LOCALSTORAGE_KEY', JSON.stringify(cart));
  },
};

export default CartStorage;
