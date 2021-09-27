import { ICommerceProvider } from '../commerce';

interface IProductFeature {
  getVariants(masterId: any, params: any): Promise<any | undefined> | any;
  getVariant(
    masterId: any,
    variantId: any,
    params?: any
  ): Promise<any | undefined> | any;
  getAllProducts(params: any): Promise<any | undefined> | any;
  retrieve(id: any, input: any): Promise<any | undefined> | any;
}

const getProductFeatures = (
  commerce: ICommerceProvider
): Partial<IProductFeature> => ({
  getAllProducts(params) {
    return commerce.fetcher.get('/products', params);
  },
});

export default getProductFeatures;
