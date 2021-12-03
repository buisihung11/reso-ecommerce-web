import * as React from 'react';
import Link from '@/components/Link';
import CartIcon from '../icons/cart';
import { cartButton, badge } from './cart-button.module.css';

export function CartButton({ quantity = 2 }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      href="/cart"
      passHref
      className={cartButton}
    >
      <CartIcon />
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </Link>
  );
}
