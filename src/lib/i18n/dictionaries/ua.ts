import type { Dictionary } from '../types';

export const ua: Dictionary = {
  meta: {
    title: 'Богдан Зубковський — фронтенд-розробник і спеціаліст з ШІ-автоматизації',
    description:
      'Фронтенд-розробник і спеціаліст з автоматизації на основі ШІ з Чернігова. Створюю швидкі, чисті інтерфейси на React, Next.js і TypeScript та практичні автоматизації.',
    ogDescription:
      'Фронтенд-розробник і спеціаліст з ШІ-автоматизації з Чернігова. React · Next.js · TypeScript · автоматизація.',
    keywords: [
      'фронтенд розробник',
      'React розробник',
      'Next.js',
      'TypeScript',
      'автоматизація ШІ',
      'Чернігів',
      'Україна',
      'Богдан Зубковський',
    ],
  },

  nav: {
    links: [
      { key: 'home', label: 'Головна', href: '#top' },
      { key: 'services', label: 'Послуги', href: '#services' },
      { key: 'skills', label: 'Навички', href: '#skills' },
      { key: 'certificates', label: 'Сертифікати', href: '#certificates' },
      { key: 'projects', label: 'Проєкти', href: '#projects' },
      { key: 'education', label: 'Освіта', href: '#education' },
      { key: 'contact', label: 'Контакти', href: '#contact' },
    ],
    cta: "Зв'язатись",
    menuLabel: 'Відкрити меню',
    closeMenuLabel: 'Закрити меню',
  },

  hero: {
    eyebrow: 'Відкритий до фрілансу та повної зайнятості',
    greeting: 'Привіт, я',
    name: 'Богдан Зубковський',
    roles: ['Фронтенд-розробник', 'Спеціаліст з ШІ та автоматизації', 'Full-stack розробник у розвитку'],
    bio: 'Створюю швидкі, доступні інтерфейси на React, TypeScript і Next.js та практичні автоматизації на основі ШІ. П’ять проєктів уже онлайн — зараз пишу фронтенд у «Лізі Юнайтед» і розвиваюся у full-stack.',
    ctaPrimary: 'Переглянути проєкти',
    ctaDownload: 'Завантажити CV',
    stats: [
      { value: '5', label: 'проєкти онлайн' },
      { value: '1.5', label: 'сертифіката' },
      { value: '2', label: 'мови' },
    ],
    codeCaption: 'portfolio.tsx',
    /** Порядок відповідає TAG_LAYOUT у Hero.tsx: 4 зверху, 2 з боків, 4 знизу. */
    floatingTags: [
      'React',
      'Next.js',
      'TypeScript',
      'Figma',
      'AI',
      'n8n',
      'Tailwind CSS',
      'Zustand',
      'REST API',
      'Automation',
    ],
  },

  boot: {
    lines: [
      'ініціалізація zubkivskiy.dev …',
      'підключення frontend-модулів … OK',
      'завантаження модулів ШІ-автоматизації … OK',
      'встановлення захищеного з’єднання … OK',
      'компіляція портфоліо … OK',
    ],
    ready: 'ДОСТУП НАДАНО',
    skip: 'натисніть будь-яку клавішу, щоб пропустити',
    caption: 'boot.sh — zubkivskiy.dev',
  },

  marquee: [
    'Фронтенд-розробка',
    'React та Next.js',
    'TypeScript',
    'Автоматизація на ШІ',
    'Tailwind та Sass',
    'Full-Stack розробка',
  ],

  services: {
    eyebrow: 'Що я пропоную',
    ghost: 'ПОСЛУГИ',
    title: 'Послуги, які',
    highlight: 'я надаю',
    items: [
      {
        title: 'Фронтенд-розробка',
        description:
          'Адаптивні, точні до пікселя інтерфейси — від лендингів до повноцінного UI продукту — на React і TypeScript, із семантичною версткою, компонентною структурою та кодом, який лишається читабельним після передачі.',
        linkLabel: 'Детальніше',
      },
      {
        title: 'ШІ та автоматизація',
        description:
          'Практичні автоматизації, які прибирають рутинну ручну роботу: сценарії в n8n, контент-пайплайни на мовних моделях і внутрішні інструменти, підключені до ваших наявних API та вебхуків.',
        linkLabel: 'Детальніше',
      },
    ],
    diagramLabels: {
      componentTree: 'дерево компонентів',
      componentTreeMeta: 'react · ts',
      workflow: 'процес',
      workflowMeta: 'live',
    },
  },

  about: {
    eyebrow: 'Профіль',
    ghost: 'ПРОФІЛЬ',
    title: 'Хто такий',
    highlight: 'Богдан',
    bio: 'Фронтенд-розробник, який створює інтерактивні інтерфейси, готові до продакшену. Мій шлях почався з ручної верстки HTML і CSS, продовжився JavaScript та React, а зараз — це TypeScript, Next.js і робочі процеси з ШІ. Наразі пишу фронтенд у «Лізі Юнайтед», а в публічному доступі маю п’ять проєктів: від лендингів, зверстаних точно за макетом, до повноцінного інтернет-магазину з клієнтським роутингом, глобальним станом і збереженим кошиком. Для мене важлива не лише якість коду, а й семантична верстка, передбачуваний стан і відчуття від інтерфейсу.',
    goalTitle: "Кар'єрна мета",
    goal: 'Найкраще працюю в команді, де діляться знаннями й дають чесний зворотний зв’язок. Поглиблюю бекенд — Node.js, API, моделювання даних, — щоб доводити фічу далі за межу API, а не зупинятися на ній. Шукаю фронтенд- або full-stack роботу, де можна вести реальні фічі від початку до кінця, вчитися в сильніших інженерів і брати більше відповідальності.',
    profileCard: {
      fileName: 'profile.json',
      location: 'локація',
      focus: 'фокус',
      focusValue: 'Frontend · AI · Full-Stack',
      learning: 'вивчаю',
      learningValue: 'Node.js / API',
      status: 'статус',
      pillars: ['Frontend', 'AI', 'Автоматизація', 'Full-Stack'],
    },
  },

  skills: {
    eyebrow: 'Мій інструментарій',
    ghost: 'НАВИЧКИ',
    title: 'Навички та',
    highlight: 'експертиза',
    groups: [
      { label: 'Основний стек', items: ['HTML5', 'JavaScript', 'TypeScript', 'React', 'Next.js'] },
      {
        label: 'Верстка та стилі',
        items: [
          'CSS3',
          'Sass / SCSS',
          'Less',
          'CSS Modules',
          'Tailwind CSS',
          'BEM',
          'Flexbox та Grid',
          'Адаптивна верстка',
          'Figma',
        ],
      },
      {
        label: 'ШІ та автоматизація',
        items: [
          'n8n',
          'Розробка за допомогою ШІ',
          'Промпт-інженерія',
          'Автоматизація процесів',
          'API мовних моделей',
          'Вебхуки та інтеграції',
        ],
      },
      {
        label: 'Інструменти та інтеграції',
        items: ['Zustand', 'REST API', 'Git', 'GitHub', 'npm', 'Vite'],
      },
      { label: 'Зараз вивчаю', items: ['Бекенд-розробка', 'Node.js', 'Full-Stack архітектура'] },
    ],
  },

  languages: {
    title: 'Мови',
    items: [
      { name: 'Українська', level: 'рідна', proficiency: 100 },
      { name: 'Англійська', level: 'технічна', proficiency: 65 },
    ],
  },

  certificates: {
    eyebrow: 'Кваліфікації',
    ghost: 'СЕРТИФІКАТИ',
    title: 'Мої',
    highlight: 'сертифікати',
    note: 'Один курс завершено, другий — у процесі.',
    completedLabel: 'Завершено',
    inProgressLabel: 'У процесі',
    items: [
      {
        title: 'WEB-розробник 2022',
        issuer: 'Udemy · Іван Петриченко',
        meta: '33,5 години · видано 9 серпня 2022',
        status: 'complete',
        percent: 100,
        image: '/certificates/udemy-web-developer-2022.jpg',
        imageCaption: 'Сертифікат Udemy «WEB-розробник 2022»',
        verifyUrl: 'https://ude.my/UC-bad52f7f-3a46-43ea-ad7e-1d30a8791c41',
        verifyLabel: 'Перевірити сертифікат',
      },
      {
        title: 'Full-Stack розробник',
        issuer: 'У процесі',
        meta: 'Фронтенд-частину завершено, бекенд триває',
        status: 'in-progress',
        percent: 60,
        imageCaption: 'Скан з’явиться після завершення курсу',
        parts: [
          { label: 'Фронтенд', percent: 100 },
          { label: 'Бекенд', percent: 20 },
        ],
      },
    ],
  },

  projects: {
    eyebrow: 'Обрані роботи',
    ghost: 'ПРОЄКТИ',
    title: 'Мої',
    highlight: 'проєкти',
    note: 'Кожен проєкт нижче — робочий. Відкрийте будь-який і поклікайте.',
    items: [
      {
        title: 'Nice Gadgets',
        tags: ['React', 'TypeScript', 'SCSS', 'Zustand'],
        description:
          'Повноцінний інтернет-магазин телефонів, планшетів і аксесуарів: каталог із фільтрами, сортуванням і пагінацією, сторінки товару з галереєю та вибором кольору й пам’яті, а також кошик і обране, збережені в глобальному стані.',
        linkLabel: 'Відкрити демо',
        href: 'https://zubkovskiy.github.io/react_phone-catalog/',
        image: '/projects/Nice-Gadgets.jpg',
        meta: 'Соло-проєкт · роутинг і стан на клієнті',
      },
      {
        title: 'MyBike',
        tags: ['HTML', 'SCSS', 'Адаптив'],
        description:
          'Точна до пікселя посадкова сторінка за макетом. Гнучка сітка від 320px до десктопу, шар навігації з бургер-меню та форма зворотного зв’язку з валідацією — семантична верстка вручну, без фреймворків.',
        linkLabel: 'Відкрити демо',
        href: 'https://zubkovskiy.github.io/layout_landing-page/',
        image: '/projects/MyBike.jpg',
        meta: 'Соло-проєкт · верстка за макетом',
      },
      {
        title: 'Hoobank',
        tags: ['HTML', 'CSS', 'Лендинг'],
        description:
          'Промо-сайт фінтех-сервісу з темною градієнтною візуальною системою: перший екран зі смугою статистики, блоки переваг і відгуків та сітка логотипів партнерів, що чисто перебудовується під мобільний.',
        linkLabel: 'Відкрити демо',
        href: 'https://zubkovskiy.github.io/Portfolio/projects/Hoobank/build/index.html',
        image: '/projects/hoobank.jpg',
        meta: 'Соло-проєкт · темна UI-система',
      },
      {
        title: 'Auto Express',
        tags: ['HTML', 'CSS', 'jQuery'],
        description:
          'Комерційний лендинг сервісу пригону авто: покроковий опис послуги, карусель зображень і галерея з лайтбоксом на jQuery-плагінах, а також форма збору заявок.',
        linkLabel: 'Відкрити демо',
        href: 'https://zubkovskiy.github.io/Portfolio/projects/AutoExpress/index.html',
        image: '/projects/autoExpress.jpg',
        meta: 'Соло-проєкт · карусель і галерея',
      },
      {
        title: 'Xiaomi Himo',
        tags: ['HTML', 'CSS', 'Лендинг'],
        description:
          'Продуктова сторінка електровелосипеда: детальні блоки характеристик, розбір переваг і слайдер зображень на суворій сітці, налаштовані під читабельність на малих екранах.',
        linkLabel: 'Відкрити демо',
        href: 'https://zubkovskiy.github.io/Portfolio/projects/Xiaomi-Himo/index.html',
        image: '/projects/Xiaomi-Himo-C26.jpg',
        meta: 'Соло-проєкт · сторінка товару',
      },
    ],
    imagePlaceholder: 'Скріншот проєкту',
  },

  education: {
    eyebrow: 'Освітній шлях',
    ghost: 'ОСВІТА',
    title: 'Освіта і',
    highlight: 'розвиток',
    items: [
      {
        period: '2026 — дотепер',
        title: 'Junior Frontend розробник',
        institution: 'ТОВ «Ліга Юнайтед»',
        description: 'Поточна позиція.',
      },
      {
        period: '2023',
        title: 'Стажування в команді розробки',
        description: 'Пів року в реальній команді під керівництвом тімліда.',
      },
      {
        period: '2019–2022',
        title: 'Бакалавр — Кібербезпека',
        institution: 'Чернігівський національний технологічний університет',
        description: 'Диплом бакалавра видано 30.06.2022.',
      },
      {
        period: '2015–2019',
        title: 'Молодший спеціаліст — Комп’ютерні системи та мережі',
        institution: 'Коледж транспорту та комп’ютерних технологій (КТКТ ЧНТУ)',
        description: 'Диплом молодшого спеціаліста видано 30.06.2019.',
      },
      {
        period: 'До 2015',
        title: 'Повна загальна середня освіта',
        institution: 'Загальноосвітня школа № 19, м. Чернігів',
      },
    ],
  },

  contact: {
    eyebrow: "Зв'язатися",
    ghost: 'КОНТАКТИ',
    title: 'Обговоримо ваш',
    highlight: 'наступний проєкт',
    form: {
      nameLabel: "Ваше ім'я",
      namePh: 'Напр. Іван Петренко',
      emailLabel: 'Email',
      emailPh: 'you@example.com',
      phoneLabel: 'Телефон',
      phonePh: '+380 63 000 00 00',
      orLabel: 'або',
      contactHint: 'Залиште щонайменше одне — email або телефон.',
      contactError: 'Додайте, будь ласка, email або номер телефону, щоб я міг відповісти.',
      interestLabel: 'Мене цікавить',
      interestPh: 'Виберіть варіант',
      interestOptions: ['Фронтенд-проєкт', 'Автоматизація на ШІ', 'Full-stack проєкт', 'Інше'],
      messageLabel: 'Ваше повідомлення',
      messagePh: 'Розкажіть трохи про ваш проєкт…',
      submit: 'Відправити',
      submitting: 'Надсилаю…',
      successMessage: 'Дякую — повідомлення надіслано. Незабаром відповім.',
      errorMessage: 'Не вдалося надіслати повідомлення. Можете написати мені напряму на пошту.',
      mailtoFallback: 'Пряме надсилання ще не налаштоване — відкрийте лист у своєму поштовому клієнті.',
      mailtoFallbackAction: 'Відкрити в пошті',
      fieldErrors: {
        name: 'Вкажіть, будь ласка, ім’я — щонайменше 2 символи.',
        email: 'Ця email-адреса виглядає некоректно.',
        phone: 'Цей номер телефону задовгий.',
        message: 'Напишіть, будь ласка, щонайменше 10 символів, щоб я зрозумів суть.',
      },
      rateLimitError: 'Забагато спроб. Зачекайте кілька хвилин і спробуйте ще раз.',
    },
    labels: {
      address: 'Локація',
      contact: 'Прямий контакт',
      statusShort: 'Вільний для роботи',
    },
    info: {
      address: 'Чернігів, Україна',
      availability: 'Відкритий до фрілансу та віддаленої роботи',
    },
  },

  footer: {
    tagline: 'Фронтенд-розробник і спеціаліст з автоматизації на основі ШІ з Чернігова, Україна.',
    navTitle: 'Навігація',
    contactTitle: 'Контакти',
    ctaTitle: 'Є ідея для проєкту? Давайте обговоримо',
    builtWith: 'Зроблено на Next.js · Дизайн і код — Богдан',
    backToTop: 'Догори',
    copyright: 'Усі права захищено.',
  },

  easterEgg: {
    title: 'КОРЕНЕВИЙ ДОСТУП НАДАНО',
    subtitle: 'Ви знайшли код Konami. Ласкаво просимо до мейнфрейму, хакере.',
    consoleHint: 'Шукаєте щось? Спробуйте код Konami.',
  },

  cv: {
    documentLabel: 'Резюме',
    subtitle: 'Фронтенд-розробник · спеціаліст з ШІ та автоматизації · вивчаю бекенд, щоб працювати full-stack.',
    openness: 'Відкритий до фрілансу, віддаленої та повної зайнятості',
    backToSite: 'Назад на сайт',
    savePdf: 'Зберегти як PDF',
    sections: {
      profile: 'Профіль',
      education: 'Освіта та досвід',
      objective: "Кар'єрна мета",
      skills: 'Навички',
      languages: 'Мови',
      certificates: 'Сертифікати',
    },
    profile: [
      'Фронтенд-розробник, який створює інтерактивні інтерфейси, готові до продакшену, на React, TypeScript і Next.js. Зараз пишу фронтенд у «Лізі Юнайтед». У публічному доступі п’ять проєктів: від лендингів, зверстаних точно за макетом, до повноцінного інтернет-магазину з клієнтським роутингом, глобальним станом і збереженим кошиком.',
      'Паралельно з фронтендом створюю практичні автоматизації — сценарії в n8n і пайплайни на мовних моделях, — які прибирають рутинну ручну роботу. Формальна база: кібербезпека та комп’ютерні системи; зараз поглиблюю бекенд, щоб працювати full-stack.',
    ],
    objective:
      'Найкраще працюю в команді, де діляться знаннями й дають чесний зворотний зв’язок. Шукаю фронтенд- або full-stack роботу, де можна вести реальні фічі від початку до кінця, вчитися в сильніших інженерів і брати більше відповідальності — повна зайнятість, віддалено або фріланс.',
    statusLabels: {
      complete: 'завершено',
      'in-progress': 'у процесі',
    },
  },

  a11y: {
    skipToContent: 'Перейти до вмісту',
    scrollToTop: 'Прокрутити догори',
    languageSwitch: 'Змінити мову',
    readingProgress: 'Прогрес читання',
  },
};
