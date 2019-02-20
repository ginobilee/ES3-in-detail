/*
var foo = { x: 10 };

var bar = {
  x: 20,
  test: function() {
    console.log(this === bar); // true
    console.log(this.x); // 20

    // this = foo; // error, can't change this value

    console.log(this); // if there wasn't an error, then would be 10, not 20
  }
};

// on entering the context this value is
// determined as "bar" object; why so - will
// be discussed below in detail

bar.test(); // true, 20

foo.test = bar.test;

// however here this value will now refer
// to "foo" – even though we're calling the same function

foo.test(); // false, 10
*/
/*
function foo() {
  console.log(this.bar);
}

var x = {};
var y = {};
var bar = 30;
x.test = foo;
y.test = foo;

x.test(); // 10
y.test(); // 20
*/
/*
function A() {
  console.log(this); // newly created object, below - "a" object
  this.x = 10;
}

var a = new A();
console.log(a); // 10
*/
/*
var foo = {
  bar: function() {
    console.log(this === global);
  }
};

foo.bar(); // Reference, OK => foo
foo.bar(); // Reference, OK => foo

(foo.bar = foo.bar)(); // global?
(false || foo.bar)(); // global?
(foo.bar, foo.bar)(); // global?
*/
/*
(function foo(bar) {
  console.log(this === global);

  !bar && foo(1); // "should" be special object, but always (correct) global
})(); // global
*/

// var a = new Number(4);
// const b = {};
// console.log(b.toString());
// console.log(a.valueOf());
// a.test = function() {
//   console.log(this);
// };
// a.test();

// x = 1
// function a() {
//   var x = 2
//   var z = 3
//   console.log("this.x in a: ", this.x)
//   function b() {
//     console.log("this.x in b: ", this.x)
//     console.log("z in b: ", z)
//   }
//   var b = () => {
//     console.log("this.x in b: ", this.x)
//     console.log("z in b: ", z)
//   }
//   b()
// }
// var y = {
//   x: 2,
//   a: a
// }
// a()
// y.a()
function a() {
  console.log(this === global)
  function b() {
    console.log(this === global)
  }
  b()
}
a()
