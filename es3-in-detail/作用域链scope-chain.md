# ES3中的作用域链

### 释义

最简单地说，作用域是确定一段代码中变量的生命周期及其取值的界定。

在es中，用作用域链实现嵌套的作用域，以确保在一个作用域中定义的变量，可以在其子作用域中被访问到。



### ES规范

ES的作用域是一种静态作用域的实现，在es6之前没有块级作用域。以最常见的函数而论，一个函数中变量的引用值，在这个函数创建的时候就已确定了。在ES中，是通过区分函数的作用域链属性，以及执行环境的作用链属性达到的。

#### 1. 函数的作用域链属性

函数的作用域链属性，记之为[[Scope]]，它的值可以理解为是函数创建时所在执行环境的作用域链。

> *[[Scope]]* is a hierarchical chain of all *parent* variable objects, which are *above* the current function context; the chain is saved to the function at its *creation*.

#### 2. 执行环境的作用域链

执行环境的作用域链，记为Scope属性。可以将执行环境的作用域链抽象成一个栈，这个栈的底部是外层的作用域，顶部是最新的作用域。

对执行环境的作用域链的讨论，要区分执行环境的类型。我们将执行环境简单地区分为全局执行环境/函数执行环境/with和catch执行环境。先来看前两者。

* 对于全局执行环境，其作用域链就只有变量对象(Variable Object)这一个对象。
* 对于函数执行环境，其作用域链为当前的活动对象+函数的作用域链属性。即`functionContext.Scope = [Activation Object].concat(function[[Scope]])`

看起来是不是像蛇咬住了自己的尾巴？函数的作用域属性取决于创建时所在执行环境的作用域链，而执行环境的作用域链又取决于对应函数的作用域链属性，会不会无限循下去？

不会，因为到了全局执行环境，其作用域链就是变量对象。因此，所有执行环境的作用链的底层，总是全局的变量对象。这也是为什么全局的变量总是可以访问。

其实，这里关键的一点在于，**函数的作用域属性，在其被创建时就确定了**。而当这个函数执行时，此时执行环境的作用域链又取决于这个函数的作用域链属性，因此这个执行环境中变量的访问路径，其实也是在函数被创建时就确定了。这就是es中'词法作用域'的意思所在。而闭包也就在这种作用域链的机制下产生了。

#### 3. with和catch

最后再来谈论with和catch的作用域。它们其实是将作为参数的对象推入当前执行环境(with不会创建执行环境)的作用域链中。

> These are *with* statement and *catch* clause. Both of them add to the front of scope chain the object required for lookup identifiers appearing within these statements. I.e., if one of these case takes place, scope chain is schematically modified as follows:

> >  Scope = withObject|catchObject + AO|VO + [[Scope]]

要特别注意的是with的另一个特性：它不会创建新的执行环境。因此，在with内声明的任何变量都会添加在with所在的那个执行环境的变量对象上。如下：

> ```javascript
> var x = 10, y = 10;
>   
> with ({x: 20}) {
>   
>   var x = 30, y = 30;
>   
>   alert(x); // 30
>   alert(y); // 30
> }
>   
> alert(x); // 10
> alert(y); // 30
> ```

catch对于作用域的作用与with完全一致。



### 总结

可以说，执行环境的作用域链对象(context.Scope)和函数的作用域属性(function.[[Scope]])这两个对象，区分开了执行环境和词法环境。当一个函数的执行环境和词法环境一致时，往往不易察觉其差别，但当两者不一致时，就能看到。



###其他

1. 用Function构造函数构造出来的函数，其作用域链总是只有全局作用域。

> `[[Scope]]` property of functions created via the `Function` constructor contains *always only the global object*. 

2. eval执行环境的作用域链，就是调用eval时执行环境的作用域链。

> The context with code type “eval” has the same scope chain as a *calling context*.

3. 如果作用域链中某个变量对象有prototype属性的话，原型上的值也会被引用。如下：

> ```javascript
> function foo() {
>   alert(x);
> }
>   
> Object.prototype.x = 10;
>   
> foo(); // 10
> ```



###备注：

es5中执行环境上有变量环境和词法环境两个属性，就是这两个独立的属性区分开了函数调用时的执行环境和词法环境。