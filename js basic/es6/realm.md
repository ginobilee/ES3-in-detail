# realm 

### from spec

> Conceptually, a realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources.

> Before it is evaluated, all ECMAScript code must be associated with a realm. Technically a realm just provides a global environment for a context.

> Realm: A code realm is an object which encapsulates a separate global environment.

> a direct realm equivalent in browser environment is the iframe element, which exactly provides a custom global environment. In Node.js it is close to the sandbox of the vm module.

> Let’s see the separate realms example, using the vm module:
```javascript
const vm = require('vm');
 
// First realm, and its global:
const realm1 = vm.createContext({x: 10, console});
 
// Second realm, and its global:
const realm2 = vm.createContext({x: 20, console});
 
// Code to execute:
const code = `console.log(x);`;
 
vm.runInContext(code, realm1); // 10
vm.runInContext(code, realm2); // 20
```

node.js中的`vm`模块相当于是提供了自定义领域的功能。领域总是和执行环境相关联的一个概念。为什么要引入领域，解决了之前执行环境所不能解决的什么问题？


会不会setTimeout会创建一个新的运行环境，而而promise只是创建一个job? no.

# job

> Further this context can execute other contexts, or enqueue other jobs. An example of a job which can be spawned and enqueued is a promise.

> When there is no running execution context and the execution context stack is empty, the ECMAScript implementation removes the first pending job from a job queue, creates an execution context and starts its execution.

每个execution context都是和一个realm相关联的。而每个execution context都可以创建一个新的execution context(执行函数)或者job。那么`When there is no running execution context and the execution context stack is empty`，则新的execution context中创建的job也会等到执行栈为空才执行么?是的，当前执行环境创建的新执行环境确实会早于当前执行环境创建的job执行。
job queue是关联与哪个概念层级的？execution context，或者realm，还是agent?
agent.




> Realm
The Realm Record from which associated code accesses ECMAScript resources.
