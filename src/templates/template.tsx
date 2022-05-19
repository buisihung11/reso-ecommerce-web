import SectionInstances, { SectionProps } from '@/components/section/Section';
import sections from '@/components/section/section-map';
import useIframeMessage from '@/hooks/useIframeMessage';
import layouts from '@/layouts/layouts';
import { Breadcrumbs, Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useState } from 'react';
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
  const { message } = useIframeMessage();
  const router = useRouter();

  const BREADSCUMB_LINKS = [
    { linkname: 'Trang chính', pathname: '/' },
    // { id: '3', linkname: 'Trang chính', pathname: '/' },
  ];
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

  const LaypoutWrapper =
    message && !message.hasLayout ? React.Fragment : Layout;

  return (
    <LaypoutWrapper>
      {message && !message.hasLayout && router.pathname != '/' && (
        <Breadcrumbs aria-label="breadcrumb" sx={{ paddingLeft: '2rem' }}>
          {BREADSCUMB_LINKS.map((link, index) => (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={link.pathname}
            >
              {link.linkname}
            </Link>
          ))}

          {/* <Typography color="text.primary">Sản phẩm</Typography> */}
        </Breadcrumbs>
      )}
      <Wrapper>{sectionContent}</Wrapper>
    </LaypoutWrapper>
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
