import CallToActionSection from './CallToAction.section';
import HomeContentSection from './HomeContent.section';
import HomeCarouselSection from './HomeCarousel.section';
import ProductGridSection from './ProductGrid.section';
import CollectionContentSection from './CollectionContent.section';

const sections = {
  'collection-content': CollectionContentSection,
  'home-content': HomeContentSection,
  'home-carousel': HomeCarouselSection,
  'call-to-action': CallToActionSection,
  'product-grid': ProductGridSection,
};

export default sections;
