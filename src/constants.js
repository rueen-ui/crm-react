export const PRODUCTS = [
  { value: 'course-html', label: 'Курс по верстке' },
  { value: 'course-js', label: 'Курс по JavaScript' },
  { value: 'course-vue', label: 'Курс по VUE JS' },
  { value: 'course-php', label: 'Курс по PHP' },
  { value: 'course-wordpress', label: 'Курс по WordPress' },
];

export const STATUSES = [
  { value: 'new', label: 'Новая', badge: 'badge-danger' },
  { value: 'inwork', label: 'В работе', badge: 'badge-warning' },
  { value: 'complete', label: 'Завершена', badge: 'badge-success' },
];

const TEST_NAMES = [
  'Иван Петров', 'Анна Смирнова', 'Дмитрий Козлов',
  'Мария Новикова', 'Алексей Морозов', 'Елена Соколова',
  'Сергей Воронов', 'Наталья Белова', 'Павел Тихонов',
];

const TEST_PHONES = [
  '+7 (900) 123-45-67', '+7 (911) 234-56-78',
  '+7 (922) 345-67-89', '+7 (933) 456-78-90',
  '+7 (944) 567-89-01', '+7 (955) 678-90-12',
];

const TEST_EMAILS = [
  'ivan@test.com', 'anna@mail.ru', 'd.kozlov@yandex.ru',
  'm.novikova@gmail.com', 'a.morozov@inbox.ru', 'sokolova@bk.ru',
  'voronov@test.ru', 'belova@mail.com', 'tihonov@yandex.com',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomTestData = () => ({
  name: pick(TEST_NAMES),
  phone: pick(TEST_PHONES),
  email: pick(TEST_EMAILS),
  product: pick(PRODUCTS).value,
});
