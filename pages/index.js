import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProjectCard from '../components/ProjectCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import i18nConfig from '../next-i18next.config.js';
import MemojiAvatar from '../components/MemojiAvatar';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <main className="min-h-screen bg-black text-white py-16 px-4 tracking-wide">
      <div className="flex flex-col gap-8 max-w-screen-xl mx-auto mb-12">

        {/* Аватар + имя + переключатель */}
        <div className="flex items-center justify-between w-full overflow-hidden">
          <div className="flex items-center gap-4">
            <MemojiAvatar />
            <h1 className="text-white text-3xl sm:text-5xl whitespace-nowrap font-semibold">
              {t('name')}
            </h1>
          </div>

          <div className="hidden sm:flex gap-4 text-xl text-muted-foreground">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Описание */}
        <div className="max-w-[568px]">
          <p className="text-neutral-400 text-xl leading-normal font-regular tracking-wide">
            {t('description')}
          </p>
        </div>

        {/* Ссылки */}
        <div className="-mx-4 overflow-x-auto scrollbar-hide">
          <div className="px-4 flex gap-2 text-xl leading-normal font-regular">
            <Link href="/about" className="text-white hover:bg-lime-200 hover:text-black rounded-full bg-neutral-900 px-8 py-4 whitespace-nowrap">
              {t('about')}
            </Link>
            <a href="mailto:estenza@gmail.com" className="text-white hover:bg-yellow-200 hover:text-black rounded-full bg-neutral-900 px-8 py-4 whitespace-nowrap">
              {t('email')}
            </a>
            <a href="https://t.me/estenza" className="text-white hover:bg-sky-200 hover:text-black rounded-full bg-neutral-900 px-8 py-4 whitespace-nowrap">
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Карточки проектов */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 items-stretch max-w-screen-xl mx-auto">
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
          title={t('projects.english_pet.title')}
          description={t('projects.english_pet.description-short')}
          image="/english_pet.png"
          href="/english_pet"
        />
        <ProjectCard
          title={t('projects.programming.title')}
          description={t('projects.programming.description-short')}
          image="/programming.png"
          href="/programming"
        />
        <ProjectCard
          title={t('projects.students.title')}
          description={t('projects.students.description-short')}
          image="/students.png"
          href="/students"
          disabled
        />
        <ProjectCard
          title={t('projects.managers.title')}
          description={t('projects.managers.description-short')}
          image="/managers.png"
          href="/managers"
          disabled
        />
        <ProjectCard
          title={t('projects.zenpulsar.title')}
          description={t('projects.zenpulsar.description-short')}
          image="/zenpulsar.png"
          href="/zenpulsar"
          disabled
        />
      </div>

      {/* Последнее обновление */}
      <div className="mt-12 mx-auto max-w-screen-xl">
        <p className="text-neutral-500">{t('lastUpdated')}</p>
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