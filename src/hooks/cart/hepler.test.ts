import { Cart, CartItem, OrderDetail } from '@/types/cart';
import { mapCartItemToOrderDetails, mapCartModelToPrepare } from './helper';

describe('test mapCartItemToOrderDetails', () => {
  describe('test product with extra', () => {
    const productWithExtra: CartItem = {
      product_id: 1,
      quantity: 1,
      selectedExtras: [
        {
          product_id: 2,
          quantity: 2,
        },
        {
          product_id: 3,
          quantity: 4,
        },
      ],
    } as CartItem;
    const orderDetails = mapCartItemToOrderDetails(productWithExtra);
    const parent = orderDetails.find((od) => !od.parent_id);

    test('should parent not has parent_id', () => {
      expect(parent).not.toBeUndefined();
    });

    test('should extra has parent_id', () => {
      expect(orderDetails[1]).toMatchObject<Partial<OrderDetail>>({
        product_id: 2,
        parent_id: parent?.tmp_id as number,
        quantity: 2,
      });
    });

    test('should other extra has parent_id', () => {
      expect(orderDetails[2]).toMatchObject<Partial<OrderDetail>>({
        product_id: 3,
        parent_id: parent?.tmp_id as number,
        quantity: 4,
      });
    });
  });

  describe('test product with variant', () => {
    const productWithExtra: CartItem = {
      product_id: 1,
      quantity: 1,
      selectedExtras: [
        {
          extra_id: 12,
          product_id: 2,
          quantity: 1,
        },
        {
          extra_id: 12,
          product_id: 3,
          quantity: 1,
        },
      ],
      selectedVariant: {
        product_id: 4,
      },
    } as CartItem;
    const orderDetails = mapCartItemToOrderDetails(productWithExtra);
    const parent = orderDetails.find((od) => !od.parent_id);
    const variant = orderDetails.find((od) => od.parent_id === parent?.tmp_id);

    test('should parent not has parent_id', () => {
      expect(parent).not.toBeUndefined();
    });

    test('should variant has parent_id', () => {
      expect(variant?.parent_id).toBe(parent?.tmp_id);
    });

    test('should extra has parent_id of variant', () => {
      expect(orderDetails[2].parent_id).toBe(variant?.tmp_id);
    });

    test('should other extra has parent_id of variant', () => {
      expect(orderDetails[3].parent_id).toBe(variant?.tmp_id);
    });
  });

  describe('test product with combo', () => {
    const productWithExtra: CartItem = {
      product_id: 1,
      quantity: 1,
      productChilds: [
        {
          groupId: 1,
          products: [
            {
              product_id: 2,
              quantity: 1,
            },
          ],
        },
        {
          groupId: 2,
          products: [
            {
              product_id: 3,
              quantity: 2,
              selectedExtras: [
                {
                  extra_id: 12,
                  product_id: 4,
                  quantity: 1,
                },
                {
                  extra_id: 12,
                  product_id: 5,
                  quantity: 1,
                },
              ],
            },
          ],
        },
        {
          groupId: 3,
          products: [
            {
              product_id: 6,
              quantity: 1,
              selectedVariant: {
                product_id: 7,
              },
            },
          ],
        },
      ],
    } as CartItem;
    const orderDetails = mapCartItemToOrderDetails(productWithExtra);
    const parent = orderDetails.find((od) => od.product_id === 1);
    const singleComboItem = orderDetails.find((od) => od.product_id === 2);
    const comboItemWithExtra = orderDetails.find((od) => od.product_id === 3);
    const comboItemParentVariant = orderDetails.find(
      (od) => od.product_id === 6,
    );
    const comboItemVariant = orderDetails.find((od) => od.product_id === 7);
    const firstExtra = orderDetails.find((od) => od.product_id === 4);
    const secondExtra = orderDetails.find((od) => od.product_id === 5);

    test('should parent not has parent_id', () => {
      expect(parent).not.toBeUndefined();
    });

    test('should combo item has parent_id', () => {
      expect(singleComboItem?.parent_id).toBe(parent?.tmp_id);
    });

    test('should combo item with extra has parent_id', () => {
      expect(comboItemWithExtra?.parent_id).toBe(parent?.tmp_id);
    });

    test('should extra has parent_id of comboitem', () => {
      expect(firstExtra?.parent_id).toBe(comboItemWithExtra?.tmp_id);
    });

    test('should comboitem master has parent_id', () => {
      expect(comboItemParentVariant?.parent_id).toBe(parent?.tmp_id);
    });

    test('should comboitem variant has parent_id of master', () => {
      expect(comboItemVariant?.parent_id).toBe(comboItemParentVariant?.tmp_id);
    });
  });

  describe('test single product has extra with quantity > 2', () => {
    const productWithExtra: CartItem = {
      product_id: 1,
      quantity: 2,
      selectedExtras: [
        {
          product_id: 2,
          quantity: 2,
        },
        {
          product_id: 3,
          quantity: 4,
        },
      ],
    } as CartItem;
    const orderDetails = mapCartItemToOrderDetails(productWithExtra);
    const parent = orderDetails.find((od) => od.product_id === 1);
    const firstExtra = orderDetails.find((od) => od.product_id === 2);

    test('should extras has quantity equal parent quantity multiply with its quantity', () => {
      expect(firstExtra?.quantity).toBe(4);
    });
  });

  describe('test variant product has extra with quantity > 2', () => {
    const productMasterWithExtra: CartItem = {
      product_id: 1,
      quantity: 2,
      selectedExtras: [
        {
          product_id: 2,
          quantity: 2,
        },
        {
          product_id: 3,
          quantity: 4,
        },
      ],
      selectedVariant: {
        product_id: 4,
      },
    } as CartItem;
    const orderDetails = mapCartItemToOrderDetails(productMasterWithExtra);
    const parent = orderDetails.find((od) => od.product_id === 1);
    const variant = orderDetails.find((od) => od.product_id === 4);
    const firstExtra = orderDetails.find((od) => od.product_id === 2);

    test('should variant has quantity equal parent quantity ', () => {
      expect(variant?.quantity).not.toBeUndefined();
      expect(variant?.quantity).toBe(parent?.quantity);
    });

    test('should extras has quantity equal variant quantity multiply with its quantity', () => {
      expect(firstExtra?.quantity).toBe(Number(variant?.quantity) * 2);
    });
  });

  describe('test combo product contains child has extra which has quantity > 2', () => {
    const productComboWithExtra: CartItem = {
      product_id: 1,
      quantity: 2,
      productChilds: [
        {
          groupId: 1,
          products: [
            {
              product_id: 2,
              quantity: 1,
            },
          ],
        },
        {
          groupId: 2,
          products: [
            {
              product_id: 3,
              quantity: 2,
              selectedExtras: [
                {
                  extra_id: 12,
                  product_id: 4,
                  quantity: 2,
                },
              ],
            },
          ],
        },
        {
          groupId: 3,
          products: [
            {
              product_id: 6,
              quantity: 2,
              selectedExtras: [
                {
                  extra_id: 12,
                  product_id: 2,
                  quantity: 2,
                },
              ],
              selectedVariant: {
                product_id: 7,
              },
            },
          ],
        },
      ],
    } as CartItem;
    const orderDetails = mapCartItemToOrderDetails(productComboWithExtra);
    const parent = orderDetails.find((od) => od.product_id === 1);
    const singleComboItem = orderDetails.find((od) => od.product_id === 2);
    const singleComboItemWithExtra = orderDetails.find(
      (od) => od.product_id === 3,
    );
    const parentMasterComboItemWithExtra = orderDetails.find(
      (od) => od.product_id === 6,
    );
    const variantComboItemWithExtra = orderDetails.find(
      (od) => od.product_id === 7,
    );
    const extraOfSingleItem = orderDetails.find(
      (od) =>
        od.product_id === 4 &&
        od.parent_id === singleComboItemWithExtra?.tmp_id,
    );
    const extraOfVariantItem = orderDetails.find(
      (od) =>
        od.product_id === 2 &&
        od.parent_id === variantComboItemWithExtra?.tmp_id,
    );

    test('should single item has quantity equal parent quantity multiply with its quantity', () => {
      expect(singleComboItem?.quantity).toBe(Number(parent?.quantity) * 1);
    });

    test('should single item with extra has quantity equal parent quantity multiply with its quantity', () => {
      expect(singleComboItemWithExtra?.quantity).toBe(
        Number(parent?.quantity) * 2,
      );
    });

    test('should extra of single item has quantity equal parent quantity multiply with its quantity', () => {
      expect(extraOfSingleItem?.quantity).toBe(
        Number(singleComboItemWithExtra?.quantity) * 2,
      );
    });

    test('should master variant item has quantity equal parent quantity multiply with its quantity', () => {
      expect(parentMasterComboItemWithExtra?.quantity).toBe(
        Number(parent?.quantity) * 2,
      );
    });

    test('should variant item has quantity equal parent quantity', () => {
      expect(variantComboItemWithExtra?.quantity).toBe(
        Number(parentMasterComboItemWithExtra?.quantity),
      );
    });

    test('should extra of variant item has quantity equal variant quantity multiply with its quantity', () => {
      expect(extraOfVariantItem?.quantity).toBe(
        Number(variantComboItemWithExtra?.quantity) * 2,
      );
    });
  });
});
