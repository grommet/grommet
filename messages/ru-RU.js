'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var _enUS = require('./icons/en-US');

var _enUS2 = _interopRequireDefault(_enUS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({
  IndexFilters: { // Did I understand the interpolation syntax?
    filters: '{quantity, plural,\n      =0 {\u043D\u0435\u0442 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432}\n      =1 {\u043E\u0434\u0438\u043D \u0444\u0438\u043B\u044C\u0442\u0440}\n      other {# \u0444\u0438\u043B\u044C\u0442\u0440\u044B}\n    }'
  }
}, _enUS2.default, {
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
  'Match Results': '{count, plural,\n      =0 {\u041D\u0435\u0442 \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044F}\n      one {\u0415\u0441\u0442\u044C \u043E\u0434\u043D\u043E \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044F}\n      other {\u0415\u0441\u0442\u044C # \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0439}\n  }',
  second: 'второй', // as in sequence (number #2), not as in time (hour/minute/second) (might need conjugation based on context)
  'Select Icon': 'Открыть селектор', // "open selector"
  Selected: 'Selected',
  'Selected Multiple': '{count, plural,\n      =0 {none}\n      one {# \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435}\n      other {# \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F}\n  }',
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
});
module.exports = exports['default'];