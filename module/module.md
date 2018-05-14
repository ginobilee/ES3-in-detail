
# 比较
1. ES6 模块跟 CommonJS 模块的不同，主要有以下两个方面：

   - ES6 模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝
   - ES6 模块编译时执行，而 CommonJS 模块总是在运行时加载

2. 相同

   - 模块不会重复执行

3. 面对循环依赖(a中引用b，b中引用a，运行a)

   - commonjs中,b中会加载node之前已经加载过的a模块。即：在 CommonJS 规范中，当遇到 require() 语句时，会执行 require 模块中的代码，并缓存执行的结果，当下次再次加载时不会重复执行，而是直接取缓存的结果。
   - es6中，b中会将a执行中的输出作为a的输出，而不是再去加载a。所以如果a在引用b后改变了输出的内容，b中读取到的还是其引用a时的内容。

# commonjs
> 在 CommonJS 规范中，当遇到 require() 语句时，会执行 require 模块中的代码，并缓存执行的结果，当下次再次加载时不会重复执行，而是直接取缓存的结果。正因为此，出现循环依赖时才不会出现无限循环调用的情况。

 - CommonJS 模块重复引入的模块并不会重复执行，再次获取模块直接获得暴露的 module.exports 对象
 - 如果你要处处获取到模块内的最新值的话，也可以你每次更新数据的时候每次都要去更新 module.exports 上的值
 - 如果你暴露的 module.exports 的属性是个对象，那就不存在这个问题了

# es6

1. ES6 模块编译时执行会导致有以下两个特点：

   - import 命令会被 JavaScript 引擎静态分析，优先于模块内的其他内容执行。
   - export 命令会有变量声明提前的效果。

2. 动态import()

   - 动态的 import() 提供一个基于 Promise 的 API
   - 动态的import() 可以在脚本的任何地方使用
   - import() 接受字符串文字，你可以根据你的需要构造说明符

# webpack的兼容

其实webpack对各种模块化方案的兼容是类似于cmd规范的，将require/module/export方法/对象注入给指定模块，模块内用这些注入实现模块化方案。

# 参考
(深入理解 ES6 模块机制)[https://zhuanlan.zhihu.com/p/33843378?group_id=947910338939686912]
(如何实现一个 CMD 模块加载器)[http://annn.me/how-to-realize-cmd-loader/]