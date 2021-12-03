import { getAllProduct } from '@/api/product';
import { TProduct } from '@/types/product';
import { BaseResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  params?: any;
};

const useProducts = ({ params }: Props) => {
  const products = useQuery(['products', params], () => getAllProduct(params));

  return {
    ...products,
    data: products.data?.data,
    metadata: products.data?.metadata,
  };
};

export default useProducts;
