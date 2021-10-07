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

const prepareCart = async ({ cartItems, vouchers }: CartPriceProps) => {
  const totalPrice =
    cartItems.reduce(
      (acc, cartItem) => acc + (cartItem.price ?? 10000) * cartItem.quantity,
      0,
    ) ?? 0;
  try {
    await sleep(2000);
    // TODO: Update fetching price item
    return {
      total: totalPrice,
      finalAmount: totalPrice - 5000 * (vouchers?.length ?? 0),
    };
  } catch (error) {
    throw new Error('Lỗi cập nhật giỏ hàng');
  }
};

const useCartPrice = (
  props: CartPriceProps = {
    cartItems: [],
  },
) => {
  return useQuery(['cart', props], () => {
    return prepareCart(props);
  });
};

export default useCartPrice;
