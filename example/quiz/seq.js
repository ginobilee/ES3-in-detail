console.log(1)
setTimeout(function () {
  console.log(2)
}, 0)
new Promise(function (resolve, reject) {
  resolve(3)
  console.log(4)
  return
  console.log(5)
}).then(function (num) {
  console.log(num)
})
console.log(6)
