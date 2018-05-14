const first = () => (new Promise((resovle, reject) => {
  console.log(3)
  let p = new Promise((resovle, reject) => {
    console.log(7)
    setTimeout(() => {
      console.log(5)
      resovle(6)
    }, 0)
    resovle(1)
  })
  resovle(2)
  p.then((arg) => {
    console.log(arg)
  })
}))

first().then((arg) => {
  console.log(arg)
})
console.log(4)
