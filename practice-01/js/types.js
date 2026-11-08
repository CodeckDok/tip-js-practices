"use strict";

console.log('"8" + 2 =', "8" + 2, "| typeof:", typeof ("8" + 2));
console.log('"8" - 2 =', "8" - 2, "| typeof:", typeof ("8" - 2));
console.log('Number("8") + 2 =', Number("8") + 2, "| typeof:", typeof (Number("8") + 2));
console.log('"12" > "3" =', "12" > "3", "| typeof:", typeof ("12" > "3"));
console.log('12 === "12" =', 12 === "12", "| typeof:", typeof (12 === "12"));
console.log('Number("") =', Number(""), "| typeof:", typeof Number(""));
console.log('Number("text") =', Number("text"), "| typeof:", typeof Number("text"));
console.log('Boolean("false") =', Boolean("false"), "| typeof:", typeof Boolean("false"));

const v9 = typeof null;
console.log("typeof null =", v9, "| тип самого результата:", typeof v9);

const v10 = typeof NaN;
console.log("typeof NaN =", v10, "| тип самого результата:", typeof v10);