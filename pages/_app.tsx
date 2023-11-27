import type { AppProps } from 'next/app';
import '../styles/styles.css';
import { wrapper } from '../src/store/store';
import Layout from '../layout/Layout';
import ErrorBoundary from '../src/components/ErrorBoundary';

export function BeerApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Layout>
  );
}

export default wrapper.withRedux(BeerApp);
