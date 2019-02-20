

> - **依赖反转（Inversion Of Control）原则**。这条原则听上去有点拗口。这条原则是意思是，当你在为一个框架编写模块或者组件时，你只需要负责实现接口，并且到注册到框架里即可，然后等待框架来调用你，所以它的另另一个别名是 “Don't call us, we'll call you”。
>
> 这么说你可能没什么太大感觉，也不明白和“依赖”和“反转”有什么关系，说到底其实是一个控制权的问题。常规情况下当你在用express编写一个server时，代码是这样的：
>
> ```
> const app = express();
> module.exports = function (app) {
> 	app.get('/newRoute', function(req, res) {...})
> };
> ```
>
> 这意味着你正在编写的这个模块负责了/newRoute这个路径的处理，这个模块在掌握着主动权。
> 而用依赖反转的写法是：
>
> ```
> module.exports = function plugin() {
> 	return {
> 		method: 'get',
> 		route: '/newRoute',
> 		handler: function(req, res) {...}
> 	}
> }
> ```
>
> 意味着你把控制权交给了引用这个模块的框架，这样的对比就体现了控制权的反转。
> 其实前端编程中常常用到这个原则，注入依赖就是对这个思维的体现。比如requireJS和Angular1.0中对依赖模块的引用使用的都是注入依赖的思想。