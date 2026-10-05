"use strict";

const totalTasks = 12;
const completedTasks = 5;

// --- Валидация входных данных ---
function validate(total, completed) {
    // 1. Должны быть именно числами (строки не преобразуются)
    if (typeof total !== "number" || typeof completed !== "number") {
        return "Ошибка: вместо числа передана строка.";
    }
    // 2. NaN — тоже тип "number", поэтому проверяем отдельно
    if (Number.isNaN(total) || Number.isNaN(completed)) {
        return "Ошибка: недопустимое числовое значение.";
    }
    // 3. Должны быть целыми
    if (!Number.isInteger(total) || !Number.isInteger(completed)) {
        return "Ошибка: дробное количество.";
    }
    // 4. Не должны быть отрицательными
    if (total < 0 || completed < 0) {
        return "Ошибка: отрицательное количество.";
    }
    // 5. Верхняя граница
    if (total > 1000) {
        return "Ошибка: превышена верхняя граница.";
    }
    // 6. Выполнено не может быть больше, чем всего
    if (completed > total) {
        return "Ошибка: выполнено больше, чем существует.";
    }
    return null; // данные корректны
}

// --- Основная логика ---
const errorMessage = validate(totalTasks, completedTasks);

if (errorMessage !== null) {
    console.log(errorMessage);
} else if (totalTasks === 0 && completedTasks === 0) {
    // Особый случай: делить на ноль нельзя, процент не считаем
    console.log("Задач пока нет");
} else {
    const remaining = totalTasks - completedTasks;
    const percent = (completedTasks / totalTasks) * 100;

    let status;
    if (completedTasks === 0) {
        status = "Не начато";
    } else if (completedTasks === totalTasks) {
        status = "Завершено";
    } else {
        status = "В работе";
    }

    console.log(`Всего задач: ${totalTasks}`);
    console.log(`Выполнено: ${completedTasks}`);
    console.log(`Осталось: ${remaining}`);
    console.log(`Прогресс: ${percent.toFixed(1)}%`);
    console.log(`Статус: ${status}`);
}