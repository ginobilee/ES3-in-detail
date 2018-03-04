Writing to a disk is a lot slower than reading from a disk, thus, when we are trying to compress a file and write it to our hard disk, backpressure will occur because the write disk will not be able to keep up with the speed from the read.

> This is why a backpressure mechanism is important. If a backpressure system was not present, the process would use up your system's memory, effectively slowing down other processes, and monopolizing a large part of your system until completion.

> In any scenario where the data buffer has exceeded the highWaterMark or the write queue is currently busy, .write() will return false.

> Once the queue is finished, backpressure will allow data to be sent again. The space in memory that was being used will free itself up and prepare for the next batch of data.

This effectively allows a fixed amount of memory to be used at any given time for a .pipe() function. There will be no memory leakage, no infinite buffering, and the garbage collector will only have to deal with one area in memory!



When a false value is returned, the backpressure system kicks in. It will pause the incoming Readable stream from sending any data and wait until the consumer is ready again. Once the data buffer is emptied, a .drain() event will be emitted and resume the incoming data flow.

### Lifecycle of .pipe()
```
                                                     +===================+
                         x-->  Piping functions   +-->   src.pipe(dest)  |
                         x     are set up during     |===================|
                         x     the .pipe method.     |  Event callbacks  |
  +===============+      x                           |-------------------|
  |   Your Data   |      x     They exist outside    | .on('close', cb)  |
  +=======+=======+      x     the data flow, but    | .on('data', cb)   |
          |              x     importantly attach    | .on('drain', cb)  |
          |              x     events, and their     | .on('unpipe', cb) |
+---------v---------+    x     respective callbacks. | .on('error', cb)  |
|  Readable Stream  +----+                           | .on('finish', cb) |
+-^-------^-------^-+    |                           | .on('end', cb)    |
  ^       |       ^      |                           +-------------------+
  |       |       |      |
  |       ^       |      |
  ^       ^       ^      |    +-------------------+         +=================+
  ^       |       ^      +---->  Writable Stream  +--------->  .write(chunk)  |
  |       |       |           +-------------------+         +=======+=========+
  |       |       |                                                 |
  |       ^       |                              +------------------v---------+
  ^       |       +-> if (!chunk)                |    Is this chunk too big?  |
  ^       |       |     emit .end();             |    Is the queue busy?      |
  |       |       +-> else                       +-------+----------------+---+
  |       ^       |     emit .write();                   |                |
  |       ^       ^                                   +--v---+        +---v---+
  |       |       ^-----------------------------------<  No  |        |  Yes  |
  ^       |                                           +------+        +---v---+
  ^       |                                                               |
  |       ^               emit .pause();          +=================+     |
  |       ^---------------^-----------------------+  return false;  <-----+---+
  |                                               +=================+         |
  |                                                                           |
  ^            when queue is empty     +============+                         |
  ^------------^-----------------------<  Buffering |                         |
               |                       |============|                         |
               +> emit .drain();       |  ^Buffer^  |                         |
               +> emit .resume();      +------------+                         |
                                       |  ^Buffer^  |                         |
                                       +------------+   add chunk to queue    |
                                       |            <---^---------------------<
                                       +============+
```

### Rules to Abide By When Implementing Custom Streams

In general,

Never .push() if you are not asked.
Never call .write() after it returns false but wait for 'drain' instead.
Streams changes between different Node.js versions, and the library you use. Be careful and test things.

### Rules specific to Readable Streams

> Both these processes rely on one another to communicate effectively, if the Readable ignores when the Writable stream asks for it to stop sending in data, it can be just as problematic to when the .write()'s return value is incorrect.

必须对writable接口的返回状态进行处理，否则会一直写。占用内存。

### Rules specific to Writable Streams

If the write queue is busy, .write() will return false.
If the data chunk is too large, .write() will return false (the limit is indicated by the variable, highWaterMark).

.cork() can be called as many times we want, we just need to be careful to call .uncork() the same amount of times to make it flow again. 