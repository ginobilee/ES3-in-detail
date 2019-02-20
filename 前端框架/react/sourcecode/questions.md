questions: 

0. 能不能让react不在有state变化时从root开始比较，而是从发生setState的节点开始向下？
1. expirationTime 到底是怎么发挥作用的？
2. react的jsx到底是怎么发挥作用的？
	在我使用react时，都是使用了fb的create-react-app脚手架。这个脚手架已经集成了babel来进行jsx的语法编译。可以看到，在build之后的文件中，已经是React.createElement语法表示的对象了。

2.0 working-in-progress和current到底是分别指什么？
3. 首次加载时，用innerhtml还是fragment效率更高？
4. dom节点如何生成？
	通过createInstance生成，会放在对应fiber的stateNode属性上。
	在completeUnitOfWork中，完结当前fiber。如果当前fiber还有sibling,则返回其sibling；否则如果有父节点，则继续对父节点进行complete。
5. 如何在update phase获取到节点对应的fiber？
	`var fiber = get(inst)`

	<blockquote>
		function get(key) {
	      return key._reactInternalFiber;
	    }
	</blockquote>

当某节点没有更新，但是其子节点有时，会在bailoutOnAlreadyFinishedWork中执行: 
<blockquote>
	// This fiber doesn't have work, but its subtree does. Clone the child
    // fibers and continue.
    cloneChildFibers(current$$1, workInProgress);
    return workInProgress.child;
</blockquote>

6. 什么时候进行比较的？




updateQueue的更新逻辑:
queue有一个baseState/resultState/firstUpdate/lastUpdate




mounting phase:
1. createRoot
	legacyRenderSubtreeIntoContainer
		legacyCreateRootFromDOMContainer
	
2. createVirtualNodes
	legacyRenderSubtreeIntoContainer
		unbatchedUpdates
			root.render
				updateContainer
					updateContainerAtExpirationTime
3. createInstances
						scheduleRootUpdate
							scheduleWork
								requestWork
									performSyncWork
										performWorkOnRoot
											renderRoot

4. applyInstances
											completeRoot
												commitRoot
														commitAllHostEffects
															commitPlacement
																getHostSibling
																appendChildToContainer


update phase:
1. 如何

reconcileChildFibers中写道： 
<blockquote>
	// Handle top level unkeyed fragments as if they were arrays.
    // This leads to an ambiguity between <>{[...]}</> and <>...</>.
    // We treat the ambiguous cases above the same.
</blockquote>
所以对于fragment，最好给一个key？

<blockquote>
	Both the updater field and the __currentDispatcher object are forms of a generic programming principle called dependency injection. In both cases, the renderers “inject” implementations of features like setState into the generic React package to keep your components more declarative.
</blockquote>

简写下到现在了解的流程：
ReactDOM.render
renderSubtreeIntoRoot
createRoot
updateRoot
performWork
performWorkOnRoot
renderRoot(){
	do(
		workloop()
	)while(true)
}

workloop(isYieldy) {
	performUnitOfWork()
}

performSyncWork

beginWork() {
	updateHostComponent
	updateClassComponent
}
