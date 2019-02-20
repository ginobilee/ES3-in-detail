questions: 
1. 连续触发两个点击事件，前一个的回调处理时间很长，后一个是如何得到记录的？(在处理前一个点击中触发第二次点击，react能够响应，如何实现的？)
2. react 将事件挂载在哪个元素下？(这个是不是要看mount的过程？)



mount
	completeWork(HostComponent)
		finalizeInitialChildren
			setInitialProperties
				trapBubbledEvent

触发事件的入口是 dispatchInteractiveEvent ，那么这个函数又是如何调起的？

在事件中的 setState 会在等到所有的用户回调(事件回调)执行完，才去执行。所以如果回调中抛了异常，应该是不会执行 setState 的。

对于在元素上声明的 onClick ，有没有进行封装呢？还是语法分析后挂载事件？

React 将事件进行了自己的包装，首先截获事件(还没搞清楚是怎么截获的)；然后对事件进行包装，依次调用自己包装的事件执行流。中间如果有 setState 调用，将其放到 updateBatch 中。在执行完事件流后 再执行 updateBatch。

为什么要把函数调用进行一层层的包装？比如事件回调的入口 dispatchInteractiveEvent 就是调用了 interactiveUpdates，为什么不直接调用而是用 interactiveUpdates 包装呢？
就是因为要在执行 批量更新策略， 要在执行完事件的回调后再去 批量更新。代码如下：

function interactiveUpdates$1(fn, a, b) {
  if (isBatchingInteractiveUpdates) {
    return fn(a, b);
  }
  // If there are any pending interactive updates, synchronously flush them.
  // This needs to happen before we read any handlers, because the effect of
  // the previous event may influence which handlers are called during
  // this event.
  if (!isBatchingUpdates && !isRendering && lowestPriorityPendingInteractiveExpirationTime !== NoWork) {
    // Synchronously flush pending interactive updates.
    performWork(lowestPriorityPendingInteractiveExpirationTime, null);
    lowestPriorityPendingInteractiveExpirationTime = NoWork;
  }
  var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingInteractiveUpdates = true;
  isBatchingUpdates = true;
  try {
    return fn(a, b);
  } finally {
    isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}


在 componentDidMount 生命周期方法中更改已经声明的事件回调(非事件回调是否会有同样的问题？)并不会在事件第一次被触发时调起被改变的回调，而是在第二次(也许不是第二次)才会调起正确的回调。
这大概是因为 react 把事件回调写在 dom 的属性里，而在 didmount 更改后并没有更改此事件。
嗯，但这并不是一个bug。因为在 render 之后，所有 react 中的更新都要执行 setState 之后才能输出。

class App extends React.Component {
  state = { search: "" }

  componentDidMount() {
    this.handleChange = () => {
      console.log("changed")
    }
    console.log(this)
    this.setState({})
  }
  // @readonly
  handleChange = event => {
    /**
     * 这是“防抖”函数的简单实现，它会以队列的方式在 250 ms 内调用
     * 表达式并取消所有挂起的队列表达式。以这种方式我们可以在用户停止输
     * 入时延迟 250 ms 来调用表达式。
     */
    event.persist()
    const v = event.target.value
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState({
        search: v
      })
    }, 250)
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        {this.state.search ? <p>Search for: {this.state.search}</p> : null}
      </div>
    )
  }
}