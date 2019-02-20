<blockquote>
IsConstructor ( argument )
The abstract operation IsConstructor determines if argument, which must be an ECMAScript language value, is a function object with a [[Construct]] internal method.

If Type(argument) is not Object, return false.
If argument has a [[Construct]] internal method, return true.
Return false.
</blockquote>

1. 如何判断一个对象是否有 [[Construct]] 属性？
    1. `A function object is not necessarily a constructor and such non-constructor function objects do not have a [[Construct]] internal method.`
    2. 除了 箭头函数，还有其它非构造函数的函数么？