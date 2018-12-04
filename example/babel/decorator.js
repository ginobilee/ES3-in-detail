// // function readonly(target, key, descriptor) {
// //   descriptor.writable = false;
// //   return descriptor;
// // }

// // class Cat {
// //   @readonly
// //   meow() { return `${this.name} says Meow!`; }
// // }

// "use strict"

// var _desc, _value, _class

// function _classCallCheck(instance, Constructor) {
//   if (!(instance instanceof Constructor)) {
//     throw new TypeError("Cannot call a class as a function")
//   }
// }

// function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
//   var desc = {}
//   Object["ke" + "ys"](descriptor).forEach(function(key) {
//     desc[key] = descriptor[key]
//   })
//   desc.enumerable = !!desc.enumerable
//   desc.configurable = !!desc.configurable

//   if ("value" in desc || desc.initializer) {
//     desc.writable = true
//   }

//   desc = decorators
//     .slice()
//     .reverse()
//     .reduce(function(desc, decorator) {
//       return decorator(target, property, desc) || desc
//     }, desc)

//   if (context && desc.initializer !== void 0) {
//     desc.value = desc.initializer ? desc.initializer.call(context) : void 0
//     desc.initializer = undefined
//   }

//   if (desc.initializer === void 0) {
//     Object["define" + "Property"](target, property, desc)
//     desc = null
//   }

//   return desc
// }

// function readonly(target, key, descriptor) {
//   descriptor.writable = false
//   return descriptor
// }

// var Cat = ((_class = (function() {
//   function Cat() {
//     _classCallCheck(this, Cat)
//   }

//   Cat.prototype.meow = function meow() {
//     return this.name + " says Meow!"
//   }

//   return Cat
// })()),
// _applyDecoratedDescriptor(_class.prototype, "meow", [readonly], Object.getOwnPropertyDescriptor(_class.prototype, "meow"), _class.prototype),
// _class)
"use strict"

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

var Cat = (function() {
  function Cat() {
    _classCallCheck(this, Cat)
  }

  Cat.prototype.meow = function meow() {
    return this.name + " says Meow!"
  }

  return Cat
})()

var c = new Cat()
console.log(c.meow())
c.meow = function() {
  console.log("meow")
}
c.meow()
console.log(c.__proto__.meow())
console.log(!!c.prototype)
