import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CopyEmailLink from '@/components/CopyEmailLink';
import ProgressiveHeaderBlur from '@/components/ProgressiveHeaderBlur';
import homeStyles from '@/styles/Home.module.css';
import styles from '@/styles/ConceptsCase.module.css';

function Header() {
  return (
    <header className={`site-header ${styles.header}`}>
      <ProgressiveHeaderBlur />
      <div className={styles.headerInner}>
        <Link href="/" className={homeStyles.bodyNarrow}>главная</Link>
        <nav className={`${homeStyles.bodyNarrow} flex items-center gap-3 sm:gap-10`} aria-label="Контакты">
          <a href="https://t.me/estenza" target="_blank" rel="noreferrer">telegram</a>
          <CopyEmailLink />
          <a href="https://www.linkedin.com/in/вадим-зарипов-40448317a" target="_blank" rel="noreferrer">linkedin</a>
        </nav>
      </div>
    </header>
  );
}

function Case({ title, year, children, image, alt }) {
  return (
    <article className={styles.case}>
      <div className={styles.caseContent}>
        <header className={styles.caseHeader}>
          <div className={styles.caseTitle}>
            <h2>{title}</h2>
            {year && <span>{year}</span>}
          </div>
          {children}
        </header>
        <Image
          src={image}
          alt={alt}
          width={1600}
          height={1600}
          sizes="(min-width: 960px) 800px, calc(100vw - 32px)"
          className={styles.caseImage}
        />
      </div>
    </article>
  );
}

export default function ConceptsPage() {
  return (
    <>
      <Head>
        <title>Концепты и прототипы — Вадим Зарипов</title>
        <meta name="description" content="Концепты и прототипы Вадима Зарипова." />
      </Head>
      <main className={styles.page}>
        <Header />

        <article className={styles.intro}>
          <div className={styles.introContent}>
            <div className={styles.brand}>
              <Image src="/workplaces/smile.svg" alt="" width={56} height={56} />
              <h1>концепты и прототипы</h1>
            </div>
            <p>всякая UX/UI красота, которая не дошла до реализации или не дотягивает для оформления в кейсы.</p>
          </div>
        </article>

        <Case
          title="приложение для нетворкинга"
          year="2026"
          image="/concepts/network-app.png"
          alt="Концепт мобильного приложения для нетворкинга"
        >
          <p>
            начинал проектировать интерфейс приложения для знакомств и нетворка. интерфейс поиска людей рядом задумывался как радар, который показывал готовых к общению пользователей в радиусе 100м. заказчик хотел, чтобы интерфейс выглядел и ощущался как системное приложение iOS, для этого старался максимально следовать Human Interface Guidelines и использовать UI-kit для iOS.
          </p>
        </Case>

        <Case
          title="HUD для автомобиля"
          year="2026"
          image="/concepts/hud.png"
          alt="Концепт автомобильного интерфейса HUD"
        >
          <p>
            концепт интерфейса для автомобильной мультимедийной системы: навигация, ассистенты вождения и быстрый доступ к функциям автомобиля на одном экране.
          </p>
        </Case>

        <footer className={styles.footer}>
          <span>дизайнил + кодил вадим зарипов</span>
          <span>2026</span>
        </footer>
      </main>
    </>
  );
}
