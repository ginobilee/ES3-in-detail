也谈es中的this

this是一个老生常谈的话题了。很多文章都已经对this做了很有深度的解读。触动自己写这篇文章的，是偶然在阮一峰的博客看到今年写了一篇解读this原理的文章。



> ECMAScript function objects have the additional internal slots listed in Table 27.

[[ThisMode]]: (lexical, strict, global)
Defines how this references are interpreted within the formal parameters and code body of the function. lexical means that this refers to the this value of a lexically enclosing function. strict means that the this value is used exactly as provided by an invocation of the function. global means that a this value of undefined is interpreted as a reference to the global object.


es6中函数调用时this的取值：
es规范为所有的函数对象定义了一些内部属性和方法来规定其执行逻辑。这里涉及到的有：[[Call]]、[[FunctionKind]]、[[Environment]]、[[Realm]]、[[ThisMode]]和[[Strict]]。

[[FunctionKind]]
值可为 "normal", "classConstructor", "generator", or "async"，用意很明显。
[[Environment]]
> The Lexical Environment that the function was closed over. Used as the outer environment when evaluating the code of the function.
此属性对应es3和es5中的 [[Scope]], 指向执行函数时其外部的环境(作用域链的上一级)，仍然是用来实现es中静态的作用域链。
[[Realm]]
> The realm in which the function was created and which provides any intrinsic objects that are accessed when evaluating the function.
它是对以前的全局对象的一个抽象，目的应该是为了处理对于全局环境的访问。
[[ThisMode]]
> (lexical, strict, global)
> Defines how this references are interpreted within the formal parameters and code body of the function. lexical means that this refers to the this value of a lexically enclosing function. strict means that the this value is used exactly as provided by an invocation of the function. global means that a this value of undefined is interpreted as a reference to the global object.
[[Strict]]
> true if this is a strict function, false if this is a non-strict function.

es5:
An execution context contains whatever state is necessary to track the execution progress of its associated code. In addition, each execution context has the state components listed in Table 19.

Table 19 —Execution Context State Components
Component	Purpose
LexicalEnvironment	Identifies the Lexical Environment used to resolve identifier references made by code within this execution context.
VariableEnvironment	Identifies the Lexical Environment whose environment record holds bindings created by VariableStatements and FunctionDeclarations within this execution context.
ThisBinding	The value associated with the this keyword within ECMAScript code associated with this execution context.

所以在es5中，this的指向仍然是直接放在Execution Context中。我们可以理解为，在函数对应的栈帧中，有一个变量this指向了目标对象。
但是在es6中，this实际被放入了[[Enviroment]]中，这是很大的差别。[[Enviroment]]指向当前指向环境的
[[Call]]是一个内部方法，用来规范函数被调用的逻辑
es规范为所有的函数对象定义了内部属性[[Call]]，用来规范函数被调用时的逻辑。其逻辑在9.2.1节中阐述:
9.2.1 [[Call]] ( thisArgument, argumentsList )
The [[Call]] internal method for an ECMAScript function object F is called with parameters thisArgument and argumentsList, a List of ECMAScript language values. The following steps are taken:

Assert: F is an ECMAScript function object.
If F.[[FunctionKind]] is "classConstructor", throw a TypeError exception.
Let callerContext be the running execution context.
Let calleeContext be PrepareForOrdinaryCall(F, undefined).
Assert: calleeContext is now the running execution context.
***Perform OrdinaryCallBindThis(F, calleeContext, thisArgument).***
Let result be OrdinaryCallEvaluateBody(F, argumentsList).
Remove calleeContext from the execution context stack and restore callerContext as the running execution context.
If result.[[Type]] is return, return NormalCompletion(result.[[Value]]).
ReturnIfAbrupt(result).
Return NormalCompletion(undefined).
NOTE
When calleeContext is removed from the execution context stack in step 8 it must not be destroyed if it is suspended and retained for later resumption by an accessible generator object.


9.2.1.2O rdinaryCallBindThis ( F, calleeContext, thisArgument )
When the abstract operation OrdinaryCallBindThis is called with function object F, execution context calleeContext, and ECMAScript value thisArgument, the following steps are taken:

Let thisMode be F.[[ThisMode]].
If thisMode is lexical, return NormalCompletion(undefined).
Let calleeRealm be F.[[Realm]].
Let localEnv be the LexicalEnvironment of calleeContext.
If thisMode is strict, let thisValue be thisArgument.
Else,
If thisArgument is undefined or null, then
Let globalEnv be calleeRealm.[[GlobalEnv]].
Let globalEnvRec be globalEnv's EnvironmentRecord.
Assert: globalEnvRec is a global Environment Record.
Let thisValue be globalEnvRec.[[GlobalThisValue]].
Else,
Let thisValue be ! ToObject(thisArgument).
NOTE: ToObject produces wrapper objects using calleeRealm.
Let envRec be localEnv's EnvironmentRecord.
Assert: envRec is a function Environment Record.
Assert: The next step never returns an abrupt completion because envRec.[[ThisBindingStatus]] is not "initialized".
Return envRec.BindThisValue(thisValue).








发表一点个人的看法，个人认为这里的第四部分 '环境变量' 写地是有些问题的。

'JavaScript 允许在函数体内部，引用当前环境的其他变量'
'上面代码中，函数体里面使用了变量x。该变量由运行环境提供。'
'现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。'
'在obj环境执行，this.x指向obj.x。'

'当前环境'是指什么，'运行环境'又是什么，'obj环境'又指代什么环境？

一般来说，es中函数的'运行环境'理解为execution context，大多翻译为执行环境。函数调用时总是会生成一个执行环境，即在调用栈中推入一个执行环境，也可以把调用栈称为执行环境栈。
执行环境上有一些属性，比如lexical enviroment，就是所谓词法环境。函数内对标识符的解析，就是通过在词法环境中查找实现的。词法环境保存了当前的环境记录(es5之前的活动对象)和指向外部词法环境的引用，形成了常说的作用域链。自由变量解析时就是在其中进行查找。
但这个作用域链是静态的，即函数声明时已经确定，这也是称为词法环境的来由，即通过词法分析就能确定其引用。
但是函数的调用是动态的，动态的调用会形成动态的执行环境栈。以栈顶的执行环境为例，其作用链和整个执行环境栈的次序并不能保证是一致的（前者静态，后者动态）。但变量的解析是根据静态的作用域链确定的，而非动态的执行环境栈。
因为函数的变量解析是静态的，应该是为了给函数调用时提供一些动态取值的能力，引入了this。this也是环境记录上的一个属性，既然是环境记录上的，本质上它也是一个静态属性。但除了箭头函数，其它函数在执行时，环境记录上会提供一个this绑定。规范中这样写: 'A function Environment Record is a declarative Environment Record that is used to represent the top-level scope of a function and, if the function is not an ArrowFunction, provides a this binding. '
所以箭头函数的this是静态的，引用的是其声明时执行环境的this；其它函数执行时的this都是动态的。如果没有显示地指定一个对象，this最终会指向全局对象。

'现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。'
这一段个人认为问题是很大的。对于如下代码:
<pre>
x = 1; // 在node.js环境中如果以 var x = 1 写不会更改在全局对象上，会是undefined；不加 var 就会更改在全局对象上
function a() {
    var x = 2;
    return function b() {
        console.log(x);
        console.log(this.x);
    }
} 
a()();
</pre>
上述代码很常见，无论b如何调用，其值一定是2。'函数体内部的运行环境（context）'如果是指b被调用时生成的执行环境，它的环境对象链是静态的；然而随着对b的调用不同，this取值是不同的，this去获取的是哪个'运行环境'呢？
个人认为本质上this就是一个引用，'obj环境'其实就是obj作为执行时的this引用，并不影响执行时的其它变量解析。不需要引入'obj环境'一说，不然更容易混淆。
因为阮老师的影响力很大，文章的受众很广，所以觉得还是有必要认真写下自己的认识，欢迎批评指正。