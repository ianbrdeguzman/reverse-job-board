import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { Layout } from '../components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

const nunito = Nunito({ subsets: ['latin'] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Reverse Job Board</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <main className={nunito.className}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </QueryClientProvider>
    </>
  );
}
