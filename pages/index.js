import SiteFooter from '@/components/SiteFooter';
import Arrow from '@/components/Arrow';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import MainHeader from '@/components/MainHeader';
import styles from '@/styles/Home.module.css';

const projects = [
  {
    kind: 'noomad',
    period: '2026',
    platform: 'iOS',
    title: "Noomad",
    icon: "/workplaces/noomad.svg",
    image: "/noomad/cover.png",
    imageAlt: "Главный экран приложения Noomad",
    caseTitle: "Как я спроектировал ключевые сценарии криптокошелька с нуля",
    label: 'Noomad — крипто-банкинг для цифровых кочевников',
    href: '/noomad',
  },
  {
    kind: 'uchi',
    period: '2021–2025',
    platform: 'Web',
    title: "Учи.ру",
    icon: "/workplaces/uchi.png",
    image: "/home-figma/uchi-laptop-cover.png",
    imageAlt: "Пейвол курса «Герои программирования» на экране ноутбука",
    caseTitle: "Как мы увеличили конверсию в покупку курса с 0,7% до 1,3%",
    label: 'Учи.ру — образовательные игры для школьников',
    href: '/uchi',
  },
  {
    kind: 'parkly',
    period: '2020–2023',
    platform: 'iOS, Android',
    title: "Паркли",
    icon: "/workplaces/parkly.svg",
    image: "/home-figma/parkly-phone.png",
    imageAlt: "Карта в приложении Паркли",
    caseTitle: "Как мы упрощали бронирование парковки по мере роста продукта",
    label: 'Паркли — сервис бронирования парковок',
    href: '/parkly',
  },
  {
    kind: 'fun',
    period: '2026',
    platform: 'iOS, Automotive',
    title: "",
    image: "/home-figma/fun-graphic.png",
    imageAlt: "Концепты интерфейсов",
    caseTitle: "Как я исследую новые идеи через UI-концепты и прототипы",
    label: 'UI-кейсы — концепты и прототипы',
    href: '/concepts',
  },
  {
    kind: 'vnutri',
    hidden: true,
    title: "Внутри",
    image: "/home-figma/vnutri-graphic.png",
    imageAlt: "Экраны платформы «внутри»",
    caseTitle: "Пет-проект, разработанный с помощью ИИ",
    label: 'Внутри — психологическая платформа',
  },
];

function ProjectShell({ project, children }) {
  const content = (
    <div className={`${styles.projectShell} ${styles.projectCard}`}>
      {children}
    </div>
  );

  if (!project.href) {
    return <article>{content}</article>;
  }

  if (project.external) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={project.label}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      aria-label={project.label}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
    >
      {content}
    </Link>
  );
}

function ProjectCard({ project }) {
  const isPhone = project.kind === 'noomad' || project.kind === 'parkly';

  return (
    <ProjectShell project={project}>
      {project.period && <div className={styles.projectMeta}>
        <span>{project.period}</span>
        <span aria-hidden="true">·</span>
        <span>{project.platform}</span>
      </div>}
      <div className={styles.projectCardCopy}>
        {project.title && <div className={styles.projectBrand}>
          {project.icon && <Image src={project.icon} alt="" width={28} height={28} />}
          <span>{project.title}</span>
        </div>}
        <h2 className={styles.projectHeadline}>{project.caseTitle}</h2>
      </div>
      <div className={styles.projectCardVisual}>
        <div className={isPhone
          ? `${styles.projectPhoneFrame} ${project.kind === 'parkly' ? styles.projectPhoneFrameParkly : ''}`
          : styles.projectImageFrame}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className={isPhone ? styles.projectPhoneImage : styles.projectCardImage}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
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
      <h2 id="facts-title" className={styles.randomFactsTitle}>Рандомные факты</h2>
      <p className={styles.randomFactsIntro}>С детства люблю творить: рисовал машины и хотел стать автомобильным дизайнером. Сейчас детская мечта переросла в желание поработать над интерфейсом автомобильной бортовой системы</p>
      <div className={styles.randomFactsRow}>
        <FactPhotoStack />
        <p>В прошлом году побывал в Японии и мечтаю съездить туда еще раз, чтобы попасть на слет водителей JDM-машин. И очень хочу свою машину (японскую, конечно же!)</p>
      </div>
      <div className={styles.randomFactsRow}>
        <p>Хожу в английский разговорный клуб, выращиваю комнатные растения, живу с бенгальской 🐆 кошкой. Летом играю в бадминтон и волейбол, а зимой катаю на сноуборде</p>
        <FactPhotoStack reverse />
      </div>
    </section>
  );
}

function AboutMe() {
  const points = [
    ['Работаю с бизнесом', 'Презентую решения заказчикам, объясняю свою логику и учитываю обратную связь'],
    ['Сопровождаю разработку', 'Готовлю макеты к передаче в разработку, провожу дизайн-ревью и проверяю, чтобы реализация соответствовала макетам'],
    ['Организую командную работу', 'Проводил дейлики, груминги и ретро, следил за порядком в Jira'],
    ['Развиваю дизайн-системы', 'Собираю переиспользуемые компоненты и слежу, чтобы интерфейс оставался единообразным'],
    ['Опираюсь на исследования и метрики', 'Изучаю потребности пользователей, смотрю на продуктовые метрики и учитываю цели бизнеса'],
  ];

  return (
    <section className={styles.aboutMe} aria-label="Обо мне">
      <ul>
        {points.map(([title, description]) => (
          <li key={title}>
            <h3>✦&nbsp;&nbsp;{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const introText = 'Я Вадим Зарипов, продуктовый дизайнер. Более 6 лет преобразую сложные задачи бизнеса в интуитивные пользовательские интерфейсы';

function AnimatedIntro() {
  let characterIndex = 0;
  return (
    <h1 className={`${styles.bodyLarge} max-w-[629px]`} aria-label={introText}>
      {introText.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} aria-hidden="true">
          {wordIndex > 0 && ' '}
          <span className={styles.introWord}>
            {Array.from(word).map((character, index) => (
              <span key={index} className={styles.introCharacter} style={{ animationDelay: `${characterIndex++ * 7}ms` }}>
                {character === '→' ? <Arrow size={24} /> : character}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function Home() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;

    const sections = document.querySelectorAll(`.${styles.aboutMe}, .${styles.randomFacts}`);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return;
        entry.target.classList.remove(styles.fadePending);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });

    sections.forEach((section) => {
      section.classList.add(styles.fadePending);
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove(styles.fadePending));
    };
  }, []);

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

      <main className={`${styles.homePage} min-h-screen bg-white text-[#202020]`}>
        <MainHeader />

        <section className={`${styles.intro} flex w-full flex-col items-start gap-6 px-4 pt-8 pb-16 sm:flex-row sm:items-center sm:gap-8 sm:px-10 md:justify-center`}>
          <div className={`${styles.profileImage} relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#E0E0E0] sm:h-[120px] sm:w-[120px]`}>
            <Image
              src="/home-figma/profile-seaside.jpg"
              alt="Вадим Зарипов"
              width={1920}
              height={2560}
              sizes="300px"
              priority
              className={styles.profilePortrait}
            />
          </div>
          <AnimatedIntro />
        </section>

        <section id="projects" className={`${styles.projectsGrid} ${styles.projectsEntrance} mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 px-4 pb-6 lg:grid-cols-2 xl:px-10`}>
          {projects.filter((project) => !project.hidden).map((project) => (
            <ProjectCard key={project.label} project={project} />
          ))}
        </section>

        <AboutMe />

        <RandomFacts />

        <SiteFooter />
      </main>
    </>
  );
}
