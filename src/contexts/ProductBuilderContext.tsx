import { CartItem } from '@/types/cart';
import {
  getDefaultOptionFromProduct,
  getProductVariant,
} from '@/hooks/product/helpers';
import {
  SelectedExtra,
  SelectedOptions,
  TDerivedExtraGroup,
  TProductDetail,
} from '@/types/product';
import { intersection, get } from 'lodash';
import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from 'react';

const ProductBuilderContext = createContext<any>(null);

const ProductBuilderProvider = ({
  product,
  children,
}: {
  product: TProductDetail;
  children: ReactNode;
}) => {
  // LOCAL STATE: Variant, extras, options
  const [selectedOptions, setSelectedOptions] =
    useState<SelectedOptions | null>(() =>
      getDefaultOptionFromProduct({
        ...product,
      }),
    );
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>([]);
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedOptions>(
    {},
  );

  // RENDER STATE:
  const variant = useMemo(
    () => getProductVariant({ ...product }, selectedOptions),
    [product, selectedOptions],
  );
  const options = useMemo(() => product.options, [product.options]);
  const extras = useMemo(() => {
    let extrasGroup = product.extras;
    if (!extrasGroup) return null;
    return extrasGroup.map<TDerivedExtraGroup>((extra) => {
      const min = +get(extra.min_max?.split('-'), [0], 0);
      const max = +get(extra.min_max?.split('-'), [1], 1);
      const isOptional = min === 0;
      return {
        ...extra,
        min,
        max,
        isOptional,
      };
    });
  }, [product.extras]);
  const modifiers = useMemo(() => product.modifiers, [product.modifiers]);

  // BUILT IN STATE
  const hasVariant = Boolean(options?.length);
  const hasExtra = Boolean(extras?.length);
  const hasModifier = Boolean(modifiers?.length);
  // Logic function
  // VARIANT
  // 1. Select option
  const selectOption = useCallback((optionName: string, value: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionName.toLowerCase()]: `${value}`,
    });
  }, []);
  // EXTRA
  // 1. Add extra
  const addExtra = useCallback(
    (selected: SelectedExtra) => {
      // console.log(`selected`, selected);
      if (!hasExtra || !selected) return;
      let updateSelected = [...selectedExtras];
      const selectedIndex = selectedExtras.findIndex(
        (s) => s.product_id === selected.product_id,
      );
      const extra = getExtraGroup(extras!, selected.extra_id);
      const totalSelectedExtra = selectedExtras
        .filter((e) => e.extra_id == extra?.cate_id)
        .reduce((total, selection) => total + selection.quantity, 0);
      if (selectedIndex > -1) {
        selected.quantity =
          selected.quantity + selectedExtras[selectedIndex].quantity;
      }
      if (totalSelectedExtra + selected?.quantity > extra!.max) {
        throw new Error('Vượt số lượng tối đa');
      }
      if (selectedIndex > -1) {
        updateSelected.splice(selectedIndex, 1, selected);
      } else {
        updateSelected.push(selected);
      }
      setSelectedExtras(updateSelected);
    },
    [hasExtra, extras, selectedExtras],
  );
  // 2. Update extra
  const updateExtra = useCallback(
    (selected: SelectedExtra) => {
      if (!hasExtra) return;
      const selectedIndex = selectedExtras.findIndex(
        (s) => s.product_id === selected.product_id,
      );
      if (selectedIndex < 0) {
        throw new Error('Không tìm thấy extra');
      }
      const extra = getExtraGroup(extras!, selected.extra_id);
      const totalSelectedExtra = selectedExtras
        .filter(
          (e) =>
            e.extra_id === extra?.cate_id &&
            e.product_id !== selected.product_id,
        )
        .reduce((total, selection) => total + selection.quantity, 0);
      if (totalSelectedExtra + selected?.quantity > extra!.max) {
        throw new Error('Vượt số lượng tối đa');
      }
      const updateSelected = replaceItemAtIndex(
        selectedExtras,
        selectedIndex,
        selected,
      );
      setSelectedExtras(updateSelected);
    },
    [hasExtra, selectedExtras],
  );
  // 3. Remove extra
  const removeExtra = useCallback(
    (productId: number) => {
      const selectedIndex = selectedExtras.findIndex(
        (s) => s.product_id === productId,
      );
      if (selectedIndex > -1) {
        setSelectedExtras(removeItemAtIndex(selectedExtras, selectedIndex));
      }
    },
    [hasExtra, selectedExtras],
  );
  // MODIFIER
  // 1. Add modifier
  const addModifier = useCallback(
    (option: SelectedOptions) => {
      if (!hasModifier) return;
      setSelectedModifiers({
        ...selectedModifiers,
        ...option,
      });
    },
    [hasModifier, selectedModifiers],
  );

  // 2. remove modifier
  const removeModifier = useCallback(
    (optionName: any) => {
      if (!hasModifier) return;
      let updateModifier = { ...selectedModifiers };
      delete updateModifier[optionName];
      setSelectedModifiers(updateModifier);
    },
    [hasModifier, selectedModifiers],
  );

  const buildItem = (): CartItem => {
    // CHECK EXTRA
    if (hasExtra) {
      let isValidExtra = extras?.every((extraGroup) => {
        const totalSelected = selectedExtras
          .filter((e) => e.extra_id === extraGroup.cate_id)
          .reduce((total, e) => e.quantity + total, 0);

        return (
          totalSelected >= extraGroup.min && totalSelected <= extraGroup.max
        );
      });

      if (!isValidExtra) {
        throw new Error('Extra không hợp lệ');
      }
    }
    // CHECK MODIFIER
    if (hasModifier) {
      const isValidModifier = modifiers?.every((m) => {
        if (m.is_required) {
          return (
            intersection(
              Object.values(selectedModifiers),
              m.options.map((o) => o.value),
            ).length !== 0
          );
        }
        return true;
      });
      if (!isValidModifier) {
        throw new Error('Vui lòng chọn modifier');
      }
    }
    // TODO:TRANSFORM TO ITEM IN CART
    return {
      ...product,
      quantity: 1,
      selectedVariant: variant,
      selectedExtras,
      selectedModifiers,
    };
  };
  return (
    <ProductBuilderContext.Provider
      value={{
        selectedExtras,
        selectedOptions,
        selectedModifiers,
        // RENDER STATE
        extras,
        modifiers,
        options,
        variant,
        // PROCESS FUNCTION
        selectOption,
        addExtra,
        updateExtra,
        removeExtra,
        addModifier,
        removeModifier,
        // BUILT IN STATE
        hasVariant,
        hasExtra,
        hasModifier,
        buildItem,
      }}
    >
      {children}
    </ProductBuilderContext.Provider>
  );
};

const getExtraGroup = (extras: TDerivedExtraGroup[], extraId: number) =>
  extras.find((e) => e.cate_id == extraId);

function replaceItemAtIndex(arr: any[], index: number, newValue: any) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: any[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export { ProductBuilderContext };

export default ProductBuilderProvider;
