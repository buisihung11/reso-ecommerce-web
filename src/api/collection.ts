import { TCollection } from '@/types/collection';
import { TProduct } from '@/types/product';
import { BaseResponse, TRequestPaging } from '@/types/request';
import request from '@/utils/request';

export const getAllCollections = (params: TRequestPaging & any) =>
  request
    .get<BaseResponse<TCollection>>('/collections', { params })
    .then((res) => res.data);

export const getAllCollectionPaths = (params: TRequestPaging & any) =>
  request
    .get<BaseResponse<TCollection>>('/collections', { params })
    .then((res) => res.data.data.map((col) => col.id));

export const getProductInCollection = (
  id: number,
  params: TRequestPaging & any,
) =>
  request
    .get<BaseResponse<TProduct>>(`/collections/${id}/products`, { params })
    .then((res) => res.data);
