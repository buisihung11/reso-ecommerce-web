import { getAllCollections } from '@/api/collection';
import { useQuery } from 'react-query';

type Props = {
  params?: any;
};

const useCollections = ({ params }: Props = {}) => {
  const collections = useQuery(['collections'], () =>
    getAllCollections(params),
  );

  return {
    ...collections,
    data: collections.data?.data,
    metadata: collections.data?.metadata,
  };
};

export default useCollections;
