import SectionInstances, { SectionProps } from '@/components/section/Section';
import sections from '@/components/section/section-map';
import layouts from '@/layouts/layouts';
import React, { FC, useMemo } from 'react';
import templates from './template-map';

type KeyOfObject<T> = keyof T;

type Props<T extends {}> = {
  /** Tên của template */
  /** Các sections có trong template */
  sections: {
    name: KeyOfObject<typeof sections>;
    /** Key của setting sẽ là id của setting trong section và giá trị của key sẽ là value của setting */
    settings?: {
      [key: string]: any;
    };
    props?: any;
  }[];
  /** Tên layout dùng cho template, empty nếu để trống */
  layout?: KeyOfObject<typeof layouts>;
  /** Thứ tự xuất hiện của các sections */
  orders?: string[];
  /** Cấu hình thẻ sẽ bao thẻ template */
  wrapper?: React.FunctionComponent<any>;
  templateProps?: T;
};

const TemplateFactory = <T extends {}>({
  wrapper,
  sections,
  layout,
}: React.PropsWithChildren<Props<T>>) => {
  const Wrapper = wrapper ?? React.Fragment;
  const Layout = layout ? layouts[layout] : React.Fragment;

  // register name instance

  const sectionContent = useMemo(() => {
    // TODO: Add order section
    return sections.map(({ name, settings = {}, props, ...others }) => (
      <SectionInstances
        key={name}
        name={name}
        settings={settings}
        {...(props as any)}
        {...(others as any)}
      />
    ));
  }, [sections]);

  return (
    <Layout>
      <Wrapper>{sectionContent}</Wrapper>
    </Layout>
  );
};

export const getTemplateInstance = ({
  name,
}: {
  name: KeyOfObject<typeof templates>;
}) => {
  const Template = templates[name];
  return Template;
};

export default TemplateFactory;
