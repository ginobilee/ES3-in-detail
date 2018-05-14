var x = function () { return ({ name: "Alice" }); };
var y = function () { return ({ name: "Alice", location: "Seattle" }); };
x = y; // OK
export default x;
