import { TCollection } from '@/types/collection';
import { BaseResponse } from '@/types/request';
import request from '@/utils/request';

export const getAllCollections = (params: any) =>
  request
    .get<BaseResponse<TCollection>>('/collections', { params })
    .then((res) => res.data);
