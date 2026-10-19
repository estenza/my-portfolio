import Head from 'next/head';
import Image from 'next/image';
import CaseNavigation from '@/components/CaseNavigation';
import { CaseContainer, CasePage, CaseSurface } from '@/components/CasePage';
import styles from '@/styles/ConceptsCase.module.css';

function Case({ title, year, children, image, alt, navigation }) {
  return (
    <CaseSurface className={styles.case}>
      <CaseContainer className={`${styles.caseContent} ${navigation ? styles.caseContentWithNavigation : ''}`}>
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
        {navigation}
      </CaseContainer>
    </CaseSurface>
  );
}

export default function ConceptsPage() {
  return (
    <>
      <Head>
        <title>Концепты и прототипы — Вадим Зарипов</title>
        <meta name="description" content="Концепты и прототипы Вадима Зарипова." />
      </Head>
      <CasePage>

        <CaseSurface className={styles.intro}>
          <CaseContainer className={styles.introContent}>
            <div className={styles.brand}>
              <Image src="/workplaces/smile.svg" alt="" width={56} height={56} />
              <h1>Концепты и прототипы</h1>
            </div>
            <p>Всякая UX/UI красота, которая не дошла до реализации или не дотягивает для оформления в кейсы</p>
          </CaseContainer>
        </CaseSurface>

        <Case
          title="Приложение для нетворкинга"
          year="2026"
          image="/concepts/network-app.png"
          alt="Концепт мобильного приложения для нетворкинга"
        >
          <p>
            Начинал проектировать интерфейс приложения для знакомств и нетворка. Интерфейс поиска людей рядом задумывался как радар, который показывал готовых к общению пользователей в радиусе 100м. Заказчик хотел, чтобы интерфейс выглядел и ощущался как системное приложение iOS, для этого старался максимально следовать Human Interface Guidelines и использовать UI-kit для iOS
          </p>
        </Case>

        <Case
          title="HUD для автомобиля"
          year="2026"
          image="/concepts/hud.png"
          alt="Концепт автомобильного интерфейса HUD"
          navigation={<CaseNavigation previous="/parkly" />}
        >
          <p>
            Концепт интерфейса для автомобильной мультимедийной системы: навигация, ассистенты вождения и быстрый доступ к функциям автомобиля на одном экране
          </p>
        </Case>

      </CasePage>
    </>
  );
}
