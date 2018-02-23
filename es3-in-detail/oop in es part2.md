# ECMAScript中的oop之二

###es中的类型

> Standard defines nine types, and only six are directly accessible in an ECMAScript program:
>
> - Undefined
> - Null
> - Boolean
> - String
> - Number
> - Object
>
> Other three types are accessible only at implementation level (none of ECMAScript objects can have such type) and used by the specification for explaining behavior of some operations, for storing intermediate values and other. These are following types:
>
> - Reference
> - List
> - Completion
>
> Thus (in short overview), `Reference` type is used for an explanation of such operators as `delete`, `typeof`, `this` and other, and consists of a *base object* and a *property name*. `List` type describes behavior of the arguments list (in the `new` expression and function calls). `Completion` type in turn is used for an explanation of behavior `break`, `continue`, `return` and `throw` statements.

###es5中引入了frozen对象和不可扩展对象

> Note, ES5 standardized static objects which cannot be extended with new properties and none of the properties can be modified or deleted. These are so-called frozen objects, which can be gotten by applying 
>
> ```
> Object.freeze(o)
> ```
>
>  method.
>
> Also it’s possible just to prevent extensions using `Object.preventExtensions(o)` method, and to control specific attributes with `Object.defineProperty(o)` method:
>
> ```javascript
> var foo = {x : 10};
>  
> Object.defineProperty(foo, "y", {
>   value: 20,
>   writable: false, // read-only
>   configurable: false // non-configurable
> });
>  
> // can't modify
> foo.y = 200;
>  
> // can't delete
> delete foo.y; // false
>  
> // prevent extensions
> Object.preventExtensions(foo);
> console.log(Object.isExtensible(foo)); // false
>  
> // can't add new properties
> foo.z = 30;
>  
> console.log(foo); {x: 10, y: 20}
> ```
>
> For details see [this chapter](http://dmitrysoshnikov.com/ecmascript/es5-chapter-1-properties-and-property-descriptors/).

###原生对象native object, 内建对象built-in object, 宿主对象 host object

> It is necessary to notice also that the specification distinguishes *native* objects, *built-in* objects and *host* objects.
>
> *Built-in* and *native* objects are defined by the ECMAScript specification and the implementation, and a difference between them insignificant. *Native* objects are the all objects provided by ECMAScript implementation (some of them can be *built-in*, some can be created during the program execution, for example user-defined objects).
>
> The *built-in* objects are a subtype of *native* objects which are *built into* the ECMAScript *prior to the beginning* of a program (for example, `parseInt`, `Math` etc.).
>
> All *host objects* are objects provided by the host environment, typically a browser, and may include, for example, `window`, `console.log`, etc.

###正则类

> ###### [Regular Expression Literal and RegExp Objects](http://dmitrysoshnikov.com/ecmascript/chapter-7-2-oop-ecmascript-implementation/#regular-expression-literal-and-regexp-objects)
>
> Notice although, that in ES3 the two last cases with regular expressions being equivalent semantically, nevertheless differ. The *regexp literal* exists *only in one instance* and is created on parsing stage, while `RegExp` constructor creates always a *new object*. This can cause some issues with e.g. `lastIndex` property of regexp objects when regexp test is fail:
>
> Note, in ES5 this issue has been fixed and regexp literal also always creates a new object.

###new操作符

> Regarding calls of the built in constructors with the `new` and without `new` operator, there is no the general rule and it depends on the constructor. For example `Array` or `Function` constructors produce *the same* results when are called as a constructor (with `new`) and as a simple function (without `new`):

> If there are no arguments, call parenthesis of constructor function can be omitted:
>
> ```javascript
> function A(x) { // constructor А
>   this.x = x || 10;
> }
>  
> // without arguments, call
> // brackets can be omitted
> var a = new A; // or new A();
> console.log(a.x); // 10
>  
> // explicit passing of
> // x argument value
> var b = new A(20);
> console.log(b.x); // 20
> ```
>
> 

### es中对象的内部属性`[[class]]`

> - To get the `[[Class]]` property from ECMAScript programs is possible indirectly via the `Object.prototype.toString()` method. This method should return the following string: `"[object " + [[Class]] + "]"`. For example:
>
> - ```javascript
>   var getClass = Object.prototype.toString;
>    
>   getClass.call({}); // [object Object]
>   getClass.call([]); // [object Array]
>   getClass.call(new Number(1)); // [object Number]
>   // etc.
>   ```
>
> - ​

### Algorithm of objects creation

用new实例化对象时，如果构造函数返回一个非空的引用类型值，那么结果就是这个返回值，否则是执行new时刚创建的对象。

在由构造函数实例化的对象上，其`constructor`属性实际上是其原型上的`constructor`属性。

> - Notice though, that both `constructor` and `prototype` properties of the function can be *redefined* after the object is created. In this case the object looses the reference via the mechanism above.
>
> - If we *add* new or *modifiy* existing property in the original prototype via the function’s `prototype` property, instances will see the newly added properties.
>
> - However, if we *change* function’s `prototype` property *completely* (via *assigning* a new object), the reference to the *original* constructor (as well as to the original prototype) *is lost*. This is because we create the new object which *does not have* `constructor` property:

一个对象在通过构造函数创建后，其`[[prototype]]`属性就指向了一个固定的对象，这个对象就是构造函数的`prototype`属性所指向的对象。此时如果在两者中任一添加或删除属性，会影响另外一个。但如果将其中之一重新指向另一个对象，即如`A.prototype = {x: 10}`，则两者就指向了不同的对象。此时更改其中之一不会影响另一个。说到底，js的基础都是对象。

> - However, replacing `prototype` property of the constructor *does not affect*the prototype of *already created objects*. It’s *only* the `prototype` property of the constructor that is changed! It means that *new objects* will have a *new prototype*. But *already created* objects (before the `prototype` property was changed), have reference to the *old prototype* and this reference *cannot be changed already*:
>
> - ```javascript
>   function A() {}
>   A.prototype.x = 10;
>    
>   var a = new A();
>   console.log(a.x); // 10
>    
>   A.prototype = {
>     constructor: A,
>     x: 20
>     y: 30
>   };
>    
>   // object "а" delegates to
>   // the old prototype via
>   // implicit [[Prototype]] reference
>   console.log(a.x); // 10
>   console.log(a.y) // undefined
>    
>   var b = new A();
>    
>   // but new objects at creation
>   // get reference to new prototype
>   console.log(b.x); // 20
>   console.log(b.y) // 30
>   ```
>
>
> - The main rule here is: the object’s prototype is set at the moment of object’s *creation* and after that *cannot be changed* to new object. Using the explicit `prototype` reference from the constructor if it still refers to the *same* object, it is possible *only* to *add new* or *modify* existing properties of the object’s prototype.

### instanceof操作符的原理

检测当前对象的原型链上是否有待检测类的原型。

> - All the `instanceof` operator does is only takes the value of the `Foo.prototype`property and checks its *presence* in the *prototype chain* of `foo`, starting from the `foo.[[Prototype]]`. The `instanceof` operator is activated by the internal [[[HasInstance\]]](http://bclary.com/2004/11/07/#a-15.3.5.3) method of the constructor.

### 检测对象是否有某属性

获取对象的键值其实是调用内部方法[[Get]],它会在对象的原型链上依次寻找，并在找不到时返回`undefined`。所以，可以用`if (object.property)`的方法来检测属性是否存在于该对象上。但是要注意，如果该属性存在且会被if语句判断为false，那么就起不到检测该属性存在与否的作用了。这时最好用`in`操作符，它也会检测对象的原型链。

> - Notice, that for *exactly presence* the `in` operator is responsible. It also considers the prototype chain:
>
> - ```javascript
>   if ('someObject' in window) {
>     ...
>   }
>   ```
>
> - ​

### 为对象添加/更新属性

> Notice, it’s *not* possible to *shadow inherited read-only* property. Result of an assignment is just ignored. This is controlled by the `[[CanPut]]` internal method; see [8.6.2.3](http://bclary.com/2004/11/07/#a-8.6.2.3) of ES3.
>
> ```javascript
> // For example, property "length" of
> // string objects is read-only; let's make a
> // string as a prototype of our object and try
> // to shadow the "length" property
>  
> function SuperString() {
>   /* nothing */
> }
>  
> SuperString.prototype = new String("abc");
>  
> var foo = new SuperString();
>  
> console.log(foo.length); // 3, the length of "abc"
>  
> // try to shadow
> foo.length = 5;
> console.log(foo.length); // still 3
> ```
>
> In [strict mode](http://dmitrysoshnikov.com/ecmascript/es5-chapter-2-strict-mode/) of ES5 an attempt to shadow a non-writable property [results](http://dmitrysoshnikov.com/ecmascript/es5-chapter-2-strict-mode/#shadowing-inherited-read-only-properties) a `TypeError`.

### 对象属性的读取

属性读取操作符总是会对其左边的变量指向`ToObject`转换。

> There is one important feature — property accessor always calls `ToObject`conversion for the object standing on left hand side from the property accessor. 

如果我们对一个基本值执行属性读取操作，就会创建一个以这个基本值为值的基本类；读取结束后，这个类被销毁。

> - If we use property accessor with a *primitive value*, we just create *intermediate wrapper object* with corresponding value. After the work is finished, this wrapper is *removed*.

如果一个基本值经常要执行属性读取操作，最好将它声明为基本类型对象；否则就将其声明为一个基本值。

> - That is the reference to properties/methods from a *primitive* value makes sense only for *reading* the properties. **Also if any of primitive values often uses the access to properties, for economy of time resources, there is a sense directly to replace it with an object representation. And on the contrary — if values participate only in some small calculations which are not demanding the access to properties then more efficiently primitive values can be used.**

### 继承

> today programmers use standard pattern for chaining the prototypes
>
> ```javascript
> function A() {
>   console.log('A.[[Call]] activated');
>   this.x = 10;
> }
> A.prototype.y = 20;
>  
> var a = new A();
> console.log([a.x, a.y]); // 10 (own), 20 (inherited)
>  
> function B() {
>   // or simply A.apply(this, arguments)
>   B.superproto.constructor.apply(this, arguments);
> }
>  
> // inheritance: chaining prototypes
> // via creating empty intermediate constructor
> var F = function () {};
> F.prototype = A.prototype; // reference
> B.prototype = new F();
> B.superproto = A.prototype; // explicit reference to ancestor prototype, "sugar"
>  
> // fix .constructor property, else it would be A
> B.prototype.constructor = B;
>  
> var b = new B();
> console.log([b.x, b.y]); // 10 (own), 20 (inherited)
> ```
>
> 