"use strict";

// --- Эксперимент 1. Арифметика с числом и строкой ---
function sum(a, b) {
  return a + b;
}
console.log("Эксперимент 1:");
console.log("sum(2, 3) =", sum(2, 3), "| тип:", typeof sum(2, 3));
console.log("sum(2, '3') =", sum(2, "3"), "| тип:", typeof sum(2, "3"));

// --- Эксперимент 2. Стрелочная функция без return ---
const squareBroken = (value) => {
  value * value;
};
console.log("\nЭксперимент 2 (исходный вариант):");
console.log("squareBroken(4) =", squareBroken(4));

// Исправленный вариант — добавляем return
const square = (value) => {
  return value * value;
};
console.log("square(4) =", square(4), "| тип:", typeof square(4));

// --- Эксперимент 3. Объект и ссылка ---
const original = { title: "Черновик", published: false };
const alias = original;
alias.published = true;
console.log("\nЭксперимент 3:");
console.log("original.published =", original.published);
console.log("original === alias:", original === alias);

// --- Эксперимент 4. Spread массива и вложенные объекты ---
const oldItems = [
  { id: 1, title: "A" },
  { id: 2, title: "B" },
];
const newItems = [...oldItems];
newItems.push({ id: 3, title: "C" });
newItems[0].title = "Изменено";
console.log("\nЭксперимент 4:");
console.log("oldItems.length =", oldItems.length);
console.log("newItems.length =", newItems.length);
console.log("oldItems[0].title =", oldItems[0].title);
console.log("newItems[0].title =", newItems[0].title);
console.log("oldItems[0] === newItems[0]:", oldItems[0] === newItems[0]);

// --- Эксперимент 5. Spread объекта и перекрытие свойства ---
const oldBook = { id: 12, title: "Черновик", available: false };
const newBook = { ...oldBook, available: true };
console.log("\nЭксперимент 5:");
console.log("oldBook.available =", oldBook.available);
console.log("newBook.available =", newBook.available);
console.log("oldBook === newBook:", oldBook === newBook);

// --- Эксперимент 6. Параметр по умолчанию ---
function makeCaption(text = "Без названия") {
  return text;
}
console.log("\nЭксперимент 6:");
console.log("makeCaption() =", makeCaption());
console.log("makeCaption(undefined) =", makeCaption(undefined));
console.log("makeCaption(null) =", makeCaption(null));
console.log("makeCaption('') =", makeCaption(""));