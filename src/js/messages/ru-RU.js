// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import iconMessages from './icons/en-US';

export default {
  IndexFilters: { // Did I understand the interpolation syntax?
    filters: `{quantity, plural,
      =0 {нет фильтров}
      =1 {один фильтр}
      other {# фильтры}
    }`,
  },
  ...iconMessages,
  Active: 'Активный',
  Activate: 'Активировать',
  Activated: 'Активирован',
  Add: 'Добавить',
  add: 'добавить',
  Alerts: 'Уведомления',
  All: 'Все',
  ampm: 'ампм', // context?
  Arc: 'Дуга',
  AxisLabel: '{orientation} Ось',
  area: 'зона',
  Bar: 'Бар', // context?
  bar: 'бар', // context?
  Blank: 'Пустой',
  Box: 'Ящик', // context?
  Carousel: 'Карусель',
  Category: 'Категория',
  Circle: 'Круг',
  Chart: 'Диаграмма',
  Children: 'Дети',
  Clear: 'Очистить',
  Cleared: 'Очищенный',
  Close: 'Закрыть',
  'Close Menu': 'Закрыть меню',
  Completed: 'Завершенный',
  'Connects With': 'Соединяется с',
  created: 'созданный',
  Critical: 'Критический',
  'Currently Active': 'Активный',
  'Date Selector': 'Выбор даты',
  'Date Time Icon': 'Выбор даты и времени',
  day: 'день',
  Disabled: 'Отключен',
  Distribution: 'Распределение',
  Email: 'Эл. адрес',
  'Enter Select': 'Нажмите enter чтобы выбрать его',
  Error: 'Ошибка',
  Filter: 'Фильтр',
  Footer: 'Нижний колонтитул', // Not 100% sure on this one
  Grommet: 'Громмет',
  HotSpotsLabel: 'HotSpots: нажмите клавиши со стрелками, чтобы взаимодействовать с ним.',
  'GraphValues': 'График имеет {count} элементы. Наивысшее - {highest}, а наименьшее - {smallest}',
  hour: 'час',
  'Grommet Logo': 'Громмет Лого',
  Layer: 'Слой',
  List: 'Список',
  line: 'линия',
  Loading: 'Загружается',
  loginInvalidPassword: 'Пожалуйста, укажите имя и пароль пользователя.',
  'Log In': 'Авторизоваться',
  Logout: 'Выйти',
  'Main Content': 'Основное содержание',
  Max: 'Максимум',
  Menu: 'Меню',
  Meter: 'метр',
  Min: 'Минимум', // assming 'minimum'
  minute: 'минута',
  model: 'модель',
  modified: 'модифицирован',
  monitor: 'монитор',
  month: 'месяц',
  'Multi Select': 'Выбор из нескольких вариантов',
  Name: 'Имя',
  'Navigation Help': 'Используйте клавиши со стрелками для навигации',
  'Next Month': 'Следующий месяц',
  'Next Slide': 'Следующий слайд',
  'No Relationship': 'Нет отношений',
    'Notification': 'Уведомление',
  OK: 'ОК',
  Open: 'Открыть',
  Parent: 'Родитель',
  Parents: 'Родители',
  Parts: 'Части',
  Part: 'Часть',
  Password: 'Пароль',
  'Previous Month': 'Предыдущий Месяц',
  'Previous Slide': 'Предыдущая Слайд',
  'Previous Tiles': 'Предыдущие Плитки',
  'Remember me': 'Запомни меня',
  'Range Start': 'Начало Диапазона',
  'Range End': 'Конец Диапазона',
  Resource: 'Ресурс',
  Running: 'Работает', // "working" -- fitting in context?
  Search: 'Поиск',
  'Match Results': `{count, plural,
      =0 {Нет совпадения}
      one {Есть одно совпадения}
      other {Есть # совпадений}
  }`,
  second: 'второй', // as in sequence (number #2), not as in time (hour/minute/second) (might need conjugation based on context)
  'Select Icon': 'Открыть селектор', // "open selector"
  Selected: 'Selected',
  'Selected Multiple': `{count, plural,
      =0 {none}
      one {# значение}
      other {# значения}
  }`,
  'Skip to': 'Перейти к',
  'Slide Number': ' Слайд {slideNumber}',
  Sort: 'Сортировать',
  Spinning: 'Прядильный', // not 100% sure on this
  Spiral: 'Спираль',
  State: 'Состояние',
  Status: 'Статус',
  Subtract: 'Вычитать',
  SunBurst: 'SunBurst', // context?
  'Tab Contents': 'Содержимое вкладки {activeTitle}',
  Table: 'Таблица',
  Tasks: 'Задания',
  Tiles: 'Плитки',
  Time: 'Время',
  Title: 'Заглавие',
  Today: 'Cегодня',
  Topology: 'Топология',
  Total: 'Всего',
  Threshold: 'Порог',
  Unknown: 'Неизвестный',
  Username: 'Имя пользователя',
  uri: 'унифицированный идентификатор ресурса', // no common abbreviation
  Value: 'Стоимость',
  Warning: 'Предупреждение',
  year: 'год'
};
