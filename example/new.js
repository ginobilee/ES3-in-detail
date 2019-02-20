var obj = {
  func: function() {
    var a = "a"
    console.log(this.a)
  }
}
new (obj.func = obj.func)()
new obj.func()
