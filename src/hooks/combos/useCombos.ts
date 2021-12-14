import { getAllProduct } from '@/api/product';
import { ProductTypeEnum, TProduct } from '@/types/product';
import { BaseResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  params?: any;
};

const useCombos = ({ params }: Props) => {
  const combos = useQuery(['combos', params], () =>
    getAllProduct({ ...params, 'product-type': ProductTypeEnum.Combo }),
  );

  return {
    ...combos,
    data: combos.data?.data,
    metadata: combos.data?.metadata,
  };
};

export default useCombos;
