import { TCategory } from '@/types/category';
import { ErrorResponse } from '@/types/request';
import request from '@/utils/request';
import { useQuery } from 'react-query';

type Props = {
  id?: number | undefined | null;
};

export const getCategoryDetail = (id: any): Promise<TCategory> =>
  request.get(`/categories/${id}`).then((res) => res.data);

const useCategory = ({ id }: Props) => {
  const category = useQuery<TCategory, ErrorResponse>(
    ['categories', id],
    () => getCategoryDetail(id),
  );

  return {
    ...category,
  };
};

export default useCategory;
