import ProjectPage from '/components/ProjectPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function MeeetPage() {
  const { t } = useTranslation('common');

  // 1. Создаём массив с данными для изображений и подписей
  const imagesData = [
    {
      imgs: [{ src: '/meeet/meeet-1.png' }], 
      caption: t('projects.meeet.caption1')
    },
    {
      imgs: [{ src: '/meeet/meeet-2.png' }],
      caption: t('projects.meeet.caption2')
    },
    {
      imgs: [{ src: '/meeet/meeet-3.png' }],
      caption: t('projects.meeet.caption2')
    }
  ];

  return (
    <ProjectPage
      title={t('projects.meeet.title')}
      description={t('projects.meeet.description')}
      type={t('projects.meeet.type')}
      year="2024"
      // 2. Передаём наш новый, структурированный массив в пропс images
      images={imagesData}
    />
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}