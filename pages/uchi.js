import ProjectPage from '/components/ProjectPage';
import content from '../data/content.json';

export default function UchiPage() {
  const { englishPet, programming, uchiCase } = content.projects;

  const englishPetVideos = [
    {
      src: '/englishPet/english-pet-1.mp4',
      caption: englishPet.videoCaption1
    }
  ];

  const englishPetImages = [
    {
      imgs: [{ src: '/englishPet/english-1.png' }],
      caption: englishPet.caption1
    },
    {
      imgs: [{ src: '/englishPet/english-2.png' }],
      caption: englishPet.caption2
    },
    {
      imgs: [{ src: '/englishPet/english-3.png' }],
      caption: englishPet.caption3
    },
    {
      imgs: [{ src: '/englishPet/english-4.png' }],
      caption: englishPet.caption4
    }
  ];

  const programmingImages = [
    {
      imgs: [{ src: '/programming/programming-1.png' }],
      caption: programming.caption1
    },
    {
      imgs: [{ src: '/programming/programming-2.png' }],
      caption: programming.caption2
    },
    {
      imgs: [{ src: '/programming/programming-3.png' }],
      caption: programming.caption3
    },
    {
      imgs: [{ src: '/programming/programming-4.png' }],
      caption: programming.caption4
    }
  ];

  return (
    <ProjectPage
      title={uchiCase.title}
      description={uchiCase.description}
      type={uchiCase.type}
      year="2023–2024"
      sections={[
        {
          title: englishPet.title,
          description: englishPet.description,
          images: englishPetImages,
          videos: englishPetVideos,
        },
        {
          title: programming.title,
          description: programming.description,
          images: programmingImages,
        },
      ]}
    />
  );
}
