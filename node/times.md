
>  Timeout objects are returned by setTimeout and setInterval. The Timeout object provides two functions intended to augment Timeout behavior with unref() and ref(). If there is a Timeout object scheduled using a set function, unref() can be called on that object. This will change the behavior slightly, and not call the Timeout object if it is the last code to execute. The Timeout object will not keep the process alive, waiting to execute.

疑问，`This will change the behavior slightly, and not call the Timeout object if it is the last code to execute`中说道，如果被`unref`的timeout是最后的待执行的代码，它不会被执行。如果不是最后待执行的，它会被执行？

也许，这里的意思只是，如果后面没有通过`ref`再将它放回执行流程中。