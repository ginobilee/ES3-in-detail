// var a = { n: 1 }
// var b = a
// a.x = a = a.y = { n: 2 }

// console.log(b.x === b.y)
// console.log(b.x === a)
// console.log(JSON.stringify(b), a)

var a = "a"
console.log(a)
false ? a : a = "c"
console.log(a)
