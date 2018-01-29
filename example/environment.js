/*
var a = 10;
console.log(foo);

with ({ a: 20 }) {
  // FD
  function foo() {
    // do not test in Firefox!
    console.log(a);
  }

  // FE
  var bar = function() {
    console.log(a);
  };

  foo(); // 10!, from VariableEnvrionment  // it is 20 now, since in ES6, block-level FD also captures lexical environment.
  bar(); // 20,  from LexicalEnvrionment
}

foo(); // 10 // also 20, same to in 'with'
bar(); // still 20
*/
var v = "outer";
function a() {
  var obj = { v: "obj lit" };
  with (obj) {
    var v = "var init";
  }
  // the same to bellow
  /*var b = (function() {
    obj.v = "var init";
  })();
  var v;*/
  console.log(obj.v); //'var init' in ES3&5
  console.log(v); //'undefined' in ES3&5
}
a();
