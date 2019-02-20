function ReactWork() {
	this._callbacks = null;
	this._didCommit = false;

	this._onCommit = this._onCommit.bind(this);
}
ReactWork.prototype.then = function(onCommit: () => mixed) {
	if (this._didCommit) {
		onCommit();
		return
	}
	let callbacks = this._callbacks;
	if (callbacks === null) {
		callbacks = this._callbacks = [];
	}
	callbacks.push(onCommit);
}
ReactWork.prototype._onCommit = function() {
	if (this._didCommit) {
		return
	}
	this._didCommit = true;
	const callbacks = this._callbacks;
	if (callbacks === null) {
		return
	}
	for (var i = callbacks.length - 1; i >= 0; i--) {
		let callback = callbacks[i];
		invariant(
			typeof callback === 'function', 
      'Invalid argument passed as callback. Expected a function. Instead ' +
        'received: %s',
        callback);
        callback()
	}
}

function ReactRoot(container: Container, isConcurrent: boolean, hydrate: boolean) {
	const root = DOMRenderer.createContainer(container, isConcurrent, hydrate);
	this.internalRoot = root;
}
ReactRoot.prototype.render = function(children: ReactNodeList, callback: ?() => mixed) {

}
function createContainer(containerInfo: Container, isConcurrent: boolean, hydrate: boolean) {
	return createFiberRoot(containerInfo, isConcurrent, hydrate);
}