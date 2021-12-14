import { ProductBuilderContext } from '@/contexts/ProductBuilderContext';
import { TProductDetail } from '@/types/product';
import { useContext } from 'react';

/**
 * Provide encapsulated function for processing with building product for cart
 * @param  {TProductDetail} product
 */

const useItemBuilder = () => {
  const context = useContext(ProductBuilderContext);

  if (!context)
    throw new Error(
      'Product builder context must be use inside ProductBuilderContext',
    );

  return context;
};

export default useItemBuilder;
