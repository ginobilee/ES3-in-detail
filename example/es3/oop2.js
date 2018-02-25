function A() {
  this.x = 10;
  return null;
}
let a = new A();
console.log(a); // A {x: 10}

// the prototype of function
let functionProto = Object.getPrototypeOf(A);
for (key in functionProto) {
  console.log(key, functionProto[key]);
}
// seems all keys are unenumerable.
// console.log(JSON.stringify(functionProto));

// instanceof operator
console.log(a instanceof A); // true

// if set A.prototype
// to null...
A.prototype = null;

// ...then "a" object still
// has access to its
// prototype - via a.[[Prototype]]
console.log(a.x); // 10

// however, instanceof operator
// can't work anymore, because
// starts its examination from the
//prototype property of the constructor
console.log(a instanceof A); // error, A.prototype is not an object
