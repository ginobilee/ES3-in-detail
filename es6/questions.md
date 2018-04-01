questions:

1. realm的作用是什么？[spec](https://tc39.github.io/ecma262/#sec-code-realms) and [talk](https://esdiscuss.org/topic/the-initialization-steps-for-web-browsers#content-16)

2. job queue是关联于哪一级的，agent还是realm? agent.
> Execution of a Job can be initiated only when there is no running execution context and the execution context stack is empty. 
可见job queue绝不是realm这一级的。
> Each agent has its own set of named Job Queues.

script jobs会不会是用来处理引入的其他script和module的？ 是的

3. 不同类型的job是如何保证顺序执行的，优先级如何？这个是implementation dependant,即决定于实现的。

4. import 和export是如何作用的，动态的还是静态的？

5. `lexical environment`和`variable environment`的区别？