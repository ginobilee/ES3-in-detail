// function add(a, b) {
//   return a + b
// }

// function curry(fn) {
//   return function(...args) {
//     if (args.length === 2) {
//       return fn.apply(null, args)
//     } else {
//       return function(...args2) {
//         return fn.apply(null, args.concat(args2))
//       }
//     }
//   }
// }

// // 执行 add 函数，一次传入两个参数即可
// const log = console.log
// log(add(1, 2) === 3)

// // 假设有一个 curry 函数可以做到柯里化
// var addCurry = curry(add)
// log(addCurry(1)(2) === 3)

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

function add(a, b, c) {
  return a + b + c
}
// function curry(fn, ...args1) {
//   return function(...args2) {
//     const args = args1.concat(args2)
//     if (args.length < fn.length) {
//       return curry(fn, ...args)
//     } else {
//       return fn(...args)
//     }
//   }
// }
function add(a, b, c) {
  return a + b + c
}
// const curr = curry(add)
// const curry = (fn, ...arg1) => (...arg2) => ([...arg1, ...arg2].length >= fn.length ? fn.apply(null, [...arg1, ...arg2]) : curry(fn, ...arg1, ...arg2))
const curry = (fn, ...args1) => (...args2) => (args1.concat(args2).length < fn.length ? curry(fn, ...args1, ...args2) : fn(...args1, ...args2))
const curriedAdd = curry(add)

const log = console.log
log(curriedAdd(1, 2, 3) === 6)
log(curriedAdd(1, 2)(3) === 6)
log(curriedAdd(1)(2)(3) === 6)
