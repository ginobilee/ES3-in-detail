# 输出的兼容
webpack通过对模块的输出添加属性'__esModule'，以指示在载入时如何取值。通过这种方式，webpack实现了common.js与es6模块机制的兼容。具体实现如下：
```
 	__webpack_require__. = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};
```

这样就实现了对两种输出方式的兼容。

# 引入
1. 以es6方式引入common.js输出，会将整个输出作为一个对象传给引用。es6可以直接采用解构语法。
2. 以common.js引入es6输出，在es6同时有`export default ...`和`export const ...`时会有差异。此时common.js引入后赋值的变量实际上是将输出中的全部键放在一起作为对象传入，而不是像es6的import语法只载入default输出。
3. 使用babel可以解决2这个问题，解决方法是抽取出`export default ..`,单独作为一个键放在中间对象上。判断引用方式，决定是引入全部对象还是只引入default。


# tips
值得注意的是，在common.js规范中，当对`exports`重新赋值，并不会将值输出在`module`上。

# ref
[import、require、export、module.exports 混合使用详解](https://github.com/ShowJoy-com/showjoy-blog/issues/39)
[es-modules with node](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md)