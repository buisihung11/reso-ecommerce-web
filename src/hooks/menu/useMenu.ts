import { TMenu } from '@/types/menu';
import { ErrorResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  id?: number | undefined | null;
};

export const getMenuDetail = (id: any): Promise<TMenu> =>
  request.get(`/menus/${id}`).then((res) => res.data);

const useMenu = ({ id }: Props) => {
  const store = useQuery<TMenu, ErrorResponse>(
    ['menus', id],
    () => getMenuDetail(id),
  );

  return {
    ...store,
  };
};

export default useMenu;
