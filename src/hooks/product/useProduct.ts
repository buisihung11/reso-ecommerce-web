import { TProduct } from '@/types/product';
import { ErrorResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  id?: number | undefined;
};

export const getProductDetail = (id: any): Promise<TProduct> =>
  request.get(`/products/${id}`).then((res) => res.data);

const useProduct = ({ id }: Props) => {
  const product = useQuery<TProduct, ErrorResponse>(
    ['products', id],
    () => getProductDetail(id),
    {
      // TODO: Remove this when API was fixed
      select: (data) => ({ ...data, product_id: id! }),
      enabled: Boolean(id),
    },
  );

  return {
    ...product,
  };
};

export default useProduct;
