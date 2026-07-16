import Head from 'next/head';
import '@/styles/globals.css';
import { Manrope } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import TypographyGlue from '@/components/TypographyGlue';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Вадим Зарипов – Продуктовый дизайнер</title>
        <meta name="description" content="Портфолио продуктового дизайнера Вадима Зарипова. Опыт в Edtech, Fintech, SaaS." />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/favicons/site.webmanifest" />        
      </Head>
      
      <div className={manrope.className}>
        <TypographyGlue>
          <SiteHeader />
          <Component {...pageProps} />
        </TypographyGlue>
      </div>

    </>
  );
}

export default MyApp;
