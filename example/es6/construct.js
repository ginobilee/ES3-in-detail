// const proxy = {
//   foo: function fooFn() {
//     this.name = "foo"
//     console.log(this.name)
//   },
//   bar() {
//     this.name = "foo"
//     console.log(this.name)
//   }
// }
// const fn = function() {
//   // console.log("fn")
// }
// // const fooIns = new fooFn()
// const foo = proxy.foo
// const bar = proxy.bar
// console.log(bar.__proto__ === foo.__proto__, bar.__proto__ === Function.prototype, Function.__proto__ === foo.prototype)
// // console.log(foo.prototype)
// const log = console.log
// log(Function.prototype.bind)
// // bar 的prototype 是undefined，但是它的 __proto__ 依然是 Function.prototype
// console.log(bar.prototype)
// const boundBar = bar.bind({ test: "test" })
// const ff = new fn()

// const barIns = new bar()
class Person {
  // const age;
  // const gender;
  constructor(age, gender) {
    this.age = age
    this.gender = gender
    return 2
  }
}
class Man extends Person {
  constructor(age) {
    super(age, "man")
    console.log(this)
    return 2
  }
}
const person = new Person(2, "woman")
const man = new Man(10) // here throws error since: 'Derived constructors may only return object or undefined';
