ref

Why are String Refs legacy?
If you worked with React before, you might be familiar with an older API where the ref attribute is a string, like textInput, and the DOM node is accessed as this.refs.textInput. We advise against it because string refs have below issues, are considered legacy, and are likely to be removed in one of the future releases.

It requires that React keeps track of currently rendering component (since it can't guess this). This makes React a bit slower.
It is not composable, i.e. if a library puts a ref on the passed child, the user can't put another ref on it. Callback refs are perfectly composable.