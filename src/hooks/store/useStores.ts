import  storeApi from '@/api/stores';
import { useQuery } from 'react-query';

type Props = {
  params?: any;
};

const useStores = ({ params }: Props = {}) => {
  const stores = useQuery(['stores',params], () =>
  storeApi.getAllStores(params),
  {
    refetchOnWindowFocus: false,
  }
  );

  return {
    ...stores,
    data: stores.data?.data,
    metadata: stores.data?.metadata,
  };
};

export default useStores;
