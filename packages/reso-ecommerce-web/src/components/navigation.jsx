import * as React from 'react';
import { navStyle, navLink, activeLink } from './navigation.module.css';
import Link from 'next/link';

export function Navigation({ className }) {
  const productTypes = ['Computer', 'Shirt'];

  return (
    <nav className={[navStyle, className].join(' ')}>
      <Link key="All" href="/products/" activeClassName={activeLink}>
        <a className={navLink}>Tất cả</a>
      </Link>
      {productTypes.map((name) => (
        <Link
          key={name}
          href={`/products/${name}`}
          activeClassName={activeLink}
        >
          <a className={navLink}>{name}</a>
        </Link>
      ))}
    </nav>
  );
}
