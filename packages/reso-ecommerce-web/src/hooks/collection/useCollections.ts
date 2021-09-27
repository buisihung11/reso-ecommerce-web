import { getAllCollections } from '@/api/collection';
import { getAllProduct } from '@/api/product';
import { TProduct } from '@/types/product';
import { BaseResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  params?: any;
};

const useCollections = ({ params }: Props = {}) => {
  const collections = useQuery(['collections'], () =>
    getAllCollections(params),
  );

  return {
    ...collections,
    data: collections.data?.data,
    metadata: collections.data?.metadata,
  };
};

export default useCollections;
