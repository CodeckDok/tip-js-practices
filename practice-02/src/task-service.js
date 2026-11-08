const PRIORITIES = ["low", "medium", "high"];
const TITLE_MIN = 1;
const TITLE_MAX = 100;

const ok    = (payload) => ({ ok: true, ...payload });
const fail  = (error)   => ({ ok: false, error });

// 1. createTask — создаёт объект задачи, не добавляет в массив
export function createTask(id, title, priority = "medium") {
  if (!Number.isSafeInteger(id) || id < 1) {
    return fail("id должен быть положительным целым числом");
  }
  if (typeof title !== "string") {
    return fail("title должен быть строкой");
  }
  const normalized = title.trim();
  if (normalized.length < TITLE_MIN || normalized.length > TITLE_MAX) {
    return fail(`длина title должна быть от ${TITLE_MIN} до ${TITLE_MAX}`);
  }
  if (!PRIORITIES.includes(priority)) {
    return fail(`priority должен быть одним из: ${PRIORITIES.join(", ")}`);
  }
  return ok({ task: { id, title: normalized, completed: false, priority } });
}

// 2. findTaskById — поиск через find + ===
export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

// 3. getPendingTasks — только незавершённые, новый массив
export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

// 4. getTaskTitles — массив названий, новый
export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

// 5. getTaskStats — агрегаты, progress — число
export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : (completed / total) * 100;
  return { total, completed, pending, progress };
}

// 6. addTask — createTask + проверка уникальности id + новый массив
export function addTask(tasks, id, title, priority) {
  if (tasks.some((task) => task.id === id)) {
    return fail(`задача с id=${id} уже существует`);
  }
  const created = createTask(id, title, priority);
  if (!created.ok) {
    return created;
  }
  return ok({ tasks: [...tasks, created.task] });
}

// 7. setTaskCompleted — только true/false, новый массив + новый объект
export function setTaskCompleted(tasks, id, completed) {
  if (typeof completed !== "boolean") {
    return fail("completed должен быть true или false");
  }
  if (!tasks.some((task) => task.id === id)) {
    return fail(`задача с id=${id} не найдена`);
  }
  const next = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );
  return ok({ tasks: next });
}

// 8. renameTask — нормализация + новый массив + новый объект
export function renameTask(tasks, id, title) {
  if (typeof title !== "string") {
    return fail("title должен быть строкой");
  }
  const normalized = title.trim();
  if (normalized.length < TITLE_MIN || normalized.length > TITLE_MAX) {
    return fail(`длина title должна быть от ${TITLE_MIN} до ${TITLE_MAX}`);
  }
  if (!tasks.some((task) => task.id === id)) {
    return fail(`задача с id=${id} не найдена`);
  }
  const next = tasks.map((task) =>
    task.id === id ? { ...task, title: normalized } : task
  );
  return ok({ tasks: next });
}

// 9. removeTask — filter, новый массив
export function removeTask(tasks, id) {
  if (!tasks.some((task) => task.id === id)) {
    return fail(`задача с id=${id} не найдена`);
  }
  return ok({ tasks: tasks.filter((task) => task.id !== id) });
}