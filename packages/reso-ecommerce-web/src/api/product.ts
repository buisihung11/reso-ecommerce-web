import { TProduct } from '@/types/product';
import { BaseResponse } from '@/types/request';
import request from '@/utils/request';

export const getAllProductPaths = () =>
  request
    .get<BaseResponse<TProduct>>('/products', {
      params: {
        page: 1,
        size: 100,
      },
    })
    .then((res) => res.data.data.map(({ product_id }) => product_id));
