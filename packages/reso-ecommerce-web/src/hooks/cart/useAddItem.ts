import { SelectedOptions, TProduct } from '@/types/product';
import { useMutation, useQueryClient } from 'react-query';
import { getProductVariant } from '../product/helpers';
import CartStorage from './cartStorage';
import useCart, { Cart } from './useCart';

const addItem = async ({
  product,
  quantity,
  selectedOptions,
}: {
  product: TProduct;
  quantity: number;
  selectedOptions?: SelectedOptions | null;
}) => {
  let variant = getProductVariant(product, selectedOptions);

  // TODO check if product is not single product
  if (!variant && product.variants?.length) {
    variant = product.variants[0];
  }
  const newCartItem = {
    ...product,
    quantity,
    selectedVariant: variant,
  };

  return newCartItem;
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
          (!newCartItem.selectedVariant?.id ||
            newCartItem.selectedVariant?.id === item.selectedVariant?.id),
      );

      if (updateIdx > -1) {
        const updateItem = cartItems[updateIdx];
        cartItems[updateIdx] = {
          ...cartItems[updateIdx],
          quantity: newCartItem.quantity + updateItem.quantity,
        };
        CartStorage.set({ ...cart, items: cartItems });
      } else {
        CartStorage.set({ ...cart, items: [...cart!.items, newCartItem] });
      }

      queryClient.invalidateQueries(['cart']);
    },
  });
};

export default useAddItem;
