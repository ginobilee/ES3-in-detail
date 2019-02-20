// const fs = require("fs")
// setTimeout(() => {
//   // callback complete after 10ms
//   let t = new Date()
//   console.info("timer1: ", t.toLocaleTimeString())
//   while (Date.now() - t < 1000) {}
//   console.log("Timer1: ", new Date().toLocaleTimeString())
//   setImmediate(() => {
//     Promise.resolve().then(() => {
//       console.log("promise in nexttick")
//     })
//     process.nextTick(() => {
//       console.log("nexttick in immediate")
//     })
//     console.info("immediate in Timer 1")
//   })
//   Promise.resolve().then(() => {
//     console.log("then in timer1")
//   })
//   process.nextTick(() => {
//     Promise.resolve().then(() => {
//       console.log("promise in nexttick.nexttick")
//     })
//     process.nextTick(() => {
//       console.log("nexttick in nexttick.nexttick")
//     })
//     console.info("nextTick in Timer1")
//   })
// }, 0)
// setTimeout(() => {
//   console.log("Timer2")
//   // setImmediate(() => {
//   //   console.info("immediate in Timer 2")
//   // })
//   // process.nextTick(() => {
//   //   console.info("nextTick in Timer2")
//   // })
// }, 0)
// // read file complete after 15ms
// // console.log("before fs.readfile: ", Date.now())
// // fs.readFile("../pref/index.js", function() {
// //   console.log("read File")
// //   console.log("read file complete: ", Date.now())
// // })

// // const fs = require("fs")
// // setTimeout(() => {
// //   // callback complete after 10ms
// //   let t = new Date()
// //   console.info("timer1: ", t.toLocaleTimeString())
// //   while (Date.now() - t < 1000) {}
// //   console.log("Timer1: ", new Date().toLocaleTimeString())
// //   process.nextTick(() => {
// //     console.info("nextTick in Timer1")
// //   })
// //   setImmediate(() => {
// //     console.info("immediate in Timer 1")
// //   })
// // }, 2)
// // setTimeout(() => {
// //   console.log("Timer2")
// //   setImmediate(() => {
// //     console.info("immediate in Timer 2")
// //   })
// //   process.nextTick(() => {
// //     console.info("nextTick in Timer2")
// //   })
// // }, 0)
// // // read file complete after 15ms
// // // console.log("before fs.readfile: ", Date.now())
// // fs.readFile("../pref/index.js", function() {
// //   console.log("read File")
// //   console.log("read file complete: ", Date.now())
// // })

setTimeout(() => {
  console.log("Timer1")
  Promise.resolve().then(() => {
    console.log("then in timer1")
  })
  // process.nextTick(() => {
  //   console.info("nextTick in Timer1")
  // })
}, 0)
// setImmediate(() => {
//   console.info("immediate")
// })
setTimeout(() => {
  console.log("Timer2")
}, 0)
