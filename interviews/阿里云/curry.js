function add(a, b) {
  return a + b
}

function curry(fn) {
  return function(...args) {
    if (args.length === 2) {
      return fn.apply(null, args)
    } else {
      return function(...args2) {
        return fn.apply(null, args.concat(args2))
      }
    }
  }
}

// 执行 add 函数，一次传入两个参数即可
const log = console.log
log(add(1, 2) === 3)

// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add)
log(addCurry(1)(2) === 3)

// fn(1, 2, 3, 4) === fn(1)(2)(3)(4)
// fn(1) = function(n2) {
//   function fnn() {
//     //...
//   }
//   fnn.__proto__.valueOf = function() {
//     return 1
//   }
//   return fnn
// }

// curriedAdd(1, 2, 3)
// curriedAdd(1, 2)(3)
// curriedAdd(1)(2)(3)
