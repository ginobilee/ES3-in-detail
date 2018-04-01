function Foo () {
  console.log('Foo')
  getName = function () {
    console.log(1)
  }
  return this
}
Foo.getName = function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log('3')
}
var getName = function () {
  console.log(4)
}
function getName () {
  console.log(5)
}
// 请写出一下的输出结果
Foo.getName()
getName()
// Foo().getName()
// getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()

// 赋值符号是右向的，所以这样说的话，就是 a.x = a = {n: 1} 会经历先解析a, 将{n: 1}赋给a；再解析a.x，将{n: 1}赋给a.x。
// 但结果不是这样，结果还是左向运算，如标准中所说，先解析a.x，计算右边。右边是一个赋值表达式，于是再次解析表达式左边的a，计算这个表达式(a = {n: 1})的值，即	{n: 1}, 赋给a。然后将结果赋给a.x，计算右边。右边是一个赋值表达式，于是再次解析表达式左边的a，计算这个表达式
