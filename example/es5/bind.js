function F(x, y) {
  this.x = x;
  this.y = y;
  return this;
}

// bind "this" value and partially "x" argument
var BoundF = F.bind({ z: 30 }, 10);

// create object passing partial "y" argument
var objectFromCall = BoundF(20);

// because "this" inside "BoundF" refers
// to {z: 30} object, then we have
console.log([
  objectFromCall.x, // 10, from [[BoundArgs]]
  objectFromCall.y, // 20, from extraArgs
  objectFromCall.z // 30, from [[BoundThis]]
]);

var boundProto = {
  constructor: BoundF
};

/* call on bound function has no effect */
var b = BoundF.call({ z: 40 });
console.log(b.z); // still 30

/* when apply new to bound function, the [[Construct]] of bound function will pass delegate to [[Construct]] of 
   original function. And important: the [[Construct]] will not call [[Call]] of bound function. Thus the 'this'
   value is passed to the new created object. 
*/
F.prototype.a = 40;

// 15.3.4.5.2 [[Construct]] for bound functions
var objectFromConstruct = new BoundF(20);

console.log([
  objectFromConstruct.x, // 10, from [[BoundArgs]]
  objectFromConstruct.y, // 20, from extraArgs
  objectFromConstruct.z, // undefined, does not use [[BoundThis]]
  objectFromConstruct.a // 40, from F.prototype === objectFromConstruct.[[Prototype]]
]);

 instance of BoundFunction will not have properties of BoundFunction.prototype, 
   but of original function's prototype 

console.log(BoundF.prototype); // undefined

BoundF.prototype = {
  constructor: BoundF,
  a: 100,
  b: 200
};

var objectFromConstruct2 = new BoundF();

// no matter, prototype still is taken from
// F.prototype, but not BoundF.prototype,
// because exactly F.[[Construct]] is called from
// BoundF.[[Construct]]
console.log([
  objectFromConstruct2.a, // 40, from F.prototype, but not 100
  objectFromConstruct2.b // undefined
]);

/* instance of bound function [[Construct]] will not return true when (instance instanceof BoundFunction) */
BoundF.prototype = boundProto;

var foo = Object.create(BoundF.prototype);

print(Object.getPrototypeOf(foo) === BoundF.prototype); // true

// but because of overloaded [[HasIntance]],
// which delegates to F.[[HasIntance]] we have false

print(foo instanceof BoundF); // false
print(foo instanceof F); // false

// in contrast with non-bound constructor

var bar = Object.create(F.prototype);

print(bar instanceof BoundF); // true
print(bar instanceof F); // true

// However, if we set F.prototype
// to the needed object, then
// instanceof will work for object,
// created by the bound constructor

F.prototype = boundProto;

print(foo instanceof BoundF); // true
print(foo instanceof F); // true