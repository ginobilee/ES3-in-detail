在`class`中非`constructor`内定义的变量，也会以`this.varname = varname`的形式放在es5中的构造函数内，也就是说，这个变量也是声明在最终的实例上。既非构造函数自身的属性，也不是原型上的属性。

以`static`开头定义在class中的变量则是构造器的自身属性。

一下的语句并不是强制类转换，而是一种检测机制，检测变量是否被赋予对应类的值，或至少值继承了该类:
` let tom: Animal = new Horse("Tommy the Palomino");`

#
> TypeScript is a structural type system. When we compare two different types, regardless of where they came from, if the types of all members are compatible, then we say the types themselves are compatible.

#
`public`、`private`和`protected`都是ts自身进行约束的规则。在转换后的js中并没有区别。
`static`则是有区别的，这是构造函数自身的属性。

# 
能不能原生js实现class中的getter和setter?（注意是class的getter和setter，而不是对象上的)

class实际上就是 构造器 和 原型的封装。所以目的就是在 构造器 生成的对象上封装。通过查看ts编译出来的js文件，实际上是为每个实例增加了一个额外的`_varname`属性。用这个属性来做`varname`的中间存储器。但问题是`_varname`可以被外界直接访问。相较之下，直接在 构造器 中生命一个变量，用闭包来做是更好的办法。因为每个实例的声明，实际上都会运行一遍 构造器 。如下：

```javascript
function Test() {
  var _name = ''
  Object.defineProperty(this, 'name', {
    get: function() {
      return _name
    },
    set: function(name) {
      _name = name
    },
    configurable: true, 
    enumerable: true
  })
}
```

# abstract class

> Unlike an interface, an abstract class may contain implementation details for its members.

# static property

文档中这个例子:
```typescript
let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";
```

即修改获取一个类，修改其静态属性，其实在编译结果中是：`greeterMaker = Greeter`。所以改动其静态属性也会改动`Greeter`，而非一个新的类。

# Using a class as an interface

结果是产生冗余的class声明，直接用`interface`更好。