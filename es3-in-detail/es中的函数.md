# es中的函数

### 函数声明(FD)

> The main feature of this type of functions is that *only they influence variable object* (they are stored in the VO of the context). 

**重要特性：**会影响执行环境的变量对象，在进入执行环境时创建。

函数只能定义在全局或者另一个函数内。



### 函数表达式(FE)

**重要特性：**定义在**表达式**的位置，不影响变量对象，在执行到该表达式时创建。

> The main feature of this type of functions is that in the source code they are **always in the *expression* position.** 

> When a FE is assigned a name it can be difficult to distinguish it from a FD. However, if you know the definition, it is easy to tell them apart: ***FE is always in the expression position***. 
>
> ```javascript
> // in parentheses (grouping operator) can be only an expression
> (function foo() {});
>  
> // in the array initialiser – also only expressions
> [function bar() {}];
>  
> // comma also operates with expressions 
> 1, function baz() {}; 
> ```



### 为什么需要在立即执行的函数外包裹括号？

目的是将函数声明变为函数表达式。也可以用别的方法，如上节中所示，但加括号是最通用而优雅的方式。

> The logical question now is why do we need this type of functions at all? The answer is obvious — to use them in *expressions* and “not pollute” the variables object. 

> Grouping parentheses *are needed* when a function *is not at the expression position* and if we want to *call it immediately* right after its creation — in this case we just *manually transform the function to FE*.
>
> In case when a parser knows that it deals with a FE, i.e. the function *is already at the expression position* — the parentheses are *not required*.
>
> ```javascript
>
> var foo = {
>   bar: (function(x) {
>     console.log("bar");
>     return x % 2 != 0 ? "yes" : "no";
>   })(1)
> };
> console.log("1");
> console.log(foo.bar); // 'yes'
> console.log(foo.bar);
> ```
>
> 



### 函数语句(function statement)

从规范来讲，函数声明不能放在block内。但规范允许实现(js引擎)扩展语法，而所有的js引擎现在都不会在这种情况下抛异常，但实现方式各有不同。

大部分浏览器会将放在block内的函数声明当做一般的函数声明处理，因此同名而放在不同block的两个FD会进入执行环境的变量对象，并且总是后声明的那个函数。但SpiderMonkey不同，会将这种情况处理为函数语句。

> 经过实测，目前在Node.js和Chrome中都实现了类似函数语句的流程。即下述代码都返回0:
>
> ```javascript
> if (true) {
>   function foo() {
>     console.log(0);
>   }
> } else {
>   function foo() {
>     console.log(1);
>   }
> }
>
> foo(); // 0 in both Node.js and Chrome.
> ```



### 命名的函数表达式(NFE)

命名的函数表达式会在进入该函数的执行环境时，创建一个specialObject, 在这个对象上存储(键为命名函数名,值为该函数)的值，这样特殊对象只在该命名函数表达式执行期间可以存在于执行NFE之前的执行环境的变量对象上。在这个NFE执行完之后立即就被从变量对象上删除。因此NFE执行期间，可以访问到以自己名字命名的函数，但在此前或此后，都访问不到。

如下例所示:

```javascript
var b = 1;
var foo = function bar() {
  var a = 1;
  a++;
  b++;
  console.log(a);
  if (b !== 3) {
    bar();
  }
  console.log(a);
};
foo();
bar(); // not defined error.
```

**关于NFE，IE在9以前的版本中有很多bug。关键的一点是，命名函数表达式会进入外部执行环境的变量对象上，即使在NFE执行完后依然可以访问到**。



### 以Function构造函数创建的函数

最大的特性是这类函数的[[Scope]]属性中只有全局对象。

> The main feature is that the `[[Scope]]` property of such functions contains only global object:
>
> ```javascript
> var x = 10;
>   
> function foo() {
>   
>   var x = 20;
>   var y = 30;
>   
>   var bar = new Function('console.log(x); console.log(y);');
>   
>   bar(); // 10, "y" is not defined
>   
> }
> ```
>
> By the way, pay attention, the *Function* constructor can be used both with *new*keyword and without it, in this case these variants are equivalent.

另一个特性是，当面对一个有相同函数元素的数组，或相同函数对象的不同变量，es规范给出一种针对性的优化(可以存储一个函数)，但以Function构造函数创建的函数永远不会被优化。

> The other feature of such functions is related with [Equated Grammar Productions](http://bclary.com/2004/11/07/#a-13.1.1)and [Joined Objects](http://bclary.com/2004/11/07/#a-13.1.2). This mechanism is provided by the specification as suggestion for the optimization (however, implementations have the right not to use such optimization). 
>
> ```javascript
> function foo() {
>   
>   function bar(z) {
>     return z * z;
>   }
>   
>   return bar;
> }
>   
> var x = foo();
> var y = foo();
> ```
>
> 如果bar是以Function创建的，x与y就永远是两个不同的对象。而这里，js引擎可以将两者用一个函数对象来存储，因为二者其实没有不同。



### 函数创建的流程

下面的伪代码列出了函数创建的过程，这对所有类型的函数都是一样的:

> ```javascript
> F = new NativeObject();
>   
> // property [[Class]] is "Function"
> F.[[Class]] = "Function"
>   
> // a prototype of a function object
> F.[[Prototype]] = Function.prototype
>   
> // reference to function itself
> // [[Call]] is activated by call expression F()
> // and creates a new execution context
> F.[[Call]] = <reference to function>
>   
> // built in general constructor of objects
> // [[Construct]] is activated via "new" keyword
> // and it is the one who allocates memory for new
> // objects; then it calls F.[[Call]]
> // to initialize created objects passing as
> // "this" value newly created object 
> F.[[Construct]] = internalConstructor
>   
> // scope chain of the current context
> // i.e. context which creates function F
> F.[[Scope]] = activeContext.Scope
> // if this functions is created 
> // via new Function(...), then
> F.[[Scope]] = globalContext.Scope
>   
> // number of formal parameters
> F.length = countParameters
>   
> // a prototype of created by F objects
> __objectPrototype = new Object();
> __objectPrototype.constructor = F // {DontEnum}, is not enumerable in loops
> F.prototype = __objectPrototype
>   
> return F
> ```
>
> 

注意，其中`F.[[Prototype]]`与`F.prototype`是不同的。前者是构造函数F作为一个对象自己的原型；后者是由F实例化的对象的原型。