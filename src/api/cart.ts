import {
  CartPrepareRequest,
  CartPrepareResponse,
  CheckoutOrderRequest,
  CheckoutResponse,
} from '@/types/cart';
import request from '@/utils/request';

const prepareOrder = (cartPrepare: CartPrepareRequest) => {
  return request.post<CartPrepareResponse>(`/orders/prepare`, cartPrepare);
};

const checkout = (cartPrepare: CheckoutOrderRequest) => {
  return request.post<CheckoutResponse>(`/orders`, cartPrepare);
};

const cartApi = {
  prepareOrder,
  checkout,
};

export default cartApi;
