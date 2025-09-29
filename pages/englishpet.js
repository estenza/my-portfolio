import ProjectPage from '/components/ProjectPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function EnglishPetPage() {
  const { t } = useTranslation('common');

  const videosData = [
    {
      src: '/englishPet/english-pet-1.mp4',
      caption: t('projects.englishPet.videoCaption1')
    }
  ];

  // 1. Создаём массив с данными для изображений и подписей
  const imagesData = [
    {
      imgs: [{ src: '/englishPet/english-1.png' }], 
      caption: t('projects.englishPet.caption1')
    },
    {
      imgs: [{ src: '/englishPet/english-2.png' }],
      caption: t('projects.englishPet.caption2')
    },
    {
      imgs: [{ src: '/englishPet/english-3.png' }],
      caption: t('projects.englishPet.caption3')
    },
    {
      imgs: [{ src: '/englishPet/english-4.png' }],
      caption: t('projects.englishPet.caption4')
    }
  ];

  return (
    <ProjectPage
      title={t('projects.englishPet.title')}
      description={t('projects.englishPet.description')}
      type={t('projects.englishPet.type')}
      year="2023"
      images={imagesData}
      videos={videosData}
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

