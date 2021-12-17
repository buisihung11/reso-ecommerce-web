import { Cart, CartItem, CartPrepareRequest, OrderDetail } from '@/types/cart';
import { uniqueId } from 'lodash';

export const mapCartModelToPrepare = (cartModel: Cart | undefined) => {
  if (!cartModel) {
    return null;
  }
  let order_details: OrderDetail[] = [];
  cartModel.items.forEach((cartItem) => {
    order_details.push(...mapCartItemToOrderDetails(cartItem));
  });
  // other data

  console.log(`order_details`, order_details);

  const prepareCart: CartPrepareRequest = {
    order_details,
  };

  return prepareCart;
};

export const mapCartModelToCheckout = (cartModel: Cart | undefined) => {
  if (!cartModel) {
    return null;
  }
  let order_details: OrderDetail[] = [];
  let tmpId = 0;
  cartModel.items.forEach((cartItem) => {
    order_details.push(...mapCartItemToOrderDetails(cartItem, tmpId));
  });
  // other data

  const prepareCart: CartPrepareRequest = {
    order_details,
  };

  return prepareCart;
};

// Solution: return {orderDetails, tmpId } ???
export const mapCartItemToOrderDetails = (
  cartItem: CartItem,
  parentTmpid?: number,
  parentQuantity: number = 1,
): OrderDetail[] => {
  let order_details: OrderDetail[] = [];
  const { selectedVariant, selectedExtras, productChilds } = cartItem;

  let parentItem: OrderDetail = {
    product_id: cartItem.product_id,
    quantity: cartItem.quantity * parentQuantity,
    tmp_id: Number(uniqueId()),
    parent_id: parentTmpid,
  };
  let extraParentItem = parentItem;
  order_details.push(parentItem);

  if (selectedVariant) {
    let variantItem: OrderDetail = {
      product_id: selectedVariant.product_id,
      quantity: parentItem.quantity,
      tmp_id: Number(uniqueId()),
      parent_id: parentItem.tmp_id,
    };

    order_details.push(variantItem);
    extraParentItem = variantItem;
  }

  if (selectedExtras && selectedExtras.length !== 0) {
    const extrasItem = selectedExtras.map<OrderDetail>((extra) => ({
      product_id: extra.product_id,
      quantity: extra.quantity * extraParentItem.quantity,
      parent_id: extraParentItem.tmp_id,
      tmp_id: Number(uniqueId()),
    }));
    order_details.push(...extrasItem);
  }

  if (productChilds && productChilds.length !== 0) {
    productChilds.forEach((group) => {
      group.products.forEach((p) => {
        order_details.push(
          ...mapCartItemToOrderDetails(
            p,
            parentItem.tmp_id,
            parentItem.quantity,
          ),
        );
      });
    });
  }
  return order_details;
};

export const hashCartRequest = (cartRequest: CartPrepareRequest | null) => {
  // hash base on product parent, childs , extras...
  if (!cartRequest) {
    return null;
  }
  return cartRequest.order_details.map<Omit<OrderDetail, 'tmp_id'>>(
    ({ product_id, quantity }) => ({
      product_id,
      quantity,
    }),
  );
};
