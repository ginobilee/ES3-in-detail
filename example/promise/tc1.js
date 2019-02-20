var p3 = new Promise(function(resolve, reject) {
  resolve("B")
})
const defer = function(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout)
  })
}
p3.then(v => {
  defer(1000).then(v => {
    console.log("timeout: ", v)
  })
  return v + "p3"
}).then(v => {
  console.log("last")
})
