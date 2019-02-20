对于 functionDeclaration ，是在 InstantiateFunctionObject(实例化函数对象) 的步骤中创建的；对于 functionExpression, 是在 执行该语句的时候创建的(14.1.21)。

箭头函数总是以表达式的形式存在，所以箭头函数总是通过 语句执行 的步骤创建的(14.2.16)。



函数：
普通函数声明、普通函数表达式、箭头函数(总是表达式)、对象方法、对象方法的简写、generator、async、async generator、async arrow function


>  In ECMAScript 2015, the [[Prototype]] internal slot of a bound function is set to the [[GetPrototypeOf]] value of its target function. In the previous edition, [[Prototype]] was always set to %FunctionPrototype%.


一个函数，它的 prototype 初始是什么？  
它的 __ptoto__ === Function.prototype.
prototype 呢？如果是 function declaration 或者 function expression, 那么会是 {constructor: ...}对象。  
用 ***Object.keys(只获取当前对象自身的可枚举属性)*** 获取 someFunction.prototype 的keys，是空数组。  
获取对象某个key的descriptor呢？  

```
> Object.getOwnPropertyDescriptor(foo.prototype, 'constructor')
> {value: ƒ, writable: true, enumerable: false, configurable: true}
```
找函数对象的初始化过程。