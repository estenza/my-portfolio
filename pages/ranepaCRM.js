import ProjectPage from '/components/ProjectPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function RanepaCRMPage() {
  const { t } = useTranslation('common');

  // 1. Создаём массив с данными для изображений и подписей
  const imagesData = [
    {
      imgs: [{ src: '/ranepaCRM/ranepaCRM-1.png' }], 
      caption: t('projects.ranepaCRM.caption1')
    },
    {
      imgs: [{ src: '/ranepaCRM/ranepaCRM-2.png' }],
      caption: t('projects.ranepaCRM.caption2')
    },
    {
      imgs: [{ src: '/ranepaCRM/ranepaCRM-3.png' }],
      caption: t('projects.ranepaCRM.caption3')
    },
    {
      imgs: [{ src: '/ranepaCRM/ranepaCRM-4.png' }],
      caption: t('projects.ranepaCRM.caption4')
    },
    {
      imgs: [{ src: '/ranepaCRM/ranepaCRM-5.png' }],
      caption: t('projects.ranepaCRM.caption5')
    }
  ];

  return (
    <ProjectPage
      title={t('projects.ranepaCRM.title')}
      description={t('projects.ranepaCRM.description')}
      type={t('projects.ranepaCRM.type')}
      year="2020"
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