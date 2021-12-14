import { CombinationMode, ProductCombo, TProductDetail } from '@/types/product';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartItem, SelectedChoice } from '@/types/cart';

const useComboBuilder = (combo?: ProductCombo) => {
  const [hasCompleted, setHasCompleted] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState<SelectedChoice[]>([]);

  const choiceGroups = useMemo(
    () =>
      (combo?.groups ?? [])
        .filter((g) => g.combination_mode === CombinationMode.CHOICE)
        .sort((a, b) => a.postion - b.postion ?? 0),
    [combo?.groups],
  );

  const fixedGroups = useMemo(
    () =>
      (combo?.groups ?? [])
        .filter((g) => g.combination_mode === CombinationMode.FIXED)
        .sort((a, b) => a.postion - b.postion ?? 0),
    [combo?.groups],
  );

  const choice = useCallback(
    (groupId: number, item: CartItem) => {
      const selectedChoice = selectedChoices.findIndex(
        (c) => c.groupId === groupId,
      );
      let updatedChoices = [...selectedChoices];
      if (selectedChoice < 0) {
        updatedChoices.push({
          groupId,
          products: [item],
        });
      } else {
        updatedChoices[selectedChoice].products.push(item);
      }
      setSelectedChoices(updatedChoices);
    },
    [selectedChoices],
  );

  const currentStep = useMemo(() => {
    const nextChoiceGroup = choiceGroups.findIndex((g) => {
      const currentSelected = selectedChoices.find(
        (selectedGroup) => selectedGroup.groupId === g.id,
      );
      if (!currentSelected) return true;
      const totalSelected = currentSelected.products.reduce(
        (total, p) => p.quantity + total,
        0,
      );
      return totalSelected >= g.min && totalSelected < g.max;
    });

    if (nextChoiceGroup === -1) {
      setHasCompleted(true);
    }
    return nextChoiceGroup;
  }, [selectedChoices, choiceGroups]);

  const reset = useCallback(() => {
    setSelectedChoices([]);
    setHasCompleted(false);
  }, []);

  const buildComboCartItem = (): Omit<CartItem, 'quantity'> | null => {
    if (!combo) return null;
    return {
      ...combo,
      productChilds: selectedChoices,
    };
  };

  return {
    hasCompletedChoice: hasCompleted,
    currentStep,
    choice,
    choiceGroups,
    reset,
    buildComboCartItem,
    selectedChoices,
    fixedGroups,
  };
};

export default useComboBuilder;
