# es 中的执行环境 execution context



excution context 是es规范规定，而js 引擎(如v8)创造的。每次开始执行js代码时，代码控制权就进入了excution context. 如下：

> Every time when control is transferred to ECMAScript executable code, control is entered an *execution context*.
>
> > *Execution context (abbreviated form — EC)* is the abstract concept used by ECMA-262 specification for typification and differentiation of an executable code.
>
> **The standard does not define accurate structure and kind of EC from the technical implementation viewpoint; it is a question of the ECMAScript-engines implementing the standard.**
>
> Logically, set of active execution contexts forms a stack. The bottom of this stack is always a *global context*, the top — a current (active) execution context. The stack is modified (pushed/popped) during the entering and exiting various kinds of EC.

可以将执行环境分为3种: global context,  function context, eval context, 如下：

1. global context

> This type of code is processed at level `Program`: i.e. the loaded external `.js`-file or the local inline-code (inside the `<script></script>` tags). The global code does not include any parts of a code which are in bodies of functions.

2. function context

> On entering the function code (all kinds of functions), `ECStack` is pushed with new elements. It is necessary to notice that the code of concrete function does not include codes of the inner functions.
>
> For example, let’s take the function which calls itself recursively once:
>
> ```javascript
> (function foo(flag) {
>   if (flag) {
>     return;
>   }
>   foo(true);
> })(false);
> ```
>
> Then, ECStack is modified as follows:
>
> ```javascript
> // first activation of foo
> ECStack = [
>   <foo> functionContext
>   globalContext
> ];
>   
> // recursive activation of foo
> ECStack = [
>   <foo> functionContext – recursively 
>   <foo> functionContext
>   globalContext
> ];
> ```

> A thrown but not caught exception may also exit one or more execution contexts:

3. eval context

> Things are more interesting with `eval` code. In this case, there is a concept of a *calling context*, i.e. a context from which `eval` function is *called*.
>
> The actions made by `eval`, such as variable or function definition, influence exactly the *calling* context:
>
> ```javascript
> ECStack = [
>   globalContext
> ];
>   
> // eval('var x = 10');
> ECStack.push({
>   context: evalContext,
>   callingContext: globalContext
> });
>  
> // eval exited context
> ECStack.pop();
>  
> // foo funciton call
> ECStack.push(<foo> functionContext);
>  
> // eval('var y = 20');
> ECStack.push({
>   context: evalContext,
>   callingContext: <foo> functionContext
> });
>  
> // return from eval 
> ECStack.pop();
>  
> // return from foo
> ECStack.pop();
> ```
>
> 

> Note, in the [strict-mode](http://dmitrysoshnikov.com/ecmascript/es5-chapter-2-strict-mode/) of ES5, `eval` already *does not* influence the calling context, but instead evaluates the code in the local *sandbox*.



另外，在es6中新增了一种新的执行环境，module.