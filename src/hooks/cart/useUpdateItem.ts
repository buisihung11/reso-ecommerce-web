import { SelectedOptions, TProduct } from '@/types/product';
import { useMutation, useQueryClient } from 'react-query';
import { getProductVariant } from '../product/helpers';
import CartStorage from './cartStorage';
import useCart, { Cart } from './useCart';

type UpdateParam = {
  productId: number;
  productVariantId?: number | string;
  quantity: number;
};

const updateItem = async ({
  productId,
  productVariantId,
  quantity,
}: UpdateParam) => {
  return { productId, productVariantId, quantity };
};

const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation(updateItem, {
    onSuccess: ({ productId, productVariantId, quantity }) => {
      const cart = queryClient.getQueryData<Cart>(['cart']);
      const cartItems = [...(cart?.items ?? [])];

      const updateIdx = cartItems.findIndex(
        (item) =>
          item.product_id === productId &&
          (!productVariantId ||
            productVariantId === item.selectedVariant?.product_id),
      );

      if (updateIdx > -1) {
        cartItems[updateIdx] = { ...cartItems[updateIdx], quantity };
      }

      CartStorage.set({ ...cart, items: [...cartItems] });

      queryClient.invalidateQueries(['cart']);
    },
    onError: (e) => {
      console.log('e', e);
    },
  });
};

export default useUpdateItem;
