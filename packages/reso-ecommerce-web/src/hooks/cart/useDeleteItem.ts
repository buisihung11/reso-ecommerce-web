import { SelectedOptions, TProduct } from '@/types/product';
import { useMutation, useQueryClient } from 'react-query';
import { getProductVariant } from '../product/helpers';
import CartStorage from './cartStorage';
import useCart, { Cart } from './useCart';

type DeleteParam = {
  productId: number;
  productVariantId?: number | string;
};

const deleteItem = async ({ productId, productVariantId }: DeleteParam) => {
  return { productId, productVariantId };
};

const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteItem, {
    onSuccess: ({ productId, productVariantId }) => {
      const cart = queryClient.getQueryData<Cart>(['cart']);
      const cartItems = [...(cart?.items ?? [])];

      const deleteIdx = cartItems.findIndex(
        (item) =>
          item.product_id === productId &&
          (!productVariantId || productVariantId === item.selectedVariant?.id),
      );
      console.log(`deleteIdx`, deleteIdx);

      if (deleteIdx > -1) {
        cartItems.splice(deleteIdx, 1);
      }

      CartStorage.set({ ...cart, items: [...cartItems] });

      queryClient.invalidateQueries(['cart']);
    },
    onError: (e) => {
      console.log('e', e);
    },
  });
};

export default useDeleteItem;
