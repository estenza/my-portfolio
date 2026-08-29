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
      'когда я подключился к проекту, у команды уже была общая идея продукта, но не было согласованной структуры приложения.',
      'нужно было одновременно продумать кошелек, выпуск карты, регистрацию, KYC, пополнение, вывод средств, транзакции и настройки.',
      'я работал напрямую со стейкхолдером и мобильным разработчиком: собирал макеты в Figma, делал интерактивные прототипы и проверял готовые сценарии в TestFlight.',
    ],
  },
  {
    title: 'ограничения',
    paragraphs: [
      'часть функций зависела от лицензирования и внешних сервисов, поэтому состав MVP приходилось уточнять по ходу работы.',
      'приложение должно было выглядеть и ощущаться нативно для iOS, быть похожим на системные приложения и подчиняться гайдам Human Design.',
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

            <section className={styles.overview} aria-label="О продукте">
              <div className={styles.overviewText}>
                <p>noomad задумывался как приложение, в котором пользователь хранит криптоактивы, пополняет ими виртуальную карту и оплачивает ей покупки.</p>
                <p>главная ценность продукта — это не просто очередной криптокошелек, а возможность быстро выпустить карту и пользоваться ей в обычной жизни: платить в магазинах, добавлять в Apple Pay, оплачивать зарубежные сервисы и подписки.</p>
              </div>
              <Image src="/noomad/case-cover.png" alt="Экраны крипто-банкинга Noomad" width={759} height={767} sizes="(min-width: 760px) 440px, calc(100vw - 64px)" className={styles.overviewImage} priority />
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
            <h2>гипотезы и экраны</h2>

            <CaseSection title="карта — главный объект приложения" titleAs="h3" className={styles.hypothesisSection}>
              <Image
                src="/noomad/before-after.png"
                alt="Переход от списка активов к списку последних транзакций"
                width={1600}
                height={1048}
                sizes="(min-width: 960px) 800px, calc(100vw - 64px)"
              />
              <div className={styles.hypothesisText}>
                <p>на главном экране оставили карты, баланс, последние транзакции и основные действия.</p>
                <p>на одном счете пользователь мог выпустить две карты: виртуальную для Apple Pay и физическую для снятия наличных. на главном экране показали список последних транзакций по счету, а криптоактивы убрали под капот.</p>
              </div>
            </CaseSection>

            <CaseSection className={styles.hypothesisSection}>
              <Image
                src="/noomad/card-details.png"
                alt="Детали карты и сценарии управления"
                width={1600}
                height={1048}
                sizes="(min-width: 960px) 800px, calc(100vw - 64px)"
              />
              <div className={styles.hypothesisText}>
                <p>тапнув по карте, либо смахнув панель с транзакциями вниз, пользователь мог сразу увидеть данные карты и ее настройки. оставили только самые необходимые действия: управление лимитом, изменение пин-кода, блокировка/заморозка и перевыпуск карты, добавление в Apple Wallet.</p>
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
                <p>спроектировал экраны Deposit и Withdraw: выбор сети, ввод адреса, сканирование и показ QR. вместо длинного списка сетей оставили только три самых распространенных, с возможностью быстро переключаться между ними.</p>
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
                <p>сначала продукт проектировался в темной теме, но я сразу заложил основу для темной и светлой тем в токенах. после утверждения основных экранов я собрал светлую версию и распространил ее на весь интерфейс.</p>
                <p>компоненты проверяли сразу в контексте реальных поверхностей, чтобы видеть контраст и поведение элементов в обеих темах.</p>
              </div>
            </CaseSection>

            <CaseSection title="адаптировал UI под Liquid Glass" titleAs="h3" className={styles.hypothesisSection}>
              <div className={styles.hypothesisText}>
                <p>после выхода iOS 26 команда решила адаптировать интерфейс под Liquid Glass. стейкхолдер был за то, чтобы максимально использовать стекло в интерфейсе: предлагал сделать стеклянные кнопки действий на стеклянном же bottom sheet.</p>
                <p>я пошел изучать системные iOS-приложения, гайдлайны и заметил, что стекло используется очень точечно и всегда поверх контента, но никогда нет наслоения одного стеклянного элемента поверх другого.</p>
                <p>поэтому предложил оставить эффект для навигации и нижних шторок, но не использовать его без необходимости для карт и кнопок. так интерфейс стал современнее, но не потерял читаемость и иерархию.</p>
              </div>
              <Image
                src="/noomad/liquid-glass.png"
                alt="Адаптация интерфейса под Liquid Glass"
                width={1600}
                height={1088}
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

            <CaseSection title="выводы" className={styles.conclusionSection}>
              <p>сложный продукт не обязательно нужно запускать целиком. в noomad удалось выделить сценарий, который давал пользователю понятную ценность сразу — выпуск и использование карты.</p>
              <p>для меня этот проект стал опытом работы на стыке продуктового дизайна, визуальной системы и реальной разработки: я не только рисовал экраны, но и формировал наполнение MVP, описывал состояния, проверял сборки и менял решения, когда они плохо работали вне Figma.</p>
            </CaseSection>

            <CaseNavigation next="/uchi" />
          </CaseContainer>
        </CaseSurface>
      </CasePage>
    </>
  );
}
