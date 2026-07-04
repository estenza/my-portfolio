import ProjectPage from '/components/ProjectPage';
import content from '../data/content.json';

export default function NoomadPage() {
  const project = content.projects.noomad;

  const imagesData = [
    {
      imgs: [{ src: '/noomad/noomad-1.png' }],
      caption: project.caption1
    },
    {
      imgs: [{ src: '/noomad/noomad-2.png' }],
      caption: project.caption2
    }
  ];

  return (
    <ProjectPage
      title={project.title}
      description={project.description}
      type={project.type}
      year="2023"
      images={imagesData}
    />
  );
}
