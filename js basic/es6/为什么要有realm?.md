[Relationship between globals, Realms, and global environment records](https://esdiscuss.org/topic/relationship-between-globals-realms-and-global-environment-records)

[what is a realm?](https://gist.github.com/dherman/7568885)
# 规范的作者说：
> A Realm record, is a ES6 specification artifact that represents the complete the execution context of ES code. It is not an object and does not have object-like semantics. It is at a lower layer of of the ES specification and using it the complete semantics of ES execution can be defined without depending upon any real metacircularity. As a specification device, an implementation is free to represent it any way it wants. Even as hidden state on an object. **However, the ES spec. intentionally does not associate any of the realm record state with a global object. To do so would make it a requirement that pass a reference to a global object implies availability (at some level) of the rest of the realm state.**

ES environment records are used to define the semantics of lexical scoping within the ES language. One kind of environment record is a Global environment record that defines the global scope. Note that a global environment records includes more that just a reference to a global object. It also includes bindings for global lexical declarations (lets/const/class) which are global but not accessible as properties of the global objects. Environment records are also specification artifacts, it up to an implementation to decide how to represent environment records. Note that prior to ES5 the ES spec. actually required that objects be used at runtime to represent the scoping environment. This resulted in various undesirable (but technically required) quirks in the scoping semantics. ES5 eliminated these problems.

The global object is an actual object. It has to have ES object semantics, so it is at a higher level of the design than either realm records and or environment record.

# 其他人说：
> Given that we now expose realms to JavaScript, fixing this mismatch between HTML and JavaScript seems somewhat more important (although really, HTML explicitly overriding JavaScript should be a big warning sign): ecmascript#1898 Otherwise, ***the Realm API cannot really fulfill its intended use as "<iframe> without DOM".***

要对realm有一个真正的理解，必须先区分开realm的界限，即如何确定两个realm不一致？
似乎，realm是为了与global enviroment record中的global object区分开的。

规范中realm与realm的交集：在9.2 table27中 'Internal Slots of ECMAScript Function Objects'有：
[[Realm]] Realm Record 
The realm in which the function was created and which provides any intrinsic objects that are accessed when evaluating the function.
就是说函数有一个内部属性Realm，为函数执行时提供可访问的内部对象。(这么说起来似乎是对global object的抽象，因为global object一定是一个es中的对象类型)

在 9.2.1.2 OrdinaryCallBindThis ( F, calleeContext, thisArgument ) 中对于函数中this的规则设定时也提到了对Reaml的应用：
```
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
```
其中很明显，从函数F的内部属性[[Reaml]]上读取全局对象，依赖关系如下：
F 
	--> calleeRealm = F[[Reaml]] 
		--> globalEnv = calleeRealm.[[GlobalEnv]] 
			--> globalEnvRec = globalEnv's EnvironmentRecord
				--> thisValue = globalEnvRec.[[GlobalThisValue]]

可以推测，在其它地方引用 全局对象 时，也是通过这样的步骤来获取的。因为Realm是execution context的一个属性，所以的运行时代码都会以此路径获取全局对象。
是不是提供了一种跨作用域链获取全局环境的方法？

> Before it is evaluated, all ECMAScript code must be associated with a realm. Conceptually, a realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources.

