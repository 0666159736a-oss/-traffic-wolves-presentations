// ─────────────────────────────────────────────────────────────
// Lemon Clips — комерційна пропозиція. Усі тексти для відвідувачів — українською.
// Редагуйте тексти, ціни та кейси тут. Фото кладіть у public/offer/.
// ─────────────────────────────────────────────────────────────

// Фото для першого екрана: реалістичні лимони (як фон платформи lemonclips.com).
// Покладіть файл у public/offer/ та вкажіть шлях, напр. 'offer/hero-lemons.jpg'. Рекомендовано 2400×1600, JPEG ~300 КБ.
export const heroPhoto = 'offer/hero-lemons.jpg'

export const price = { perThousand: 0.5, minViews: 1_000_000, step: 1_000_000, maxViews: 50_000_000 }

export const nav = [
  { id: 'about', label: 'Про нас' },
  { id: 'services', label: 'Послуги' },
  { id: 'process', label: 'Як це працює' },
  { id: 'cases', label: 'Кейси' },
  { id: 'pricing', label: 'Вартість' },
]

export const hero = {
  title: ['ВАШ КОНТЕНТ.', 'МІЛЬЙОНИ ПЕРЕГЛЯДІВ.'],
  subtitle: 'Масштабуємо охоплення відеоконтенту через мережу креаторів та кліперів.',
  min: 'Мінімальне замовлення — від 1 000 000 переглядів.',
}

export const about = {
  title: 'ХТО МИ?',
  paragraphs: [
    'Lemon Clips — платформа для масштабного просування відеоконтенту через мережу кліперів та креаторів.',
    'Ми допомагаємо артистам, брендам і бізнесам отримувати мільйони переглядів у соціальних мережах.',
    'Наша команда поєднує досвід у digital-просуванні, створенні коротких відео та дистрибуції контенту.',
  ],
  advantages: [
    { title: 'Масштабне просування', icon: 'scale' },
    { title: 'Мережа кліперів', icon: 'network' },
    { title: 'Оплата за перегляди', icon: 'eye' },
  ],
}

export const services = {
  title: 'ЩО МИ РОБИМО?',
  items: [
    { title: 'Пошук контенту', text: 'Самостійно знаходимо та підбираємо відеоматеріали або працюємо з контентом, наданим клієнтом.' },
    { title: 'Створення відео', text: 'Монтуємо короткі ролики, адаптовані під соціальні мережі.' },
    { title: 'Дистрибуція', text: 'Поширюємо відеоконтент через мережу кліперів та акаунтів.' },
    { title: 'Масштабування', text: 'Аналізуємо результати та масштабуємо успішні формати.' },
    { title: 'Аналітика', text: 'Відстежуємо перегляди та надаємо звітність за результатами кампанії.' },
  ],
  platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
}

export const process = {
  title: 'ВІД КОНТЕНТУ ДО МІЛЬЙОНІВ ПЕРЕГЛЯДІВ',
  steps: [
    { title: 'Підготовка', text: 'Отримуємо матеріали від клієнта або самостійно підбираємо контент для просування.' },
    { title: 'Запуск', text: 'Залучаємо мережу кліперів, створюємо та публікуємо короткі відео.' },
    { title: 'Масштабування', text: 'Тестуємо формати, аналізуємо результати та збільшуємо охоплення.' },
    { title: 'Результат', text: 'Фіксуємо кількість переглядів і надаємо звіт за результатами кампанії.' },
  ],
}

// ── Кейси ──────────────────────────────────────────────────────
// Лише реальні дані. Порожнє поле = «буде додано» (нічого не вигадуємо).
// Оформлення — за принципом LetsCorn «Our Cases»: теги, велике фото, назва, підзаголовок, показники у 2 колонки.
// {
//   id: 'slug',
//   name: 'Назва артиста / проєкту',
//   photos: ['offer/cases/slug.jpg'],           // 1–2 реальні фото (public/offer/cases)
//   clips: [{ src, views }],                     // або 3 кадри роликів з переглядами
//   tags: ['Music Promotion', 'Artist Growth'],   // тип просування
//   subtitle: 'Короткий опис просування',
//   views: '12 400 000',                          // кількість переглядів
//   metrics: [{ value: 'ТОП-3', label: 'у чартах' }, { value: '7M', label: 'охоплення' }],  // ключові результати
//   extra: [{ value: '+20K', label: 'підписників з одного відео' }],                         // додаткові показники
//   details: { url: 'https://…', label: 'Детальніше' }  // якщо є додаткові матеріали
// }
export const cases = [
  {
    id: 'harfang',
    name: 'HARFANG',
    photos: ['offer/cases/harfang.jpg', 'offer/cases/harfang-2.jpg'],
    tags: ['Music Promotion', 'Artist Growth'],
    subtitle: 'Завдяки 3 млн переглядів трек піднявся в ТОП-3 чартів.',
    views: '3 000 000',
    metrics: [{ value: 'ТОП-3', label: 'у чартах' }],
    extra: [],
  },
  {
    id: 'music',
    name: 'МУЗИКА',
    clips: [{ src: 'offer/cases/music-1.jpg', views: '1,2M' }, { src: 'offer/cases/music-2.jpg', views: '2,7M' }, { src: 'offer/cases/music-3.jpg', views: '3,6M' }],
    tags: ['Music Promotion'],
    subtitle: 'Просування музичного артиста. Результати за 1 місяць.',
    metrics: [{ value: '12,5M', label: 'загальне охоплення' }, { value: '1,8M+', label: 'залучень' }, { value: 'ТОП-3', label: 'у музичних чартах' }, { value: '250K+', label: 'нових підписників' }],
    extra: [],
  },
  {
    id: 'podcast',
    name: 'ПОДКАСТ',
    clips: [{ src: 'offer/cases/podcast-1.jpg', views: '732K' }, { src: 'offer/cases/podcast-2.jpg', views: '1,8M' }, { src: 'offer/cases/podcast-3.jpg', views: '2,4M' }],
    tags: ['Podcast Promotion'],
    subtitle: 'Короткі відео з випусків подкасту. Результати за 1 місяць.',
    metrics: [{ value: '12,5M', label: 'загальне охоплення' }, { value: '1,2M+', label: 'залучень' }, { value: 'ТОП-1', label: 'у подкаст-чартах за стрімами' }, { value: 'Значне', label: 'зростання стрімів' }],
    extra: [],
  },
  {
    id: 'sports',
    name: 'СПОРТ',
    clips: [{ src: 'offer/cases/sports-1.jpg', views: '718,8K' }, { src: 'offer/cases/sports-2.jpg', views: '3,8M' }, { src: 'offer/cases/sports-3.jpg', views: '9,5M' }],
    tags: ['Sports Content'],
    subtitle: 'Хайлайти, виходи на ринг і моменти боїв.',
    metrics: [{ value: '1B+', label: 'переглядів' }, { value: '~50M', label: 'переглядів за 1 місяць' }, { value: '~220K', label: 'підписників за 1 місяць' }],
    extra: [],
  },
  {
    id: 'doctor',
    name: 'ЛІКАР',
    clips: [{ src: 'offer/cases/doctor-1.jpg', views: '1,3M' }, { src: 'offer/cases/doctor-2.jpg', views: '2,6M' }, { src: 'offer/cases/doctor-3.jpg', views: '3,8M' }],
    tags: ['Expert Content'],
    subtitle: 'Експертний контент лікаря. Результати за 1 місяць.',
    metrics: [{ value: '12,5M', label: 'загальне охоплення' }, { value: '1,9M+', label: 'залучень' }, { value: 'ТОП-1', label: 'у медичній категорії TikTok' }, { value: '320K+', label: 'нових підписників' }],
    extra: [],
  },
  {
    id: 'education',
    name: 'ОСВІТА',
    clips: [{ src: 'offer/cases/edu-1.jpg', views: '1,2M' }, { src: 'offer/cases/edu-2.jpg', views: '3,6M' }, { src: 'offer/cases/edu-3.jpg', views: '2,8M' }],
    tags: ['Educational Content', 'TikTok'],
    subtitle: 'Освітні та пізнавальні ролики. Ключові показники за 1 місяць.',
    metrics: [{ value: '7,3M', label: 'переглядів одного відео' }, { value: '7M+', label: 'залучень' }, { value: 'ТОП-1', label: 'позиція в чартах' }, { value: '15,8K+', label: 'зростання стрімів' }],
    extra: [],
  },
]

export const pricing = {
  title: ['ПРОЗОРА ВАРТІСТЬ.', 'РЕАЛЬНІ ПЕРЕГЛЯДИ.'],
  rows: [1_000_000, 3_000_000, 5_000_000, 10_000_000],
  min: 'ВІД 1 000 000 ПЕРЕГЛЯДІВ',
  terms: 'Терміни та умови запуску кампанії узгоджуються індивідуально.',
}

// Форматування чисел за українськими правилами: 1 000 000, $1 500.
export const fmtNum = (n) => n.toLocaleString('uk-UA').replace(/[\u00a0\u202f]/g, ' ')
export const fmtUsd = (n) => '$' + fmtNum(Math.round(n * 100) / 100)
export const costOf = (views) => (views / 1000) * price.perThousand
