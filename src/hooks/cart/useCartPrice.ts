import cartApi from '@/api/cart';
import { CartPrepareRequest } from '@/types/cart';
import { sleep } from '@/utils/utils';
import { useQuery } from 'react-query';
import { CartItem } from './useCart';

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

const useCartPrice = (props: CartPrepareRequest | null) => {
  return useQuery(
    ['cart', props],
    () => {
      return prepareCart(props!);
    },
    {
      enabled: Boolean(props) && Boolean(props?.order_details?.length),
      retry: 5,
    },
  );
};

export default useCartPrice;
