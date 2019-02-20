how does setState works?

<blockquote>
	Instead of an updater field, Hooks use a “dispatcher” object. When you call React.useState(), React.useEffect(), or another built-in Hook, these calls are forwarded to the current dispatcher.
</blockquote>

<blockquote>
Both the updater field and the __currentDispatcher object are forms of a generic programming principle called dependency injection. In both cases, the renderers “inject” implementations of features like setState into the generic React package to keep your components more declarative.
</blockquote>