var p3 = new Promise(function(resolve, reject) {
  resolve("B")
})

var p1 = new Promise(function(resolve, reject) {
  resolve(p3)
  Promise.resolve().then(() => {
    console.log("in p1")
    // p3.then(resolve)
    Promise.resolve().then(() => {
      console.log("in p1 p1")
      // p3.then(resolve)
    })
  })
})
// var p1 = new Promise(function(resolve, reject) {
//   p3.then(resolve)
//   // resolve(p3)
// })

var p2 = new Promise(function(resolve, reject) {
  resolve("A")
})

p1.then(function(v) {
  console.log("p1: ", v)
})

p2.catch(err => {
  console.log(err)
}).then(function(v) {
  console.log("after p2.catch: ", v)
})
p3.then(function(v) {
  console.log("p3: ", v)
})
p2.then(function(v) {
  console.log("p2: ", v)
})
