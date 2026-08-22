import Head from 'next/head';
import Image from 'next/image';
import CaseNavigation from '@/components/CaseNavigation';
import MainHeader from '@/components/MainHeader';
import styles from '@/styles/UchiCase.module.css';

const courses = [
  '/uchi/courses/scratch-course.svg',
  '/uchi/courses/math-race.svg',
  '/uchi/courses/word-play.svg',
  '/uchi/courses/programming-heroes.svg',
  '/uchi/courses/english-pet.svg',
  '/uchi/courses/word-keepers.svg',
];

const funnel = [
  { label: 'начало онбординга', value: 95.4, muted: true },
  { label: 'завершение онбординга', value: 70.6 },
  { label: 'запуск 1-го уровня', value: 64.3, muted: true },
].map((stage, index, stages) => {
  const previousValue = stages[index - 1]?.value ?? stage.value;
  const lossValue = previousValue - stage.value;
  const relativeLoss = (lossValue / previousValue) * 100;

  return {
    ...stage,
    displayValue: `${stage.value}%`,
    fillWidth: `${stage.value}%`,
    lossWidth: index === 0 ? null : `${previousValue}%`,
    lossOffset: '0%',
    lossLabel: index === 1 ? `–${relativeLoss.toFixed(1)}%` : null,
    lossLabelPosition: `${stage.value + (lossValue / 2)}%`,
  };
});

const improvements = [
  ['auto.png', '1. сделали автоматический переход дальше после завершения озвучки реплики, клик по кнопке «→» теперь не обязателен'],
  ['reassurance.png', '2. добавили подтверждение действия при выходе из игры, чтобы немного замедлить игрока и снизить импульсивность'],
];

function Section({ title, children, className = '' }) {
  return (
    <section className={`${styles.section} ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

function Result({ children }) {
  return <div className={styles.result}><strong>✦&nbsp;&nbsp;результат</strong><p>{children}</p></div>;
}

export default function UchiPage() {
  return (
    <>
      <Head><title>Учи.ру — кейс Вадима Зарипова</title></Head>
      <main className={styles.page}>
        <MainHeader fullBleed />

        <section className={styles.intro}>
          <div className={styles.introContent}>
            <div className={styles.brand}><Image src="/workplaces/uchi.png" alt="Учи.ру" width={56} height={56} priority /><h1><a href="https://uchi.ru" target="_blank" rel="noopener noreferrer">учи.ру</a></h1></div>
            <p className={styles.lead}>интерактивные образовательные курсы для школьников</p>
            <div className={styles.stats}>
              <p><strong>14 млн</strong><span>школьников</span></p>
              <p><strong>6 млн</strong><span>родителей</span></p>
              <p><strong>4,1 млн*</strong><span>MAU</span></p>
            </div>
            <small>*по данным на конец 2024 года</small>
          </div>

          <Section className={styles.courses}>
            <h2>за 4 года поработал над 8 курсами</h2>
            <div className={styles.courseRow}>
              <div className={styles.courseSet}>
                {courses.map((src) => <img key={src} src={src} alt="" />)}
                <span className={styles.courseMore}>+2</span>
              </div>
              <div className={`${styles.courseSet} ${styles.courseSetDuplicate}`} aria-hidden="true">
                {courses.map((src) => <img key={`duplicate-${src}`} src={src} alt="" />)}
                <span className={styles.courseMore}>+2</span>
              </div>
            </div>
          </Section>

          <Section title="что делал">
            <div className={styles.whatGrid}>
              <article><h3>✦&nbsp;&nbsp;исследовал</h3><p>препродакшен, качественные/количественные тесты</p></article>
              <article><h3>✦&nbsp;&nbsp;проектировал</h3><p>весь путь ученика от первого запуска до пейволла</p></article>
              <article><h3>✦&nbsp;&nbsp;рисовал</h3><p>нескучные игровые интерфейсы и микроанимации</p></article>
              <article><h3>✦&nbsp;&nbsp;проверял на проде</h3><p>курировал разработку, чтобы дизайн соответствовал макетам</p></article>
            </div>
          </Section>
        </section>

        <article className={styles.case}>
          <div className={styles.caseContent}>
            <header className={styles.caseHeader}>
            <h2>кейс 1: увеличили конверсию в покупку курса</h2>
            <p><strong><a href="https://uchi.ru/products/courses/course-math-racing" target="_blank" rel="noopener noreferrer">«математические гонки»</a></strong> — игровой тренажер для развития навыков быстрого счета у учеников 1–4 классов. правильные ответы ускоряют машину, неправильные — замедляют.</p>
            <p>как и все игровые курсы на «учи.ру», состоит из бесплатной trial-части, которая завершается пейволом с призывом позвать родителя для покупки полного доступа</p>
          </header>
          <figure className={`${styles.heroImage} ${styles.paywallOverlayBorder}`}><img src="/uchi/rebuild/case1-hero.png" alt="Игра Математические гонки" /></figure>

          <Section title="проблема">
            <div className={styles.problemGrid}>
              <div><p>через две недели после релиза увидели, что CR в покупку курса составляет <strong>0.7%</strong>, что меньше целевого показателя в <strong>1%</strong>.</p><p>события аналитики показали, что больше всего отвалов по воронке было во время онбординга в начале игры — мы теряли на этом этапе <strong>26%</strong> учеников, только <strong>70.6%</strong> доходило до завершения обучения</p></div>
              <div className={styles.funnel}>{funnel.map((item) => <div key={item.label} className={item.muted ? styles.mutedFunnel : ''}><span>{item.label}</span><div className={styles.funnelTrack}><b style={{ width: item.fillWidth }}>{item.displayValue}</b>{item.lossWidth && <i style={{ left: item.lossOffset, width: item.lossWidth }} />}{item.lossLabel && <em style={{ left: item.lossLabelPosition }}>{item.lossLabel}</em>}</div></div>)}</div>
            </div>
            <p className={`${styles.copy} ${styles.problemConclusion}`}>нужно было выяснить причину отвалов, для этого выбрали формат немодерируемых плей-тестов с детьми, но сперва решили просто увеличить доходимость небольшими UX-правками и проверить их влияние на воронку с помощью A/B-теста</p>
          </Section>

          <Section title="первый A/B-тест">
            <p className={`${styles.copy} ${styles.hypothesesIntro}`}>вместе с продактом внимательно изучили весь флоу, сопоставив его с событиями аналитики, выделили проблемные места и сформулировали для них гипотезы</p>
            <div className={styles.hypotheses}>
              <div className={styles.hypothesisRow}><article><span>!</span><p><strong>проблема:</strong> много отвалов на обучающих диалогах</p></article><article className={styles.hypothesisSolution}><span>→</span><p><strong>гипотеза:</strong> дети не понимают назначение кнопки «→» / не замечают ее и потому закрывают игру. если добавить автопереход после завершения озвучки, то уменьшим отвалы на диалогах</p></article></div>
              <div className={styles.hypothesisRow}><article><span>!</span><p><strong>проблема:</strong> заметные отвалы между заданиями во время и после онбординга</p></article><article className={styles.hypothesisSolution}><span>→</span><p><strong>гипотеза:</strong> когда дети видят фидбэк «правильно/неправильно», они не понимают, что нужно нажать на кнопку «Дальше». если сделать клик необязательным и добавить автопереход к следующему заданию, то уменьшим отвалы во время решения заданий</p></article></div>
            </div>
            <p className={`${styles.copy} ${styles.abTestConclusion}`}>на основе сформулированных гипотез внесли UX-правки и запустили A/B-тест на 2 недели</p>
            <div className={styles.improvements}>{improvements.map(([image, text]) => <figure key={image}><div><img src={`/uchi/rebuild/${image}`} alt="" /></div><figcaption>{text}</figcaption></figure>)}</div>
          </Section>

          <Result>процент завершивших онбординг повысился <strong>с 70.8 до 81.1%</strong>, общий CR в покупку незначительно вырос <strong>с 0.7% до 0.8%</strong></Result>
          <p className={styles.copy}>пришли к выводу, что у нас недостаточно данных для того, чтобы более существенно повлиять на CR в покупку курса — нужны дополнительные исследования</p>

          <Section title="немодерируемые тесты с детьми">
            <p className={styles.copy}>ux-исследователь подобрал для нас 8 детей, уже занимающихся на «учи.ру», но еще не знакомых с курсом: мальчики и девочки поровну, ученики 1–4-х классов. я провел часть ux-тестов самостоятельно из-за высокой загрузки ux-ресерчера.</p>
            <p className={`${styles.copy} ${styles.researchConclusion}`}>исследование показало серьезные проблемы со сложностью и с продолжительностью заездов, детям было тяжело решать задачи и одновременно следить за своим местом на трассе. один ребенок во время прохождения второго уровня даже заплакал 😢, пришлось прервать тест</p>
            <div className={`${styles.hypotheses} ${styles.researchHypotheses}`}>
              <div className={styles.hypothesisRow}><article><span>!</span><p><strong>проблема:</strong> задачи для кого-то были слишком трудными, а для кого-то слишком простыми</p></article><article className={styles.hypothesisSolution}><span>→</span><p><strong>гипотеза:</strong> если адаптировать сложность задач под уровень игры ребенка, то удастся найти баланс между сложностью и скукой</p></article></div>
              <div className={styles.hypothesisRow}><article><span>!</span><p><strong>проблема:</strong> боты-соперники редко косячили, их было сложно победить даже если не ошибаться во время ответов</p></article><article className={styles.hypothesisSolution}><span>→</span><p><strong>гипотеза:</strong> если адаптировать сложность соперников под то, как ребенок справляется с задачами, то победить станет проще (или сложнее)</p></article></div>
              <div className={styles.hypothesisRow}><article><span>!</span><p><strong>проблема:</strong> онбординг был затянут, дети теряли интерес еще до первого уровня</p></article><article className={styles.hypothesisSolution}><span>→</span><p><strong>гипотеза:</strong> если сократить количество кругов с двух до одного, то дети будут быстрее доходить до первого уровня</p></article></div>
              <div className={styles.hypothesisRow}><article><span>!</span><p><strong>проблема:</strong> явный перебор с четырьмя кругами на уровнях — дети сильно уставали или начинали скучать</p></article><article className={styles.hypothesisSolution}><span>→</span><p><strong>гипотеза:</strong> если сократить количество кругов с четырех до двух, то игровой процесс станет более динамичным, дети будут меньше уставать</p></article></div>
              <div className={styles.hypothesisRow}><article><span>!</span><p><strong>проблема:</strong> дети терялись и начинали следить за машинками, забывая решать задачи</p></article><article className={styles.hypothesisSolution}><span>→</span><p><strong>гипотеза:</strong> если добавить CTA-подсказки на ответы после нескольких секунд бездействия, то удастся переключить фокус внимания ребенка на задачи</p></article></div>
            </div>
          </Section>

          <Section title="финальные A/B-тесты">
            <div className={styles.designGrid}>
              <figure className={styles.designSquare}><img src="/uchi/rebuild/laps.png" alt="Сокращение кругов" className={styles.designFill} /><figcaption>1. в два раза сократили кол-во кругов в заездах: в обучающей гонке с 2 до 1, на уровнях с 4 до 2</figcaption></figure>
              <figure><img src="/uchi/rebuild/difficulty.png" alt="Адаптивная сложность" className={styles.designFill} /><figcaption>2. геймдизайнер создал алгоритм, адаптирующий сложность заданий и соперников под уровень игрока</figcaption></figure>
              <figure><img src="/uchi/rebuild/cta.gif" alt="Подсказка" /><figcaption>3. добавил подсказки к ответам после 3-х секунд бездействия во время обучения</figcaption></figure>
              <figure><img src="/uchi/rebuild/cta-point4.gif" alt="Общий CTA" /><figcaption>4. добавил общий CTA на варианты ответа после 10 секунд бездействия</figcaption></figure>
            </div>
          </Section>
            <Result>провели A/B-тест, аналитика показала увеличение CR в покупку курса <strong>с 0.8% до 1.3%</strong>, заметно превысив целевой показатель. тест был признан удачным, раскатили изменения на всех пользователей</Result>
          </div>
        </article>

        <article className={styles.case}>
          <div className={`${styles.caseContent} ${styles.caseContentLast}`}>
            <header className={styles.caseHeader}><h2>кейс 2: внедрили пейвол, увеличивший продажи курса</h2><p><strong><a href="https://uchi.ru/products/games/word-keepers" target="_blank" rel="noopener noreferrer">«хранители слов»</a></strong> — игровой тренажер для закрепления правил орфографии</p></header>
          <Section title="проблема"><p className={styles.copy}>через две недели после запуска изучили воронку и увидели, что пейвол плохо конвертит в покупку курса. при этом доходимость до пейвола была хорошая</p><p className={`${styles.copy} ${styles.hypothesisCopy}`}><strong>гипотеза:</strong> текущая версия слишком ориентирована на ребенка и слабо доносит до родителя образовательную ценность</p></Section>
          <figure className={styles.paywall}><img src="/uchi/rebuild/case2-3.png" alt="Первая версия пейвола" /><figcaption>первая версия пейвола</figcaption></figure>
          <Section title="глубинные интервью"><p className={styles.copy}>чтобы это проверить, инициировали серию глубинных интервью с родителями учеников (8 респондентов) и получили следующие результаты:</p><ul className={styles.list}><li>мало информации о том, какие навыки ребенка развивает курс</li><li>слишком большой акцент на игровой составляющей, мало образовательной ценности</li></ul></Section>
          <Section title="вторая версия"><p className={styles.copy}>совместно с методистами спроектировали вторую версию пейволла, дополнив его информацией о пользе курса</p><figure className={`${styles.paywall} ${styles.paywallOverlayBorder}`}><img src="/uchi/rebuild/case2-6.png" alt="Вторая версия пейвола" /></figure><p className={styles.copy}>аналитика показала, что <strong>конверсия в покупку выросла с 0.6 до 0.7%</strong>, что все еще значительно ниже целевого показателя в 1%.</p><p className={styles.copy}><strong>гипотеза:</strong> если переориентировать пейволл полностью на родителя и сделать акцент только на пользе курса для ребенка, это позволит увеличить конверсию</p></Section>
          <Section title="третья версия"><p className={styles.copy}>спроектировали третью версию пейвола, где в центре — образовательная ценность для родителя и понятный следующий шаг</p><figure className={`${styles.paywall} ${styles.paywallNoBorder}`}><img src="/uchi/rebuild/case2-5.png" alt="Третья версия пейвола" /></figure></Section>
            <Result>конверсия в покупку выросла с 0.7 до 1.1%, гипотеза подтвердилась, целевой показатель был достигнут</Result>
            <CaseNavigation next="/parkly" />
          </div>
        </article>

        <footer className={styles.footer}><span>дизайнил + кодил вадим зарипов</span><span>2026</span></footer>
      </main>
    </>
  );
}
