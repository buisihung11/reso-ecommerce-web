import { Container } from '@chakra-ui/layout';
import React, { FC } from 'react';
import Footer from './Footer';
import { NavBar } from './NavBar';

interface Props {
  // pageProps: {
  //   pages?: any[];
  //   collections?: TCollection[];
  // };
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Container maxW="100%">
      <NavBar />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
