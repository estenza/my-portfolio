import ProjectCard from '../components/ProjectCard';
import Image from 'next/image';
import content from '../data/content.json';

export default function Home() {
  const { projects } = content;

  const contactLinks = [
    {
      href: 'https://t.me/estenza',
      label: 'Телеграм',
    },
    {
      href: 'https://linkedin.com/in/vadim-zaripov-40448317a',
      label: 'LinkedIn',
    },
  ];
  const workflowItems = [
    {
      title: 'Исследую',
      text: 'Интервью, наблюдения, конкурентный анализ и проверка гипотез',
    },
    {
      title: 'Проектирую',
      text: 'От онбординга до сложных пользовательских сценариев',
    },
    {
      title: 'Развиваю',
      text: 'Масштабируемая архитектура, UI Kit и дизайн-система для роста продукта',
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-950">
      <div className="mx-auto flex w-full max-w-[920px] flex-col px-5 pb-[120px] pt-12 sm:px-6 lg:px-0">
        <section className="mb-8 flex w-full flex-col items-center text-center md:items-start md:text-left">
          <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-center">
            <div className="relative h-[184px] w-[184px] shrink-0 overflow-hidden rounded-full bg-neutral-100">
              <Image
                src="/images/my-photo.png"
                alt={content.aboutMe.photoAlt}
                fill
                priority
                className="object-cover"
                sizes="184px"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-center md:items-start">
              <div className="flex w-full flex-col items-center gap-3 px-0.5 md:items-start">
                <h1 className="text-2xl font-semibold leading-9 text-label-primary">
                  Продуктовый дизайнер для B2C
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base font-normal leading-6 text-label-primary md:justify-start">
                  <span>Middle +</span>
                  <span className="h-1 w-1 rounded-full bg-label-primary" aria-hidden="true" />
                  <span>Более 6 лет опыта</span>
                  <span className="h-1 w-1 rounded-full bg-label-primary" aria-hidden="true" />
                  <span>Edtech, fintech, городские сервисы</span>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex h-10 flex-wrap items-start justify-center gap-x-3 gap-y-3 md:justify-start">
                  {contactLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-[#135BFF]/8 px-4 text-base font-medium leading-6 text-[#135BFF] transition-colors hover:bg-[#135BFF]/12"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative left-1/2 w-screen -translate-x-1/2">
          <div className="mx-auto flex w-full max-w-[920px] flex-col items-start gap-0 px-8 text-left tracking-[0.32px] md:flex-row md:flex-wrap md:gap-x-10 lg:flex-nowrap lg:px-2">
            {workflowItems.map((item) => (
              <article
                key={item.title}
                className="flex min-w-0 flex-1 flex-col items-start gap-2.5 px-1 py-6 md:basis-[calc(50%-20px)] md:flex-none lg:basis-0 lg:flex-1"
              >
                <h2 className="w-full text-[18px] font-semibold leading-6 text-black">
                  {item.title}
                </h2>
                <p className="w-full text-base font-normal leading-6 text-[#0A0A0A]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-6 sm:gap-8">
          <ProjectCard
            title={projects.parkly.title}
            description={projects.parkly['description-short']}
            image="/previews/parkly-case.png"
            href="/parkly"
            period={projects.parkly.cardPeriod}
            productType={projects.parkly.cardProductType}
            overlayTitle={projects.parkly.cardOverlayTitle}
            readingTime={projects.parkly.cardReadingTime}
            icon={projects.parkly.cardIcon}
            details={projects.parkly.cardDetails}
          />
          <ProjectCard
            title={projects.uchiCase.title}
            description={projects.uchiCase['description-short']}
            image="/previews/uchi-case.png"
            href="/uchi"
            period={projects.uchiCase.cardPeriod}
            productType={projects.uchiCase.cardProductType}
            domain={projects.uchiCase.cardDomain}
            overlayTitle={projects.uchiCase.cardOverlayTitle}
            readingTime={projects.uchiCase.cardReadingTime}
            icon={projects.uchiCase.cardIcon}
            details={projects.uchiCase.cardDetails}
            isUpdating
          />
          <ProjectCard
            title={projects.noomad.title}
            description={projects.noomad['description-short']}
            image="/previews/noomad-case.png"
            href="/noomad"
            period={projects.noomad.cardPeriod}
            productType={projects.noomad.cardProductType}
            domain={projects.noomad.cardDomain}
            overlayTitle={projects.noomad.cardOverlayTitle}
            readingTime={projects.noomad.cardReadingTime}
            icon={projects.noomad.cardIcon}
            details={projects.noomad.cardDetails}
            isUpdating
          />
          <ProjectCard
            title="внутри."
            description="Платформа психологической поддержки"
            image="/previews/vnutri-case.png"
            period="2026"
            productType="Собственный продукт"
            status="Бета-версия"
            actionLabel="Перейти на сайт"
            actionHref="https://staging.vnutri.live"
            actionExternal
            disableCardHover
            imageClassName="scale-[0.8]"
            details={[
              {
                label: 'Фокус',
                value:
                  'Создание с нуля платформы психологической поддержки: исследование рынка, продуктовая стратегия, UX-концепция, дизайн-система и проектирование ключевых пользовательских сценариев.',
              },
              {
                label: 'Вклад',
                value:
                  'Провожу исследования, проектирую архитектуру, тестирую гипотезы, разрабатываю интерфейсы и сопровождаю реализацию.',
              },
            ]}
          />
        </section>
      </div>

    </main>
  );
}
