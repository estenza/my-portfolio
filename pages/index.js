import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainHeader from '@/components/MainHeader';
import styles from '@/styles/Home.module.css';

const projects = [
  {
    kind: 'uchi',
    label: 'Учи.ру — образовательные игры для детей',
    href: '/uchi',
  },
  {
    kind: 'parkly',
    label: 'Паркли — сервис бронирования парковок',
    href: '/parkly',
  },
  {
    kind: 'fun',
    label: 'Just for fun — концепты и прототипы',
    href: '/concepts',
  },
  {
    kind: 'vnutri',
    label: 'внутри — психологическая платформа',
  },
];

function ProjectShell({ project, children, className = '', onHoverChange }) {
  const setHoverOrigin = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--hover-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--hover-y', `${event.clientY - bounds.top}px`);
  };

  const hoverClassName = {
    uchi: styles.projectUchi,
    parkly: styles.projectParkly,
    fun: styles.projectFun,
    vnutri: styles.projectVnutri,
  }[project.kind];
  const content = (
    <div
      className={`${styles.projectShell} ${hoverClassName} h-full overflow-hidden rounded-[32px] ${className}`}
      data-cursor-label={project.kind === 'vnutri' ? 'скоро' : 'смотреть кейс'}
      data-cursor-icon={project.kind === 'vnutri' ? 'clock' : 'eye'}
      onPointerEnter={(event) => {
        setHoverOrigin(event);
        onHoverChange?.(true);
      }}
      onPointerLeave={() => onHoverChange?.(false)}
      onPointerMove={setHoverOrigin}
    >
      {children}
    </div>
  );

  if (!project.href) {
    return <article className="h-full">{content}</article>;
  }

  if (project.external) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={project.label}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      aria-label={project.label}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
    >
      {content}
    </Link>
  );
}

const bookingOptions = [
  { hours: 1, rate: 280, barHeight: 52.177 },
  { hours: 2, rate: 260, barHeight: 49.342 },
  { hours: 3, rate: 240, barHeight: 43.103 },
  { hours: 4, rate: 240, barHeight: 43.103 },
  { hours: 5, rate: 220, barHeight: 37.193 },
  { hours: 6, rate: 200, barHeight: 31.283 },
];

const initialBookingIndex = Math.floor((bookingOptions.length - 1) / 2);

function ParklyBookingPreview({ isActive }) {
  const [selectedIndex, setSelectedIndex] = useState(initialBookingIndex);
  const selected = bookingOptions[selectedIndex];

  useEffect(() => {
    if (!isActive) {
      setSelectedIndex(initialBookingIndex);
      return undefined;
    }

    let intervalId;
    const startTimeoutId = window.setTimeout(() => {
      setSelectedIndex((currentIndex) => (currentIndex + 1) % bookingOptions.length);
      intervalId = window.setInterval(() => {
        setSelectedIndex((currentIndex) => (currentIndex + 1) % bookingOptions.length);
      }, 850);
    }, 300);

    return () => {
      window.clearTimeout(startTimeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [isActive]);

  return (
    <div className={styles.parklyBookingPreview} aria-label={`Бронирование на ${selected.hours} час${selected.hours === 1 ? '' : 'а'}`}>
      <div className={`${styles.parklyWidgets} ${isActive ? styles.parklyWidgetsActive : ''}`}>
        <div className={styles.parklySelectionCard}>
          <div className={styles.parklyPreviewHeader}>
            <strong>{selected.hours} {selected.hours === 1 ? 'час' : selected.hours < 5 ? 'часа' : 'часов'}</strong>
            <span className={styles.parklyPreviewRate}>
              {selected.rate}{' '}<span className={styles.parklyRuble}>₽</span>/ч
            </span>
          </div>
          <div className={styles.parklyRoller}>
            <div className={styles.parklyRollerViewport}>
              <div
                className={styles.parklyRollerStrip}
                style={{ transform: `translateX(calc(50% - 9.0745px - ${selectedIndex * 22.149}px))` }}
              >
                {bookingOptions.map((option) => (
                  <span
                    key={option.hours}
                    className={option.hours === selected.hours ? styles.parklyRollerItemActive : styles.parklyRollerItem}
                    style={{ '--bar-height': `${option.barHeight}px` }}
                    aria-label={`${option.hours} ч`}
                  />
                ))}
              </div>
            </div>
            <Image
              src="/home-figma/parkly-duration-pointer.svg"
              alt=""
              width={11}
              height={9}
              className={styles.parklyRollerArrow}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={styles.parklyGsmButton} aria-label="Въехать в подземный паркинг">
          <div className={styles.parklyGsmIcon} aria-hidden="true">
            <div className={styles.parklyGsmGlyph}>
              <Image src="/home-figma/parkly-gsm-body.svg" alt="" width={16} height={9} className={styles.parklyGsmBody} />
              <Image src="/home-figma/parkly-gsm-wheel.svg" alt="" width={5} height={5} className={styles.parklyGsmWheel} />
              <Image src="/home-figma/parkly-gsm-line.svg" alt="" width={2} height={16} className={styles.parklyGsmLine} />
            </div>
          </div>
          <div className={styles.parklyGsmCopy}>
            <strong>Въехать</strong>
            <span>В подземный паркинг</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParklyProjectCard({ project }) {
  return (
    <ProjectShell project={project} className={`${styles.parklyCard} min-h-[470px] sm:h-[528px]`}>
      <div className={styles.parklyCardHeader}>
        <div className="flex gap-5">
          <Image src="/workplaces/parkly.svg" alt="" width={40} height={40} className={`${styles.projectCardIcon} mt-1 h-10 w-10 rounded-xl`} />
          <div>
            <h2 className={styles.cardTitle}>паркли — сервис бронирования парковок</h2>
            <p className={`${styles.bodyNarrow} ${styles.muted} mt-2`}>2020–2022&nbsp;&nbsp;mobile</p>
          </div>
        </div>
      </div>
      <div className={styles.parklyCardVisual}>
        <ParklyBookingPreview isActive />
        <div className={styles.parklyPhonePreview}>
          <Image src="/home-figma/parkly-phone.png" alt="Карта в приложении Parkly" fill className={`${styles.projectVisual} object-contain`} sizes="(min-width: 768px) 263px, 80vw" />
        </div>
      </div>
      <p className={`${styles.cardOutcome} ${styles.parklyCardOutcome}`}>оптимизировал процесс бронирования и сценарии после оплаты</p>
    </ProjectShell>
  );
}

function UchiPaywallPreview() {
  return (
    <div className={styles.uchiPaywallPreview}>
      <div className={`${styles.uchiPaywallFrame} ${styles.projectVisual}`}>
        <Image
          src="/home-figma/uchi-paywall.svg"
          alt="Пейвол курса «Герои программирования»"
          fill
          className="object-contain"
          sizes="(min-width: 768px) 573px, 100vw"
        />
        <img
          src="/home-figma/uchi-paywall.gif"
          alt=""
          className={styles.uchiPaywallVideo}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function UchiProjectCard({ project }) {
  return (
    <ProjectShell project={project} className="flex min-h-[420px] flex-col sm:h-[528px]">
      <div className={`${styles.projectCardHeader} flex items-start gap-5 px-8 pt-8`}>
        <Image src="/workplaces/uchi.png" alt="" width={40} height={40} className={`${styles.projectCardIcon} mt-1 h-10 w-10 rounded-xl`} />
        <div>
          <h2 className={styles.cardTitle}>учи.ру — образовательные игры для детей</h2>
          <p className={`${styles.bodyNarrow} ${styles.muted} mt-2`}>2021–2025&nbsp;&nbsp;web</p>
        </div>
      </div>
      <UchiPaywallPreview />
      <p className={`${styles.cardOutcome} px-8 py-7`}>улучшал конверсию в покупку курсов</p>
    </ProjectShell>
  );
}

function ProjectCard({ project }) {
  if (project.kind === 'uchi') {
    return <UchiProjectCard project={project} />;
  }

  if (project.kind === 'parkly') {
    return <ParklyProjectCard project={project} />;
  }

  if (project.kind === 'fun') {
    return (
      <ProjectShell project={project} className="flex min-h-[390px] flex-col sm:h-[480px]">
        <div className={`${styles.projectCardHeader} flex items-center gap-5 px-8 pt-8`}>
          <Image src="/workplaces/smile.svg" alt="" width={40} height={40} className={`${styles.projectCardIcon} h-10 w-10 rounded-xl`} />
          <h2 className={styles.cardTitle}>just for fun</h2>
        </div>
        <div className={`${styles.funCardVisual} relative min-h-0 flex-1 pt-4`}>
          <Image src="/home-figma/fun-graphic.png" alt="Концепты интерфейсов" fill className={`${styles.projectVisual} object-contain`} sizes="(min-width: 768px) 668px, 100vw" />
        </div>
        <p className={`${styles.cardOutcome} px-8 py-7`}>концепты, прототипы, не взятое в работу</p>
      </ProjectShell>
    );
  }

  return (
    <ProjectShell project={project} className="flex min-h-[390px] flex-col sm:h-[480px]">
      <div className={`${styles.projectCardHeader} flex gap-5 px-8 pt-8`}>
        <Image src="/workplaces/vnutri-icon.svg" alt="" width={40} height={40} className={`${styles.projectCardIcon} mt-1 h-10 w-10 shrink-0 rounded-xl`} />
        <div>
          <h2 className={styles.cardTitle}>внутри — психологическая платформа</h2>
          <p className={`${styles.bodyNarrow} ${styles.muted} mt-2`}>2026–н.в&nbsp;&nbsp;web</p>
        </div>
      </div>
      <div className={`${styles.vnutriCardVisual} relative min-h-0 flex-1 pt-4`}>
        <Image src="/home-figma/vnutri-graphic.png" alt="Экраны платформы «внутри»" fill className={`${styles.projectVisual} object-contain`} sizes="(min-width: 768px) 668px, 100vw" />
      </div>
      <p className={`${styles.cardOutcome} px-8 py-7`}>личный проект, развиваю самостоятельно</p>
    </ProjectShell>
  );
}

function FactPhotoStack({ reverse = false }) {
  const photos = reverse
    ? ['/home-figma/fact-source-3.png', '/home-figma/fact-source-4.png']
    : ['/home-figma/fact-source-1.png', '/home-figma/fact-source-2.png'];

  return (
    <div className={`${styles.factPhotoStack} ${reverse ? styles.factPhotoStackReverse : ''}`} aria-hidden="true">
      <img className={`${styles.factPhoto} ${styles.factPhotoBack}`} src={photos[0]} alt="" />
      <img className={`${styles.factPhoto} ${styles.factPhotoFront}`} src={photos[1]} alt="" />
    </div>
  );
}

function RandomFacts() {
  return (
    <section className={styles.randomFacts} aria-labelledby="facts-title">
      <h2 id="facts-title" className={styles.randomFactsTitle}>рандомные факты обо мне</h2>
      <p className={styles.randomFactsIntro}>с детства люблю творить: рисовал машины и хотел стать автомобильным дизайнером. сейчас детская мечта переросла в желание поработать над интерфейсом автомобильной бортовой системы</p>
      <div className={styles.randomFactsRow}>
        <FactPhotoStack />
        <p>в прошлом году побывал в Японии и мечтаю съездить туда еще раз, чтобы попасть на слет водителей JDM-машин. и очень хочу свою машину (японскую, конечно же!)</p>
      </div>
      <div className={styles.randomFactsRow}>
        <p>хожу в английский разговорный клуб, выращиваю комнатные растения, живу с бенгальской 🐆 кошкой. летом играю в бадминтон и волейбол, а зимой катаю на сноуборде</p>
        <FactPhotoStack reverse />
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    if (window.location.hash !== '#main-content') return undefined;

    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Head>
        <title>Вадим Зарипов — продуктовый дизайнер</title>
        <meta
          name="description"
          content="Портфолио продуктового дизайнера Вадима Зарипова."
        />
      </Head>

      <main className="min-h-screen bg-white text-[#202020]">
        <MainHeader />

        <section className={`${styles.intro} flex w-full flex-col items-start gap-6 px-6 pt-8 pb-16 sm:flex-row sm:items-center sm:gap-8 sm:px-10 md:justify-center`}>
          <Image
            src="/home-figma/profile.png"
            alt="Вадим Зарипов"
            width={120}
            height={120}
            priority
            className={`${styles.profileImage} h-24 w-24 shrink-0 rounded-full bg-[#E0E0E0] sm:h-[120px] sm:w-[120px]`}
          />
          <h1 className={`${styles.bodyLarge} max-w-[629px]`}>я вадим зарипов, продуктовый дизайнер. 6 лет создаю продуманные и креативные решения в edtech, стартапах и продуктах 0 → 1</h1>
        </section>

        <section id="projects" className={`${styles.projectsGrid} mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 px-6 pb-6 lg:grid-cols-2 xl:px-10`}>
          {projects.map((project) => (
            <ProjectCard key={project.label} project={project} />
          ))}
        </section>

        <RandomFacts />

        <footer className={`${styles.footer} ${styles.body} mx-auto flex h-[104px] w-full max-w-[1440px] items-center justify-between px-5 text-[20px] leading-6 sm:px-10`}>
          <span>дизайнил + кодил вадим зарипов</span>
          <span>2026</span>
        </footer>
      </main>
    </>
  );
}
