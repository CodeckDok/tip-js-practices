"use strict";

const totalTasks = 12;
const completedTasks = 5;

const isTotalValid = Number.isInteger(totalTasks) && totalTasks >= 0 && totalTasks <= 1000;
const isCompletedValid = Number.isInteger(completedTasks) && completedTasks >= 0 && completedTasks <= totalTasks;

if (!isTotalValid || !isCompletedValid) {
  console.log("Ошибка: проверьте корректность количества задач");
} else if (totalTasks === 0 && completedTasks === 0) {
  console.log("Задач пока нет");
} else {
  const remainingTasks = totalTasks - completedTasks;
  const progressPercent = (completedTasks / totalTasks) * 100;

  let status;
  if (completedTasks === 0) {
    status = "Не начато";
  } else if (completedTasks === totalTasks) {
    status = "Завершено";
  } else {
    status = "В работе";
  }

  console.log("Всего задач:", totalTasks);
  console.log("Выполнено:", completedTasks);
  console.log("Осталось:", remainingTasks);
  console.log(`Прогресс: ${progressPercent.toFixed(1)}%`);
  console.log("Статус:", status);
}