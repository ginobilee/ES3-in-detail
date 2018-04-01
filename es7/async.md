# async
> The purpose of async/await functions is to simplify the behavior of using promises synchronously and to perform some behavior on a group of Promises. Just as Promises are similar to structured callbacks, async/await is similar to combining generators and promises.

因为js是单线程的，所以任何不应该在当前执行流程进行的操作(当前执行环境的主进程)都应该放在异步回调中。这样才能达到对流程进行控制的目的。因此，异步的处理就称为js一个重要的课题。最开始，采用回调解决。但当有多个异步操作需要固定的顺序，那么就会产生回调地狱。于是，产生了`Promise`的解决方案。`Promise`通过扩展`then`，在`then`中返回当前的promise, 将回调的串联用多个then同步地写出，跳出了回调地狱。
同时，为了简化js中进行流程控制的操作，es又提供了`iterator`和`generator`。通过结合`yeild`操作符和`generator`，es可以以一种简洁的方式实现流程控制。于是，结合`generator`和`Promise`,一种更简洁的处理回调的方式产生了，这就是`async`和`await`。
实际上，`await promiseObj`语句，就是`yield promiseObj`语句。`yield`语句处于一个generator中，调用这个generator，生成一个generator object。在yield操作符后跟一个promise，然后当在这个promise resolve或reject时，调用`yield`所在generator object的`next()`方法。这实际上就完成了`async`和`await`。
`async`和`await`语法的优势在promise嵌套时更明显。如当一个promise resolved之后，需要进行另一个promise操作，另一个pormise只能放在then的语句中。如下:
```javascript
// promise
function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch(e => {
      return downloadFallbackData(url)  // returns a promise
    })
    .then(v => {
      return processDataInWorker(v); // returns a promise
    });
}

// async
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url); 
  } catch(e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
```

