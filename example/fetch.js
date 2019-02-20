// const fetch = require("node-fetch")
// const p1 = fetch("http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=shoe&bk_length=60", {
//   method: "POST"
// })
// const p2 = fetch("http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=shoe&bk_length=60", {
//   method: "POST"
// })
// p1.then(response => {
//   const start = Date.now()
//   // wait for 3 s
//   console.log("in p1 callback, before wait, and now is : ", start)
//   while (Date.now() < start + 5 * 1000) {}
//   console.log("in p1 callback, after wait, and now is : ", start)
//   Promise.resolve(1).then(v => {
//     console.log("promise initiated in p1 fire")
//   })
// })

// p2.then(response => {
//   const start = Date.now()
//   // wait for 3 s
//   console.log("in p2 callback, before wait, and now is : ", start)
//   while (Date.now() < start + 5 * 1000) {}
//   console.log("in p2 callback, after wait, and now is : ", start)
//   Promise.resolve(1).then(v => {
//     console.log("promise initiated in p2 fire")
//   })
// })

// 如何判断 xhr是 macrotask，而 fetch 是 microtask?
// 同时发出两个xhr (xa 和 xb)，同时利用while循环阻塞当前栈帧。这样保证当前回调处理完时另外一个xhr的回调也被触发。在while循环后声明一个立即触发的microtask (ma)，
// 如果两个xhr 的回调都是 macrotask，那么 ma 就会在中间执行。如果用fetch来实现，应该是ma在最后才执行

// 实际情况是，以fetch进行以上实验，也是先执行当前回调中的promise的回调，才进入下一个fetch的回调。
// 看来fetch返回的 promise 不同于一般的 promise，或者 fetch的触发回调的机制不同于 Promise 构造函数
// fetch 只是返回了一个promise，但是fetch的回调依然是在macrotask里的。

// 模拟一个 纯 promise 的 fetch
let r = []
const fetch = function(uri, options) {
  return new Promise(function(resovle, reject) {
    r.push(resovle)
  })
}
const f1 = fetch("x").then(function(res) {
  console.log("promise f1 fire: ", res)
  Promise.resolve("f1").then(function() {
    console.log("f1")
  })
})
const f2 = fetch("y").then(function(res) {
  console.log("promise f2 fire: ", res)
  Promise.resolve("f2").then(function() {
    console.log("f2")
  })
})
// after 100ms, f1 and f2 fires. note here they are fired in the 'same tick'
setTimeout(function() {
  r.forEach(fn => {
    fn(1)
  })
}, 100)
