import TemplateFactory from './template';

// ----------------------------------------------------------------------

export default function OrderDetailTemplate() {
  return (
    <TemplateFactory
      layout="default"
      sections={[
        {
          name: 'order-content',
        },
      ]}
    />
  );
}
