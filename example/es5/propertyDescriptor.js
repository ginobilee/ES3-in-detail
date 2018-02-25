/*
// error, "get" and "writable" at the same time
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
var foo = Object.defineProperty({}, "bar", {
  get: function() {
    return "baz";
  },
  writable: true
});

// also error: mutually exclusive  "value" and "set" attributes
var baz = Object.defineProperty({}, "bar", {
  value: "baz",
  set: function(v) {}
});
*/

var _x = 10;

var proto = {
  get x() {
    return _x;
  },
  set x(x) {
    _x = x;
  }
};

console.log(proto.hasOwnProperty("x")); // true

console.log(proto.x); // 10

proto.x = 20; // set own property

console.log(proto.x); // 20

var a = Object.create(proto); // "a" inherits from "proto"

console.log(a.x); // 20, read inherited

/*
 a.x = 30; // set *inherited*, but not own
console.log(a.x); // 30
console.log(proto.x); // 30
console.log(a.hasOwnProperty("x")); //false
*/

Object.defineProperty(a, "x", {
  value: 30,
  enumerable: true,
  writable: true,
  configurable: true
});
console.log(a.x); // 30
console.log(proto.x); // 20
console.log(a.hasOwnProperty("x")); //true
