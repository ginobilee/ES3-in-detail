
> Renderers manage how a React tree turns into the underlying platform calls.

> The main difference after refactoring from mountHost() is that we now keep this.node and this.renderedChildren associated with the internal DOM component instance. We will also use them for applying non-destructive updates in the future.

> In the DOM you would only see the <div>. However the internal instance tree contains both composite and host internal instances.

> The reconciler also implements support for setState() in composite components. Multiple updates inside event handlers get batched into a single update.

> Lifecycle hooks that are called after the DOM is ready, such as componentDidMount() and componentDidUpdate(), get collected into “callback queues” and are executed in a single batch.

> React puts information about the current update into an internal object called “transaction”. Transactions are useful for keeping track of the queue of pending lifecycle hooks, the current DOM nesting for the warnings, and anything else that is “global” to a specific update. Transactions also ensure React “cleans everything up” after updates. For example, the transaction class provided by React DOM restores the input selection after any update.

> The reconciler does the work of computing which parts of a tree have changed; the renderer then uses that information to actually update the rendered app.

> There is an internal joke in the team that React should have been called “Schedule” because React does not want to be fully “reactive”.