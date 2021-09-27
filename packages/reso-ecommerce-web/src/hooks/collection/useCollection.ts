import { getProductInCollection } from '@/api/collection';
import { TCollection } from '@/types/collection';
import { useQuery } from 'react-query';
import useCollections from './useCollections';

type Props = {
  id?: number;
  params?: any;
};

const useCollection = ({ id, params }: Props = {}) => {
  const productsInCollection = useQuery(['collections', id], () =>
    getProductInCollection(id!, params),
  );

  const collections = useCollections();

  const collectionInfo: TCollection | undefined = collections.data?.find(
    (col) => col.id === id,
  );

  return {
    ...productsInCollection,
    data: productsInCollection.data?.data,
    metadata: productsInCollection.data?.metadata,
    collectionInfo,
  };
};

export default useCollection;
