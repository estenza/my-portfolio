import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CopyEmailLink from '@/components/CopyEmailLink';
import ProgressiveHeaderBlur from '@/components/ProgressiveHeaderBlur';
import homeStyles from '@/styles/Home.module.css';
import styles from '@/styles/ParklyCase.module.css';

const stats = [
  { value: '100 тыс.+', label: 'скачиваний' },
  { value: '4.7 ★', label: '565 отзывов*' },
  { value: '~60', label: 'парковок' },
  { value: '4', label: 'города' },
];

const contributions = [
  ['исследовал', 'анализ конкурентов, юзабилити-тесты с водителями'],
  ['проектировал', 'MVP, развитие приложения по мере роста, рефакторинг'],
  ['рисовал', 'иллюстрации для сторис и рекламы, 3D-графика'],
  ['проверял на проде', 'пинал разработчиков чтобы дизайн соответствовал макетам'],
];

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

export default function ParklyPage() {
  return (
    <>
      <Head><title>Паркли — кейс Вадима Зарипова</title></Head>
      <main className={styles.page}>
        <Header />

        <article className={styles.intro}>
          <section className={styles.projectInfo} aria-labelledby="parkly-title">
            <div className={styles.brand}>
              <Image src="/workplaces/parkly.svg" alt="Паркли" width={56} height={56} priority />
              <h1 id="parkly-title">паркли</h1>
            </div>
            <p className={styles.lead}>сервис для бронирования и оплаты парковки</p>
            <div className={styles.stats}>
              {stats.map((stat) => (
                <p key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></p>
              ))}
            </div>
            <small>*по данным App Store на август 2026</small>
          </section>

          <section className={styles.projectStory} aria-label="О проекте Паркли">
            <div>
              <p>
                «паркли» — приложение для iOS и Android, позволяет водителям
                бронировать парковку у частников по ценам дешевле, чем у
                муниципального паркинга.
              </p>
              <p>
                я подключился к проекту с самого начала: участвовал в запуске MVP
                и помогал масштабировать.
              </p>
            </div>
            <Image
              src="/parkly/cover.png"
              alt="Главный экран и выбор времени бронирования в Паркли"
              width={712}
              height={628}
              sizes="(min-width: 960px) 500px, calc(100vw - 32px)"
              className={styles.projectStoryImage}
            />
          </section>

          <section className={styles.contributions} aria-labelledby="contributions-title">
            <h2 id="contributions-title">что делал</h2>
            <div className={styles.contributionGrid}>
              {contributions.map(([title, description]) => (
                <article key={title}>
                  <h3>✦&nbsp;&nbsp;{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>
        </article>

        <article className={styles.case}>
          <div className={styles.caseContent}>
            <header className={styles.caseHeader}>
              <h2>кейс 1: эволюция парковочного билета</h2>
              <p>
                парковочный билет используется для въезда на парковку, показывает
                информацию о бронировании и содержит инструкции о том, как найти
                парковку и как добраться до машиноместа внутри паркинга.
              </p>
              <p>
                еще до запуска MVP решили провести юзабилити-тесты с 7-ю
                автомобилистами, чтобы понять, как сделать его максимально понятным
                — ведь, как правило, водитель спешит и принимает решения в условиях
                стресса.
              </p>
            </header>

            <Image
              src="/parkly/case-1.png"
              alt="Результаты юзабилити-тестов парковочного билета"
              width={1600}
              height={1870}
              sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
              className={styles.caseImage}
            />

            <section className={styles.caseSection}>
              <h2>итоги исследования</h2>
              <p>
                водители подсказали, что иерархия отображения информации на
                парковочном билете во многом не логичная и нуждается в доработке.
              </p>
            </section>

            <section className={styles.caseSection}>
              <h2>проектирование финальной версии для MVP</h2>
              <p>
                полностью пересмотрели структуру билета на основе фидбэка от
                водителей. вся важная информация переехала наверх, стало меньше
                неиспользуемого полезного пространства. эта версия вошла в MVP и
                получила положительные отзывы от пользователей.
              </p>
              <Image
                src="/parkly/mvp.png"
                alt="Финальная версия парковочного билета для MVP"
                width={1600}
                height={1982}
                sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
                className={styles.caseImage}
              />
            </section>

            <section className={styles.caseSection}>
              <h2>финальная версия билета</h2>
              <p>в рамках рефакторинга приложения переработали и парковочный билет:</p>
              <ol className={styles.caseList}>
                <li>
                  визуально отделили непосредственно билет с самой важной
                  информацией от вспомогательных блоков. сам билет стал заметно
                  компактнее и плотнее.
                </li>
                <li>
                  инструкция по парковке и информация о том, как добраться, стала
                  более подробной, пошаговой и переехала в отдельный раздел.
                </li>
                <li>
                  билет обрел модульную структуру, которая позволила адаптировать
                  его под каждую отдельную парковку и учитывает разные способы
                  въезда: QR-код/кнопка сканирования QR/кнопки управления
                  шлагбаумами и т.д.
                </li>
              </ol>
              <Image
                src="/parkly/final.png"
                alt="Финальная версия парковочного билета"
                width={1600}
                height={1430}
                sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
                className={styles.caseImage}
              />
            </section>

            <section className={styles.caseSection}>
              <h2>цветовое кодирование состояний</h2>
              <p>
                чтобы было проще и нагляднее различать стадии бронирования, ввели
                для них цветовое кодирование.
              </p>
              <Image
                src="/parkly/colors.png"
                alt="Цветовое кодирование состояний бронирования"
                width={1600}
                height={934}
                sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
                className={styles.caseImage}
              />
            </section>
          </div>
        </article>

        <article className={styles.case}>
          <div className={styles.caseContent}>
            <header className={styles.caseHeader}>
              <h2>MVP: фиксированные слоты</h2>
              <p>
                на запуске парковок было мало, поэтому вместо карты с парковками
                на главном экране нужно было сперва задать адрес точки назначения,
                и уже потом смотреть, есть ли парковки поблизости.
              </p>
              <p>
                выбор времени бронирования занимал три шага: сперва пользователь
                указывал время заезда и выезда, затем выбирал доступные временные
                слоты.
              </p>
              <p>
                слоты были ранним способом отображения динамики изменения цен и
                ограничений парковки (график работы).
              </p>
            </header>

            <Image
              src="/parkly/mvp-flow.png"
              alt="Выбор времени бронирования в MVP"
              width={1600}
              height={996}
              sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
              className={styles.caseImage}
            />

            <ul className={styles.caseFindings}>
              <li>
                пользователи жаловались на отсутствие гибкости, (т.к. нельзя было
                указать точное количество часов) и на ограниченный набор вариантов
                продолжительности.
              </li>
              <li>
                не понятно было для чего указывать время выезда, если варианты
                слотов все равно отображали периоды бронирования за его пределами.
              </li>
            </ul>

            <section className={styles.caseSection}>
              <h2>v2: все еще слоты, но проще</h2>
              <p>
                подключили больше парковок, поэтому стали показывать список
                доступных парковок на главном экране. карточкам парковок добавили
                таблицу ценообразования, чтобы наглядно показать как меняется цена
                в пределах 24 часов.
              </p>
              <p>
                упростили выбор времени: теперь нужно было только указать только
                время начала и выбрать продолжительность из списка слотов.
              </p>
              <p>
                большой почасовой список слотов показывать не стали, чтобы не
                нагружать интерфейс. проблема с отсутствием гибкости никуда не
                ушла.
              </p>
              <Image
                src="/parkly/v2.png"
                alt="Вторая версия выбора времени бронирования"
                width={1600}
                height={996}
                sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
                className={styles.caseImage}
              />
            </section>

            <section className={styles.caseSection}>
              <h2>v3 (актуальная): единый экран выбора времени</h2>
              <p>
                когда подключили достаточное количество парковок, то стали сразу
                показывать их на карте с возможностью выбирать между почасовой и
                помесячной вариантами бронирования.
              </p>
              <p>
                выбор времени сделали на одном экране, что сделало ценообразование
                максимально наглядным для пользователя: горизонтальный слайдер с
                вертикальными столбцами показывает, как меняется цена в
                зависимости от продолжительности на манер графика цен у
                «Авиасейлс».
              </p>
              <p>этот интерфейс используется до сих пор и снискал любовь пользователей.</p>
              <Image
                src="/parkly/v3.png"
                alt="Актуальная версия единого экрана выбора времени"
                width={1600}
                height={1238}
                sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
                className={styles.caseImage}
              />
            </section>
          </div>
        </article>

        <footer className={styles.footer}>
          <span>дизайнил + кодил вадим зарипов</span>
          <span>2026</span>
        </footer>
      </main>
    </>
  );
}
