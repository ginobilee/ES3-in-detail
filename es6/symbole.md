#Symbol.species

> The well-known symbol `**Symbol.species**` specifies a function-valued property that the constructor function uses to create derived objects.

### 概念

> The species accessor property allows subclasses to override the default constructor for objects.

### Examples

> You might want to return [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) objects in your derived array class `MyArray`. For example, when using methods such as [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) that return the default constructor, you want these methods to return a parent `Array` object, instead of the `MyArray` object. The species symbol lets you do this:
>
> ```javascript
> class MyArray extends Array {
>   // Overwrite species to the parent Array constructor
>   static get [Symbol.species]() { return Array; }
> }
> var a = new MyArray(1,2,3);
> var mapped = a.map(x => x * x);
>
> console.log(mapped instanceof MyArray); // false
> console.log(mapped instanceof Array);   // true
> ```
>
> 

