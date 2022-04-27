import { ReactNode, createContext, useState, useEffect } from 'react';

const initialState = {
  message: {
    hasLayout: true,
    contact: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
  },
};

const IframeMessageContext = createContext(initialState);

type IframeMessageProviderProps = {
  children: ReactNode;
  receivedMessage: any;
};

function IframeMessageProvider({
  children,
  receivedMessage,
}: IframeMessageProviderProps) {
  const [messages, setMessages] = useState({
    message: initialState.message,
  });
  useEffect(() => {
    setMessages({ message: receivedMessage });
  }, [receivedMessage]);

  return (
    <IframeMessageContext.Provider
      value={{
        ...messages,
      }}
    >
      {children}
    </IframeMessageContext.Provider>
  );
}
export { IframeMessageProvider, IframeMessageContext };
