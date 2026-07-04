import ProjectPage from '/components/ProjectPage';
import content from '../data/content.json';

export default function ParklyPage() {
  const project = content.projects.parkly;

  return (
    <ProjectPage
      title={project.caseTitle}
      heroImage={{
        src: '/parkly/parkly-hero.png',
        alt: 'Логотип Parkly на синем фоне'
      }}
      statusNote={project.statusNote}
      description={project.description}
      meta={project.meta}
      introSections={[
        {
          title: 'Проблема',
          description: project.problem
        },
        {
          title: 'Почему MVP начинался не с карты',
          description: project.coreFlowIntro,
          images: [
            {
              imgs: [
                {
                  src: '/parkly/parkly-wireframes.png',
                  alt: 'Вайрфреймы основного сценария Parkly'
                }
              ]
            }
          ],
          descriptionAfter: project.coreFlowOutro
        },
        {
          title: 'Пользовательские тесты',
          description: project.userTests
        },
        {
          title: 'v2.0: больше парковок — больше контроля пользователю',
          images: [
            {
              imgs: [
                {
                  src: '/parkly/parkly-v2.png',
                  alt: 'Интерфейсы Parkly версии 2.0'
                }
              ]
            }
          ],
          descriptionAfter: project.version2
        },
        {
          title: 'Эволюция парковочного билета',
          description: project.passEvolutionIntro,
          evolutionItems: [
            {
              title: 'Версия 1 — подтверждение бронирования',
              image: {
                src: '/parkly/pass-evo1.png',
                alt: 'Парковочный билет Parkly, версия 1',
                height: 1754
              },
              description: project.passEvolution1
            },
            {
              title: 'Версия 2 — билет как пропуск',
              image: {
                src: '/parkly/pass-evo2.png',
                alt: 'Парковочный билет Parkly, версия 2',
                height: 1829
              },
              description: project.passEvolution2
            },
            {
              title: 'Версия 3 — компактный сценарный экран',
              image: {
                src: '/parkly/pass-evo3.png',
                alt: 'Парковочный билет Parkly, версия 3',
                height: 1324
              },
              description: project.passEvolution3
            }
          ],
          descriptionAfter: project.passEvolutionConclusion
        },
        {
          title: 'Stories-инструкции: навигация там, где карты уже недостаточно',
          description: project.storiesInstructions,
          carouselItems: [
            {
              title: 'Навигация по реальным фото',
              description: 'Фотографии территории, стрелки и отметки конкретных мест помогают пользователю сопоставить инструкцию с тем, что он видит перед собой.',
              image: {
                src: '/parkly/stories-1.png',
                alt: 'Stories-инструкция Parkly с навигацией по реальным фотографиям парковки',
                width: 1468,
                height: 1057
              }
            },
            {
              title: 'Маршрут к парковке во дворе',
              description: 'Иллюстрированные подсказки показывают, где повернуть, куда ехать и как взаимодействовать с охраной или пропуском.',
              image: {
                src: '/parkly/stories-2.png',
                alt: 'Stories-инструкция Parkly с иллюстрированным маршрутом к парковке во дворе',
                width: 1470,
                height: 1057
              }
            },
            {
              title: 'Сложный въезд в паркинг',
              description: 'Пошаговая инструкция проводит пользователя через въезд, Wi-Fi, шлагбаум и движение внутри подземной парковки.',
              image: {
                src: '/parkly/stories-3.png',
                alt: 'Stories-инструкция Parkly для сложного въезда через здание и подземный паркинг',
                width: 2410,
                height: 1733
              }
            }
          ],
          descriptionAfter: project.storiesInstructionsConclusion
        },
        {
          title: 'Финальная версия: карта как основной сценарий',
          images: [
            {
              imgs: [
                {
                  src: '/parkly/final-map.png',
                  alt: 'Финальная версия Parkly: карта, сниппет парковки и карточка парковки'
                }
              ]
            }
          ],
          descriptionAfter: project.finalMapIntro,
          extraImages: [
            {
              imgs: [
                {
                  src: '/parkly/final-time-select.png',
                  alt: 'Финальная версия Parkly: выбор времени и длительности бронирования'
                }
              ]
            }
          ],
          extraDescription: project.finalMapOutro
        },
        {
          title: 'Итог',
          description: project.outcome
        }
      ]}
    />
  );
}
