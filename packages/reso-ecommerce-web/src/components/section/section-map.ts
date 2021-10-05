import CallToActionSection from './CallToAction.section';
import HomeContentSection from './HomeContent.section';
import HomeCarouselSection from './HomeCarousel.section';
import ProductGridSection from './ProductGrid.section';
import CollectionContentSection from './CollectionContent.section';
import ProductViewSection from './ProductView.section';
import CartContentSection from './CartContent.section';
import CheckoutContentSection from './CheckoutContent.section';

const sections = {
  'collection-content': CollectionContentSection,
  'checkout-content': CheckoutContentSection,
  'cart-content': CartContentSection,
  'home-content': HomeContentSection,
  'home-carousel': HomeCarouselSection,
  'call-to-action': CallToActionSection,
  'product-grid': ProductGridSection,
  'product-view': ProductViewSection,
};

export default sections;
