# es5中的bind函数



> Thus, a bound function does not have a `prototype` property or the `[[Code]]` (the function body code), `[[FormalParameters]]` (the list of formal parameter names), and `[[Scope]]` (a parent lexical or variable environment) internal properties.

> Thus, absence of the `[[Scope]]` property provides optimization, because such *incomplete* function objects do not form closures. **They are just intermediate proxies which *delegate* to the *original* functions.**

> However, a bound function has additionally the following internal properties: `[[TargetFunction]]` — a reference to a target function from which the bound function is created; `[[BoundThis]]` — exactly a bound `this` value; `[[BoundArgs]]` — a bound arguments which are used in *partial* application of the function.

> Therefore, using `call` or `apply` methods in respect of providing manual `this` value for a bound function won’t change anything — still *bound* `this` will be used:

> **Three important internal methods — `[[Call]]`, `[[Construct]]` and `[[HasInstance]]`are *overloaded* for the bound functions.**

> The original `[[Construct]]` to which *delegates* the overloaded `[[Construct]]` of a bound function, calls then the *original*`[[Call]]` of the *target* function, but not the `[[Call]]` of the bound function. Which means that inside the initializing call of the function we *do not have a bound thisvalue*, but instead the `this` value set to the *newly created object*.

> So, regarding *this* value in bound function cases we have this summary:
>
> - Simple call via `BoundF()` — `boundThis`;
> - `call` / `apply`, i.e. `BoundF.call(manualThis)` — still `boundThis`;
> - as a constructor — `new BoundF()` — *newly created* object.

> key features of the bound functions created via the built-in `bind` method:
>
> - The main purpose is binding statically the `this` value and *partial applications*;
> - such functions are “lightweight” — they do not have `[[Scope]]` property (and therefore do not form closures), and also `[[FormalParameters]]`, `[[Code]]` and `prototype` properties;
> - they delegate to the `[[Call]]`, `[[Construct]]` and `[[HasInstance]]` of the *original* function;
> - thus inside the `[[Call]]` method `this` value is *bound*, but if the `[[Call]]` is activated from the `[[Construct]]` — not, there it refers to the *newly created object*;
> - independently from the *strict mode* such functions throw a `TypeError` exception for attempts of reading the `caller` or the `arguments` properties on these functions.



原文中的病句？

> When the `[[Call]]` internal method of a *bound* function is activated, it after own handling *delegates* to the *original* `[[Call]]` of the target function, passing needed `this` value and arguments. 