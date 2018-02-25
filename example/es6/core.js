// 旧式用`var`声明的变量。
var x = 10;
// 现代用`let`声明的变量。
let y = 20;
// 二者都被添加到环境记录：
console.log(
  x, // 10
  y // 20
);
// 但是只有`x`被添加到"绑定对象"。
// 全局环境的绑定对象是鳏居对象，等于`this`：
console.log(
  this.x, // 10 in Chrome // undefinde in Node.js
  this.y // undefined!
);
// 绑定对象可以存储一个名称，该名称不添加到环境记录，
// 因为它不是一个有效的标识符：
this["not valid ID"] = 30;
console.log(
  this["not valid ID"] // 30
);
