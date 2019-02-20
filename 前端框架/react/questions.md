1. 是不是任何一个子组件setstate都会让整个组件render?
	从打断点的情况来看，是不会让父组件的render方法执行的。

2. props的更改是怎么驱动更新的？
 - 将一个变量赋给子组件，这个子组件并不会自动跟踪这个变量的值的变化。即，如果以 <Child a={a} /> 给Child传参，然后a改了值，这个时候Child实例的props上的a属性不会自动更新。
 - 那么什么时候才会更新？

3. 了解reactdom的render

4. 为什么不能在 willmount 中fetch数据或者添加事件绑定？
	1. 放在 willmount 中的异步请求，并不会阻塞react的首次render。实际上，react在 willmount 之后立即执行了 render，所以除非这时候已经数据获取完并更改了 state ，否则首次 render 的结果一样。
	  > In practice this was never true because React has always executed render immediately after componentWillMount.
	2. 添加事件绑定有可能导致内存泄露。因为 willmount 之后，并不保证 willunmount 一定执行。