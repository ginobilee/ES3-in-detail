function Cons() {
  console.log(this instanceof Cons)
}

const c = new Cons() // true
const v = {}
v.Cons = Cons
v.Cons() // false

const alias = Cons
const aa = new alias()
console.log(aa)
