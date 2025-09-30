import ProjectPage from '/components/ProjectPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function ProgrammingPage() {
  const { t } = useTranslation('common');

  const imagesData = [
    {
      imgs: [{ src: '/programming/programming-1.png' }], 
      caption: t('projects.programming.caption1')
    },
    {
      imgs: [{ src: '/programming/programming-2.png' }],
      caption: t('projects.programming.caption2')
    },
    {
      imgs: [{ src: '/programming/programming-3.png' }],
      caption: t('projects.programming.caption3')
    },
    {
      imgs: [{ src: '/programming/programming-4.png' }],
      caption: t('projects.programming.caption4')
    }
  ];

  return (
    <ProjectPage
      title={t('projects.programming.title')}
      description={t('projects.programming.description')}
      type={t('projects.programming.type')}
      year="2024"
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

