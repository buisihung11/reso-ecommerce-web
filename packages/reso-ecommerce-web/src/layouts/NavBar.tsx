import { HStack, Stack } from '@chakra-ui/layout';
import Logo from '@/components/logo';

import React from 'react';
import Link from 'next/link';
import SearchIcon from '@/icons/search';
import useCollections from '@/hooks/collection/useCollections';
import { StoreContext } from '@/contexts/store-context';
import { CartButton } from '@/components/cart-button';
import { Navigation } from '@/components/navigation';
interface Props {}

export const NavBar = (props: Props) => {
  const { data: collections } = useCollections();

  const { checkout, loading } = React.useContext(StoreContext);

  const items = checkout ? checkout.lineItems : [];

  const quantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const navigations = collections?.map((col) => ({
    label: col.name,
    link: `/collections/${col.id}`,
  }));

  return (
    <Stack>
      <HStack justifyContent="space-between">
        <Link href="/search">
          <a>
            <SearchIcon />
          </a>
        </Link>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <CartButton quantity={quantity} />
      </HStack>
      <HStack justifyContent="center" spacing={1}>
        <Navigation navigations={navigations} />
      </HStack>
    </Stack>
  );
};
