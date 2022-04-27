import CartTemplate from './cart.template';
import CheckoutTemplate from './checkout.template';
import CollectionTemplate from './collection.template';
import ComboDetailTemplate from './combo-detail.template';
import ComboListTemplate from './combo.template';
import HomeTemplate from './home.template';
import OrderDetailTemplate from './order.template';
import ProductListTemplate from './product-list.template';
import StoreListTemplate from './store-list.template';

const templates = {
  home: HomeTemplate,
  collection: CollectionTemplate,
  cart: CartTemplate,
  checkout: CheckoutTemplate,
  order: OrderDetailTemplate,
  'product-list': ProductListTemplate,
  'combo-list': ComboListTemplate,
  'combo-detail': ComboDetailTemplate,
  'store-list': StoreListTemplate,
};

export default templates;
