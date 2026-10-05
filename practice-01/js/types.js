"use strict";

// 1. "8" + 2
const r1 = "8" + 2;
console.log('1) "8" + 2 =', r1, '| тип:', typeof r1);

// 2. "8" - 2
const r2 = "8" - 2;
console.log('2) "8" - 2 =', r2, '| тип:', typeof r2);

// 3. Number("8") + 2
const r3 = Number("8") + 2;
console.log('3) Number("8") + 2 =', r3, '| тип:', typeof r3);

// 4. "12" > "3"
const r4 = "12" > "3";
console.log('4) "12" > "3" =', r4, '| тип:', typeof r4);

// 5. 12 === "12"
const r5 = 12 === "12";
console.log('5) 12 === "12" =', r5, '| тип:', typeof r5);

// 6. Number("")
const r6 = Number("");
console.log('6) Number("") =', r6, '| тип:', typeof r6);

// 7. Number("text")
const r7 = Number("text");
console.log('7) Number("text") =', r7, '| тип:', typeof r7);

// 8. Boolean("false")
const r8 = Boolean("false");
console.log('8) Boolean("false") =', r8, '| тип:', typeof r8);

// 9. typeof null — отдельно значение и тип результата
const r9 = typeof null;
console.log('9) typeof null =', r9, '| тип результата typeof:', typeof r9);

// 10. typeof NaN — отдельно значение и тип результата
const r10 = typeof NaN;
console.log('10) typeof NaN =', r10, '| тип результата typeof:', typeof r10);