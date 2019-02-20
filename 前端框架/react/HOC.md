#

### what's a hoc

> **a higher-order component is a function that takes a component and returns a new component.**

> a HOC doesn’t modify the input component, nor does it use inheritance to copy its behavior. Rather, a HOC *composes* the original component by *wrapping* it in a container component. A HOC is a pure function with zero side-effects.

> You may have noticed similarities between HOCs and a pattern called **container components**. Container components are part of a strategy of separating responsibility between high-level and low-level concerns. Containers manage things like subscriptions and state, and pass props to components that handle things like rendering UI. HOCs use containers as part of their implementation. You can think of HOCs as parameterized container component definitions.

### 使用场景

#### Maximizing Composability

因为hoc是一个纯函数，因此可以多层嵌套，可以最大化hoc的复用。

如下：

> ```javascript
> // React Redux's `connect`
> const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
> ```
>
> 即：
>
> ```javascript
> // connect is a function that returns another function
> const enhance = connect(commentListSelector, commentListActions);
> // The returned function is a HOC, which returns a component that is connected
> // to the Redux store
> const ConnectedComment = enhance(CommentList);
> ```
>
> **In other words, `connect` is a higher-order function that returns a higher-order component!**

> This form may seem confusing or unnecessary, but it has a useful property. Single-argument HOCs like the one returned by the `connect` function have the signature `Component => Component`. Functions whose output type is the same as its input type are really easy to compose together.
>
> ```javascript
> // Instead of doing this...
> const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))
>
> // ... you can use a function composition utility
> // compose(f, g, h) is the same as (...args) => f(g(h(...args)))
> const enhance = compose(
>   // These are both single-argument HOCs
>   withRouter,
>   connect(commentSelector)
> )
> const EnhancedComponent = enhance(WrappedComponent)
> ```



### Don’t Mutate the Original Component. Use Composition.

比较两段代码

> ```javascript
> function logProps(InputComponent) {
>   InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
>     console.log('Current props: ', this.props);
>     console.log('Next props: ', nextProps);
>   };
>   // The fact that we're returning the original input is a hint that it has
>   // been mutated.
>   return InputComponent;
> }
>
> // EnhancedComponent will log whenever props are received
> const EnhancedComponent = logProps(InputComponent);
> ```
>
> ```javascript
> function logProps(WrappedComponent) {
>   return class extends React.Component {
>     componentWillReceiveProps(nextProps) {
>       console.log('Current props: ', this.props);
>       console.log('Next props: ', nextProps);
>     }
>     render() {
>       // Wraps the input component in a container, without mutating it. Good!
>       return <WrappedComponent {...this.props} />;
>     }
>   }
> }
> ```
>
> 

### Don’t Use HOCs Inside the render Method

不要这样做：

> ```Javascript
> render() {
>   // A new version of EnhancedComponent is created on every render
>   // EnhancedComponent1 !== EnhancedComponent2
>   const EnhancedComponent = enhance(MyComponent);
>   // That causes the entire subtree to unmount/remount each time!
>   return <EnhancedComponent />;
> }
> ```

将hoc放在render之外，使得它不会在每次更新时都重新加载。

对于需要动态改变的hoc，在hoc内或其它地方进行动态的更新。上述用法实际上失去了hoc的意义。

### hoc与父子组件的区别

hoc应该更偏向一个逻辑容器，而父组件则更多的是一个ui容器。