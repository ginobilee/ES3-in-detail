let o = { key1: 1, key2: [2] };
let a = [1, 2];
const log = console.log;
for (v of a) {
  log(v);
}
// object并不是可以用for...of迭代的可迭代对象。

for (key in o) {
  log(o[key]);
}
for (key in a) {
  log(a[key]);
}
