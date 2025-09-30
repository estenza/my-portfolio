import Head from 'next/head';
import '@/styles/globals.css';
import { Manrope } from 'next/font/google';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { Analytics } from '@vercel/analytics/react';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>Vadim Zaripov</title>
        <meta name="description" content="Портфолио продуктового дизайнера Вадима Зарипова. Опыт в Edtech, Fintech, SaaS." />
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />        
      </Head>
      
      <main className={manrope.className}>
        <Component {...pageProps} />
      </main>

      <Analytics />
    </>
  );
}

export default appWithTranslation(MyApp);