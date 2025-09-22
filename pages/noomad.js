import ProjectPage from '/components/ProjectPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function NoomadPage() {
  const { t } = useTranslation('common');

  // 1. Создаём массив с данными для изображений и подписей
  const imagesData = [
    {
      imgs: [{ src: '/noomad/noomad-1.png' }], 
      caption: t('projects.noomad.caption1')
    },
    {
      imgs: [{ src: '/noomad/noomad-2.png' }],
      caption: t('projects.noomad.caption2')
    }
  ];

  return (
    <ProjectPage
      title={t('projects.noomad.title')}
      description={t('projects.noomad.description')}
      type={t('projects.noomad.type')}
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