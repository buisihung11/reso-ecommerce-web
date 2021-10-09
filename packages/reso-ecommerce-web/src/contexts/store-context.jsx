import * as React from 'react';
// import fetch from "isomorphic-fetch"
// import Client from "shopify-buy"

const client = {};

const defaultValues = {
  cart: [],
  isOpen: false,
  loading: false,
  isShowReviewCart: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  setChangeShowReviewCart: (isShow) => {},
  client,
  checkout: {
    lineItems: [
      {
        quantity: 1,
      },
      {
        quantity: 2,
      },
    ],
  },
};

export const StoreContext = React.createContext(defaultValues);

const isBrowser = typeof window !== `undefined`;
const localStorageKey = `shopify_checkout_id`;

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = React.useState(defaultValues.checkout);
  const [loading, setLoading] = React.useState(false);
  const [isShowReviewCart, setIsShowReviewCart] = React.useState(false);
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false);

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout?.id);
    }
    setCheckout(checkout);
  };

  const setChangeShowReviewCart = (isShow) => {
    setIsShowReviewCart(isShow);
  };

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null;

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = false;
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout);
            return;
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null);
        }
      }

      const newCheckout = await client.checkout?.create();
      setCheckoutItem(newCheckout);
    };

    initializeCheckout();
  }, []);

  const addVariantToCart = (variantId, quantity) => {
    setLoading(true);

    const checkoutID = checkout.id;

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res);
        setLoading(false);
        setDidJustAddToCart(true);
        setTimeout(() => setDidJustAddToCart(false), 3000);
      });
  };

  const removeLineItem = (checkoutID, lineItemID) => {
    setLoading(true);

    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then((res) => {
        setCheckout(res);
        setLoading(false);
      });
  };

  const updateLineItem = (checkoutID, lineItemID, quantity) => {
    setLoading(true);

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ];

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res);
        setLoading(false);
      });
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
        isShowReviewCart,
        setChangeShowReviewCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
