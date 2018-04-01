Or, to put it differently, we should not store state directly in our context. Instead, we should use context as a dependency injection system.

核心是将context中的数据声明为一个发布者。所有需要此context的子组件订阅此发布者，这样每次context中的数据需要改变时，调用此发布者的改变事件，同时发布者调用各订阅者的更新事件。

问题code：

```
const TODOS = ["Get coffee", "Eat cookies"]

class TodoList extends React.PureComponent {
  render() {
    return (<ul>
      {this.props.todos.map(todo => 
        <li key={todo}><ThemedText>{todo}</ThemedText></li>
      )}
    </ul>)
  }
}

class App extends React.Component {
  constructor(p, c) {
    super(p, c)
    this.state = { color: "blue" } 
  }

  render() {
    return <ThemeProvider color={this.state.color}>
      <button onClick={this.makeRed.bind(this)}>
      	<ThemedText>Red please!</ThemedText>
      </button>
      <TodoList todos={TODOS} />
    </ThemeProvider>
  }
  
  makeRed() {
    this.setState({ color: "red" })
  }
}

class ThemeProvider extends React.Component {
  getChildContext() {
    return {color: this.props.color}
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
ThemeProvider.childContextTypes = {
  color: React.PropTypes.string
}

class ThemedText extends React.Component {
  render() {
    return <div style={{color: this.context.color}}>
      {this.props.children}
    </div>
  }
}
ThemedText.contextTypes = {
  color: React.PropTypes.string
}

ReactDOM.render(
  <App />,
  document.getElementById("container")
)
```

用依赖注入的解决方法：

```
// Theme stores the state of the current theme, and allows components to subscribe to future changes
class Theme {
  constructor(color) {
    this.color = color
    this.subscriptions = []
  }
  
  setColor(color) {
    this.color = color
    this.subscriptions.forEach(f => f())
  }

  subscribe(f) {
    this.subscriptions.push(f)
  }
}

class ThemeProvider extends React.Component {
  constructor(p, c) {
    super(p, c)
    // theme provider uses the same Theme object
    // during it's entire lifecycle
    this.theme = new Theme(this.props.color)
  }

  // update theme whenever needed. This propagate changes to subscribed components
  componentWillReceiveProps(next) {
    this.theme.setColor(next.color)
  }

  getChildContext() {
    return {theme: this.theme}
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
ThemeProvider.childContextTypes = {
  theme: React.PropTypes.object
}

class ThemedText extends React.Component {
  componentDidMount() {
    // subscribe to future theme changes
    this.context.theme.subscribe(() => this.forceUpdate())
  }
  render() {
    return <div style={{color: this.context.theme.color}}>
      {this.props.children}
    </div>
  }
}
ThemedText.contextTypes = {
  theme: React.PropTypes.object
}
```