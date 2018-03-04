const str = "abc";

// 利用es6为字符串实现了迭代器接口，以及数组解构来将字符串转为数组
let arr = [...str];

const log = console.log;
log(arr);

let o = { a: "a", b: "b" };
let oo = { ...{ a: "a" } };

log(oo);
