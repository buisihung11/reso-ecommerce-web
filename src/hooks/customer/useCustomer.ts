import { CustomerCartInfo } from '@/types/cart';
import { sleep } from '@/utils/utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CustomerStorage from './customerStorange';

const DEFAULT_CUSTOMERINFO = null;
/**  Change this by fetching `Cart` from your `API` */
const getCustomerInfo = () => {
  try {
    const raw = CustomerStorage.get();
    if (!raw) return DEFAULT_CUSTOMERINFO;
    const cart = JSON.parse(raw) as CustomerCartInfo;
    return cart;
  } catch (error) {
    return DEFAULT_CUSTOMERINFO;
  }
};

const useCustomer = () => {
  return useQuery(['customer'], () => getCustomerInfo(), {
    cacheTime: 30000,
    refetchOnWindowFocus: false,
    initialData: DEFAULT_CUSTOMERINFO,
    placeholderData: DEFAULT_CUSTOMERINFO,
  });
};

const updateCustInfo = async (custInfo: CustomerCartInfo) => {
  sleep(300);
  return custInfo;
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCustInfo, {
    onSuccess: (custData) => {
      CustomerStorage.set(custData);
      queryClient.invalidateQueries(['customer']);
    },
  });
};

export default useCustomer;
