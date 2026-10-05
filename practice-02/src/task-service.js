"use strict";

const VALID_PRIORITIES = ["low", "medium", "high"];
const MIN_TITLE_LENGTH = 1;
const MAX_TITLE_LENGTH = 100;

function isValidId(id) {
  return typeof id === "number" && Number.isSafeInteger(id) && id > 0;
}

function validateTitle(value) {
  if (typeof value !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }
  const title = value.trim();
  if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
    return {
      ok: false,
      error: `Длина названия должна быть от ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH}`,
    };
  }
  return { ok: true, title };
}

function validatePriority(value) {
  if (!VALID_PRIORITIES.includes(value)) {
    return {
      ok: false,
      error: `Приоритет должен быть одним из: ${VALID_PRIORITIES.join(", ")}`,
    };
  }
  return { ok: true };
}

// ---------- Создание ----------

export function createTask(id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым числом" };
  }
  const titleCheck = validateTitle(title);
  if (!titleCheck.ok) return titleCheck;

  const priorityCheck = validatePriority(priority);
  if (!priorityCheck.ok) return priorityCheck;

  return {
    ok: true,
    task: {
      id,
      title: titleCheck.title,
      completed: false,
      priority,
    },
  };
}

// ---------- Чтение ----------

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  let completed = 0;
  for (const task of tasks) {
    if (task.completed === true) completed += 1;
  }
  const pending = total - completed;
  const progress = total === 0 ? 0 : (completed / total) * 100;
  return { total, completed, pending, progress };
}

// ---------- Изменение ----------

export function addTask(tasks, id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым числом" };
  }
  if (tasks.some((task) => task.id === id)) {
    return { ok: false, error: `Задача с id = ${id} уже существует` };
  }
  const created = createTask(id, title, priority);
  if (!created.ok) return created;

  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым числом" };
  }
  if (typeof completed !== "boolean") {
    return { ok: false, error: "Значение completed должно быть логическим" };
  }
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: `Задача с id = ${id} не найдена` };
  }
  const newTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );
  return { ok: true, tasks: newTasks };
}

export function renameTask(tasks, id, title) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым числом" };
  }
  const titleCheck = validateTitle(title);
  if (!titleCheck.ok) return titleCheck;
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: `Задача с id = ${id} не найдена` };
  }
  const newTasks = tasks.map((task) =>
    task.id === id ? { ...task, title: titleCheck.title } : task
  );
  return { ok: true, tasks: newTasks };
}

export function removeTask(tasks, id) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым числом" };
  }
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: `Задача с id = ${id} не найдена` };
  }
  const newTasks = tasks.filter((task) => task.id !== id);
  return { ok: true, tasks: newTasks };
}