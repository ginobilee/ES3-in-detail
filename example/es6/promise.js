// const first = () =>
//   new Promise((resovle, reject) => {
//     console.log(3)
//     let p = new Promise((resovle, reject) => {
//       console.log(7)
//       setTimeout(() => {
//         console.log(5)
//         resovle(6) // useless，之前已经resolve了
//       }, 0)
//       resovle(1)
//     })
//     resovle(2) // 这行上移有没有区别？
//     p.then(arg => {
//       // 注意，此时p的状态已经是 resolved 的了 // 问题是，这个promise.then先执行，还是first().then先执行？若按入栈顺序，应该是这个回调先入microtask
//       console.log(arg)
//     })
//   })

// first().then(arg => {
//   console.log(arg) // 2
//   let p = new Promise(resovle => {
//     console.log(8)
//     resovle(9)
//   })
//   p.then(() => {
//     console.log(10)
//   })
// })
// console.log(4)

// var p = new Promise(r => r())
// p.finally(v => console.info(v)) // 这个应该是最后推入microtask的
// // Promise.resolve(5).finally(v => console.info(v))
// // 3， 7， 4， 1，2，undefined, 5
// // 3， 7， 4， 1，2，8, undefined, 10, 5

// const promised = () => {
//   let p = new Promise(resolve => {
//     resolve()
//   })
//   return p.then(() => {
//     console.log(2)
//   })
// }
// promised().then(() => {
//   console.log(3)
// })
// // 2, 3. 因为栈帧顺序为 : promised函数入栈执行；p对应的Promise入栈执行；resolve语句执行，将该promise的状态更新为resolved；p对应的Promise执行完出栈；继续执行promised函数，
// // 转成对应的callback结构看地更清楚:
// const promised = () => {
//   return
// }

// Promise.prototype.then = function(resolveFn, rejectFn) {
//   return new Promise(rejectFn, rejectFn)
// }

// let r
// const promised = () => {
//   let p = new Promise(resolve => {
//     resolve()

//     r = resolve
//   })
//   return p.then(() => {
//     console.log(2)
//   })
// }
// let pp = promised()
// pp.then(() => {
//   console.log(3)
// })
// r()
// let delay = new Promise((resolve, reject) => {
//   setTimeout(reject, 3 * 1000)
// })
// let p = new Promise((resolve, reject) => {
//   resolve(delay) // promise is 'locked in'
//   resolve(3)
// })
// p.then(
//   res => {
//     console.log("success: ", res)
//   },
//   err => {
//     console.log("error: ", err)
//   }
// )
let a = Function

console.log(a.prototype === a.__proto__)
