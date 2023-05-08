/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import questions from '@/assets/tickets/tickets.json';

export const counter = (function () {
  let count = 0;
  return function () {
    return count += 1;
  };
}());

export const shuffler = function (arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const THEMES_MAP = {
  security: 'Безопасность движения и техника управления автомобилем',
  towing: 'Буксировка механических транспортных средств',
  livingPlace: 'Движение в жилых зонах',
  autoban: 'Движение по автомагистралям',
  rails: 'Движение через железнодорожные пути',
  marking: 'Дорожная разметка',
  signs: 'Дорожные знаки',
  starting: 'Начало движения, маневрирование',
  problems: 'Неисправности и условия допуска транспортных средств к эксплуатации',
  overtaking: 'Обгон, опережение, встречный разъезд',
  responsibilities: 'Общие обязанности водителей',
  common: 'Общие положения',
  med: 'Оказание доврачебной медицинской помощи',
  stoping: 'Остановка и стоянка',
  laws: 'Ответственность водителя',
  transporting: 'Перевозка людей и грузов',
  walkers: 'Пешеходные переходы и места остановок маршрутных транспортных средств',
  light: 'Пользование внешними световыми приборами и звуковыми сигналами',
  signals: 'Применение аварийной сигнализации и знака аварийной остановки',
  cpecSignals: 'Применение специальных сигналов',
  priority: 'Приоритет маршрутных транспортных средств',
  cross: 'Проезд перекрестков',
  roads: 'Расположение транспортных средств на проезжей части',
  trafficLight: 'Сигналы светофора и регулировщика',
  speed: 'Скорость движения',
  teaching: 'Учебная езда и дополнительные требования к движению велосипедистов',
};

export const initDB = () => new Promise((resolve) => {
  const request = indexedDB.open('questions', 1);
  request.onupgradeneeded = function (e) {
    const db = e.target.result;
    const store = db.createObjectStore('questions', { keyPath: 'id' });
    store.createIndex('questions', 'id', { unique: true });
    questions.forEach((item) => {
      const topic = Object.keys(THEMES_MAP)
        .map((key) => ({ key, value: THEMES_MAP[key] }))
        .filter((theme) => item.topic.includes(theme.value));
      const rq = store.add({
        ...item,
        id: counter(),
        trys: 0,
        errors: 0,
        errorsInstock: 0,
        topic,
        ticketNumber: +item.ticket_number.substr(6),
        questionNumber: +item.title.substr(7),
      });
      rq.onsuccess = function () {
        resolve();
      };
    });
  };
  request.onsuccess = function () {
    resolve();
  };
});

// Функции для проверки курсора
export const ticketsQuery = (val, tickets) => (tickets?.length ? tickets.includes(val.ticketNumber) : true);
export const topicsQuery = (val, topics) => {
  const questiontopics = val.topic.map((item) => item.key);
  return topics?.length ? questiontopics.some((item) => topics?.includes(item)) : true;
};

export const skipSuccessFilter = (val, use) => (use ? (val.errorsInstock > 0 && val.trys > 0) || val.trys === 0 : true);
export const skipErrorsFilter = (val, use) => (use ? !(val.errorsInstock > 0) : true);
export const skipDontTouchedFilter = (val, use) => (use ? val.trys > 0 : true);
