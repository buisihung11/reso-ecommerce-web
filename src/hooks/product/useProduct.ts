import { TProduct, TProductDetail } from '@/types/product';
import { ErrorResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  id?: number | undefined | null;
};

export const getProductDetail = (id: any): Promise<TProductDetail> =>
  request.get(`/products/${id}`).then((res) => res.data);

const useProduct = ({ id }: Props) => {
  const product = useQuery<TProductDetail, ErrorResponse>(
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
