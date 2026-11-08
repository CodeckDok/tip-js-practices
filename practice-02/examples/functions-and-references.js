console.log("=== 1. Функция и + ===");
function sum(a, b) {
  return a + b;
}
console.log("sum(2, 3) =", sum(2, 3));
console.log('sum("2", 3) =', sum("2", 3));

console.log("\n=== 2. Стрелочная функция с телом в блоке ===");
const double = (value) => {
  value * 2;
};
console.log("double(5) =", double(5));

console.log("\n=== 3. Две переменные — один объект ===");
const original = { count: 0 };
const alias = original;
alias.count = 1;
console.log("original === alias:", original === alias);
console.log("original.count =", original.count);

console.log("\n=== 4. Spread массива — поверхностная копия ===");
const sourceArray = [{ id: 1 }, { id: 2 }];
const arrayCopy = [...sourceArray];
console.log("arrayCopy !== sourceArray:", arrayCopy !== sourceArray);
console.log("arrayCopy[0] === sourceArray[0]:", arrayCopy[0] === sourceArray[0]);

console.log("\n=== 5. Spread объекта — переопределение ===");
const baseObj = { name: "old", id: 1 };
const merged = { ...baseObj, name: "new" };
console.log("merged.name =", merged.name);

console.log("\n=== 6. typeof функции и функции без return ===");
function noReturn() {
  // без return
}
console.log("typeof noReturn:", typeof noReturn);
console.log("typeof noReturn():", typeof noReturn());