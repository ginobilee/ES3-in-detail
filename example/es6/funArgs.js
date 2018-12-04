(function test1(func, y) {
	console.log('begin')
	// var x = 1;
	x = 10;
	func()
	var args = arguments;
	console.log(args)
})(() => {
	console.log(x)
})

// (function test1(z, y) {
// 	console.log('begin')
// 	var x = 1;
// 	// x = 10;
// 	var args = arguments;
// 	console.log(args)
// })(1, 2)