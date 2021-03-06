event loop

<blockquote>
7.1.4.2. Processing model

An event loop must continually run through the following steps for as long as it exists:
 
1. Select the oldest task on one of the event loop’s task queues, if any, (ignoring, in the case of a browsing context event loop, tasks whose associated Documents are not fully active). The user agent may pick any task queue. If there is no task to select, then jump to the Microtasks step below.

	在该事件循环中寻找最早的task(可能来源于任意一个task队列。如果是浏览环境(***注1***)，忽略非active状态的Documents中的task)，如果没有，跳转到下面的Microtasks步。
2. Set the event loop’s currently running task to the task selected in the previous step.

	将该task设置为当前正在执行的task(crt)

3. Run: Run the selected task.

	执行该task

4. Set the event loop’s currently running task back to null.

	将crt设置为null

5. Remove the task that was run in the Run step above from its task queue.
	
	将该task从其task队列中移除

6. Microtasks: Perform a microtask checkpoint.
	
	执行微任务检查点

7. Update the rendering: If this event loop is a browsing context event loop (as opposed to a Worker event loop), then run the following substeps.
	
	更新渲染视图：如果是在浏览环境(而非worker环境)，执行下列分步骤：

	7.1 Let now be the value that would be returned by the Performance object’s now() method.  [HR-TIME-2]
	
	将now设置为Performance对象的now()方法将返回的时间点

	7.2 Let docs be the list of Document objects associated with the event loop in question, sorted arbitrarily except that the following conditions must be met:
	
	设置docs为当前event loop相关的所有Document对象的列表，可以为任意顺序但需满足以下要求:


		a. Any Document B that is nested through a Document A must be listed after A in the list.
		被Document A嵌套的任意Document B必须在A之后

		b. If there are two documents A and B whose browsing contexts are both nested browsing contexts and their browsing context containers are both elements in the same Document C, then the order of A and B in the list must match the relative tree order of their respective browsing context containers in C.
		如果两个Document A and B的浏览环境是同一个Document C的浏览环境下的某个节点的嵌套环境，则A and B在列表中的顺序应该与它们在C中的顺序保持一致

		In the steps below that iterate over docs, each Document must be processed in the order it is found in the list.
		在下面的步骤中，docs中的每个元素都应该以其所处位置顺序执行

	
	7.3 If there is a top-level browsing context B that the user agent believes would not benefit from having its rendering updated at this time, then remove from docs all Document objects whose browsing context’s top-level browsing context is B.

	如果ua(浏览器)认为某个顶级浏览环境B，不需要在当前时间点执行重新渲染，则将所有以其为顶级浏览环境的Document都移出列表

	Note:
	There are many factors that affect the ideal update frequency for the top-level browsing context including performance, power, background operation, quality of user experience, refresh rate of display(s), etc. When in foreground and not constrained by resources (i.e. performance, battery versus mains power, other resource limits), the user agent normally prioritizes for maximum quality of user experience for that set of Documents by matching update frequency and animation frame callback rate to the current refresh rate of the current display (usually 60Hz, but refresh rate may be higher or lower). When accommodating constraints on resources, the update frequency might automatically run at a lower rate. Also, if a top-level browsing context is in the background, the user agent might decide to drop that page to a much slower 4Hz, or even less.

	注意：
	有许多因素都会影响顶级浏览环境的理想刷新频率，比如性能，power，后台操作，用户体验质量，显示器更新频率等等。当页面处于前台且不受资源(如性能，电池等其它资源)所限，ua通常会以当前显示器的刷新频率来执行刷新和动画帧的回调，以达到最佳的用户体验。但当受资源限制时，更新频率通常会自动降低。同样，当一个顶级浏览环境处于后台，ua可能会将其更新降低至4Hz或更低。

	Note:
	Another example of why a browser might skip updating the rendering is to ensure certain tasks are executed immediately after each other, with only microtask checkpoints interleaved (and without, e.g., animation frame callbacks interleaved). For example, a user agent might wish to coalesce callbacks together, with no intermediate rendering updates. However, when are no constraints on resources, there must not be an arbitrary permanent user agent limit on the update rate and animation frame callback rate (i.e., high refresh rate displays and/or low latency applications).

	注意：
	另外一个浏览器可能忽略掉渲染的场景时为了确保某些tasks能被无间断执行，其间只有微任务被执行(可能跳过了动画帧的回调)。例如，ua可能想要将回调合并在一起，中间没有渲染刷新。无论如何，当资源不受限制时，ua不应该有一个永久的最高或最低刷新频率界限。

	7.4 If there are a nested browsing contexts B that the user agent believes would not benefit from having their rendering updated at this time, then remove from docs all Document objects whose browsing context is in B.

	如果ua认为某个非顶级浏览环境B此时不需要刷新，将其所有子浏览环境从docs中移除。

	Note:
	As with top-level browsing contexts, a variety of factors can influence whether it is profitable for a browser to update the rendering of nested browsing contexts. For example, a user agent might wish to spend less resources rendering third-party content, especially if it is not currently visible to the user or if resources are constrained. In such cases, the browser could decide to update the rendering for such content infrequently or never.

	对于顶级浏览环境而言，有许多因素影响浏览器决定是否需要刷新其子环境。例如，ua可能希望在渲染第三方内容上投入较少的资源，尤其是当其在可视范围外或资源有限。这种情况下，浏览器可能会以极低的频率渲染这些内容，甚至永远不渲染。

	7.5 For each fully active Document in docs, run the resize steps for that Document, passing in now as the timestamp. [CSSOM-VIEW]

	遍历docs中有效的Document，执行resize操作，时间戳为now。[CSSOM构建]

	7.6 For each fully active Document in docs, run the scroll steps for that Document, passing in now as the timestamp. [CSSOM-VIEW]

	遍历docs中有效的Document，执行scroll操作，时间戳为now。[CSSOM构建]

	7.7 For each fully active Document in docs, evaluate media queries and report changes for that Document, passing in now as the timestamp. [CSSOM-VIEW]

	遍历docs中有效的Document，执行媒体查询并报告变化，时间戳为now。[CSSOM构建]

	7.8 For each fully active Document in docs, run CSS animations and send events for that Document, passing in now as the timestamp. [CSS3-ANIMATIONS]

	遍历docs中有效的Document，执行css动画并发送事件，时间戳为now。[CSSOM构建]

	7.9 For each fully active Document in docs, run the fullscreen rendering steps for that Document, passing in now as the timestamp. [FULLSCREEN]

	遍历docs中有效的Document，执行全屏渲染，时间戳为now。[CSSOM构建]


	7.10 For each fully active Document in docs, run the animation frame callbacks for that Document, passing in now as the timestamp.

	遍历docs中有效的Document，执行动画帧回调(***注2***)，时间戳为now。[CSSOM构建]

	7.11 For each fully active Document in docs, update the rendering or user interface of that Document and its browsing context to reflect the current state.
	
	遍历docs中有效的Document，根据其当前状态，更新这个Document及其浏览环境的渲染或ui

8. If this is a Worker event loop (i.e., one running for a WorkerGlobalScope), but there are no tasks in the event loop’s task queues and the WorkerGlobalScope object’s closing flag is true, then destroy the event loop, aborting these steps, resuming the run a worker steps.

	如果是Worker的event loop，但是其task队列中无任务了，且WorkerGlobalScope对象的closing标志是true，则销毁此event loop，跳出循环，恢复run a worker操作。

9. Return to the first step of the event loop.

	返回当前event loop的第一步。
</blockquote>


注释: 
1. browsing contexts是什么？

<blockquote>
A browsing context is an environment in which Document objects are presented to the user.

> Note:
> 
> A tab or window in a Web browser typically contains a browsing context, as does an iframe or frames in a frameset.

A browsing context has a corresponding WindowProxy object.

A browsing context has a session history, which lists the Document objects that the browsing context has presented, is presenting, or will present. At any time, one Document in each browsing context is designated the active document. A Document's browsing context is that browsing context whose session history contains the Document, if any. (A Document created using an API such as createDocument() has no browsing context.) Each Document in a browsing context is associated with a Window object.
</blockquote>

2. 即通过requestAnimationFrame设置的回调。见html规范7.9. Animation Frames中。

3. what's WindowProxy?
   
	A WindowProxy is an exotic object that wraps a Window ordinary object, indirecting most operations through to the wrapped object. Each browsing context has an associated WindowProxy object. **When the browsing context is navigated, the Window object wrapped by the browsing context’s associated WindowProxy object is changed.**

	Every WindowProxy object has a [[Window]] internal slot representing the wrapped Window object.

【ref】: 

https://www.w3.org/TR/html52/webappapis.html#event-loops-processing-model

https://www.w3.org/TR/html52/browsers.html#browsing-context