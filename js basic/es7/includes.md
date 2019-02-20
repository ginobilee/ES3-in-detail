es7为Array引入了一个新的函数:Array.prototype.includes，这个方法韩惠true或false，指示待求的值是否在某个数组中。

与它功能类似的方法是`indexOf`，值得注意的是两者的不同：
`indexOf`在处理`NaN`时会返回-1，即它处理： `NaN !== NaN`。而`includes`不会，`[NaN].includes(NaN) === true`

但两者都将+0和-0处理为相等。即`[-0].incluedes(+0) === true; [-0].indexOf(+0) === true`。
这与`Object.is()`不同，`Object.is(+0, -0) === false; Object.is(NaN, NaN) === true`