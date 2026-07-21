import Image from 'next/image';
import Head from 'next/head';
import content from '../data/content.json';

const goals = [
  {
    icon: '/parkly/figma-assets/goal-globe.svg',
    title: 'Анализ аналогов',
    text: 'Изучить российские и зарубежные сервисы, выделить удачные UX-паттерны и понять, какие решения подходят для нашего рынка'
  },
  {
    icon: '/parkly/figma-assets/goal-search.svg',
    title: 'Поиск парковок',
    text: 'Помочь водителям быстро находить доступные частные парковки рядом с точкой назначения'
  },
  {
    icon: '/parkly/figma-assets/goal-shield.svg',
    title: 'Прозрачность условий',
    text: 'Показать всю важную информацию до оплаты: цену, период бронирования, правила продления и отмены'
  },
  {
    icon: '/parkly/figma-assets/goal-route.svg',
    title: 'Понятность действий после оплаты',
    text: 'Объяснить, что делать дальше: куда ехать, как открыть въезд, где найти место и как действовать на территории парковки'
  }
];

const contextCards = [
  {
    image: '/parkly/figma-assets/context-stress.png',
    title: 'Принятие решений в условиях стресса',
    text: 'Водитель чаще всего спешит, поэтому интерфейс должен снижать когнитивную нагрузку: ясная иерархия информации, крупные кнопки действий.'
  },
  {
    image: '/parkly/figma-assets/context-limits.png',
    title: 'Понимание ограничений',
    text: 'Допустимая высота автомобиля, габариты машиноместа и правила парковки должны быть понятны до оплаты.'
  },
  {
    image: '/parkly/figma-assets/context-reading.png',
    title: 'Мало времени на чтение',
    text: 'Водитель не хочет читать длинную инструкцию о том, как найти выделенные парковочные места, находясь на парковке. Лучше подойдут короткие шаги с фотографиями и понятными схемами.'
  },
  {
    image: '/parkly/figma-assets/context-savings.png',
    title: 'Экономия должна быть заметной',
    text: 'Parkly конкурирует с муниципальными парковками, поэтому для водителя важно подсветить, сколько он экономит, бронируя парковку через приложение.'
  }
];

const contributions = [
  {
    title: 'От идеи до работающего продукта',
    text: 'Создал пользовательские сценарии, информационную архитектуру, дизайн интерфейсов и сопровождал продукт на всех этапах развития.'
  },
  {
    title: 'Проектирование сложных сценариев',
    text: 'Спроектировал сценарии бронирования, парковочного билета, управления GSM-оборудованием и адаптировал интерфейс под разные виды объектов.'
  },
  {
    title: 'Основы для масштабирования',
    text: 'Разработал дизайн-систему и UI-kit, провел рефакторинг интерфейсов и унифицировал компоненты в мобильном приложении и админке.'
  },
  {
    title: 'Работа на стыке дизайна и продукта',
    text: 'Исследовал конкурентов, участвовал в обсуждении продуктовых решений, проверял гипотезы вместе с основателем и сопровождал реализацию продукта.'
  }
];

function Section({ title, children, className = '', titleClassName = 'mb-10' }) {
  return (
    <section className={`mx-auto w-full max-w-[920px] px-5 sm:px-6 lg:px-0 ${className}`}>
      {title && (
        <h2 className={`${titleClassName} text-[32px] font-semibold leading-[40px] text-label-primary`}>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="rounded-full bg-neutral-100 px-4 py-2 text-base font-normal leading-6 text-label-tertiary">
      {children}
    </span>
  );
}

function GoalIcon({ src }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#1D63FF] text-white">
      <Image src={src} alt="" width={32} height={32} className="h-8 w-8" />
    </span>
  );
}

function StoreBadge({ href, src, alt, width }) {
  return (
    <a
      href={href}
      aria-label={alt}
      target="_blank"
      rel="noreferrer"
      className="block h-14 bg-contain bg-left bg-no-repeat transition-opacity hover:opacity-80"
      style={{ width, backgroundImage: `url("${src}")` }}
    >
      <span className="sr-only">{alt}</span>
    </a>
  );
}

export default function ParklyPage() {
  const project = content.projects.parkly;

  return (
    <>
      <Head>
        <title>{`Кейс — ${project.title}`}</title>
      </Head>
      <main className="min-h-screen bg-white pb-16 text-label-primary">
      <header className="mx-auto w-full max-w-[920px] px-5 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 lg:px-0">
        <div className="mb-6 flex items-center gap-6">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-[#135BFF]">
            <Image
              src="/parkly/figma-assets/parkly-logo.svg"
              alt="Логотип Parkly"
              fill
              priority
              className="object-contain"
              sizes="56px"
            />
          </div>
          <h1 className="text-[34px] font-semibold leading-none text-label-primary sm:text-[40px]">
            Parkly
          </h1>
        </div>

        <div className="max-w-[760px] space-y-4 text-[15px] leading-6 sm:text-base">
          <p>
            <span className="font-bold text-label-primary">Роль:</span> Продуктовый дизайнер
          </p>
          <p>
            <span className="font-bold text-label-primary">Фокус:</span> MVP и развитие сервиса бронирования частных парковок: поиск на карте, выбор времени, оплата и сценарии после бронирования.
          </p>
          <p>
            <span className="font-bold text-label-primary">Вклад:</span> Исследовал аналоги, проектировал core flow, проводил тесты, перерабатывал ключевые экраны, парковочный билет, инструкции и UI-kit.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Pill>2020–2023</Pill>
          <Pill>B2C</Pill>
          <Pill>iOS, Android, Web</Pill>
        </div>
      </header>

      <div className="relative left-1/2 mb-14 aspect-[3040/604] w-screen -translate-x-1/2 overflow-hidden lg:left-auto lg:mb-16 lg:h-[292px] lg:w-full lg:translate-x-0 lg:aspect-auto">
        <Image
          src="/parkly/figma-assets/hero.png"
          alt="Parkly на синем фоне"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <Section title="О продукте">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_390px] md:items-start">
          <div className="space-y-5 text-base leading-6 sm:text-base md:py-3">
            <p>
              Parkly это приложение, которое позволяет водителям находить, бронировать и оплачивать парковку по более выгодным ценам, чем у муниципальных паркингов.
            </p>
            <p>
              После оплаты водитель получает парковочный билет с QR или кнопками для управления шлагбаумами и пошаговые инструкции по проезду.
            </p>
            <div>
              <p className="mb-3 font-bold text-label-primary">Пользователи</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Водители легковых автомобилей;</li>
                <li>Владельцы и операторы частных парковок: БЦ, ТЦ, подземные паркинги, частные территории и т.д.</li>
              </ul>
            </div>
          </div>

          <Image
            src="/parkly/figma-assets/about-phones.png"
            alt="Основные экраны Parkly"
            width={390}
            height={365}
            className="w-full"
            sizes="(min-width: 1024px) 390px, calc(100vw - 2.5rem)"
          />
        </div>
      </Section>

      <Section title="Цели продукта" className="mt-16 sm:mt-24">
        <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
          {goals.map((goal) => (
            <article key={goal.title} className="flex gap-5">
              <GoalIcon src={goal.icon} />
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold leading-6 text-label-primary">{goal.title}</h3>
                <p className="text-base leading-6 text-label-primary">{goal.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Контекст, повлиявший на UX-решения" className="mt-16 sm:mt-24">
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {contextCards.map((card) => (
            <article key={card.title} className="flex flex-col gap-5">
              <Image
                src={card.image}
                alt=""
                width={440}
                height={138}
                className="w-full rounded-2xl"
                sizes="(min-width: 1024px) 440px, calc(100vw - 2.5rem)"
              />
              <div className="flex flex-col gap-3 px-0.5">
                <h3 className="text-[18px] font-semibold leading-6 text-label-primary">{card.title}</h3>
                <p className="text-base leading-6">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Флоу первого заказа" className="mt-16 sm:mt-24" titleClassName="mb-6">
        <p className="mb-10 max-w-[720px] px-0.5 text-base leading-6 sm:text-base">
          Для первого заказа было важно показать ценность до регистрации и оплаты. Пользователь сначала видит доступные парковки, цену и условия, выбирает время, а обязательные данные появляются только ближе к бронированию — когда уже понятно, за что он платит.
        </p>
        <Image
          src="/parkly/figma-assets/first-order-flow.png"
          alt="Флоу первого заказа Parkly"
          width={2059}
          height={1752}
          className="w-full"
          sizes="(min-width: 1024px) 920px, calc(100vw - 2.5rem)"
        />
      </Section>

      <Section title="Выбор времени бронирования" className="mt-16 sm:mt-24">
        <div className="grid gap-6 md:grid-cols-[300px_minmax(0,1fr)] md:items-start md:gap-10">
          <div className="space-y-6 px-0.5 text-base leading-6 sm:text-base">
            <p>
              Время начала и длительность бронирования настраиваются на одном экране. Слайдер длительности сразу показывает, как меняется стоимость в зависимости от выбранного периода: чем дольше бронирование, тем ниже цена часа.
            </p>
            <p className="flex flex-col gap-1">
              <span className="font-bold text-label-primary">Учитываем ограничения парковки</span>
              <span>Недоступные интервалы отображаются заранее. Если выбранный период нельзя продлить или парковка закрывается, пользователь получает предупреждение до бронирования.</span>
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-8 md:flex-nowrap md:justify-start">
            <div className="relative h-[350px] w-[162px] min-w-[162px] max-w-[162px] overflow-hidden rounded-2xl">
              <Image
                src="/parkly/figma-assets/time-phone-main.png"
                alt="Выбор времени бронирования"
                width={400}
                height={870}
                unoptimized
                className="h-full w-full object-cover"
                sizes="162px"
              />
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/16" aria-hidden="true" />
            </div>
            <Image
              src="/parkly/figma-assets/time-phone-warning.png"
              alt="Предупреждение о невозможности продления бронирования"
              width={1206}
              height={2622}
              className="w-[162px] rounded-2xl border border-neutral-200"
              sizes="162px"
            />
            <Image
              src="/parkly/figma-assets/time-phone-closed.png"
              alt="Предупреждение о закрытой парковке"
              width={1206}
              height={2622}
              className="w-[162px] rounded-2xl border border-neutral-200"
              sizes="162px"
            />
          </div>
        </div>
      </Section>

      <Section title="Экран управления бронированием" className="mt-16 sm:mt-24" titleClassName="mb-6">
        <p className="mb-10 max-w-[720px] text-base leading-6 sm:text-base">
          После оплаты сценарий не заканчивается. Пользователю нужно доехать до парковки, найти нужный въезд, открыть шлагбаум, припарковаться и позже выехать. Экран бронирования сопровождает водителя на каждом этапе этого пути.
        </p>

        <h3 className="mb-6 text-[24px] font-semibold leading-[36px] text-label-primary">
          Состояния парковочной сессии
        </h3>
        <Image
          src="/parkly/figma-assets/session-states.png"
          alt="Состояния парковочной сессии"
          width={1920}
          height={1203}
          className="w-full max-w-[660px]"
          sizes="(min-width: 1024px) 660px, calc(100vw - 2.5rem)"
        />

        <div className="mt-16">
          <h3 className="mb-7 text-[24px] font-semibold leading-[36px] text-label-primary">
            Управление парковочным оборудованием
          </h3>
          <div className="mb-8 grid gap-6 md:grid-cols-2 md:gap-10">
            <p className="text-base leading-6 sm:text-base">
              Parkly поддерживает интеграцию с парковочным оборудованием через GSM-модули, интерфейс адаптируется под каждую отдельную парковку. Пользователь может открывать шлагбаумы, ворота и двери прямо из приложения.
            </p>
            <p className="text-base leading-6 sm:text-base">
              Маршрут разбивается на короткие контекстные шаги и сопровождается инструкциями, схемами и фотографиями, что снижает когнитивную нагрузку и уменьшает вероятность ошибки.
            </p>
          </div>
          <Image
            src="/parkly/figma-assets/equipment-flow.png"
            alt="Управление парковочным оборудованием"
            width={2763}
            height={1094}
            className="w-full"
            sizes="(min-width: 1024px) 920px, calc(100vw - 2.5rem)"
          />
        </div>
      </Section>

      <Section title="UI-kit" className="mt-16 sm:mt-24" titleClassName="mb-6">
        <p className="mb-6 max-w-[720px] text-base leading-6">
          По мере развития продукта я собрал UI-kit с компонентами, что помогло сохранять консистентность интерфейса и быстрее собирать новые функции.
        </p>
        <div className="overflow-hidden rounded-lg border border-black/12 bg-neutral-50">
          <iframe
            title="UI-kit Parkly в Figma"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FTmOPFmzNHeR4V3TcpfoKEM%2FParkly-App--Copy-%3Fnode-id%3D63-111"
            className="block h-[360px] w-full sm:h-[520px]"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </Section>

      <Section title="Моя роль и вклад в развитие продукта" className="mt-16 sm:mt-24" titleClassName="mb-6">
        <p className="mb-8 max-w-[720px] text-base leading-6 sm:text-base">
          На протяжении всего проекта я был единственным продуктовым дизайнером. От первых концепций до масштабирования продукта отвечал за UX, UI, исследования, дизайн-систему и развитие ключевых пользовательских сценариев.
        </p>

        <div className="mb-8 flex items-center gap-3 rounded-xl bg-red-50 py-3 pl-3 pr-4 text-base leading-6 text-label-primary">
          <Image src="/parkly/figma-assets/attention.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
          <span>Детальные продуктовые метрики и внутренние показатели скрыты в соответствии с условиями NDA.</span>
        </div>

        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {contributions.map((card) => (
            <article key={card.title} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1D63FF] text-white">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.25 6.5 11.25 12.5 4.75" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="mb-1 text-base font-semibold leading-6 text-label-primary">{card.title}</h3>
                <p className="text-sm leading-6 sm:text-base">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Попробуйте сами" className="mt-16 sm:mt-24" titleClassName="mb-6 md:mb-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_420px] md:items-stretch">
          <div className="flex h-full w-full flex-col justify-between py-2">
            <div>
              <p className="mb-6 max-w-[520px] px-0.5 text-base leading-6 sm:text-base">
                Parkly — действующий сервис бронирования парковок. Большинство решений, показанных в этом кейсе, реализовано в опубликованном приложении.
              </p>
              <div className="flex flex-wrap gap-3">
                <StoreBadge
                  href="https://apps.apple.com/ru/app/%D0%BF%D0%B0%D1%80%D0%BA%D0%BB%D0%B8-%D0%BF%D0%B0%D1%80%D0%BA%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BC%D0%BE%D1%81%D0%BA%D0%B2%D1%8B-%D0%B8-%D1%81%D0%BF%D0%B1/id1530278550"
                  src="/parkly/figma-assets/app-store-badge.svg"
                  alt="Загрузить Parkly в App Store"
                  width={168}
                />
                <StoreBadge
                  href="https://play.google.com/store/apps/details?id=ru.parkly.app&pcampaignid=web_share"
                  src="/parkly/figma-assets/google-play-badge.svg"
                  alt="Загрузить Parkly в Google Play"
                  width={189}
                />
              </div>
            </div>
            <p className="mt-16 max-w-[520px] text-xs leading-4 text-label-quarternary">
              Все изображения интерфейсов представлены исключительно в демонстрационных целях. Parkly® является зарегистрированным товарным знаком. Все права на продукт, бренд и материалы принадлежат правообладателю.
            </p>
          </div>
          <Image
            src="/parkly/figma-assets/try-phones.png"
            alt="Приложение Parkly"
            width={1146}
            height={1086}
            className="hidden w-full md:block"
            sizes="(min-width: 1024px) 420px, calc(100vw - 2.5rem)"
          />
        </div>
      </Section>
      </main>
    </>
  );
}
