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
  return {
    product,
    quantity,
    selectedOptions,
  };
};

const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onSuccess: ({ product, selectedOptions, quantity }) => {
      const cart = queryClient.getQueryData<Cart>(['cart']);
      let variant = getProductVariant(product, selectedOptions);

      if (!variant && product.variants?.length) {
        variant = product.variants[0];
      }
      const newCartItem = { ...product, quantity, selectedVariant: variant };
      CartStorage.set({ ...cart, items: [...cart!.items, newCartItem] });

      queryClient.invalidateQueries(['cart']);
    },
  });
};

export default useAddItem;
