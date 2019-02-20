DOMRenderer.updateContainer = function(element, container, parentComponent, callback) {
	const current = container.current;
	const currentTime = requestCurrentTime();
	const expirationTime = computeExpirationForFiber(currentTime, current);
	return updateContainerAtExpirationTime(
		element, 
		container,
		parentComponent,
		expirationTime,
		callback
	);
}

export function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
	const current = container.current;

	const context = getContextForSubtree(parentComponent);
	if (container.context === null) {
		container.context = context
	} else {
		container.pendingContext = context
	}

	return scheduleRootUpdate(current, element, expirationTime, callback);
}