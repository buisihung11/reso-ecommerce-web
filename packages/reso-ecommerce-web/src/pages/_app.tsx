import { AppProps } from 'next/app';
// theme
import ThemeConfig from '@/theme';
import GlobalStyles from '@/theme/globalStyles';
import ThemePrimaryColor from '@/components/ThemePrimaryColor';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import 'simplebar/dist/simplebar.min.css';
import '@/styles/reset.css';
import '@/styles/variables.css';
import '@/styles/global.css';

import { FC, useState } from 'react';
import { StoreProvider } from '@/contexts/store-context';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const Noop: FC = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const Layout = (Component as any).Layout || Noop;

  return (
    // TODO: Add toastify container
    <ThemeConfig>
      <ThemePrimaryColor>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <Layout>
              <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={true} />
              </Hydrate>
            </Layout>
          </StoreProvider>
        </QueryClientProvider>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
