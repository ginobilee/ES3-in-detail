// function Foo() {
//   getName = function() {
//     console.log(1);
//   };
//   console.log(this === undefined);
//   return this;
// }
// Foo.getName = function() {
//   console.log(2);
// };
// Foo.prototype.getName = function() {
//   console.log(3);
// };
// var getName = function() {
//   console.log(4);
// };
// function getName() {
//   console.log(5);
// }

// // 请写出以下输出结果：
// Foo.getName();
// getName();
// Foo().getName();
// getName();
// console.log("new Foo.getName");
// new Foo.getName();
// console.log("new Foo().getName()");
// new Foo().getName();
// console.log("new new Foo().getName");
// new new Foo().getName();

// Foo.getName(); //2
// getName(); // 4
// Foo().getName(); // false, 1
// getName(); // 1
// console.log("new Foo.getName");
// new Foo.getName(); // 2
// console.log("new Foo().getName()");
// new Foo().getName(); // false, 3
// console.log("new new Foo().getName");
// new new Foo().getName(); // false, 3

// var a = 30;
// var myObject = {
//   property: this,
//   regularFunction: function() {
//     return this
//   },
//   arrowFunction: () => {
//     return this
//   },
//   iife: (function() {
//     return this.a
//   })() // 立即执行函数总是只有一个上层作用域链，即全局作用域
// }

// myObject.regularFunction() // myObject
// myObject["regularFunction"]() // my Object

// myObject.property // NOT myObject; lexical `this`
// myObject.arrowFunction() // NOT myObject; lexical `this`
// console.log(myObject.iife) // NOT myObject; lexical `this`
// const regularFunction = myObject.regularFunction
// regularFunction() // NOT myObject; lexical `this`

// var bo = 10;
// function foo() {
//   console.log(bo);
// }
// (function() {
//   var bo = 20;
//   foo();
// })();
// (function (func) {
//   var bo = 30;
//   func();
// })(foo)

var a = "window"
var obj = {
  func: function() {
    var a = "func"
    console.log(this.a)
  }
}

console.log((obj.func = obj.func)())
new obj.func()
