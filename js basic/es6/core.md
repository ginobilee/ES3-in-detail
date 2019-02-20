
> Def. 7: Execution context: An execution context is a specification device that is used to track the runtime evaluation of the code.

> There are several types of ECMAScript code: the global code, function code, eval code, and module code; each code is evaluated in its execution context. Different code types, and their appropriate objects may affect the structure of an execution context: for example, generator functions save their generator object on the context.

> In general, the code of a context runs to completion, however as we mentioned above, some objects — such as generators, may violate LIFO order of the stack. A generator function may suspend its running context, and remove it from the stack before completion. Once a generator is activated again, its context is resumed and again is pushed onto the stack

> Def. 9: Lexical environment: A lexical environment is a structure used to define association between identifiers appearing in the context with their values. Each environment can have a reference to an optional parent environment.

> So an environment is a storage of variables, functions, and classes defined in a scope.

> Technically, an environment is a pair, consisting of an environment record (an actual storage table which maps identifiers to values), and a reference to the parent (which can be null).

> Logically this reminds us of the prototype chain which we’ve discussed above. And the rule for identifiers resolution is very similar: if a variable is not found in the own environment, there is an attempt to lookup it in the parent environment, in the parent of the parent, and so on — until the whole environment chain is considered.

> Environment records differ by type. There are object environment records and declarative environment records. On top of the declarative record there are also function environment records, and module environment records. ...However, the generic mechanism of the identifier resolution is common across all the environments, and doesn’t depend on the type of a record.

> Notice, the binding object exists to cover legacy constructs such as var-declarations, and with-statements, which also provide their object as a binding object. 

> Static scope: a language implements static scope, if only by looking at the source code one can determine in which environment a binding is resolved.

> Technically the static scope is implemented by capturing the environment where a function is created.

> This: an implicit context object accessible from a code of an execution context — in order to apply the same code for multiple objects.

> `Like we said, in the global context the this value is the global object (the binding object of the global environment record). Previously there was only one global object. In current version of the spec there might be multiple global objects which are part of code realms. Let’s discuss this structure.`