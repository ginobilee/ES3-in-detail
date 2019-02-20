fiber 是什么粒度的概念，什么作用，与update的关系？

> fiber仅仅是一个对象，表征reconciliation阶段所能拆分的最小工作单元，和上图中的react instance一一对应。通过stateNode属性管理Instance自身的特性。通过child和sibling表征当前工作单元的下一个工作单元，return表示处理完成后返回结果所要合并的目标，通常指向父节点。整个结构是一个链表树。每个工作单元（fiber）执行完成后，都会查看是否还继续拥有主线程时间片，如果有继续下一个，如果没有则先处理其他高优先级事务，等主线程空闲下来继续执行。

假设没有做代码分割，那么最后文件都会被打包进一个js文件中。这个file中的执行入口，就是在index.js（或者配置的其它入口）的执行代码，只是把模块引用给提到了顶层(如果多个文件合并)。
所以最后的输出文件跟写的index.js...差不多，只是把多个文件合到了一起，执行上，就是从 ReactDOM.render 开始的。毕竟，其它地方都只是在定义 class ，这些代码，是在 ReactDOM.render 执行中，才会得到执行的。

所以 code splitting/tree shaking 等等工作，都只是在 修改最后的输出js.（这是webpack打包的详情）

ReactDOM.render的流程：
1. 	create root(
		create container 
			create Fiber root 
	)
	new ReactRoot(container, isConcurrent, shouldHydrate)
	root.render(| ReactRoot.prototype.render |)(
		new ReactWork()
		DOMRender.updateContainer() {
			scheduleRootUpdate(){
				createUpdate() {}
				flushPassiveEffects() {}
				enqueueUpdate(current, update) {}

				ReactFiberScheduler.scheduleWork(current: fiber, expirationTime) {

					scheduleWorkToRoot(fiber, expirationTime) {
						// Walk the parent path to the root and update the child expiration time.
						// return root;
					}

					requestWork(root: FiberRoot, rootExpirationTime) {
						// requestWork is called by the scheduler whenever a root receives an update.
						// It's up to the renderer to call renderRoot at some point in the future.
						
						addRootToSchedule(root, expirationTime) {}
						

						if (expirationTime === Sync) {
							performSyncWork() {
								performWork(Sync, false) {
									// Keep working on roots until there's no more work, or until there's a higherpriority event.

									performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, isYieldy: boolean) {
										isRendering = true;

										// 源码中，这里会根据 isYieldy 来判断是同步还是异步更新。如果是同步，直接执行直到结束；否则尝试执行直到时间片用完或任务执行完，如果没有执行完，给root打一个标记。

										root.finishedWork = null;

										// 执行render
										renderRoot(root, isYieldy) {
											isWorking = true;

											// create an alternate fiber to do work on.
											nextUnitOfWork = ReactFiber.createWorkInProgress(
												nextRoot.current,
												null,
												nextRenderExpirationTime,
											)

											do {
													// 什么时候workLoop会跳出，从而触发外层的do...while循环？为了异常处理。
													// 当可以接受的异常发生时，会continue继续render；但fatal error发生时或正常结束时，就break出了循环。
												workLoop(isYieldy) {
													// 根据 isYieldy 判断进行同步或异步执行

													while (nextUnitOfWork !== null) { // 当整棵树都render完之后，nextUnitOfWork为null
														nextUnitOfWork = performUnitOfWork(nextUnitOfWork) {

															// See if beginning this work spawns more work.
															let next = ReactFiberBeginWork.beginWork() { // 返回当前fiber的child
																switch (workInProgress.tag) {
																	case HostRoot:
																		return updateHostRoot() {
																			processUpdateQueue() {
																				while (update !== null) {
																					resultState = getStateFromUpdate();
																					update = update.next;
																				}
																			}
																			reconcileChildren() {
																				if (current === null) {
																					workInProgress.child = ReactChildFiber.mountChildFibers() {
																						// This API will tag the children with the side-effect of the reconciliation itself. They will be added to the side-effect list as we pass through the children and the parent.
																						switch (newChild.$$typeof) {
																							case REACT_ELEMENT_TYPE:
																								// reconcileSingleElement 会创建新节点的fiber
																								return placeSingleChild(reconcileSingleElement());
																							case REACT_PORTAL_TYPE:
																								return placeSingleChild(...);
																							case 'string' or 'number': 
																								return placeSingleChild(reconcileSingleTextNode())
																							case isArray(newChild):
																								return reconcileChildrenArray() {
																									// 如果是首次渲染，依次为每个节点创建fiber，并返回第一个fiber
																									// 如果是更新，则一次与旧节点比较，并更新sideEffect队列(是不是应该是更新updateQueue???)；最后返回首个fiber
																								}
																							//...
																						}
																					}
																				} else {
																					workInProgress.child = ReactChildFiber.reconcileChildFibers() {
																						// about the same to ReactChildFiber.mountChildFibers
																					}
																				}
																			}
																			return workInProgress.child;
																		}
																	default: 
																		return updateOrMount(...)
																}
															}
															workInProgress.memoizedProps = workInProgress.pendingProps;
															if (next === null) { // 返回当前fiber的sibling或父节点
																// If this doesn't spawn new work, complete the current work.
																next = completeUnitOfWork(workInProgress) {
																	// completeUnitOfWork 中，会 1. 创建当前节点的stateNode, 2. 会将当前节点的子节点的 stateNode (也就是对应的dom元素)，插入到当前节点的 stateNode 中。3. 将其子节点的 effect和自己的 effect 都放入父节点的 effect list中。

																	while (true) {
																		const current = workInProgress.alternate;

																		const returnFiber = workInProgress.return;
																		const siblingFiber = workInProgress.sibling;

																		// 1. 执行 stateNode 的更新
																		nextUnitOfWork = completeWork(
																		  current,
																		  workInProgress,
																		  nextRenderExpirationTime,
																		); // 这里做了什么？如果是首次渲染，创建了dom节点，保存在对应fiber 的stateNode 中。
																		// 如果不是考虑到react中的 setState, 那么完全可以直接通过jsx构建节点就可以了
																		// 但为了在更新时能够执行比较和定点更新，这里为每个element都绑定了updater
																		// 为了实现可打断的更新，创建了fiber。
																		// 实际上，beginWork/completeUnitOfWork/completeWork 三者构成了进行节点构建/比较的过程。这里实现的就是 vdom 算法。
																		// 首次渲染时，开始节点进入 beginWork ，创建其子节点的fiber
																		// 当到了叶子结点，执行此叶子结点的 completeUnitOfWork。此时会(1. 执行 completeWork，实时更新其 stateNode), 2. 并将effect 更新入parent中
																		// 3. 然后进入其 sibling ，同样直到叶子结点，执行 completeUnitOfWork/completeWork
																		// 若叶子结点同时是末结点，则会返回到父节点，执行 completeUnitOfWork/completeWork
																		// 如此循环，从跟节点到叶子结点，执行 beginWork; 再依次返回，执行 completeUnitOfWork/completeWork

																		// 2. 设置 sideEffect. 
																		// 源码中注释: Append all the effects of the subtree and this fiber onto the effect
														        // list of the parent. The completion order of the children affects the
														        // side-effect order.

														        // 这里的注释其实是为下面两段写的。第一段是: Append the effects of the subtree onto the effect list of the parent.
														        // 第二段是: Append the effects  this fiber onto the effect list of the parent.
														        // 关键点就是: workInProgress.firstEffect 和 workInProgress.lastEffect 存储的是其 subtree 的sideEffect
														        // 而 workInProgress 就是当前fiber 的sideEffect (只有当 workInProgress.effectTag> PerformedWork 时才需要更新)

																		// ???question: 叶子结点的 workInProgress.sideEffect 在哪里设置？
																		// answer: 所有fiber 上有一个 effectTag 属性，当它 > PerformedWork 时，就表示这个结点是有 sideEffect 的。这个 fiber 本身就是父节点需要跟踪的 sideEffect。设置 `returnNode.lastEffect = workInProgress` 就可以了。
																		// ???question: 那么结点的 effectTag 是在哪里设置的？
																		// 先去 beginWork 中找。在 update...Component 中有 `workInProgress.effectTag |= PerformedWork`
																		// 在 updateClassComponent 中，当新建时，有 `workInProgress.effectTag |= Placement`; 当更新时，有 `workInProgress.effectTag |= Update`
																		// 再去 completeWork 中找
																		// 在首次加载时应该是0，但更新时就会有变化

																		// 3. 设置 nextUnitOfWork
																		if (nextUnitOfWork !== null) {
																			// Completing this fiber spawned new work. Work on that next.
																			return nextUnitOfWork;
																		}

																		if (siblingFiber !== null) {
																			// If there is more work to do in this returnFiber, do that next.
																			return siblingFiber;
																		} else if (returnFiber !== null) {
																			// If there's no more work in this returnFiber. Complete the returnFiber.
																			workInProgress = returnFiber;
																			continue;
																		} else {
																			// We've reached the root.
																			return null;
																		}
																	}
																}
															}
															return next;
														}
													}
												}
											} while (true);

											// Ready to commit.
											onComplete(root, rootWorkInProgress, expirationTime) {}
										}

										finishedWork = root.finishedWork;
										if (finishedWork !== null) {
											// We've completed the root. Commit it.
											//执行commit
											// 在首次渲染时，实际上这里只是将跟节点添加入页面，根节点的子节点已经添加好了。
											completeRoot(root, finishedWork, expirationTime) {
												commitRoot(root: FiberRoot, finishedWork: Fiber) {
													prepareForCommit(root.containerInfo);

													// Invoke instances of getSnapshotBeforeUpdate before mutation.
													nextEffect = firstEffect;
													while (nextEffect !== null) {
														commitBeforeMutationLifecycles();
													}

													// Commit all the side-effects within a tree. We'll do this in two passes.
													// The first pass performs all the host insertions, updates, deletions and
													// ref unmounts.
													nextEffect = firstEffect;
													while (nextEffect !== null) {// 所以到了最后，所有的 sideEffect 都被放到了 root下，然后只要执行root的所有 sideEffect 就可以了？
														commitAllHostEffects() {
															while (nextEffect !== null) {
																recordEffect();

																const effectTag = nextEffect.effectTag;

																if (effectTag & ContentReset) {
																	commitResetTextContent(nextEffect);
																}

																if (effectTag & Ref) {
																	const current = nextEffect.alternate;
																	if (current !== null) {
																		commitDetachRef(current);
																	}
																}

																// The following switch statement is only concerned about placement,
																// updates, and deletions. To avoid needing to add a case for every
																// possible bitmap value, we remove the secondary effects from the
																// effect tag and switch on that value.
																let primaryEffectTag = effectTag & (Placement | Update | Deletion);
																switch (primaryEffectTag) {
																	case Placement: {
																		ReactFiberCommitWork.commitPlacement(nextEffect);
																		// Clear the "placement" from effect tag so that we know that this is inserted, before
																		// any life-cycles like componentDidMount gets called.
																		// TODO: findDOMNode doesn't rely on this any more but isMounted
																		// does and isMounted is deprecated anyway so we should be able
																		// to kill this.
																		nextEffect.effectTag &= ~Placement;
																		break;
																	}
																	case PlacementAndUpdate: {
																		// Placement
																		ReactFiberCommitWork.commitPlacement(nextEffect);
																		// Clear the "placement" from effect tag so that we know that this is inserted, before
																		// any life-cycles like componentDidMount gets called.
																		nextEffect.effectTag &= ~Placement;

																		// Update
																		const current = nextEffect.alternate;
																		commitWork(current, nextEffect);
																		break;
																	}
																	case Update: {
																		const current = nextEffect.alternate;
																		commitWork(current, nextEffect);
																		break;
																	}
																	case Deletion: {
																		commitDeletion(nextEffect);
																		break;
																	}
																}

																nextEffect = nextEffect.nextEffect;
															}
														}
													}

													resetAfterCommit(root.containerInfo);

													nextEffect = firstEffect;
													while (nextEffect !== null) {
														ReactFiberCommitWork.commitAllLifeCycles(root, committedExpirationTime);
													}

													onCommit(root, earliestRemainingTimeAfterCommit);
												}
											}
										}

										isRendering = false;
									}
									
									// We're done flushing work. Either we ran out of time in this callback,or there's no more work left with sufficient priority.

									// Clean-up.
									finishRendering();
								}
							}
						} else {
							scheduleCallbackWithExpirationTime(root, expirationTime);
						}

					}
				}
			}
		}
		DOMRender.getPublicRootInstance(){}
	)


beginWork 和 completeWork 的详细流程

简述下流程：
1. 调用ReactDOM.render。它去判断是否有ReactRoot对象，如果没有，创建一个 root = new ReactRoot()；
2. root.render。判断是进行同步还是异步的更新，如果是首次加载，是同步进行；否则一般都是异步(都有哪些点触发异步更新？)
3. 以jsx的节点结构遍历更新。每个节点的更新被封装在函数 performUnitOfWork 中进行。这个函数执行了下述操作
		a. beginWork. 
				执行当前fiber的比较(update 时执行)，child fiber的创建(optional，首次mount时执行)；将变更放在当前fiber的updateQueue 中(首次mount 时创建子fiber是否也作为update 储存？)；返回当前fiber的首个子节点，如果没有返回null

				当 workInProgress 为 Class 时执行 updateClassComponent
				updateClassComponent() {
					constructClassInstance 根据class 声明创建一个实例，并将这个实例绑定在fiber: workInProgress 上
					mountClassInstance 调用了class 定义中的生命周期函数，更新state
					finishClassComponent() {
						// finishClassComponent 调用自定义class中的render方法。而在 webpack 打包时，会把render中的jsx转变为 React.createElement(object) 格式的调用，所以，render方法就会直接执行到 React.createElement 处。
						reconcileChildren() {
							if (current$$1 === null) {
					        // If this is a fresh new component that hasn't been rendered yet, we
					        // won't update its child set by applying minimal side-effects. Instead,
					        // we will add them all to the child before it gets rendered. That means
					        // we can optimize this reconciliation pass by not tracking side-effects.
					        workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
					      } else {
					        // If the current child is the same as the work in progress, it means that
					        // we haven't yet started any work on these children. Therefore, we use
					        // the clone algorithm to create a copy of all the current children.
					        // If we had any progressed work already, that is invalid at this point so
					        // let's throw it out.
					        workInProgress.child = reconcileChildFibers(workInProgress, current$$1.child, nextChildren, renderExpirationTime) {
					        	// 为子元素建立 fiber
					        }
					      }
						}	
					}

					实际上在调用 createElementWithValidation 方法生成 ReactElement 的时候，是先生成 span 和 p 的元素，后生成 div的，why？是不是去看 webpack 打包后的代码可以得知缘由？
				}

		b. 如果a 步骤中返回null，执行completeUnitOfWork(作用: 1. 执行completeWork，2. 将 updateQueue 收集为 sideEffects 放在当前fiber上, 3. 设置 nextUnitOfWork). 它有如下步骤：
				b1. 执行 completeWork 。它的作用是(实时更新其 stateNode, )
				```
				// Append all the effects of the subtree and this fiber onto the effect
        // list of the parent. The completion order of the children affects the
        // side-effect order.
        ```
				b2. 如果 b1中又有了新的子节点，则返回之(什么时候会发生这种情况？？)
				b3. 如果当前节点有sibling，返回之
				b4. 如果当前节点父节点returnFiber 非空，将当前节点切换为 returnFiber, 继续到b1步骤
				b5. 如果returnFiber 为空(说明已经到了root)，返回null

4. 步骤3中 performUnitOfWork 返回的节点如果不是null，会循环执行，所以3的流程被封装在一个叫workLoop 的函数内。
5. 到此时，所有的render操作已经执行完(// We completed the whole tree. 或抛出了 fatalError)，也就是执行完了 vdom 的创建/更新 操作。开始进入commit阶段。
6. 调用 completeRoot。这里开始将变更更新到真正的 dom 中。变更的执行是对照 sideEffect 来进行的。所以提交时，也是分步进行提交的。但在步骤 3b 中，所有的sideEffect 其实是按照 子节点的 sideEffect 在前，父节点在后的顺序放置的。所以从道理上讲，也相当于是先 build 成了一颗 fragment，然后更新进页面的容器节点中。(这里还需要进行详细跟踪)


整棵树complete之后 completeUnitOfWork 的流程走读: 
此时有 
root.nextScheduledRoot === root
root.current.alternate === root.finishedWork
firstBatch === null

commitRoot() {
  // 将当前 finishedWork 添加到effect 链表中。
	if (finishedWork.effectTag > PerformedWork) {
    // A fiber's effect list consists only of its children, not itself. So if
    // the root has an effect, we need to add it to the end of the list. The
    // resulting list is the set that would belong to the root's parent, if
    // it had one; that is, all the effects in the tree including the root.
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // There is no effect on the root.
    firstEffect = finishedWork.firstEffect;
  }
}

questions: 
01. 在renderRoot 中，为何搞了两个while循环？ √
		外层的while 是为了处理异常。当render 中出现了 fatalError,就会跳出剩余流程；只有出现了非fatal 的异常时，才会继续；在没有异常时，直接结束。
		内层的while 就是为了将renderRoot 的过程拆成一个个节点的顺序进行。每次render 一个节点返回其子节点/兄弟节点/父节点，直到返回root，这是整棵树都render 结束了。

02. 用调试的方式跟踪 beginWork 和 compoleteUnitOfWork 的执行。设定特定的jsx，首先设置一个比较简单的: 
    ```
    	<div>
        <span>1</span>
        <p>2</p>
      </div>
    ```

    然后设置一个复杂一些的: 
    ```
    <Parent>
    	<p>1</p>
    	<p>2</p>
    </Paren>
    <div>
    	<span >span 1</span>
    	<span>span 2</span>
    </div>
    ```
		关注的重点问题是: 
			1. update 在什么时候更新？是不是在beginWork 时放入 updateQueue? 放入后是不是在 completeUnitOfWork 中进行了计算并设置 sideEffect?
			在首次渲染时，好像并没有这些流程。例如在  中的注释: 
			```
			// If this is a fresh new component that hasn't been rendered yet, we
		        // won't update its child set by applying minimal side-effects. Instead,
		        // we will add them all to the child before it gets rendered. That means
		        // we can optimize this reconciliation pass by not tracking side-effects.
		  ```
		  2. 再次走读首次渲染时代码发现，节点在执行commit时，有两个 effect, 一个是 跟节点 App 的，一个是 root 的；前者是一个 插入(3， Placement + PerformedWork[专为 ReactDevTool 使用]) 事件，执行完后就将节点插入了页面；后者是一个 32 它的值是什么意思？（Callback)


03. 在renderRoot 中，ReactRoot 的 performUnitOfWork 会执行 reconcileChildFibers, 其子元素也会执行，会不会重复？√
		
		应该不会。每次只reconcile到其子元素，不对更深层的元素做处理。

04. 在对整棵树执行 beginWork 完毕时，在 root 对应的 fiber 上，updateQueue 和 firstEffect/lastEffect 有如下：
		workInProgress.updateQueue.firstEffect === workInProgress.updateQueue.lastEffect
		workInProgress.updateQueue.firstUpdate === orkInProgress.updateQueue.lastUpdate === null
		workInProgress.firstEffect 										 对应的是 App 元素的fiberNode(FiberNode 类型)
		workInProgress.updateQueue.firstEffect.payload 对应的是 App 元素节点(ReactElement 类型)

05. fiber 与 FiberNode 有区别么？√
		应该是一样的。

06. 在 commitPlacement 中有如下注释: √
		```
		// We only have the top Fiber that was inserted but we need recurse down its
  	// children to find all the terminal nodes.
  	```
  	1. 所以 top fiber对应的节点是什么时候插入的？
  			这里说的top fiber应该是指 root，因为页面还没有插入任何用户定义的节点，仍然只有 <div id='root'></div>

	  	commitPlacement 的逻辑是:
	  		a. 通过 getHostParentFiber(finishedWork) 确定父节点
	  		b. 开始循环:
	  				b1. 判断节点类型: 
	  						b11. 如果当前节点是宿主节点比如span那么直接将其插入父节点
	  						b12. 否则如果是 HostPortal 那么不做处理
	  						b13. 否则如果如果有子节点，将 `node = node.child; continue`
	  				b2. 如果 node === finishedWork (到了当前处理的节点), return
	  				b3. 循环(如果没有 sibling):
	  						b31. 如果父节点为空或就是 finishedWork ，那么return
	  						b32. 否则 node = node.return
						b4. node = node.sibling

		2. 在 commitAllHostEffects 中，确实是通过 effect 来进行更新dom的。但不是以一个一个插入的方式。在更新时，App 的子节点 div对应的节点上，其 stateNode 上已经有了children(dom 格式)。什么时候加入的？√
				猜测是在 completeUnitOfWork 中添加的。√
				在 completeWork 中，有 _appendAllChildren(instance, workInProgress, false, false)。它会把workInProgress 的child 的 stateNode 添加入 instance(等同于 instance.appendChild(workInProgress.child.stateNode))

				那么对于叶子结点的span，和父节点div，这两者里的差别是什么？
				对于叶子结点，这里应该是没用的。不会产生任何效果。因为node.child 为null。

				**所以 completeUnitOfWork 中，会创建(子节点还是当前节点?)的stateNode, 会将当前节点的子节点的 stateNode (也就是对应的dom元素)，插入到当前节点的 stateNode 中。
				在其中还做了另外一件事，就是将其子节点的 effect和自己的 effect 都放入父节点的 effect list中。**

				completeUnitOfWork() {
					completeWork() {
						case HostRoot: {
							updateHostContainer(workInProgress) {
								let newChildSet = createContainerChildSet(container);
					      // If children might have changed, we have to add them all to the set.
					      appendAllChildrenToContainer(newChildSet, workInProgress, false, false);
					      portalOrRoot.pendingChildren = newChildSet;
					      // Schedule an update on the container to swap out the container.
					      markUpdate(workInProgress);
					      finalizeContainerChildren(container, newChildSet);
							}
						}
						case HostComponent: {
							let instance = createInstance(
	            type,
	            newProps,
	            rootContainerInstance,
	            currentHostContext,
	            workInProgress,
	          );

						// 将 workInProgress.child.stateNode 添加入 instance
	          appendAllChildren(instance, workInProgress, false, false);

	          workInProgress.stateNode = instance;
						}
					}

					//  Append all the effects of the subtree and this fiber onto the effect
	        // list of the parent. The completion order of the children affects the
	        // side-effect order.
	        ...updateEffect
				}

		3. 

07. stateNode 准确的描述是什么？






1. 没注意到生命周期函数的调用在哪里，应该是在 commitRoot 执行的? √
		是的. commitBeforeMutationLifecycles/commitAllHostEffects/commitAllLifeCycles

2. js 还支持以 constructor = App; var app = new constructor(); 的语法实例化 App 么？在js中是这样实例化 classComponent 的么？functional 组件呢？√
		是的。在 react 中也是这样创建的，代码如下: 

		```
		// constructClassInstance in ReactFiberClassComponent.js (class component)
		const instance = new ctor(props, context);
		```

		```
		// updateFunctionComponent in ReactFiberBeginWork.js (functional component)
		nextChildren = Component(nextProps, context);
		```

3. 父子component的 componentDidMount ，谁会先发生？√
		应该是子先发生。willMount是父先发生

4. 什么时候把自定义class的jsx，转化为对象结构？怎么触发？√
		在文件进行编辑时就发生了。以 create-react-app 为例，是通过配置babel插件，在webpack打包时就已经将 jsx 转译为了 object.

5. 开始走读更新时的代码: 
		5.1 都有哪些地方会设置批量更新？
				batchedUpdates flushSync interactiveUpdates(dispatchInteractiveEvent) flushControlled

				所有的element 调用的updater 是同一个对象:
				```
				var classComponentUpdater = {
			      isMounted: isMounted,
			      enqueueSetState,
			      enqueueReplaceState,
			      enqueueForceUpdate,
			    }
				```

				当使用 click 事件触发更新时，可以看到它是一个 interactive update.

				getStateFromUpdate 负责执行更新 state 操作

				checkShouldComponentUpdate 中使用 shouldComponentUpdate 以及 isPureReactComponent + shallowEqual 比较了是否需要更新:
				```
				function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
			      var instance = workInProgress.stateNode;

			      if (typeof instance.shouldComponentUpdate === 'function') {
			        startPhaseTimer(workInProgress, 'shouldComponentUpdate');
			        var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
			        stopPhaseTimer();
			        {
			          !(shouldUpdate !== undefined) ? warningWithoutStack$1(false, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(ctor) || 'Component') : void 0;
			        }
			        return shouldUpdate;
			      }

			      if (ctor.prototype && ctor.prototype.isPureReactComponent) {
			        return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
			      }

			      return true;
			    }
				```

				当 class component 需要更新时，会在 updateClassComponent 内先调用 updateClassInstance 更新实例，然后调用 finishClassComponent 来执行 render 过程。

6. react 某一个更新优先级 是如何确定的，某一个 reconcile 的时间，是如何确定的？
	来源于 root.nextExpirationTimeToWorkOn。
	在更新时，会首先执行完用户回调，进入updateQueue 的执行时，会是以 Sync 模式进行的。这个 Sync 是等于js中最大的整数的值的。

	首次加载的时候同样如此。那么对于某一个 reconcile，会有一个指定的时间作为 expiration time 么？

	那么 react fiber 与之前的差别在哪里？在于每个 fiber 执行完后会停一下么？

	react 想要达到的 async 渲染到底是什么样的，跟现在有什么区别？

	react 在 fiber 之前是一次性地进行 reconcile, 在整棵树 reconcile完之后，将收集的 side effect 更新到dom 上；在fiber 后，是可间歇性进行 reconcile，后面流程不变。那么如果变成每次收集完一个节点的 side effect 之后就更新呢？比如叶子结点总是最先收集完，这时就直接提交到 dom，而不等到根节点收集完。会不会效率更高，有什么弊病？
	这样处理的话，如果是结点更新应该没有问题。如果是结点替换呢？应该放在父节点上作。但父节点也可以把这个做完，没有问题。

7. react 在更新时是如何复用之前的fiber node 的，总不会每次都新建吧？是每次 reconcile 之后，将alternate 清空，下次以 current 作为当前，再重新 build alternate 么？
	每次 reconcile 之后，不会将 alternate 清空。在复用之前fiber node时，就是通过在 current.alternate 上修改了一些属性后当作新的 workInProgress 的。这样就不会在更新时新建 fibernode . 然后当前的 current 又是通过父节点的 child 来获取的。

	在函数 createWorkInProgress 中有: `var workInProgress = current.alternate;`
	current 和 current.alternate 上都有一个 alternate 属性，分别指向对方。
	如果当前节点 workInProgress 不需要更新，但是其子节点需要更新，就会通过 workInProgress.child 创建一个新的子节点。调用 createWorkInProgress(workInProgress.child) 来创建子节点的 workInProgress。那么可以相信 此时 current 和 alternate的child，是同一个fiber node，所以调用 createWorkInProgress(workInProgress.child) 或者 createWorkInProgress(current.child) 应该是同一个效果。√
	但是调用后生成的新的子节点的 fiberNode，就不同于了之前的node。即在 createWorkInProgress(workInProgress.child) 前，有 workInProgress.child === current.child；调用后，两者不再相等，而是互为 alternate，即 `workInProgress.child === current$$1.child.alternate`

	7.0 那么root 是怎么复用的？
		performWork -> findHighestPriorityRoot
		其中的 root 又是来自于 lastScheduledRoot，它又是在 addRootToSchedule 中设定的
		requestWork -> addRootToSchedule
		commitPassiveEffects 和 scheduleWork 中都调用了 requestWork
		比如 classComponentUpdater.enqueueSetState 中又调用了 scheduleWork

	7.1 fibernode 的type 和 elementType 什么时候不一致？

update 流程:
执行完 updateQueue 之后，开始进入 performWorkOnRoot -> renderRoot 的流程，这时还是从 ReactRoot 开始，在 workLoop 中分步执行每个 unit。

performUnitOfWork(workInProgress = ReactRoot) {
	// 这时 workInProgress 上的 alternate 是存在的
}

7. react为什么要将ref的api更改成这个样子？


确实，将数据放在 this/state/props 有什么区别？
使用this.data/setState/props.data 更新某个节点的数据，分别有什么区别？
只要用户没有调用setState(显示或以回调的方式)，就不会执行render 过程。这时就算节点的数据发生了变更，也不会同步到view上。所以要走读更新的代码，就要跟踪两个问题: 1. react 什么时候会走到update流程？2. setState 之后发生了什么？


ref:
react生命周期: http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/