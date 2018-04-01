function f() {
  var a = "a";
}
f.prototype.toA = "A";

var ff = new f();
console.log(ff.toA);
