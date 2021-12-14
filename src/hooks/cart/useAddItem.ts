import { Cart, CartItem } from '@/types/cart';
import { useMutation, useQueryClient } from 'react-query';
import CartStorage from './cartStorage';

const addItem = async (cartItem: CartItem) => {
  return cartItem;
};

const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onSuccess: (newCartItem) => {
      const cart = queryClient.getQueryData<Cart>(['cart']);
      const cartItems = [...(cart?.items ?? [])];

      const updateIdx = cartItems.findIndex(
        (item) =>
          item.product_id === newCartItem.product_id &&
          (!newCartItem.selectedVariant ||
            newCartItem.selectedVariant?.product_id ===
              item.selectedVariant?.product_id),
      );

      console.log(`updateIdx`, updateIdx);
      if (updateIdx > -1) {
        const updateItem = cartItems[updateIdx];
        cartItems[updateIdx] = {
          ...cartItems[updateIdx],
          quantity: newCartItem.quantity + updateItem.quantity,
        };
        CartStorage.set({ ...cart, items: cartItems });
      } else {
        CartStorage.set({ ...cart, items: [newCartItem, ...cart!.items] });
      }

      queryClient.invalidateQueries(['cart']);
    },
  });
};

export default useAddItem;
