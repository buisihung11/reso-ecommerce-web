import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/reset.css';
import '@/styles/variables.css';
import '@/styles/global.css';
import { FC, useState } from 'react';
import { StoreProvider } from '@/context/store-context';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const Noop: FC = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const Layout = (Component as any).Layout || Noop;

  return (
    <ChakraProvider>
      <StoreProvider>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={true} />
            </Hydrate>
          </QueryClientProvider>
        </Layout>
      </StoreProvider>
    </ChakraProvider>
  );
}
