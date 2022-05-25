import { TStore } from '@/types/store';
import { BaseResponse, ErrorResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';
import { StoreCurrentMenu } from '@/types/menu';

type Props = {
  id?: number | undefined | null;
};

const getStoreCurMenu = (id: any): Promise<StoreCurrentMenu> =>
  request.get(`/stores/${id}/current-menu`).then((res) => res.data);

const useStoreCurMenu = ({ id }: Props) => {
  const storecurmenu = useQuery<StoreCurrentMenu, ErrorResponse>(
    ['stores', id, 'current-menu'],
    () => getStoreCurMenu(id),
  );
  return {
    ...storecurmenu,
  };
};

export default useStoreCurMenu;
