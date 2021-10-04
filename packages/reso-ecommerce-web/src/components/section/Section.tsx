import { Box } from '@mui/system';
import React, { FC } from 'react';
import sections from './section-map';

type KeyOfObject<T> = keyof T;

export type TSetting = {
  [key: string]: any;
};

export type TBlock = {
  id: string;
  settings?: TSetting;
  [key: string]: any;
};

export interface SectionProps {
  name: KeyOfObject<typeof sections>;
  /** Các kiểu `variant` của section */
  settings: TSetting;
  /** Các thành phần (`reuseable`) của section */
  blocks?: TBlock[];
  [key: string]: any;
}

const SectionInstances: FC<SectionProps> = ({ settings, name, ...others }) => {
  const Section = sections[name] ?? React.Fragment;
  // workaround
  return <Section settings={settings} {...(others as any)} />;
};

export default SectionInstances;
