### 解决的问题：
1. It’s hard to reuse stateful logic between components
	React needs a better primitive for sharing stateful logic.
2. Complex components become hard to understand
3. Classes confuse both people and machines

> Recently, we’ve been experimenting with component folding using Prepack, and we’ve seen promising early results. However, we found that class components can encourage unintentional patterns that make these optimizations fall back to a slower path. 

### how it works?
React keeps track of the currently rendering component. Thanks to the Rules of Hooks, we know that Hooks are only called from React components (or custom Hooks — which are also only called from React components).
There is an internal list of “memory cells” associated with each component. They’re just JavaScript objects where we can put some data. 

each call to a Hook has a completely isolated state — so you can even use the same custom Hook twice in one component.

#### hook的数据是在哪里保存的，如果想实现数据持久如何使用？
> There is an internal list of “memory cells” associated with each component. They’re just JavaScript objects where we can put some data.

目前react中持久数据的使用方式，比如 redux 是比较麻烦的，相当于需要进行一些配置，能不能用约定代替配置，从而提供更便宜的使用方式？

自身的context使用起来如何？是不是要比 redux 方便些？
但是可能少了些 redux 里面的清晰可追踪性。如果想达到redux的优点，就需要自己设计。


使用了hook的functional component 能不能在dev tool 里看到其 state 或者其他参数？

However, unlike this.setState in a class, updating a state variable always replaces it instead of merging it.

React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time. 

> but every time you use a custom Hook, all state and effects inside of it are fully isolated.

> The useRef() Hook isn’t just for DOM refs. The “ref” object is a generic container whose current property is mutable and can hold any value, similar to an instance property on a class.

forwardRef 是不是可以拿来做反向数据流，即从子组件向父组件提供访问接口？

> Traditionally, performance concerns around inline functions in React have been related to how passing new callbacks on each render breaks shouldComponentUpdate optimizations in child components.