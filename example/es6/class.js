function Cons() {
  console.log(this instanceof Cons)
}

const c = new Cons() // true
const v = {}
v.Cons = Cons
v.Cons() // false
