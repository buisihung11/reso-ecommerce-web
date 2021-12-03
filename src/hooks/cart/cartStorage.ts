import { getCookie, setCookie } from '@/utils/utils';
import { Cart } from './useCart';

const CartStorage = {
  get() {
    return localStorage.getItem('CART_LOCALSTORAGE_KEY');
  },
  set(cart?: Partial<Cart | null>) {
    console.log(`save cart`, cart);
    localStorage.setItem('CART_LOCALSTORAGE_KEY', JSON.stringify(cart));
  },
};

export default CartStorage;
