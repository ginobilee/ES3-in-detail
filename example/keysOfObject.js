const log = console.log
var sym = Symbol.for("comet")
var sym2 = Symbol.for("meteor")
var obj = { [sym]: 0, str: 0, "773": 0, "0": 0, [sym2]: 0, "-1": 0, "8": 0, "second str": 0 }
// log(Reflect.ownKeys(obj))
// log(Object.getOwnPropertyNames(obj), Object.getOwnPropertySymbols(obj), Object.keys(obj))
Reflect.defineProperty(obj, sym, {
  enumerable: false
})
obj.str = "1"
obj[sym] = 2
const ownKeys = Reflect.ownKeys(obj)

for (let key of ownKeys) {
  const descriptor = Reflect.getOwnPropertyDescriptor(obj, key)
  // log(descriptor)
  if (descriptor.enumerable) {
    log(key)
  }
}
const oo = Object.create({ k: "k" })
log(oo.k)
Object.preventExtensions(oo)
// Object.setPrototypeOf(oo, { k: "kk" })
log(oo.__proto__)
