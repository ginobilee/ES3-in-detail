function deepClone(o) {
  // 如果o不是引用型，直接返回
  // 构造一个新的变量。对o的每个键迭代deepClone，返回值引用给对应键
  if (typeof o !== "object" || o === null) {
    return o;
  }
  let result = {};
  if (o.toString() === "[object Array]") {
    result = [];
  }
  for (key in o) {
    if (o.hasOwnProperty(key)) {
      result[key] = deepClone(o[key]);
    }
  }
  return result;
}

let o1 = { key1: 1, key2: { key21: 21 } };
const log = console.log;
let a1 = [1, o1];
log(o1 === deepClone(o1));
log(deepClone(o1));
log(deepClone(a1), a1 === deepClone(a1));
log(
  deepClone(null),
  deepClone(undefined),
  null === null,
  null === deepClone(null)
);
