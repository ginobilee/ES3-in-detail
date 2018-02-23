var getClass = Object.prototype.toString;

console.log(getClass.call({})); // [object Object]
console.log(getClass.call([])); // [object Array]
console.log(getClass.call(new Number(1))); // [object Number]
console.log(getClass.call(new Date()));
console.log(typeof new Date());
