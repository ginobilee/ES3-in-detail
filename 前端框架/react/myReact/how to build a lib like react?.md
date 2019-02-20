how to build a lib like react?

purpose: only use hooks

1. functional component
2. JSX 
3. createElement
4. ReactDOM.render
5. useState

1. 调用 ReactDOM.render 的时候已经将jsx转为了对象，什么时候做的？
	a. 看起来是在create react app中对jsx语法进行转译的。
	b. 是的，在进行编译时就会调用babel转为对应的对象表示。
	c. create-react-app 中是如何配置的？

<blockquote>
Facebook has created a Create React Application with everything you need to build a React app.

It is a a development server that uses Webpack to compile React, JSX, and ES6, auto-prefix CSS files.
</blockquote>

	cra是在什么时候对之进行转译的，如果执行build，之后的代码会是已经过jsx转译的还是没有？