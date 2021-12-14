import { ProductCombo, TProduct, TProductDetail } from '@/types/product';
import { ErrorResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  id?: number | undefined;
};

export const getProductDetail = (id: any): Promise<ProductCombo> =>
  request.get(`/products/${id}`).then((res) => res.data);

const useCombo = ({ id }: Props) => {
  const product = useQuery<ProductCombo, ErrorResponse>(
    ['combos', id],
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

export default useCombo;
