import { TMenu } from '@/types/menu';
import { BaseResponse } from '@/types/request';
import request from '@/utils/request';

export const getAllMenuPaths = (params: any = {}) =>
  request
    .get<BaseResponse<TMenu>>('/menus', {
      params: {
        ...params,
      },
    })
    .then((res) => res.data.data.map(({ menu_id }) => menu_id));

export const getAllMenu = (params: any): Promise<BaseResponse<TMenu>> =>
  request.get('/menus', { params }).then((res) => res.data);

