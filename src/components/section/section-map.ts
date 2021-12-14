import CallToActionSection from './CallToAction.section';
import HomeContentSection from './HomeContent.section';
import HomeCarouselSection from './HomeCarousel.section';
import ProductGridSection from './ProductGrid.section';
import CollectionContentSection from './CollectionContent.section';
import ProductViewSection from './ProductView.section';
import CartContentSection from './CartContent.section';
import CheckoutContentSection from './CheckoutContent.section';
import OrderContentSection from './OrderContent.section';
import ProductListContentSection from './product-list/ProductListContent.section';
import ComboListSection from './combos/ComboList.section';
import ComboViewSection from './combos/ComboView.section';

const sections = {
  'collection-content': CollectionContentSection,
  'checkout-content': CheckoutContentSection,
  'cart-content': CartContentSection,
  'home-content': HomeContentSection,
  'home-carousel': HomeCarouselSection,
  'call-to-action': CallToActionSection,
  'product-grid': ProductGridSection,
  'product-view': ProductViewSection,
  'order-content': OrderContentSection,
  'productlist-content': ProductListContentSection,
  // COMBOS
  'combo-list': ComboListSection,
  'combo-view': ComboViewSection,
};

export default sections;
