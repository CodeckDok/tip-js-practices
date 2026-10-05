"use strict";

import { demoTasks, variantTasks, variantNumber } from "./data.js";
import {
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

function printStats(label, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  console.log(`--- ${label} ---`);
  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}

function apply(result, current, label) {
  if (result.ok) {
    console.log(`[${label}] операция успешна`);
    return result.tasks;
  }
  console.error(`[${label}] отказ: ${result.error}`);
  return current;
}

// ==================== Общий сценарий ====================

console.log("========== Общий сценарий (demoTasks) ==========");
let current = demoTasks;

printStats("Исходный набор", current);
console.log("Названия:", getTaskTitles(current));
console.log(
  "Невыполненные id:",
  getPendingTasks(current).map((task) => task.id)
);

console.log("Поиск id = 4:", findTaskById(current, 4));
console.log("Поиск id = 777:", findTaskById(current, 777));

current = apply(addTask(current, 20, "Добавить проверку", "high"), current, "addTask 20");
printStats("После добавления id = 20", current);

current = apply(setTaskCompleted(current, 4, true), current, "setTaskCompleted 4");
printStats("После completed = true для id = 4", current);

current = apply(
  renameTask(current, 10, "Подготовить инструкцию запуска"),
  current,
  "renameTask 10"
);
printStats("После переименования id = 10", current);

current = apply(removeTask(current, 7), current, "removeTask 7");
printStats("После удаления id = 7", current);

console.log("Итоговые id общего набора:", current.map((task) => task.id));

// Показать отказ: повторное добавление id = 20
const failAdd = addTask(current, 20, "Повторная попытка", "low");
if (failAdd.ok) console.error("Ожидался отказ, но операция прошла");
else console.log(`Отказ по плану: ${failAdd.error}`);

// Проверить, что исходный demoTasks не изменился
console.log("demoTasks после работы (id):", demoTasks.map((task) => task.id));
console.log(`demoTasks.length = ${demoTasks.length} (ожидается 4)`);

// ==================== Вариант 5 ====================

console.log(`\n========== Вариант ${variantNumber} (variantTasks) ==========`);
let variantCurrent = variantTasks;

printStats("Исходный набор варианта", variantCurrent);
console.log("Названия:", getTaskTitles(variantCurrent));
console.log(
  "Невыполненные id:",
  getPendingTasks(variantCurrent).map((task) => task.id)
);

variantCurrent = apply(
  addTask(variantCurrent, 80, "Провести командную ретроспективу", "medium"),
  variantCurrent,
  "addTask 80"
);
printStats("После добавления id = 80", variantCurrent);

variantCurrent = apply(
  setTaskCompleted(variantCurrent, 11, true),
  variantCurrent,
  "setTaskCompleted 11"
);
printStats("После completed = true для id = 11", variantCurrent);

variantCurrent = apply(
  renameTask(variantCurrent, 23, "  Собрать финальный макет интерфейса  "),
  variantCurrent,
  "renameTask 23"
);
printStats("После переименования id = 23", variantCurrent);

variantCurrent = apply(removeTask(variantCurrent, 37), variantCurrent, "removeTask 37");
printStats("После удаления id = 37", variantCurrent);

console.log("Итоговые id варианта:", variantCurrent.map((task) => task.id));

// Повторная попытка добавить id = 80 — должна быть отклонена
const failAdd80 = addTask(variantCurrent, 80, "Повторная попытка", "low");
if (failAdd80.ok) console.error("Ожидался отказ, но операция прошла");
else console.log(`Отказ по плану: ${failAdd80.error}`);

// Проверить сохранность исходного variantTasks
console.log("variantTasks после работы (id):", variantTasks.map((task) => task.id));
console.log(`variantTasks.length = ${variantTasks.length} (ожидается 6)`);