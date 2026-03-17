import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProjectCard from '../components/ProjectCard';
import i18nConfig from '../next-i18next.config.js';
import MemojiAvatar from '../components/MemojiAvatar';
import Link from 'next/link';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Home() {
  const { t } = useTranslation('common');

  const contactLinks = [
    {
      href: '/about',
      label: t('about'),
      isInternal: true,
      isAvatar: true,
    },
    {
      href: 'mailto:estenza@gmail.com',
      label: t('email'),
      className: 'bg-neutral-900 text-white hover:bg-neutral-800'
    },
    {
      href: 'https://t.me/estenza',
      label: 'Telegram',
      className: 'bg-neutral-900 text-white hover:bg-neutral-800'
    },
    {
      href: 'https://linkedin.com/in/vadim-zaripov-40448317a',
      label: 'LinkedIn',
      className: 'bg-neutral-900 text-white hover:bg-neutral-800'
    },
    {
      href: `/${t('cv.fileName')}`,
      label: t('cv.buttonText'),
      className: 'bg-neutral-900 text-white hover:bg-neutral-800'
    }
  ];

  return (
    <main className="min-h-screen bg-black px-4 py-16 text-white tracking-wide overflow-hidden">
      <div className="relative mx-auto flex max-w-screen-2xl flex-col">
        <div className="pointer-events-none absolute left-1/2 top-2 hidden w-full max-w-screen-xl -translate-x-1/2 justify-end sm:flex">
          <div className="pointer-events-auto">
            <LanguageSwitcher />
          </div>
        </div>

        <section className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <h1 className="max-w-5xl whitespace-nowrap text-3xl font-semibold sm:text-5xl">
            {t('name')}
          </h1>

          <p className="mt-8 max-w-[636px] text-xl leading-normal text-neutral-400">
            {t('description')}
          </p>

          <div className="mt-8 flex w-full justify-center">
            <div className="-mx-4 w-screen overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0">
              <div className="flex min-w-max gap-2 pb-2 text-xl leading-normal sm:flex-wrap sm:justify-center sm:pb-0">
                {contactLinks.map((item) => {
                  if (item.isAvatar) {
                    return <MemojiAvatar key={item.label} href={item.href} label={item.label} />;
                  }

                  const className = `inline-flex items-center justify-center rounded-full px-8 py-3 leading-none whitespace-nowrap transition-colors ${item.className}`;

                  if (item.isInternal) {
                    return (
                      <Link key={item.label} href={item.href} className={className}>
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className={className}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto mt-12 grid max-w-screen-xl grid-cols-1 items-stretch gap-1 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          title={t('projects.parkly.title')}
          description={t('projects.parkly.description-short')}
          image="/parkly/parkly.png"
          href="/parkly"
        />
        <ProjectCard
          title={t('projects.noomad.title')}
          description={t('projects.noomad.description-short')}
          image="/noomad/noomad.png"
          href="/noomad"
        />
        <ProjectCard
          title={t('projects.meeet.title')}
          description={t('projects.meeet.description-short')}
          image="/meeet/meeet.png"
          href="/meeet"
        />
        <ProjectCard
          title={t('projects.englishPet.title')}
          description={t('projects.englishPet.description-short')}
          image="/englishPet/english-cover.png"
          href="/englishpet"
        />
        <ProjectCard
          title={t('projects.programming.title')}
          description={t('projects.programming.description-short')}
          image="/programming.png"
          href="/programming"
        />
      </div>

      <div className="mx-auto mt-12 flex max-w-screen-xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-s text-neutral-600">
          {t('footer.lastUpdated')}
        </p>
        <p className="text-s text-neutral-600 md:text-right">
          {t('footer.builtWith')}
        </p>  
      </div>
    </main>
  );
}

// SSR (если используется)
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
}
