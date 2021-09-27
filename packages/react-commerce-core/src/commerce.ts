import axios, { AxiosInstance } from 'axios';

interface ICommerceProviderConfig {
  // name of provider
  name?: string;
  commerceURL: string;
  config?: any;
  operations: ICommerceOperations;
}

interface ICommerceOperations {
  auth?: {};
  cart?: {};
  products?: {
    getVariants(masterId: any, params: any): Promise<any | undefined> | any;
    getVariant(
      masterId: any,
      variantId: any,
      params?: any
    ): Promise<any | undefined> | any;
    getAllProducts(params: any): Promise<any | undefined> | any;
    retrieve(id: any, input: any): Promise<any | undefined> | any;
  };
  checkout?: {};
  promotions?: {};
  wishlist?: {};
  [key: string]: any;
}

export interface ICommerceProvider {
  name?: string;
  config: any;
  fetcher: AxiosInstance;
  [key: string]: any;
}

export function getCommerceCore(
  provider: ICommerceProviderConfig
): ICommerceProvider {
  const commerce: any = {};
  commerce.config = provider.config;
  commerce.name = provider.name;

  Object.keys(provider.operations).forEach((k: string) => {
    commerce[k] = provider.operations[k];
  });

  commerce.fetcher = axios({
    baseURL: provider.commerceURL,
    ...provider.config,
  });

  return commerce as ICommerceProvider;
}
