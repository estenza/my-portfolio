import ProjectPage from '/components/ProjectPage';

export default function UchiPage() {
  return (
    <ProjectPage
      title="Учи.ру — игровые образовательные продукты"
      heroImage={{
        src: '/uchi/uchi-cover.png',
        alt: 'Учи.ру',
      }}
      caseHeader={{
        description: 'Четыре года я проектировал интерактивные курсы для учеников 1–11 классов: участвовал в препродакшне, собирал прототипы, проводил тесты с детьми и родителями, проектировал игровые сценарии, trial, paywall и интерфейсы для выпущенных продуктов.',
        pills: ['2021–2025', '7 курсов', 'Web, Tablet, Mobile'],
      }}
      productOverview={{
        title: 'О продукте',
        paragraphs: [
          'Учи.ру — образовательная онлайн-платформа для занятий в школе и дома. Ученики осваивают школьные предметы и дополнительные навыки через интерактивные задания, тренажеры и образовательные игры.',
        ],
        audiencesTitle: 'Аудитория',
        audiencesText: '12 млн учеников, 6 млн родителей по данным за 2022/23 учебные годы. Ученики 1–4 классов за год решили более 550 млн заданий.',
        image: {
          src: '/uchi/uchi-products.png',
          alt: 'Продукты Учи.ру',
        },
      }}
      showcase={{
        label: 'Примеры курсов Учи.ру',
        fullBleed: true,
        items: [
          {
            title: 'Геометрия',
            description: 'Интерактивный учебник и практика',
            previewClassName: 'h-[320px] w-[640px] max-w-full self-center items-center justify-center',
            imageClassName: 'h-full w-[578px] max-w-full rounded-[24px] object-contain',
            image: {
              src: '/uchi/showcase/geometry.png',
              alt: 'Интерактивный учебник по геометрии',
              width: 1156,
              height: 640,
            },
          },
          {
            title: 'Математические гонки',
            description: 'Тренажер по математике',
            previewClassName: 'h-[320px] w-[640px] max-w-full self-center items-center justify-center',
            imageClassName: 'h-full w-full object-cover',
            image: {
              src: '/uchi/showcase/math-race.png',
              alt: 'Превью курса Математические гонки',
              width: 1280,
              height: 640,
            },
          },
          {
            title: 'Хранители слов',
            description: 'Тренажер правописания',
            previewClassName: 'h-[320px] w-[640px] max-w-full self-center items-center justify-center',
            imageClassName: 'h-full w-full object-cover',
            image: {
              src: '/uchi/showcase/word-play.png',
              alt: 'Превью курса Хранители слов',
              width: 2880,
              height: 1440,
            },
          },
          {
            title: 'Английский со зверятами',
            description: 'Тренажер английского языка',
            previewClassName: 'h-[320px] w-[640px] max-w-full self-center items-center justify-center',
            imageClassName: 'h-full w-[578px] max-w-full rounded-[24px] object-contain',
            image: {
              src: '/uchi/showcase/english-pet.png',
              alt: 'Превью курса Английский со зверятами',
              width: 1156,
              height: 640,
            },
          },
          {
            title: 'Герои программирования',
            description: 'Обучение элементарному программированию',
            figureClassName: 'md:self-center',
            previewClassName: 'h-[320px] w-[640px] max-w-full self-center items-center justify-center',
            imageClassName: 'h-full w-full object-cover',
            image: {
              src: '/uchi/showcase/programming.png',
              alt: 'Превью курса Герои программирования',
              width: 1280,
              height: 642,
            },
          },
          {
            title: 'Словесная битва',
            description: 'PvP-соревнование по правописанию',
            figureClassName: 'w-fit items-center justify-self-center',
            previewClassName: 'h-[363px] w-[168px] items-center justify-center',
            imageClassName: 'h-full w-full object-contain',
            image: {
              src: '/uchi/showcase/word-pvp.png',
              alt: 'Экран PvP-соревнования Словесная битва',
              width: 1169,
              height: 2531,
              sizes: '168px',
            },
          },
        ],
      }}
      productGoals={{
        title: 'Цели продукта',
        items: [
          {
            icon: '/uchi/icons/goal-interest.svg',
            title: 'Удержать интерес ребенка',
            description: 'Ребенок должен быстро понять механику, получить позитивный опыт в виде знаний и захотеть продолжить без длинных объяснений.',
          },
          {
            icon: '/uchi/icons/goal-learning.svg',
            iconWidth: 36,
            iconHeight: 36,
            title: 'Сохранить образовательную ценность',
            description: 'Игровые действия должны помогать освоить конкретный навык, а не отвлекать от учебной задачи.',
          },
          {
            icon: '/uchi/icons/goal-parent.svg',
            iconWidth: 30,
            iconHeight: 25,
            title: 'Объяснить ценность родителю',
            description: 'После бесплатной части управление переходит от ребенка к взрослому, который оценивает пользу курса и принимает решение о покупке.',
          },
        ],
      }}
      uxContext={{
        title: 'Контекст UX-решений',
        items: [
          {
            title: 'Возраст и навык чтения',
            description: 'Ученики младших классов не всегда уверенно читают и ориентируются в интерфейсах, поэтому использовали короткие тексты, озвучку и наглядные подсказки.',
            visual: 'sound',
          },
          {
            title: 'Быстрая обратная связь',
            description: 'Не увидев результата, дети могут быстро повторять действие. Анимации, состояния элементов и реакция на ввод должны быть мгновенными.',
            visual: 'feedback',
          },
          {
            title: 'Разные устройства',
            description: 'Курсы использовались дома и в школе: на компьютерах, планшетах и смартфонах с разными разрешениями и браузерами.',
            visual: 'devices',
          },
        ],
      }}
      productModel={{
        title: 'Продуктовая модель',
        subtitle: 'Два пользователя в одном сценарии:',
        users: [
          {
            title: 'Ребенок',
            description: 'выбирает курс, знакомится с механикой и проходит бесплатную часть. После ее завершения интерфейс объясняет, что для продолжения необходимо позвать родителя.',
            colorClassName: 'bg-[#A362FC]',
          },
          {
            title: 'Родитель',
            description: 'знакомится с содержанием и образовательной ценностью курса, после чего принимает решение о покупке полного доступа.',
            colorClassName: 'bg-[#FF6170]',
          },
        ],
        steps: [
          { label: 'Ребенок играет', widthClassName: 'w-[104px]', colorClassName: 'bg-[#A362FC]' },
          { label: 'Видит результат и вовлекается', widthClassName: 'w-[168px]', colorClassName: 'bg-[#A362FC]' },
          { label: 'Завершает бесплатную часть', widthClassName: 'w-[132px]', colorClassName: 'bg-[#A362FC]' },
          { label: 'Родитель знакомится с пользой курса', widthClassName: 'w-[132px]', colorClassName: 'bg-[#FF6170]' },
          { label: 'Покупает полный доступ', widthClassName: 'w-[120px]', colorClassName: 'bg-[#FF6170]' },
          { label: 'Продолжает обучение', widthClassName: 'w-[139px]', colorClassName: 'bg-[#A362FC]' },
        ],
      }}
      purchaseTransition={{
        title: 'Переход от игры к покупке',
        description: 'Экран первым видел ребенок, но покупку совершал родитель. На основе качественных тестов и A/B-тестов мы нашли баланс между игровым опытом и понятной образовательной ценностью.',
        items: [
          {
            title: '1-я итерация: Продавали игровой опыт',
            description: 'Эффектный трейлер, минимум текста и призыв позвать родителя. На качественных тестах выяснили: родителям неясно, чему научится ребенок и за что они платят.',
            image: {
              src: '/uchi/iterations/iteration-1.png',
              alt: 'Первая итерация экрана покупки курса Хранители слов',
              width: 1344,
              height: 744,
            },
          },
          {
            title: '2-я итерация: Добавили пользу, но не сменили фокус',
            description: 'Трейлер сократили, а рядом показали навыки курса. Конверсия почти не изменилась: образовательная ценность все еще терялась среди игрового контента.',
            image: {
              src: '/uchi/iterations/iteration-2.png',
              alt: 'Вторая итерация экрана покупки курса Хранители слов',
              width: 1344,
              height: 744,
            },
          },
          {
            title: '3-я итерация: Продали образовательный результат',
            description: 'Экран адресовали родителю: конкретные навыки, объяснение пользы и примеры заданий. Ребенка просили позвать взрослого голосом, не перегружая экран. Вариант дал заметный прирост конверсии в покупку курса.',
            image: {
              src: '/uchi/iterations/iteration-3.png',
              alt: 'Третья итерация экрана покупки курса Хранители слов',
              width: 1840,
              height: 882,
            },
          },
        ],
      }}
      teamRole={{
        title: 'Моя роль в команде',
        description: 'Работал в кросс-функциональных Scrum-командах: участвовал в планировании и проработке курсов, проработке дизайна, передаче решений в разработку и последующих итерациях.',
        roles: [
          { label: 'Продакт-менеджер' },
          { label: 'Методист' },
          { label: 'Геймдизайнер' },
          { label: 'Продуктовый дизайнер', highlighted: true },
          { label: 'Разработчики' },
          { label: 'Иллюстраторы' },
          { label: 'Аниматор' },
          { label: 'Редактор' },
        ],
      }}
    />
  );
}
