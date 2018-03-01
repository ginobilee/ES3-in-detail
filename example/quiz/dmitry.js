/* title: 10
foreach(k in { a: 10, b: 20 });
{
  // ...
  console.log(k);
}
*/
({
  x: 10,
  foo: function() {
    function bar() {
      console.log(x);
      console.log(y);
      console.log(this.x);
    }
    with (this) {
      var x = 20;
      var y = 30;
      bar.call(this);
    }
  }
}.foo());
