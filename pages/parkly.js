import Head from 'next/head';
import Image from 'next/image';
import CaseNavigation from '@/components/CaseNavigation';
import { CaseContainer, CasePage, CaseSurface } from '@/components/CasePage';
import styles from '@/styles/ParklyCase.module.css';

const stats = [
  { value: '100 тыс.+', label: 'Скачиваний' },
  { value: '4.7 ★', label: '565 отзывов*' },
  { value: '~60', label: 'Парковок' },
  { value: '4', label: 'Города' },
];

const contributions = [
  ['Исследовал', 'Анализ конкурентов, юзабилити-тесты с водителями'],
  ['Проектировал', 'MVP, развитие приложения по мере роста, рефакторинг'],
  ['Рисовал', 'Иллюстрации для сторис и рекламы, 3D-графика'],
  ['Проверял на проде', 'Курировал разработку, чтобы дизайн соответствовал макетам'],
];

function V3Showcase() {
  return (
    <section className={styles.v3Showcase} aria-label="Сценарии бронирования в Паркли">
      <article className={styles.v3ShowcaseItem}>
        <img className={styles.v3StaticPhone} src="/parkly/v3-map-selection-v2.png" alt="Переключение между почасовым и помесячным бронированием" />
        <p>Переключение между почасовым и помесячным вариантами бронирования</p>
      </article>

      <article className={styles.v3ShowcaseItem}>
        <img className={styles.v3StaticPhone} src="/parkly/v3-parking-snippet-v2.png" alt="Карточка парковки с кнопкой бронирования" />
        <p>Кнопка «забронировать» в сниппете позволяет перейти к выбору времени и оплате сразу, минуя карточку парковки</p>
      </article>

      <article className={styles.v3ShowcaseItem}>
        <div className={`${styles.v3Phone} ${styles.v3TimePhone}`}>
          <img src="/parkly/final-time-select.gif" alt="Выбор времени и длительности бронирования" />
        </div>
        <p>Время бронирования выбирается на одном экране</p>
      </article>
    </section>
  );
}

export default function ParklyPage() {
  return (
    <>
      <Head><title>Паркли — кейс Вадима Зарипова</title></Head>
      <CasePage className={styles.page}>

        <CaseSurface className={styles.intro}>
          <section className={styles.projectInfo} aria-labelledby="parkly-title">
            <div className={styles.brand}>
              <Image src="/workplaces/parkly.svg" alt="Паркли" width={56} height={56} priority />
              <h1 id="parkly-title">Паркли</h1>
            </div>
            <p className={styles.lead}>Сервис для бронирования и оплаты парковки</p>
            <div className={styles.stats}>
              {stats.map((stat) => (
                <p key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></p>
              ))}
            </div>
            <small>*По данным App Store на август 2026</small>
          </section>

          <section className={styles.projectStory} aria-label="О проекте Паркли">
            <div>
              <p>
                «Паркли» — приложение для iOS и Android, позволяет водителям
                бронировать парковку у частников по ценам дешевле, чем у
                муниципального паркинга.
              </p>
              <p>
                Я подключился к продукту с самого начала: участвовал в запуске MVP,
                помогал в развитии и масштабировании в качестве единственного
                дизайнера
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
            <h2 id="contributions-title">Что делал</h2>
            <div className={styles.contributionGrid}>
              {contributions.map(([title, description]) => (
                <article key={title}>
                  <h3>✦&nbsp;&nbsp;{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>
        </CaseSurface>

        <CaseSurface className={`${styles.case} ${styles.ticketCase}`}>
          <CaseContainer className={`${styles.caseContent} ${styles.caseContentWithNavigation}`}>
            <header className={styles.caseHeader}>
              <h2>Кейс 2: эволюция парковочного билета</h2>
              <p>
                Парковочный билет используется для въезда на парковку, показывает
                информацию о бронировании и содержит инструкции о том, как найти
                парковку и как добраться до машиноместа внутри паркинга.
              </p>
              <p>
                Еще до запуска MVP решили провести немодерируемые тесты с 7-ю
                автомобилистами, чтобы понять, как сделать флоу бронирования и
                парковочный билет в частности максимально понятными — ведь, как
                правило, водители спешат и принимают решения в условиях
                стресса
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
              <h2>Итоги исследования</h2>
              <p>
                Водители подсказали, что иерархия отображения информации на
                парковочном билете во многом не логичная и нуждается в доработке
              </p>
            </section>

            <section className={styles.caseSection}>
              <h2>Проектирование версии для MVP</h2>
              <p>
                Полностью пересмотрели структуру билета на основе фидбэка от
                пользователей. Вся важная информация переехала наверх, стало меньше
                неиспользуемого полезного пространства. Эта версия вошла в MVP и
                получила положительные отзывы от пользователей
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
              <h2>Финальная версия билета</h2>
              <p>В рамках рефакторинга приложения переработали и парковочный билет:</p>
              <ol className={styles.caseList}>
                <li>
                  Визуально отделили непосредственно билет с самой важной
                  информацией от вспомогательных блоков. Сам билет стал заметно
                  компактнее и плотнее
                </li>
                <li>
                  Инструкция по парковке и информация о том, как добраться, стала
                  более подробной, пошаговой и переехала в отдельный раздел
                </li>
                <li>
                  Билет обрел модульную структуру, которая позволила адаптировать
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
              <h2>Цветовое кодирование состояний</h2>
              <p>
                Чтобы было проще и нагляднее различать стадии бронирования, ввели
                для них цветовое кодирование
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
            <CaseNavigation previous="/uchi" next="/concepts" />
          </CaseContainer>
        </CaseSurface>

        <CaseSurface className={`${styles.case} ${styles.bookingCase}`}>
          <CaseContainer className={styles.caseContent}>
            <header className={styles.caseHeader}>
              <h2>Кейс 1: как мы меняли сценарий бронирования по мере роста продукта</h2>
              <p>
                <strong>Контекст:</strong> в «Паркли» чем больше длительность
                бронирования, тем ниже стоимость часа парковки. Динамическое
                ценообразование — главное конкурентное преимущество и ключевой
                драйвер продаж продукта
              </p>
              <p>
                <strong>Задача:</strong> помочь водителю выбрать подходящую
                парковку, задать длительность, наглядно увидеть выгоду и итоговую
                стоимость
              </p>
            </header>

            <section className={styles.caseSection}>
              <h2>MVP: проверка спроса</h2>
              <p>
                На старте было подключено только три парковки в центре Москвы. Мы
                проверяли, готовы ли водители заранее бронировать место по более
                выгодной цене, даже если до точки назначения нужно пройти пешком
              </p>
              <p>
                При трех парковках карта могла создавать впечатление, что сервис
                пока не покрывает нужный район. Поэтому в MVP сначала просили
                указать место назначения и показывали только релевантные парковки
                поблизости
              </p>
              <p>
                Слоты показывали доступные периоды бронирования, их стоимость и
                учитывали ограничения работы парковки
              </p>
            </section>

            <Image
              src="/parkly/mvp-flow.png"
              alt="Выбор времени бронирования в MVP"
              width={1600}
              height={822}
              sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
              className={styles.caseImage}
            />

            <section className={styles.mvpFindings}>
              <p>
                Проанализировал ~40 отзывов из App Store, Google Play и формы
                обратной связи, полученных за 2 месяца после запуска. Они показали
                две разные группы проблем: ограниченное покрытие сервиса и
                неудобства в сценарии бронирования
              </p>
              <h3>Что узнали после запуска:</h3>
              <ul className={styles.caseFindings}>
                <li className={styles.caseFindingSuccess}>
                  <strong>Основная гипотеза MVP подтвердилась</strong> — водители не только доходили
                  до сценария бронирования, но и завершали оплату. Значит, они были
                  готовы заранее бронировать место на частной парковке, если видели
                  выгоду по цене. Точные метрики этого периода не могу разглашать
                  из-за NDA
                </li>
                <li>
                  Пользователям <strong>не хватало парковок</strong> в нужных районах. Это не
                  проблема дизайна, ее можно решить только расширением покрытия
                </li>
                <li>
                  <strong>Малый выбор вариантов слотов</strong>, невозможность самому настраивать
                  длительность бронирования
                </li>
                <li>
                  Не понятно <strong>зачем указывать время выезда</strong> — слоты все равно
                  отображали периоды бронирования за его пределами
                </li>
              </ul>
            </section>

            <section className={styles.caseSection}>
              <h2>V2: упрощение флоу бронирования</h2>
              <p>
                Через четыре месяца после запуска сеть парковок выросла с трех до
                шести. Показ списка локаций на главном экране стал достаточно
                полезным, чтобы пользователь мог начать поиск без обязательного
                указания точки назначения
              </p>
              <h3 className={styles.caseSubheading}>Что изменили:</h3>
              <ul className={styles.changeList}>
                <li>
                  Начали показывать парковки сразу без указания места назначения
                </li>
                <li>
                  Добавили таблицу ценообразования, чтобы наглядно показать, как
                  меняется стоимость часа в диапазоне 24 часов
                </li>
                <li>
                  Упростили выбор времени: теперь достаточно указать только время
                  начала бронирования и выбрать длительность с помощью расширенного
                  списка слотов
                </li>
                <li>
                  Добавили онбординг и сторис, чтобы объяснить ключевые особенности
                  сервиса, донести ценность и рассказывать о новостях продукта
                </li>
              </ul>
              <Image
                src="/parkly/v2.png"
                alt="Вторая версия выбора времени бронирования"
                width={1600}
                height={824}
                sizes="(min-width: 960px) 920px, calc(100vw - 32px)"
                className={styles.caseImage}
              />
              <section className={styles.v2Unresolved}>
                <h3>Что осталось нерешенным</h3>
                <p>
                  Вариантов слотов стало больше, но они все равно оставались
                  фиксированными. Пользователь по-прежнему не мог задать точную
                  длительность, а цену приходилось сопоставлять между экраном
                  выбора и таблицей тарифов. Поэтому следующим шагом я объединил
                  выбор времени и расчет стоимости в одном интерфейсе
                </p>
              </section>
            </section>

            <section className={styles.caseSection}>
              <h2>V3: карта и единый экран выбора времени</h2>
              <p>
                По мере роста сети парковок стало полезнее сразу показывать
                доступные локации на карте. Пользователь мог выбрать между
                почасовым и помесячным бронированием и сразу перейти к подходящему
                сценарию.
              </p>
              <h3 className={styles.caseSubheading}>Что изменили:</h3>
              <ul className={`${styles.changeList} ${styles.v3ChangeList}`}>
                <li>
                  Выбор времени и расчет стоимости объединили на одном экране.
                  Пользователь задает время начала и меняет длительность
                  бронирования, а интерфейс сразу показывает итоговую цену и
                  стоимость часа;
                </li>
                <li>
                  Горизонтальная шкала с ценовыми столбцами наглядно показывает,
                  как меняется стоимость при разной длительности. Это помогает
                  подобрать подходящий выгодный вариант без сравнения нескольких
                  слотов
                </li>
              </ul>
              <V3Showcase />
              <section className={styles.caseResult}>
                <h3>Результат</h3>
                <p>
                  Сценарий заменил фиксированные слоты и используется в текущей
                  версии приложения. Он стал основой для почасового бронирования на
                  парковках с разными тарифами и правилами работы
                </p>
                <p>
                  В поддержку стало поступать меньше вопросов о выборе
                  длительности и расчете стоимости. Это был качественный сигнал,
                  что пользователям стало проще подобрать время бронирования и
                  понять ценообразование до оплаты
                </p>
              </section>
            </section>
          </CaseContainer>
        </CaseSurface>
      </CasePage>
    </>
  );
}
