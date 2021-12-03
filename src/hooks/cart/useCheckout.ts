import cartApi from '@/api/cart';
import { CheckoutOrderRequest } from '@/types/cart';
import { useCallback, useState } from 'react';
import useCustomer from '../customer/useCustomer';
import { mapCartModelToPrepare } from './helper';
import useCart from './useCart';

const useCheckout = () => {
  const { cart } = useCart();
  const { data: customerInfo } = useCustomer();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkOut = useCallback(async () => {
    try {
      const orderDetail = mapCartModelToPrepare(cart);
      if (!orderDetail) throw Error('Không có sản phẩm trong giỏ hàng');
      if (!customerInfo) throw Error('Chưa nhập thông tin khách hàng');
      const data: CheckoutOrderRequest = {
        ...orderDetail,
        payments: [
          {
            type: 1,
            amount: 100000,
          },
        ],
        customer: { ...customerInfo },
      };

      setSubmitting(true);
      const res = await cartApi.checkout(data);
      return res.data;
    } catch (error: any) {
      console.log(`error`, error);
      setError(error?.message);
    } finally {
      setSubmitting(false);
    }
  }, [cart, customerInfo]);

  return {
    submitting,
    error,
    checkOut,
  };
};

export default useCheckout;
