import assert from "node:assert/strict";
import {
  addTask,
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskStats,
  getTaskTitles,
  removeTask,
  renameTask,
  setTaskCompleted
} from "./src/task-service.js";

let passed = 0;
const failures = [];

function check(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failures.push({ name, error });
    console.log(`  ✗ ${name}: ${error.message}`);
  }
}

function section(title) {
  console.log(`\n--- ${title} ---`);
}

const sample = [
  { id: 1, title: "A", completed: false, priority: "low"    },
  { id: 2, title: "B", completed: true,  priority: "medium" }
];

section("createTask");
check("создаёт корректную задачу", () => {
  const r = createTask(1, "Тест", "high");
  assert.equal(r.ok, true);
  assert.deepEqual(r.task, { id: 1, title: "Тест", completed: false, priority: "high" });
});
check("обрезает пробелы", () => {
  assert.equal(createTask(1, "  Тест  ").task.title, "Тест");
});
check("priority по умолчанию medium", () => {
  assert.equal(createTask(1, "Тест").task.priority, "medium");
});
check("отклоняет отрицательный id", () => assert.equal(createTask(-1, "T").ok, false));
check("отклоняет дробный id",       () => assert.equal(createTask(1.5, "T").ok, false));
check("отклоняет пустое название",  () => assert.equal(createTask(1, "   ").ok, false));
check("отклоняет длинное название", () => assert.equal(createTask(1, "a".repeat(101)).ok, false));
check("отклоняет неизвестный priority", () => assert.equal(createTask(1, "T", "urgent").ok, false));
check("отклоняет не-строку в title", () => assert.equal(createTask(1, 42).ok, false));

section("findTaskById");
check("находит существующую", () => assert.deepEqual(findTaskById(sample, 2), sample[1]));
check("undefined для отсутствующей", () => assert.equal(findTaskById(sample, 99), undefined));
check("строковый id не совпадает с числовым", () => assert.equal(findTaskById(sample, "1"), undefined));

section("getPendingTasks");
check("возвращает только незавершённые", () => {
  const r = getPendingTasks(sample);
  assert.equal(r.length, 1);
  assert.equal(r[0].id, 1);
});
check("не мутирует входной массив", () => {
  const input = [...sample];
  getPendingTasks(input);
  assert.equal(input.length, 2);
});
check("пустой массив даёт пустой массив", () => assert.deepEqual(getPendingTasks([]), []));

section("getTaskTitles");
check("возвращает названия в порядке следования", () => {
  assert.deepEqual(getTaskTitles(sample), ["A", "B"]);
});
check("возвращает новый массив", () => {
  const t = getTaskTitles(sample);
  t.push("C");
  assert.equal(sample.length, 2);
});

section("getTaskStats");
check("правильно считает непустой массив", () => {
  assert.deepEqual(getTaskStats(sample), { total: 2, completed: 1, pending: 1, progress: 50 });
});
check("progress — число", () => assert.equal(typeof getTaskStats(sample).progress, "number"));
check("пустой массив — progress 0", () => {
  assert.deepEqual(getTaskStats([]), { total: 0, completed: 0, pending: 0, progress: 0 });
});
check("все выполнены — progress 100", () => {
  const all = [{ id: 1, title: "A", completed: true, priority: "low" }];
  assert.equal(getTaskStats(all).progress, 100);
});

section("addTask");
check("добавляет задачу в конец", () => {
  const r = addTask(sample, 3, "C", "high");
  assert.equal(r.ok, true);
  assert.equal(r.tasks.length, 3);
  assert.equal(r.tasks[2].id, 3);
});
check("не мутирует входной массив", () => {
  const input = [...sample];
  addTask(input, 3, "C");
  assert.equal(input.length, 2);
});
check("возвращает новый массив (не тот же)", () => {
  const r = addTask(sample, 3, "C");
  assert.notEqual(r.tasks, sample);
});
check("отклоняет дубликат id", () => assert.equal(addTask(sample, 1, "Дубликат").ok, false));
check("отклоняет некорректную задачу", () => assert.equal(addTask(sample, 3, "").ok, false));

section("setTaskCompleted");
check("меняет completed существующей", () => {
  const r = setTaskCompleted(sample, 1, true);
  assert.equal(r.ok, true);
  assert.equal(r.tasks[0].completed, true);
});
check("не мутирует исходный объект", () => {
  const input = [{ id: 1, title: "A", completed: false, priority: "low" }];
  setTaskCompleted(input, 1, true);
  assert.equal(input[0].completed, false);
});
check("создаёт новый объект изменённой задачи", () => {
  const input = [{ id: 1, title: "A", completed: false, priority: "low" }];
  const r = setTaskCompleted(input, 1, true);
  assert.notEqual(r.tasks[0], input[0]);
});
check("сохраняет неизменённые объекты по ссылке", () => {
  const input = [
    { id: 1, title: "A", completed: false, priority: "low" },
    { id: 2, title: "B", completed: false, priority: "low" }
  ];
  const r = setTaskCompleted(input, 1, true);
  assert.equal(r.tasks[1], input[1]);
});
check("отклоняет не-boolean completed", () => assert.equal(setTaskCompleted(sample, 1, "true").ok, false));
check("отклоняет отсутствующий id", () => assert.equal(setTaskCompleted(sample, 99, true).ok, false));

section("renameTask");
check("меняет название", () => {
  const r = renameTask(sample, 1, "Обновлено");
  assert.equal(r.ok, true);
  assert.equal(r.tasks[0].title, "Обновлено");
});
check("обрезает пробелы", () => {
  assert.equal(renameTask(sample, 1, "  Обновлено  ").tasks[0].title, "Обновлено");
});
check("не мутирует исходный объект", () => {
  const input = [{ id: 1, title: "A", completed: false, priority: "low" }];
  renameTask(input, 1, "B");
  assert.equal(input[0].title, "A");
});
check("отклоняет пустое название", () => assert.equal(renameTask(sample, 1, "   ").ok, false));
check("отклоняет отсутствующий id", () => assert.equal(renameTask(sample, 99, "B").ok, false));

section("removeTask");
check("удаляет задачу", () => {
  const r = removeTask(sample, 1);
  assert.equal(r.ok, true);
  assert.equal(r.tasks.length, 1);
  assert.equal(r.tasks[0].id, 2);
});
check("не мутирует исходный массив", () => {
  const input = [...sample];
  removeTask(input, 1);
  assert.equal(input.length, 2);
});
check("возвращает новый массив", () => {
  const r = removeTask(sample, 1);
  assert.notEqual(r.tasks, sample);
});
check("отклоняет отсутствующий id", () => assert.equal(removeTask(sample, 99).ok, false));

console.log(`\n=== ИТОГ: пройдено ${passed}, провалено ${failures.length} ===`);
if (failures.length > 0) {
  console.log("Проваленные проверки:");
  failures.forEach((f) => console.log(`  - ${f.name}: ${f.error.message}`));
  process.exit(1);
}
console.log(`Все проверки пройдены: ${passed}/${passed}`);