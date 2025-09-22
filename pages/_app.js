import '@/styles/globals.css';
import { Manrope } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';


const geist = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={geist.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default appWithTranslation(MyApp);