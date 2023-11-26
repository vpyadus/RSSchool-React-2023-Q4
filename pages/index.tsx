import type { Metadata } from 'next';
import App from '../src/App';

export const metadata: Metadata = {
  title: 'RSSchool-React-2023-Q4',
};

export default function RootPoint() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/react.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="root">
          <App />
        </div>
      </body>
    </html>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
