let log = console.log;
// set 可以将基本值去重，但不能将引用类去重。

const set = new Set([1, 2, 3, 4, 4, [2, 3], [2, 3]]);
console.log([...set]); // [1,2,3,4]

const set2 = new Set([1, [2, 3], [2, 3]]);
console.log(Array.from(set2));

set.clear();
log(set.has(1));
set.delete(1);

log(0 === -0);
