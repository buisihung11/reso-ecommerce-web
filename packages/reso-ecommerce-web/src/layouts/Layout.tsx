import React, { FC } from 'react';
import Header from '@/components/header';
import Footer from './Footer';

interface Props {
  // pageProps: {
  //   pages?: Page[];
  //   categories: Category[];
  // };
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
