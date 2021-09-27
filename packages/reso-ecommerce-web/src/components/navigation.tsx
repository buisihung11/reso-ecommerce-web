import { HStack, Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import Link from 'next/link';
import * as React from 'react';

type Props = {
  navigations?: {
    label: string;
    link: string;
  }[];
  className?: string;
};

const NavLink = chakra(Text, {
  baseStyle: {
    minW: '80px',
    color: 'gray.400',
    '&:hover': {
      color: 'black',
    },
  },
});

export function Navigation({ className, navigations }: Props) {
  return (
    <HStack py={2} spacing={4} maxW="100%" overflowY="scroll">
      <Link key="Tất cả" href="/">
        <a>
          <NavLink noOfLines={1}>Tất cả</NavLink>
        </a>
      </Link>
      {navigations?.map(({ label, link }) => (
        <Link key={label} href={link}>
          <a>
            <NavLink noOfLines={1}>{label}</NavLink>
          </a>
        </Link>
      ))}
    </HStack>
  );
}
