"use strict";

const totalTasks = 12;
const completedTasks = 5;
const dailyLimit = 3;

const isCountsValid =
  Number.isInteger(totalTasks) && totalTasks >= 0 && totalTasks <= 1000 &&
  Number.isInteger(completedTasks) && completedTasks >= 0 && completedTasks <= totalTasks;

const isLimitValid =
  Number.isInteger(dailyLimit) && dailyLimit >= 1 && dailyLimit <= 1000;

if (!isCountsValid) {
  console.log("Ошибка: некорректные значения totalTasks/completedTasks");
} else if (!isLimitValid) {
  console.log("Ошибка: дневная норма должна быть целым числом от 1 до 1000");
} else {
  let remaining = totalTasks - completedTasks;
  let days = 0;

  if (remaining === 0) {
    console.log("Все задачи уже выполнены");
    console.log("Потребуется дней: 0");
  } else {
    console.log("Осталось задач:", remaining);

    while (remaining > 0) {
      days += 1;
      const tasksToday = Math.min(dailyLimit, remaining);
      remaining -= tasksToday;
      console.log(`День ${days}: выполнено ${tasksToday}, осталось ${remaining}`);
    }

    console.log("Потребуется дней:", days);
  }
}