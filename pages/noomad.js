import Head from 'next/head';
import Image from 'next/image';
import CaseNavigation from '@/components/CaseNavigation';
import CaseSection from '@/components/CaseSection';
import { CaseContainer, CasePage, CaseSurface } from '@/components/CasePage';
import styles from '@/styles/NoomadCase.module.css';

const sections = [
  {
    title: 'вводные',
    paragraphs: [
      'я подключился к стартапу на стадии идеи, моей задачей было совместно со стейкхолдером определить состав MVP и спроектировать для него ключевые сценарии.',
      'работал напрямую со стейкхолдером и мобильным разработчиком: предлагал идеи, формировал гипотезы, собирал макеты в Figma, делал интерактивные прототипы и проверял готовые сценарии в TestFlight',
    ],
  },
];

export default function NoomadPage() {
  return (
    <>
      <Head>
        <title>Noomad — кейс Вадима Зарипова</title>
        <meta name="description" content="Кейс крипто-банкинга Noomad для цифровых кочевников." />
      </Head>

      <CasePage>
        <CaseSurface className={styles.case}>
          <CaseContainer className={styles.content}>
            <header className={styles.projectInfo}>
              <div className={styles.brand}>
                <Image src="/workplaces/noomad.svg" alt="" width={56} height={56} priority />
                <h1>noomad</h1>
              </div>
              <p>крипто-банкинг для цифровых кочевников</p>
            </header>

            <section className={`${styles.overview} ${styles.overviewSingle}`} aria-label="О продукте">
              <div className={styles.overviewText}>
                <p>noomad — приложение, в котором пользователь может хранить криптоактивы, выпустить виртуальную карту и оплачивать ей покупки по всему миру.</p>
              </div>
            </section>

            {sections.map((section) => (
              <CaseSection key={section.title} title={section.title} className={styles.textSection}>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </CaseSection>
            ))}

          </CaseContainer>
        </CaseSurface>

        <CaseSurface className={styles.hypotheses}>
          <CaseContainer className={styles.hypothesesContent}>
            <CaseSection title="онбординг и выпуск карты" titleAs="h3" className={`${styles.hypothesisSection} ${styles.onboardingSection}`}>
              <div className={styles.onboardingStage}>
                <div className={styles.onboardingPhone}>
                  <Image
                    src="/noomad/screen-recording.gif"
                    alt="Онбординг и выпуск виртуальной карты в приложении Noomad"
                    width={480}
                    height={1044}
                    unoptimized
                    className={styles.onboardingGif}
                  />
                  <Image
                    src="/noomad/iphone-16-pro.png"
                    alt=""
                    width={551}
                    height={1136}
                    className={styles.onboardingFrame}
                  />
                </div>
              </div>
              <div className={styles.hypothesisText}>
                <p>спроектировал минималистичный онбординг, который объяснял ценность продукта при первом запуске. за ним следовала короткая регистрация с подтверждением Email и KYC на стороне провайдера Sumsub</p>
              </div>
            </CaseSection>

            <CaseSection title="карта — главный объект приложения" titleAs="h3" className={styles.hypothesisSection}>
              <Image
                src="/noomad/before-after.png"
                alt="Переход от списка активов к списку последних транзакций"
                width={1600}
                height={1048}
                sizes="(min-width: 960px) 800px, calc(100vw - 64px)"
              />
              <div className={styles.hypothesisText}>
                <p>на главном экране оставили только самое необходимое для повседневного использования: карты, баланс по счету, последние транзакции и основные действия.</p>
                <p>на одном счете пользователь мог выпустить две карты: виртуальную для Apple Pay и физическую для снятия наличных. на главном экране показали список последних транзакций по счету, а криптоактивы убрали под капот.</p>
              </div>
            </CaseSection>

            <CaseSection className={styles.hypothesisSection}>
              <Image
                src="/noomad/card-details.png"
                alt="Детали карты и сценарии управления"
                width={1600}
                height={1176}
                sizes="(min-width: 960px) 800px, calc(100vw - 64px)"
              />
              <div className={styles.hypothesisText}>
                <p>тапнув по карте, либо смахнув панель с транзакциями вниз, пользователь мог сразу увидеть данные карты и ее настройки. оставили только самые необходимые действия: управление лимитом, изменение пин-кода, блокировка/заморозка и перевыпуск карты, добавление в Apple Wallet</p>
              </div>
            </CaseSection>

            <CaseSection title="понятные сценарии пополнения и вывода" titleAs="h3" className={styles.hypothesisSection}>
              <Image
                src="/noomad/deposit-withdraw.png"
                alt="Сценарии пополнения и вывода средств"
                width={1600}
                height={976}
                sizes="(min-width: 960px) 800px, calc(100vw - 64px)"
              />
              <div className={styles.hypothesisText}>
                <p>спроектировал экраны Deposit и Withdraw: выбор сети, ввод адреса, сканирование/показ QR. дали выбор между тремя самыми популярными сетями с возможностью быстро переключаться между ними</p>
              </div>
            </CaseSection>

            <CaseSection title="светлая и темная темы" titleAs="h3" className={styles.hypothesisSection}>
              <Image
                src="/noomad/light-dark.png"
                alt="Светлая и темная темы Noomad"
                width={1600}
                height={888}
                sizes="(min-width: 960px) 800px, calc(100vw - 64px)"
              />
              <div className={styles.hypothesisText}>
                <p>изначально продукт проектировался в темной теме, но я сразу заложил основу и для светлой темы с помощью токенов. после утверждения основных экранов собрал светлую версию и распространил ее на весь интерфейс</p>
              </div>
            </CaseSection>

            <CaseSection title="адаптировал UI под Liquid Glass" titleAs="h3" className={styles.hypothesisSection}>
              <div className={styles.hypothesisText}>
                <p>после выхода iOS 26 стейкхолдер предложил максимально использовать Liquid Glass — например, сделать стеклянные кнопки на стеклянной же нижней шторке.</p>
                <p>я изучил системные приложения и гайдлайны iOS: стекло там используют точечно, поверх контента и без наслоения элементов друг на друга. поэтому предложил применять стекло только там, где оно уместно</p>
              </div>
              <Image
                src="/noomad/liquid-glass.png"
                alt="Адаптация интерфейса под Liquid Glass"
                width={1600}
                height={1064}
                sizes="(min-width: 960px) 800px, calc(100vw - 64px)"
                className={styles.liquidGlassImage}
              />
            </CaseSection>

            <CaseSection title="что получилось" className={styles.resultSection}>
              <div className={styles.hypothesisText}>
                <p>к моменту остановки проекта у команды были рабочие TestFlight-сборки с основными сценариями:</p>
                <ul className={styles.resultList}>
                  <li>онбординг и первый запуск</li>
                  <li>регистрация и KYC</li>
                  <li>выпуск и управление виртуальной картой</li>
                  <li>баланс, реквизиты и транзакции</li>
                  <li>поиск по транзакциям, фильтры и статистика операций</li>
                  <li>пополнение и вывод средств</li>
                  <li>настройки, светлая и темная темы</li>
                </ul>
                <p>у проекта не было публичного запуска и, соответственно, метрик. но работа дошла до работающего предрелизного продукта, который команда использовала для внутренних тестов и демонстрации партнерам и инвесторам.</p>
              </div>
              <Image
                src="/noomad/screens.png"
                alt="Экраны TestFlight-сборки Noomad"
                width={1600}
                height={2190}
                sizes="(min-width: 960px) 800px, calc(100vw - 64px)"
                className={styles.resultImage}
              />
            </CaseSection>

            <CaseNavigation next="/uchi" />
          </CaseContainer>
        </CaseSurface>
      </CasePage>
    </>
  );
}
