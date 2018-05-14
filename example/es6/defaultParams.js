function defaultParams(
  func = function() {
    x = 3;
    console.log("x in params is: ", x);
  },
  x,
  y
) {
  console.log("initial x in inner: ", x);
  var x = 5;
  y = 90;
  console.log(y, arguments[2]);
  func();
  console.log("last x in inner: ", x);
}
defaultParams(undefined, 4, "y");

/*
function defaultParams(func, x) {
  if (func === undefined) {
    func = function() {
      x = 3;
      console.log("x in params is: ", x);
    };
  }
  return function() {
    console.log("initial x in inner: ", x);
    var x = 5;
    func();
    console.log("last x in inner: ", x);
  }.apply(this, arguments);
}
defaultParams(undefined, 4);
*/
