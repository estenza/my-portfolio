import { useEffect, useState } from 'react';
import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import { Golos_Text } from 'next/font/google';
import Meta from '@/components/Meta';
import TypographyGlue from '@/components/TypographyGlue';



const golos = Golos_Text({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-golos-text',
});

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { pathname } = useRouter();
  const isCasePage = ['/uchi', '/parkly', '/concepts', '/noomad'].includes(pathname);

  useEffect(() => {
    const platform = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent;
    document.documentElement.classList.toggle('is-windows', /win/i.test(platform));

    return () => document.documentElement.classList.remove('is-windows');
  }, []);

  useEffect(() => {
    const scrollKey = `scroll-position:${window.location.pathname}${window.location.search}`;
    const savedPosition = window.sessionStorage.getItem(scrollKey);
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';

    const restoreScroll = () => {
      if (savedPosition === null) return;
      const position = Number.parseInt(savedPosition, 10);
      if (Number.isFinite(position)) window.scrollTo(0, position);
    };
    const saveScroll = () => {
      window.sessionStorage.setItem(scrollKey, String(window.scrollY));
    };

    const frameId = window.requestAnimationFrame(restoreScroll);
    window.addEventListener('pagehide', saveScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pagehide', saveScroll);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('case-page', isCasePage);
    document.body.classList.toggle('case-page', isCasePage);

    return () => {
      document.documentElement.classList.remove('case-page');
      document.body.classList.remove('case-page');
    };
  }, [isCasePage]);

  return (
    <>
      <Meta />
      
      <HeroUIProvider>
        <div className={`${golos.className} ${golos.variable}`}>
          {mounted && <ToastProvider placement="bottom-center" maxVisibleToasts={1} toastOffset={24} toastProps={{ classNames: { base: 'border-0 rounded-full' } }} />}
          <TypographyGlue>
            <Component {...pageProps} />
          </TypographyGlue>
        </div>
      </HeroUIProvider>

    </>
  );
}

export default MyApp;
