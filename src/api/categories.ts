import { TCategory } from '@/types/category';
import { generateAPI, generateAPIWithPaging } from './utils';

const categoryApi = {
  ...generateAPIWithPaging<TCategory>('categories'),
};

export default categoryApi;
