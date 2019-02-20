# virtual dom

虚拟dom以及比较的实现可以总结为以下步骤：

1. 利用js模拟dom元素(dom element -> js object)
2. 用模拟的元素构建虚拟dom
3. 比较虚拟dom(节点改变/重排列/属性改变/内容改变)，并记录更改
4. 利用上一步记录的更改操作真实dom

> 之前的章节所说的，状态变更->重新渲染整个视图的方式可以稍微修改一下：用 JavaScript 对象表示 DOM 信息和结构，当状态变更的时候，重新渲染这个 JavaScript 的对象结构。当然这样做其实没什么卵用，因为真正的页面其实没有改变。
>
> 但是可以用新渲染的对象树去和旧的树进行对比，记录这两棵树差异。记录下来的不同就是我们需要对页面真正的 DOM 操作，然后把它们应用在真正的 DOM 树上，页面就变更了。这样就可以做到：视图的结构确实是整个全新渲染了，但是最后操作DOM的时候确实只变更有不同的地方。

> 这就是所谓的 Virtual DOM 算法。包括几个步骤：
>
> 1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
> 2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
> 3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

从diff算法对列表元素的比较上来看，key扮演着区别两个子元素是否一致的关键决定因素。因此，在列表元素中，key最好取能够唯一识别当前的元素的值。这样在进行重排比较时，可以由key值直接确定该字元素是否挪动了位置。

相反，如果只是用index作为key值，当元素的顺序改变后，在子元素比对这一层上实际上并没有比较出来。而是在子元素的下一层比较时，才比较出差异来。以子元素的顺序改变为例，这时dom的操作其实是对每个子元素的内容进行了更改。而如果有唯一的key值可以识别彼此，则dom只需要改变子元素的顺序。所以后者对dom操作更少，是更优的方案。

[参考](https://github.com/livoras/blog/issues/13)

> The DOM is just one of the rendering environments React can render to, the other major targets being native iOS and Android views via React Native. (This is why "virtual DOM" is a bit of a misnomer.)

The reason it can support so many targets is because React is designed so that reconciliation and rendering are separate phases. The reconciler does the work of computing which parts of a tree have changed; the renderer then uses that information to actually update the rendered app.

This separation means that React DOM and React Native can use their own renderers while sharing the same reconciler, provided by React core.

