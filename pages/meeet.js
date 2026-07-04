import ProjectPage from '/components/ProjectPage';
import content from '../data/content.json';

export default function MeeetPage() {
  const project = content.projects.meeet;

  const imagesData = [
    {
      imgs: [{ src: '/meeet/meeet-1.png' }],
      caption: project.caption1
    },
    {
      imgs: [{ src: '/meeet/meeet-2.png' }],
      caption: project.caption2
    },
    {
      imgs: [{ src: '/meeet/meeet-3.png' }],
      caption: project.caption3
    }
  ];

  return (
    <ProjectPage
      title={project.title}
      description={project.description}
      type={project.type}
      year="2024"
      images={imagesData}
    />
  );
}
