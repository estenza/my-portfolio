import ProjectPage from '/components/ProjectPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function ParklyPage() {
  const { t } = useTranslation('common');

  // 1. Создаём массив с данными для изображений и подписей
  const imagesData = [
    {
      imgs: [{ src: '/parkly/parkly-1.png' }], 
      caption: t('projects.parkly.caption1')
    },
    {
      imgs: [{ src: '/parkly/parkly-2.png' }],
      caption: t('projects.parkly.caption2')
    },
    {
      imgs: [{ src: '/parkly/parkly-3.png' }],
      caption: t('projects.parkly.caption3')
    }
  ];

  return (
    <ProjectPage
      title={t('projects.parkly.title')}
      description={t('projects.parkly.description')}
      type={t('projects.parkly.type')}
      year="2023"
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