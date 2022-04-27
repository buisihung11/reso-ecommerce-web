
import { BaseApi, generateAPI, generateAPIWithPaging } from './utils';
import { BaseResponse, TRequestPaging } from '@/types/request';
import request from '@/utils/request';

const getStores = (params: any): Promise<BaseResponse<any>> =>
    request.get('/stores', { params }).then((res) => res.data);
  
const storeApi = {
  ...generateAPIWithPaging<any>('stores'),
  getStores
};


export default storeApi;
