

#let

> let是更完美的var，不是全局变量，具有块级函数作用域,大多数情况不会发生变量提升。

1、let声明的变量具有块级作用域
2、形如for(let x..)的循环是每次迭代都为x创建新的绑定。在循环中，let声明每次都创建了一个新的变量，这样循环内部的每次引用都指向不同的变量。

# const 

const定义常量值，不能够重新赋值，如果值是一个对象，可以改变对象里边的属性值。

const在声明时要进行初始化。

const不可以在`for (const i=0;i<10;i++)`使用，因为第二次迭代会更改它的值，即这里其实是同一个i变量。但可以在`for (const key in object)`或`for (const ele of array)`中使用，因为会为每次迭代创建不同的变量。

# 暂时性死区

用let和const声明的变量会在当前执行环境中设定为相当于进入'暂时性死区'。这一概念直观的反映是在当前代码块变量声明之前无法访问变量，且即便是安全的typeof操作符也会抛错。如下：

```
console.log(typeof a)
let a = 'a'
```

上述代码会抛出错误。但如果注释掉let生命语句，则输出`undefined`。

# 与全局对象

let和const声明会屏蔽全局对象的对应属性，但不会改写。

```
let RegExp = 'hello'
console.log(window.RegExp === RegExp, RegExp)
```

# 最佳实践

在默认情况下使用const， 只有在确认变量值需要被更改时才用let。