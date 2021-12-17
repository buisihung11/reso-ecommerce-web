import cartApi from '@/api/cart';
import { CartPrepareRequest } from '@/types/cart';
import { useQuery } from 'react-query';
import { hashCartRequest } from './helper';

type CartItemPrepare = {
  id: string | number;
  quantity: number;
  price?: number;
};

type CartPriceProps = {
  cartItems: CartItemPrepare[];
  vouchers?: string[];
};

const prepareCart = async (cartPrepare: CartPrepareRequest) => {
  try {
    const res = await cartApi.prepareOrder(cartPrepare);
    return res.data;
  } catch (error) {
    throw new Error('Lỗi khi kiểm tra đơn hàng!');
  }
};

// TODO: Fix this
const useCartPrice = (cartRequest: CartPrepareRequest | null) => {
  return useQuery(
    ['cart', ...(hashCartRequest(cartRequest) ?? [])],
    () => {
      return prepareCart(cartRequest!);
    },
    {
      enabled:
        Boolean(cartRequest) && Boolean(cartRequest?.order_details?.length),
      retry: 5,
    },
  );
};

export default useCartPrice;
