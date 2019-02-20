
> 
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.

 # forceUpdate

 >  This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.

 # functional setState

`setState`可以接受一个函数，这个函数会被注入当前的state作为参数。使用这种方式去更新state,可以将更新函数完全抽取出来放在对应的component或class之外。这样做的优点：
1. 代码复用。很多更新其实是一样的逻辑
2. 方便更新测试。
3. 可以在更新函数1中返回真正的更新函数2，这样1就可以接受更多的参数。excellent!

其实这是一种redux式的操作。只是将操作对象从redux的store变成了component的state。



enqueueSetState
	scheduleWork
		scheduleWorkToRoot
		addRootToSchedule

		renderRoot
		createWorkInProgress
		performUnitOfWork

		workloop循环遍历当前树，查看有无pending change

		commit root


setState的流程: 
	从root遍历节点树，判断每个节点是否有更新。有的话记录，最后更新。