var a = { n: 1 }

let handler = {
  get: function(target, name) {
    console.log("proxy get handler invoked")
    // return name in target ? target[name] : 37
  },
  set: function(obj, target, value) {
    console.log("proxy set handler invoked")
  }
}

let p = new Proxy(a, handler)
var b = a
p.x = p = p.y = { n: 2 }
// a.x = a = a.y = { n: 2 }
// console.log(p) // {n : 2}
// console.log(a.x) // undefined
// console.log(a.y) // undefined
// console.log(b.x) // {n : 2}
// console.log(b.y) // {n : 2}
console.log(p)
