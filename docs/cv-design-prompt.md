# Промт для Claude Design — двомовне CV

Скопіюйте все, що нижче роздільника, і вставте в Claude Design одним повідомленням.

**Перед вставкою замініть `{{PORTFOLIO_URL}}` на реальну адресу сайту** (після деплою на
Vercel це буде щось на кшталт `https://portfolio-zubkovskiy.vercel.app` або ваш власний
домен). Адреса зустрічається у промті кілька разів — замініть скрізь.

Усі факти нижче взяті з сайту й перевірені. Нічого не додано «для краси» — якщо хочете
щось підсилити, дописуйте самі, але не вигадуйте цифр, які не зможете підтвердити на
співбесіді.

---

Зроби мені **резюме (CV) у двох мовних версіях — англійською та українською**, як два
окремі документи формату A4, готові до друку та експорту в PDF.

## Візуальний напрямок

Резюме має виглядати як продовження мого портфоліо — та сама фірмова мова:

- **Палітра:** майже чорний `#0A0A0A`, єдиний акцент — лаймовий `#A2FF01`. Текст
  заголовків `#F6F7F2`, основний текст на світлому тлі `#3B3B36`, другорядний `#6A6A65`,
  хайрлайни `#E4E4DE`. Другого акцентного кольору немає — це принципово.
- **Композиція:** темна «шапка» на всю ширину (чорне тло, лаймові деталі), далі світле
  тіло документа у дві колонки — ліва ширша (профіль, досвід, освіта, мета), права
  вужча (навички, мови, сертифікати).
- **Шрифти:** заголовки — **Unbounded** (жирний геометричний гротеск, 700–800), основний
  текст — **Inter**, дрібні технічні підписи (дати, теги, номери) — **IBM Plex Mono**.
  Обидва шрифти мають підтримувати кирилицю — українська версія цього вимагає.
- **Фірмова деталь:** асиметричний радіус `8px 32px 32px 32px` — три скруглені кути,
  один гострий. Використай його для монограми та іконок-маркерів.
- **Монограма:** «ZB» у лаймовому блоці з цим радіусом, поруч підпис «Curriculum Vitae» /
  «Резюме» моноширинним шрифтом, розрідженим трекінгом, великими літерами.
- Хайрлайни 1px замість тіней. Мінімум декору, максимум повітря. Друк у сірому теж
  має лишатися читабельним.

## Головна вимога — акцентне посилання на портфоліо

Це найважливіший елемент документа. Зроби **помітний акцентний блок із посиланням на
портфоліо** — він має ловити око першим після імені:

- Лаймова плашка з асиметричним радіусом, у ній моноширинним шрифтом адреса:
  **{{PORTFOLIO_URL}}**
- Поруч — **QR-код** на цю ж адресу (резюме часто друкують; QR робить перехід миттєвим).
- Короткий заклик: англійською «See the live portfolio — 5 projects you can open and
  click through», українською «Дивіться живе портфоліо — 5 проєктів, які можна відкрити
  й поклікати».
- Посилання має бути **клікабельним** у PDF, не просто текстом.
- Продублюй адресу дрібним рядком у підвалі кожної сторінки.

## Зміст — англійська версія

**Bohdan Zubkivskiy**
Frontend Developer · AI & Automation Specialist

Контакти: zubkovvsbogdan@gmail.com · +380 63 778 11 44 · Chernihiv, Ukraine
Статус: Open to freelance, remote & full-time

**Profile**
Frontend developer building interactive, production-ready interfaces with React,
TypeScript and Next.js. Currently writing frontend at Liha Yunaited. Five public
projects shipped: from landing pages built pixel-accurately from mockups, to a full
e-commerce storefront with client-side routing, global state and a persisted cart.
Alongside frontend work I build practical AI automations — n8n workflows and LLM-backed
pipelines — that remove repetitive manual work. Formal background in cybersecurity and
computer systems; currently deepening backend skills to work full-stack.

**Experience & Education**
- **2026 — Present · Junior Frontend Developer**, Liha Yunaited LLC
- **2023 · Internship on a development team** — six months working in a real team under
  a team lead
- **2019–2022 · Bachelor's, Cybersecurity** — Chernihiv National University of
  Technology, diploma issued 30.06.2022
- **2015–2019 · Junior Specialist, Computer Systems & Networks** — College of Transport
  & Computer Technologies (CTCT, ChNTU), diploma issued 30.06.2019
- **Until 2015 · General Secondary Education** — School No. 19, Chernihiv

**Selected Projects** (кожен — з клікабельним посиланням)
- **Nice Gadgets** — e-commerce storefront: catalogue with filtering, sorting and
  pagination, product pages with galleries and colour/capacity switching, cart and
  favourites in global state. React · TypeScript · SCSS · Zustand.
  https://zubkovskiy.github.io/react_phone-catalog/
- **MyBike** — pixel-accurate landing page from a mockup: fluid grid from 320px,
  burger-menu navigation, validated contact form. HTML · SCSS.
  https://zubkovskiy.github.io/layout_landing-page/
- **Hoobank** — fintech marketing site with a dark gradient system: statistics band,
  feature and testimonial sections, partner logo grid. HTML · CSS.
  https://zubkovskiy.github.io/Portfolio/projects/Hoobank/build/index.html
- **Auto Express** — commercial landing for a car import service: service walkthrough,
  carousel, lightbox gallery, lead form. HTML · CSS · jQuery.
  https://zubkovskiy.github.io/Portfolio/projects/AutoExpress/index.html
- **Xiaomi Himo** — product landing for an electric bike: specification blocks, feature
  breakdown, image slider. HTML · CSS.
  https://zubkovskiy.github.io/Portfolio/projects/Xiaomi-Himo/index.html

**Skills**
- *Core Stack:* HTML5, JavaScript, TypeScript, React, Next.js
- *Markup & Styling:* CSS3, Sass/SCSS, Less, CSS Modules, Tailwind CSS, BEM,
  Flexbox & Grid, Responsive Layout, Figma
- *AI & Automation:* n8n, AI-Assisted Development, Prompt Engineering, Workflow
  Automation, LLM APIs, Webhooks & Integrations
- *Tools & Integrations:* Zustand, REST API, Git, GitHub, npm, Vite
- *Currently Learning:* Backend Development, Node.js, Full-Stack Architecture

**Languages:** Ukrainian — native · English — technical

**Certificates**
- **Web Developer 2022** — Udemy (Ivan Petrychenko), 33.5 hours, issued 9 Aug 2022.
  Verify: https://ude.my/UC-bad52f7f-3a46-43ea-ad7e-1d30a8791c41
- **Full-Stack Developer** — in progress: frontend track finished, backend under way

**Career Objective**
I do my best work on teams that share knowledge and give honest feedback. Looking for
frontend or full-stack work where I can own real features end to end, learn from
stronger engineers and grow into wider ownership — full-time, remote or freelance.

## Зміст — українська версія

**Богдан Зубковський**
Фронтенд-розробник · спеціаліст з ШІ та автоматизації

Контакти: zubkovvsbogdan@gmail.com · +380 63 778 11 44 · Чернігів, Україна
Статус: Відкритий до фрілансу, віддаленої та повної зайнятості

**Профіль**
Фронтенд-розробник, який створює інтерактивні інтерфейси, готові до продакшену, на
React, TypeScript і Next.js. Зараз пишу фронтенд у «Лізі Юнайтед». У публічному доступі
п'ять проєктів: від лендингів, зверстаних точно за макетом, до повноцінного
інтернет-магазину з клієнтським роутингом, глобальним станом і збереженим кошиком.
Паралельно створюю практичні автоматизації — сценарії в n8n і пайплайни на мовних
моделях, — які прибирають рутинну ручну роботу. Формальна база: кібербезпека та
комп'ютерні системи; зараз поглиблюю бекенд, щоб працювати full-stack.

**Досвід та освіта**
- **2026 — дотепер · Junior Frontend розробник**, ТОВ «Ліга Юнайтед»
- **2023 · Стажування в команді розробки** — пів року в реальній команді під
  керівництвом тімліда
- **2019–2022 · Бакалавр, Кібербезпека** — Чернігівський національний технологічний
  університет, диплом видано 30.06.2022
- **2015–2019 · Молодший спеціаліст, Комп'ютерні системи та мережі** — Коледж транспорту
  та комп'ютерних технологій (КТКТ ЧНТУ), диплом видано 30.06.2019
- **До 2015 · Повна загальна середня освіта** — школа № 19, м. Чернігів

**Обрані проєкти** (посилання ті самі, що в англійській версії)
- **Nice Gadgets** — інтернет-магазин: каталог із фільтрами, сортуванням і пагінацією,
  сторінки товару з галереєю та вибором кольору й пам'яті, кошик і обране в глобальному
  стані. React · TypeScript · SCSS · Zustand.
- **MyBike** — точний до пікселя лендинг за макетом: гнучка сітка від 320px, бургер-меню,
  форма зворотного зв'язку з валідацією. HTML · SCSS.
- **Hoobank** — промо-сайт фінтех-сервісу з темною градієнтною системою: смуга
  статистики, блоки переваг і відгуків, сітка логотипів партнерів. HTML · CSS.
- **Auto Express** — комерційний лендинг сервісу пригону авто: покроковий опис послуги,
  карусель, галерея з лайтбоксом, форма заявок. HTML · CSS · jQuery.
- **Xiaomi Himo** — продуктова сторінка електровелосипеда: блоки характеристик, розбір
  переваг, слайдер зображень. HTML · CSS.

**Навички**
- *Основний стек:* HTML5, JavaScript, TypeScript, React, Next.js
- *Верстка та стилі:* CSS3, Sass/SCSS, Less, CSS Modules, Tailwind CSS, BEM,
  Flexbox та Grid, адаптивна верстка, Figma
- *ШІ та автоматизація:* n8n, розробка за допомогою ШІ, промпт-інженерія, автоматизація
  процесів, API мовних моделей, вебхуки та інтеграції
- *Інструменти та інтеграції:* Zustand, REST API, Git, GitHub, npm, Vite
- *Зараз вивчаю:* бекенд-розробка, Node.js, Full-Stack архітектура

**Мови:** українська — рідна · англійська — технічна

**Сертифікати**
- **WEB-розробник 2022** — Udemy (Іван Петриченко), 33,5 години, видано 9 серпня 2022.
  Перевірка: https://ude.my/UC-bad52f7f-3a46-43ea-ad7e-1d30a8791c41
- **Full-Stack розробник** — у процесі: фронтенд-частину завершено, бекенд триває

**Кар'єрна мета**
Найкраще працюю в команді, де діляться знаннями й дають чесний зворотний зв'язок. Шукаю
фронтенд- або full-stack роботу, де можна вести реальні фічі від початку до кінця,
вчитися в сильніших інженерів і брати більше відповідальності — повна зайнятість,
віддалено або фріланс.

## Правила, яких треба дотриматися

1. **Рівно одна сторінка A4 на кожну мову.** Якщо не вміщається — скорочуй описи
   проєктів, але блок із посиланням на портфоліо, контакти й поточну роботу не чіпай.
2. **Нічого не вигадуй.** Не додавай років досвіду, кількості клієнтів, відсотків,
   рейтингів чи назв компаній, яких немає в тексті вище. Порожньої графи краще не
   лишати — просто прибери секцію.
3. **Дві мови — два окремі файли**, з однаковою версткою. Українська версія довша за
   символами: перевір, що вона не ламає сітку й не переповзає на другу сторінку.
4. **Друк:** поля 0, розмір сторінки A4 явно заданий у `@page`. Темна шапка має
   друкуватися кольоровою (`print-color-adjust: exact`), а не білою.
5. **Без емодзі** — ні в тексті, ні в маркерах.
6. Дай кнопку «Зберегти як PDF» і перемикач мов, які не потрапляють у друк.
