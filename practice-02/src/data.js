"use strict";

export const demoTasks = [
  { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
  { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
  { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
  { id: 10, title: "Оформить README", completed: true, priority: "medium" },
];

export const variantNumber = 5;

// Вариант 5: тема «Разработка командного прототипа».
// Идентификаторы строго 11, 23, 37, 41, 58, 64.
// K = 4 → первые четыре задачи выполнены.
// Приоритеты: low / medium / high присутствуют.
export const variantTasks = [
  { id: 11, title: "Согласовать требования прототипа",   completed: true,  priority: "high" },
  { id: 23, title: "Собрать макет главного экрана",      completed: true,  priority: "medium" },
  { id: 37, title: "Реализовать навигацию прототипа",    completed: true,  priority: "low" },
  { id: 41, title: "Подключить обработчики событий",     completed: true,  priority: "medium" },
  { id: 58, title: "Провести командное тестирование",    completed: false, priority: "high" },
  { id: 64, title: "Оформить демонстрацию прототипа",    completed: false, priority: "low" },
];