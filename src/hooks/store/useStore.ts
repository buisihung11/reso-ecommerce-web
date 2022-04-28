import { TStore } from '@/types/store';
import { ErrorResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  id?: number | undefined | null;
};

export const getStoreDetail = (id: any): Promise<TStore> =>
  request.get(`/stores/${id}`).then((res) => res.data);

const useStore = ({ id }: Props) => {
  const store = useQuery<TStore, ErrorResponse>(
    ['stores', id],
    () => getStoreDetail(id),
  );

  return {
    ...store,
  };
};

export default useStore;
