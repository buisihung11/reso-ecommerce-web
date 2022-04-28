
import { BaseApi, generateAPI, generateAPIWithPaging } from './utils';
import { BaseResponse, TRequestPaging } from '@/types/request';
import request from '@/utils/request';
import { TStore } from '@/types/store';


export const getAllStoresPath = (params: any = {}) =>
  request
    .get<BaseResponse<TStore>>('/stores', {
      params: {
        page:1,
        size:50,
        ...params,
      },
    })
    .then((res) => res.data.data.map(({ id }) => id));

const getAllStores = (params: any): Promise<BaseResponse<TStore>> =>
    request.get('/stores', { params }).then((res) => res.data);
  
const storeApi = {
  ...generateAPIWithPaging<any>('stores'),
  getAllStoresPath,
  getAllStores
};


export default storeApi;
