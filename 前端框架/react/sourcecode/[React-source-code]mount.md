[React-source-code]

How React mount your app?

React的原理就是将页面元素拆成一个个的组件，然后用组件去拼装成最终的应用。在加载的时候， React 需要一个 mounting node，即渲染最终结构的dom节点，通常这个节点是一个空的dom node(React 在加载时会判断提供的dom容器是否有用户定义的node，有的话会弹出警告)。React的工作就是把用户提供的 React元素渲染进这个节点。
要做到这点，React提供了以下抽象: (React)Component/PureComponent/(/*functional component?*/)/Fragment -- 即用户编写组件时继承的 class。
ReactRoot -- 一个react应用应该只有一个根结点(现在已经支持直接的数组了，所以也可以多个节点？还是只是主动用Fragment封装了一下？)，这个就是对用户的根结点的抽象。
ReactElement -- 上述 Component/PureComponent 的通用容器？
ReactFiber -- 这是对最小的独立render单元的抽象。
ReactWork -- 要进行的render的抽象
ReactUpdate -- 要进行的更新

以及一些通用的方法：
scheduleReactUpdate -- 将更新提交到队列中
