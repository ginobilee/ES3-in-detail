const lodash = require("lodash");

let a = "a";
let aa = lodash.cloneDeep(a);
console.log(a === aa);

let c = { a: [1] };
let d = Object.assign(c, { a: [2] });
console.log(d);
