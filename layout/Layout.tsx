import type { Metadata } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'RSSchool-React-2023-Q4',
};

export default function RootPoint({ children }: { children: ReactNode }) {
  return (
    <div>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/react.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>{children}</div>
    </div>
  );
}
