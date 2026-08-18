import { useEffect } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import { Golos_Text } from 'next/font/google';
import Meta from '@/components/Meta';
import TypographyGlue from '@/components/TypographyGlue';
import MagnifierCursor from '@/components/MagnifierCursor';

const golos = Golos_Text({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-golos-text',
});

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isCasePage = ['/uchi', '/parkly', '/concepts'].includes(pathname);

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
          <TypographyGlue>
            <Component {...pageProps} />
          </TypographyGlue>
          <MagnifierCursor />
        </div>
      </HeroUIProvider>

    </>
  );
}

export default MyApp;
