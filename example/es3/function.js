/*
var foo = 10;

var bar =
  foo % 2 == 0
    ? function() {
        console.log(0);
      }
    : function() {
        console.log(1);
      };

bar(); // 0

foo = 9;
bar(); // this won't change, since bar has already been referd to 'the' function.
*/
// var foo = {
//   bar: (function(x) {
//     console.log("bar")
//     return x % 2 != 0 ? "yes" : "no"
//   })(1)
// }
// console.log("1")
// console.log(foo.bar) // 'yes'
// console.log(foo.bar)
/*
1,
  (function() {
    console.log("anonymous function is called");
  })();

// or this one
!(function() {
  console.log("ECMAScript");
})();

// and any other manual
// transformation
*/
/*
(function() {
  console.log(1);
})();
(function() {
  console.log(2);
})();
*/
/*
Object.prototype.x = 10;

(function() {
  console.log(x); // 10
})();
*/
/*
// named funciton expression
var b = 1;
var foo = function bar() {
  var a = 1;
  a++;
  b++;
  console.log(a);
  if (b !== 3) {
    bar();
  }
  console.log(a);
};
foo();
bar(); // not defined error.
*/
/*
// function created by Function
var x = 10;

function foo() {
  var x = 20;
  var y = 30;

  var bar2 = Function("console.log(x)"); // the same to 'new Function'

  bar2();

  var bar = new Function("console.log(x)");

  bar(); // 10, "y" is not defined // 'x' is also undefined in Node.js
}
foo();
*/

/*
// function declaration in block
if (true) {
  function foo() {
    console.log(0);
  }
} else {
  function foo() {
    console.log(1);
  }
}

foo(); // 0 in both Node.js and Chrome.
*/

// 函数a内声明的函数b，在每次a执行时都会重新生成，并不相等
// const log = console.log
// var count = 0
// function a() {
//   function b() {}
//   return b
//   if (count > 0) {
//     log(b === c)
//   } else {
//     count = 1
//     return b
//   }
// }
// var c1 = a()
// var c2 = a()
// log(c1 === c2)
var p = (function(a) {
  this.a = a
  return function(b) {
    return this.a + b
  }
})(
  (function(a, b) {
    return a
  })(1, 2)
)
console.log(p(4))
