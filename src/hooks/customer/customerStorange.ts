import { CustomerCartInfo } from '@/types/cart';
import { getCookie, setCookie } from '@/utils/utils';

const CustomerStorage = {
  get() {
    return getCookie('CUSTOMER_INFO');
  },
  set(cart: Partial<CustomerCartInfo | null | undefined>) {
    setCookie('CUSTOMER_INFO', JSON.stringify(cart));
  },
};

export default CustomerStorage;
