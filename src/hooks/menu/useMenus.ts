import { getAllMenu } from '@/api/menu';
import { TProduct } from '@/types/product';
import { BaseResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  params?: any;
};

const useMenus = ({ params }: Props) => {
  const menus = useQuery(['menus', params], () => getAllMenu(params));

  return {
    ...menus,
    data: menus.data?.data,
    metadata: menus.data?.metadata,
  };
};

export default useMenus;
