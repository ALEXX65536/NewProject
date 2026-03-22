// Константы с текстами и шаблонами для приложения
import { STATUS } from "./status";
export const TEXTS = {
  // Заголовок и сообщения
  title: "Мини-приложение 'Список задач'",
  loading: "Загрузка...",
  noTasks: "Задач не найдено",
  found: (count) => `Найдено: ${count}`,
  // Статусы задач
  statusDone: "✅ Завершена",
  statusNotDone: "❌ Не завершена",
  // Сообщения о пользователях
  userNotFound: "Пользователь не найден",
  unknownUser: "Неизвестный пользователь",
  noEmail: "Email не указан",
  noTitle: "Название не указано",
  // Генерация ключей и плейсхолдеров
  todoKey: (index) => `no-id-${index}`,
  searchPlaceholder: "Поиск...",
  statusLabel: "Статус",
  // Опции фильтрации по статусу
  filterOptions: [
    { value: STATUS.ALL, label: "Все" },
    { value: STATUS.COMPLETED, label: "Завершены" },
    { value: STATUS.ACTIVE, label: "Не завершены" }
  ],
  // Форматирование информации о пользователях и задачах
  userId: (id) => `ID пользователя: ${id}`,
  id: (id) => `ID: ${id}`,
  name: (name) => `Имя: ${name}`,
  email: (email) => `Email: ${email}`,
  // Кнопки
  close: "Закрыть",
  resetFilters: "Сбросить фильтры"
};