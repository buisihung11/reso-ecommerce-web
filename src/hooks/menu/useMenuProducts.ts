
import { TMenu } from '@/types/menu';
import { ProductInMenu, TProduct } from '@/types/product';
import { BaseResponse, ErrorResponse, TRequestPaging } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  id?: number | undefined | null;
  params?:any;
};
const getProductInMenu = (
    id: number,
    params: TRequestPaging & any,
  ) =>
    request
      .get<BaseResponse<ProductInMenu>>(`/menus/${id}/products`, { params })
      .then((res) => res.data);
  
const useMenuProducts = ({ id, params }: Props = {}) => {
    const productsInMenu = useQuery<
      BaseResponse<ProductInMenu>>(['menus', id, 'products', {params}], () => getProductInMenu(id!, params));

  return {
    ...productsInMenu,
    data: productsInMenu.data?.data,
    metadata: productsInMenu.data?.metadata,
  };
};

export default useMenuProducts;
