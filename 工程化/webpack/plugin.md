pluging

> Plugins used to customize webpack’s build process in a variety of ways. A webpack plugin is a JavaScript object that has an apply property. This apply property is called by the webpack compiler, giving access to the entire compilation lifecycle. Webpack comes with a multiple built-in plugins available under webpack.[plugin-name].


例如webpack自带的 APIPlugin 定义如下：
```javascript
class APIPlugin{
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"APIPlugin",
			(compilation, { normalModuleFactory }) => {
				// ...
				// 声明 handler 进行相应处理
				const handler = parse => {
					// ...
				}
				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("APIPlugin", handler);
				// ...
			}
	}
}
```

webpack会在编译过程中调用这个apply函数，调用参数就是编译处理器 compiler。插件利用 compiler.hooks.compilation.tap 函数向 compiler 添加钩子，提供webpack处理时调用。

> Plugins on the other hand can deeply integrate into webpack because they can register hooks within webpacks build system and access (and modify) the compiler, and how it works, as well as the compilation.


### Why is OccurenceOrderPlugin the part of webpack optimization?
> OccurenceOrderPlugin order the modules and chunks by occurrence. More module occurs - smaller id it has, this technique helps to reduce bundle size, because a module is used many times will be referenced many times with webpack_require(moduleId).
即，引用次数更多的module，其id更短，有助于减小文件体积。

### What is difference between "hash" and "chunkhash"?
> hash will generate unique hash for each build and use it for all chunks. Replace hash with chunkhash to generate unique hashes for each chunk. This is useful when you dont want to re-download vendors (dependencies) file but you have changes in your application code and want to update it.

hash是基于build确定，每次build都不一样，但同一次build的所有文件都一样。
chunkhash是基于chunk模块产生，只要chunk没有发生变化，就不会变更。同理同一次build的不同文件chunkhash也不同。但是这样又有一个问题，因为我们是将样式作为模块import到JavaScript文件中的，所以它们的chunkhash是一致的，如test1.js和test1.css 都有同样的hash。这样就会有个问题，只要对应css或则js改变，与其关联的文件hash值也会改变，但其内容并没有改变呢，所以没有达到缓存意义。contenthash的用途随之而来。
contenthash 呢？contenthash是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变，所以我们可以通过contenthash解决上诉问题。