# event loop

### event loop的阶段

1. Timers: 定时器fire的回调
2. **I/O callbacks**: 除关闭类回调(如`socket.on('close', …)`)、定时器的回调和`setImmediate()`回调之外的几乎所有回调。
3. Idle, prepare: 空闲阶段，这是内部状态，开发者不用理
4. Poll： 可以理解为**执行事件池中的事件的与轮训**阶段。它的执行逻辑见后
5. Check:   `setImmediate()` 回调执行阶段
6. close callback: 关闭端口或端口相关服务错误退出的回调



### timers阶段

问题： timers阶段如果有多个timer回调会连续执行么？如下例中先输出'read file'还是'timer2'?
  会的。timers阶段就是执行timers回调的阶段，执行时 event loop 也仍然是在这个阶段，而非poll阶段。

```javascript
const fs = require("fs")
setTimeout(() => {
  // callback complete after 10ms
  let t = new Date()
  console.info(t.toLocaleTimeString())
  while (Date.now() - t < 1000) {}
  console.log("Timer1: ", new Date().toLocaleTimeString())
  process.nextTick(() => {
    console.info("nextTick in Timer1")
  })
  setImmediate(() => {
    console.info("immediate in Timer 1")
  })
}, 0)
setTimeout(() => {
  console.log("Timer2")
  setImmediate(() => {
    console.info("immediate in Timer 2")
  })
  process.nextTick(() => {
    console.info("nextTick in Timer2")
  })
}, 0)
// read file complete after 15ms
console.log("before fs.readfile: ", Date.now())
fs.readFile("../pref/index.js", function() {
  console.log("read File")
  console.log("read file complete: ", Date.now())
})


// result
before fs.readfile:  1544962332040
20:12:12
timer.js:5
Timer1:  20:12:13
Timer2
nextTick in Timer1
nextTick in Timer2
read File
read file complete:  1544962333047
immediate in Timer 1
immediate in Timer 2
```
所以timer的callback都是在这个阶段执行的，而非poll阶段。

### io callback

> "I/O" refers primarily to interaction with the system's disk and network supported by [libuv](http://libuv.org/).
io callbacks 也是在poll阶段执行，但是io callback阶段也说 'executes the io callback'， 那么是如何区分的？

### poll阶段

```
poll阶段的处理逻辑：
1. 事件队列中有待处理的事件？
  1.1 有。处理之。处理完返回1，或超时跳出poll阶段
  1.2 无。有setImmediate？
    1.2.1 有。到check阶段
    1.2.2 无。有timer挂载？
      1.2.2.1 有。查看有无到期的timer，有则跳往timers阶段
      1.2.2.2 无。跳往1.
```

那么`setImmediate()` 是否总是比 `setTimeout()` 更先触发呢？不一定，后面再分析。

> Generally, as the code is executed, the event loop will eventually hit the poll phase where it will wait for an incoming connection, request, etc. However, if a callback has been scheduled with setImmediate() and the poll phase becomes idle, it will end and continue to the check phase rather than waiting for poll events.

poll阶段有一个最大值，防止在这个阶段锁死event loop

> To prevent the **poll** phase from starving the event loop, [libuv](http://libuv.org/) (the C library that implements the Node.js event loop and all of the asynchronous behaviors of the platform) also has a hard maximum (system dependent) before it stops polling for more events.



> When the event loop enters the **poll** phase *and there are no timers scheduled

> Once the **poll** queue is empty the event loop will check for timers *whose time thresholds have been reached*. If one or more timers are ready, the event loop will wrap back to the **timers** phase to execute those timers' callbacks.

### setImmediate

Settimers vs setimmediate

> The main advantage to using `setImmediate()` over `setTimeout()` is `setImmediate()`will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present.



###close callbacks:

> If a socket or handle is closed abruptly (e.g. `socket.destroy()`), the `'close'` event will be emitted in this phase. Otherwise it will be emitted via `process.nextTick()`.



###process.nextTick()

为何将process.nextTick()设计成异步但又不在任何一个event loop的阶段？为了遵循异步的设计理念，以及在执行完用户定义的代码后立即执行回调。如下一个实际的例子：

> ```javascript
> const server = net.createServer(() => {}).listen(8080);
>
> server.on('listening', () => {});
> ```
>
> When only a port is passed, the port is bound immediately. So, the `'listening'` callback could be called immediately. The problem is that the `.on('listening')` callback will not have been set by that time.
>
> To get around this, the `'listening'` event is queued in a `nextTick()` to allow the script to run to completion. This allows the user to set any event handlers they want.
>
> 上例中只有一个端口被绑定的情况下，该端口立即被绑定了。然后`'listening'` 的回调可以立即被调用。此时回调其实还没有设好。为了解决这个问题，`'listening'` 这个事件被放在 `nextTick()` 里去执行，这样就允许用户采用上述语法而定义任何回调。
>
> 事实上，之前的做法就是要求将绑定事件放在端口开启前。（如xhr将绑定事件放在open前)
>
> This is because process.nextTick() is not technically part of the event loop. Instead, the nextTickQueue will be processed after the current operation completes, regardless of the current phase of the event loop.

> the nextTickQueue will be processed after the current operation completes, regardless of the current phase of the event loop.



## `process.nextTick()` vs `setImmediate()`

- `process.nextTick()` fires immediately on the same phase
- `setImmediate()` fires on the following iteration or 'tick' of the event loop

In essence, the names should be swapped. `process.nextTick()` fires more immediately than `setImmediate()`




> Several runtimes communicating togetherSection
> A web worker or a cross-origin iframe has its own stack, heap, and message queue. Two distinct runtimes can only communicate through sending messages via the postMessage method. This method adds a message to the other runtime if the latter listens to message events.

关键概念： stack/heap/message queue
stack always go before message queue.




> Poll timeout is calculated. Before blocking for I/O the loop calculates for how long it should block. These are the rules when calculating the timeout:

If the loop was run with the UV_RUN_NOWAIT flag, the timeout is 0.
If the loop is going to be stopped (uv_stop() was called), the timeout is 0.
If there are no active handles or requests, the timeout is 0.
If there are any idle handles active, the timeout is 0.
If there are any handles pending to be closed, the timeout is 0.
If none of the above cases matches, the timeout of the closest timer is taken, or if there are no active timers, infinity.

The loop blocks for I/O. At this point the loop will block for I/O for the duration calculated in the previous step. All I/O related handles that were monitoring a given file descriptor for a read or write operation get their callbacks called at this point.

所以在进入poll阶段时，就会先计算停留的时间timeout。如果有timer，那么停留时间就是最近要触发的timer。这样可以保证过了这个时间，回去查看timer是否fire。但如果在poll阶段一个同步操作的时间超过了timeout，会打断这个操作么？


Many readers forget how the event loop schedule asynchronous tasks and face to the same problem when they encounter it again.