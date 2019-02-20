

### node是什么

异步的，事件驱动的js运行时

> an asynchronous event driven JavaScript runtime

非阻塞 non-blocking

> users of Node are free from worries of dead-locking the process, since there are no locks. Almost no function in Node directly performs I/O, so the process never blocks. Because nothing blocks, scalable systems are very reasonable to develop in Node.

node中的事件循环不是一个库，而更多的是一个运行时的基础结构。

> It presents an [event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) as a runtime construct instead of as a library. 

node无需指令去开启或关闭事件循环。node自动开启此事件循环，当没有任务处理时就退出。这就像浏览器，事件循环是不为用户所察觉的。

> In other systems there is always a blocking call to start the event-loop. Typically behavior is defined through callbacks at the beginning of a script and at the end starts a server through a blocking call like `EventMachine::run()`. In Node there is no such start-the-event-loop call. **Node simply enters the event loop after executing the input script.** Node exits the event loop when there are no more callbacks to perform. This behavior is like browser JavaScript — the event loop is hidden from the user.

###blocking vs non-blocking

node的机制有点像一个单核cpu。不停地接受事件，调用其他单位处理事件。有响应时调用handler。

基于线程的server有点类似于多核cpu。一个线程就是一个核