import categoryApi from '@/api/categories';
import { useQuery } from 'react-query';

type Props = {
  params?: any;
};

const useCategories = ({ params }: Props = {}) => {
  const categories = useQuery(['categories'], () => categoryApi.get(params));

  return {
    ...categories,
    data: categories.data?.data.data,
    metadata: categories.data?.data.metadata,
  };
};

export default useCategories;
