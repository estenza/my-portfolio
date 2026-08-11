import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CopyEmailLink from '@/components/CopyEmailLink';
import ProgressiveHeaderBlur from '@/components/ProgressiveHeaderBlur';
import homeStyles from '@/styles/Home.module.css';
import styles from '@/styles/UchiCase.module.css';

const courses = [
  '/uchi/courses/math-race.svg',
  '/uchi/courses/word-keepers.svg',
  '/uchi/courses/programming-heroes.svg',
  '/uchi/courses/english-pet.svg',
  '/uchi/courses/word-play.svg',
  '/uchi/courses/science-around.svg',
  '/uchi/courses/geometry.svg',
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
  ['auto.png', '1. добавили автоматический переход дальше после завершения озвучки реплики, клик по кнопке «→» теперь не обязателен.'],
  ['reassurance.png', '2. добавили подтверждение действия при выходе из игры.'],
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
        <Header />

        <section className={styles.intro}>
          <div className={styles.introContent}>
            <div className={styles.brand}><Image src="/workplaces/uchi.png" alt="Учи.ру" width={56} height={56} priority /><h1>учи.ру</h1></div>
            <p className={styles.lead}>интерактивные образовательные курсы для школьников</p>
            <div className={styles.stats}>
              <p><strong>8 млн*</strong><span>учеников</span></p>
              <p><strong>3 млн</strong><span>родителей</span></p>
              <p><strong>500 тыс.</strong><span>учителей</span></p>
            </div>
            <small>*по данным за 2022–23 годы</small>
          </div>

          <Section className={styles.courses}>
            <h2>за 4 года поработал над 7 курсами</h2>
            <div className={styles.courseRow}>
              {courses.map((src) => <img key={src} src={src} alt="" />)}
            </div>
          </Section>

          <Section title="что делал">
            <div className={styles.whatGrid}>
              <article><h3>✦&nbsp;&nbsp;исследовал</h3><p>препродакшен, качественные/количественные тесты</p></article>
              <article><h3>✦&nbsp;&nbsp;проектировал</h3><p>весь путь ученика от первого запуска до пейволла</p></article>
              <article><h3>✦&nbsp;&nbsp;рисовал</h3><p>нескучные игровые интерфейсы и микроанимации</p></article>
              <article><h3>✦&nbsp;&nbsp;проверял на проде</h3><p>пинал разработчиков, чтобы дизайн соответствовал макетам</p></article>
            </div>
          </Section>
        </section>

        <article className={styles.case}>
          <div className={styles.caseContent}>
            <header className={styles.caseHeader}>
            <h2>кейс 1: увеличили конверсию в покупку курса</h2>
            <p><strong><a href="https://uchi.ru/products/courses/course-math-racing" target="_blank" rel="noopener noreferrer">«математические гонки»</a></strong> — игровой тренажер для развития навыков быстрого счета у учеников 1–4 классов. правильные ответы ускоряют машину, неправильные — замедляют.</p>
            <p>как и все игровые курсы на «учи.ру», состоит из бесплатной trial-части, которая завершается пейволом с призывом позвать родителя для покупки полного доступа.</p>
          </header>
          <figure className={`${styles.heroImage} ${styles.paywallOverlayBorder}`}><img src="/uchi/rebuild/case1-hero.png" alt="Игра Математические гонки" /></figure>

          <Section title="проблема">
            <div className={styles.problemGrid}>
              <div><p>через две недели после релиза увидели, что конверсия в покупку курса составляет 0.7%, что меньше целевого показателя в 1%.</p><p>события аналитики показали, что больше всего отвалов по воронке было на этапе онбординга в начале игры.</p></div>
              <div className={styles.funnel}>{funnel.map((item) => <div key={item.label} className={item.muted ? styles.mutedFunnel : ''}><span>{item.label}</span><div className={styles.funnelTrack}><b style={{ width: item.fillWidth }}>{item.displayValue}</b>{item.lossWidth && <i style={{ left: item.lossOffset, width: item.lossWidth }} />}{item.lossLabel && <em style={{ left: item.lossLabelPosition }}>{item.lossLabel}</em>}</div></div>)}</div>
            </div>
          </Section>

          <Section title="первые правки">
            <p className={styles.copy}>сперва попробовали устранить возможные препятствия на пути игрока небольшими UX-правками, тем самым повысив конверсию в завершение онбординга.</p>
            <div className={styles.improvements}>{improvements.map(([image, text]) => <figure key={image}><div><img src={`/uchi/rebuild/${image}`} alt="" /></div><figcaption>{text}</figcaption></figure>)}</div>
          </Section>

          <Result>промежуточный результат: процент завершивших онбординг повысился с 63.3 до 68.5%.</Result>
          <p className={styles.copy}>пришли к выводу, что у нас недостаточно данных для того, чтобы существенно повлиять на конверсию — нужны дополнительные исследования.</p>

          <Section title="плей-тесты"><p className={styles.copy}>были подобраны 8 респондентов среди детей, уже занимающихся на «учи.ру», но еще не знакомых с курсом: мальчики и девочки поровну, ученики 1–4-х классов.</p></Section>

          <Section title="выявили проблемы и сформулировали гипотезы">
            <div className={styles.hypotheses}>
              <div className={styles.hypothesisRow}><article><span>!</span><p>слишком трудные задачи вкупе с тайм-прессингом дают слишком высокую когнитивную нагрузку</p></article><article className={styles.hypothesisSolution}><span>→</span><p>адаптировать сложность задач под уровень игры ребенка, чтобы найти баланс между скукой и сложностью</p></article></div>
              <div className={styles.hypothesisRow}><article><span>!</span><p>онбординг затянут, дети устают еще до первого уровня</p></article><article className={styles.hypothesisSolution}><span>→</span><p>сократить количество кругов с двух до одного, чтобы быстрее перейти к уровням</p></article></div>
              <div className={styles.hypothesisRow}><article><span>!</span><p>высокий уровень сложности соперников, сложно победить</p></article><article className={styles.hypothesisSolution}><span>→</span><p>адаптировать сложность соперников под уровень игры ребенка</p></article></div>
              <div className={styles.hypothesisRow}><article><span>!</span><p>дети теряются и не понимают, что нужно делать</p></article><article className={styles.hypothesisSolution}><span>→</span><p>добавить CTA-подсказки, чтобы сократить время на ввод ответа</p></article></div>
            </div>
          </Section>

          <Section title="проектирование">
            <div className={styles.designGrid}>
              <figure className={styles.designSquare}><img src="/uchi/rebuild/laps.png" alt="Сокращение кругов" className={styles.designFill} /><figcaption>1. сократили количество кругов в обучающей гонке с 2 до 1</figcaption></figure>
              <figure><img src="/uchi/rebuild/difficulty.png" alt="Адаптивная сложность" className={styles.designFill} /><figcaption>2. внедрили адаптивную сложность задач</figcaption></figure>
              <figure><img src="/uchi/rebuild/cta.gif" alt="Подсказка" /><figcaption>3. добавили подсказки к ответам после 3-х секунд бездействия</figcaption></figure>
              <figure><img src="/uchi/rebuild/cta-point4.gif" alt="Общий CTA" /><figcaption>4. добавили общий CTA на варианты ответа после 10 секунд бездействия</figcaption></figure>
            </div>
          </Section>
            <Result>после всех изменений конверсия в покупку курса выросла с 0.8% до 1.3%.</Result>
          </div>
        </article>

        <article className={styles.case}>
          <div className={styles.caseContent}>
            <header className={styles.caseHeader}><h2>кейс 2: внедрили пейвол, увеличивший продажи курса</h2><p><strong><a href="https://uchi.ru/products/games/word-keepers" target="_blank" rel="noopener noreferrer">«хранители слов»</a></strong> — игровой тренажер для закрепления правил орфографии.</p></header>
          <Section title="проблема"><p className={styles.copy}>через две недели после запуска изучили воронку и увидели, что пейвол плохо конвертит в покупку курса. при этом доходимость до пейвола была хорошая.</p><p className={styles.copy}><strong>гипотеза:</strong> текущая версия слишком ориентирована на ребенка и слабо доносит до родителя образовательную ценность.</p></Section>
          <figure className={styles.paywall}><img src="/uchi/rebuild/case2-3.png" alt="Первая версия пейвола" /><figcaption>первая версия пейвола</figcaption></figure>
          <Section title="глубинные интервью"><p className={styles.copy}>чтобы это проверить, инициировали серию глубинных интервью с родителями учеников (8 респондентов) и получили следующие результаты:</p><ul className={styles.list}><li>мало информации о том, какие навыки ребенка развивает курс</li><li>слишком большой акцент на игровой составляющей, мало образовательной ценности</li></ul></Section>
          <Section title="вторая версия"><p className={styles.copy}>совместно с методистами спроектировали вторую версию пейволла, дополнив его информацией о пользе курса.</p><figure className={`${styles.paywall} ${styles.paywallOverlayBorder}`}><img src="/uchi/rebuild/case2-6.png" alt="Вторая версия пейвола" /></figure><p className={styles.copy}>аналитика показала, что <strong>конверсия в покупку выросла с 0.6 до 0.7%</strong>, что все еще значительно ниже целевого показателя в 1%.</p><p className={styles.copy}><strong>гипотеза:</strong> если переориентировать пейволл полностью на родителя и сделать акцент только на пользе курса для ребенка, это позволит увеличить конверсию.</p></Section>
          <Section title="третья версия"><p className={styles.copy}>спроектировали третью версию пейвола, где в центре — образовательная ценность для родителя и понятный следующий шаг.</p><figure className={`${styles.paywall} ${styles.paywallNoBorder}`}><img src="/uchi/rebuild/case2-5.png" alt="Третья версия пейвола" /></figure></Section>
            <Result>конверсия в покупку выросла с 0.7 до 1.1%, гипотеза подтвердилась, целевой показатель был достигнут.</Result>
          </div>
        </article>

        <footer className={styles.footer}><span>дизайнил + кодил вадим зарипов</span><span>2026</span></footer>
      </main>
    </>
  );
}
