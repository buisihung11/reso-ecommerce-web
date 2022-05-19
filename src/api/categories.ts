import { TCategory } from '@/types/category';
import { BaseApi, generateAPI, generateAPIWithPaging } from './utils';
import { BaseResponse, TRequestPaging } from '@/types/request';
import request from '@/utils/request';

export const getAllCatesPath = (params: any = {}) =>
request
  .get<BaseResponse<TCategory>>('/categories', {
    params: {
      ...params,
    },
  })
  .then((res) => res.data.data.map(({ cate_id }) => cate_id));
const getCategories = (params: any): Promise<BaseResponse<TCategory>> =>
    request.get('/categories', { params }).then((res) => res.data);
   
  
const categoryApi = {
  ...generateAPIWithPaging<TCategory>('categories'),
  getCategories
};


export default categoryApi;
