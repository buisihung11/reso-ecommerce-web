import { AppProps } from 'next/app';
// theme
import ThemeConfig from '@/theme';
import GlobalStyles from '@/theme/globalStyles';
import ThemePrimaryColor from '@/components/ThemePrimaryColor';


import { FC, useState } from 'react';
import { StoreProvider } from '@/contexts/store-context';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import createEmotionCache from '../components/createEmotionCache';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'simplebar/dist/simplebar.min.css';
import '@/styles/reset.css';
import '@/styles/variables.css';
import '@/styles/global.css';

const Noop: FC = ({ children }) => <>{children}</>;
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const Layout = (Component as any).Layout || Noop;

  return (
    // TODO: Add toastify container
    <CacheProvider value={emotionCache}>
      <ThemeConfig>
        <ThemePrimaryColor>
          <GlobalStyles />
          <ToastContainer />
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
    </CacheProvider>
  );
}
