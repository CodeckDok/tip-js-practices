import { demoTasks } from "./data.js";
import {
  addTask,
  findTaskById,
  getPendingTasks,
  getTaskStats,
  getTaskTitles,
  removeTask,
  renameTask,
  setTaskCompleted
} from "./task-service.js";

function showStats(label, tasks) {
  const s = getTaskStats(tasks);
  console.log(
    `[${label}] всего: ${s.total}, выполнено: ${s.completed}, ` +
    `осталось: ${s.pending}, прогресс: ${s.progress.toFixed(1)}%`
  );
}

function showTask(label, task) {
  if (!task) {
    console.log(`[${label}] задача не найдена`);
    return;
  }
  console.log(
    `[${label}] id=${task.id}, title="${task.title}", ` +
    `completed=${task.completed}, priority=${task.priority}`
  );
}

let tasks = demoTasks;

console.log("=== Исходный набор ===");
tasks.forEach((t) => showTask("исходно", t));
showStats("исходно", tasks);
console.log("titles:", getTaskTitles(tasks).join(" | "));
console.log("pending ids:", getPendingTasks(tasks).map((t) => t.id).join(", "));

console.log("\n=== 1. Добавление id 20 ===");
{
  const r = addTask(tasks, 20, "Новая задача", "high");
  if (!r.ok) {
    console.log("Ошибка:", r.error);
  } else {
    tasks = r.tasks;
    showStats("после add", tasks);
    console.log("titles:", getTaskTitles(tasks).join(" | "));
  }
}

console.log("\n=== 2. Отметка id 4 как выполненной ===");
{
  const r = setTaskCompleted(tasks, 4, true);
  if (!r.ok) {
    console.log("Ошибка:", r.error);
  } else {
    tasks = r.tasks;
    showTask("id 4", findTaskById(tasks, 4));
    showStats("после complete", tasks);
  }
}

console.log("\n=== 3. Переименование id 10 ===");
{
  const r = renameTask(tasks, 10, "  Совещание с командой  ");
  if (!r.ok) {
    console.log("Ошибка:", r.error);
  } else {
    tasks = r.tasks;
    showTask("id 10", findTaskById(tasks, 10));
    showStats("после rename", tasks);
  }
}

console.log("\n=== 4. Удаление id 1 ===");
{
  const r = removeTask(tasks, 1);
  if (!r.ok) {
    console.log("Ошибка:", r.error);
  } else {
    tasks = r.tasks;
    showStats("после remove", tasks);
  }
}

console.log("\n=== Итоговый список ===");
console.log("ids:", tasks.map((t) => t.id).join(", "));
showStats("итог", tasks);

console.log("\n=== 5. Ошибка: попытка добавить дубликат id 4 ===");
{
  const r = addTask(tasks, 4, "Дубликат", "low");
  if (!r.ok) {
    console.log("Ожидаемая ошибка:", r.error);
    console.log("Список не изменился, ids:", tasks.map((t) => t.id).join(", "));
  }
}

console.log("\n=== 6. Проверка: demoTasks не изменился ===");
console.log("demoTasks.length:", demoTasks.length);
console.log("demoTasks ids:", demoTasks.map((t) => t.id).join(", "));
showStats("demoTasks", demoTasks);