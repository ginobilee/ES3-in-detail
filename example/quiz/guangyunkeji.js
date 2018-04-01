function Print() {
  var innerFunc = function() {
    // inner
    return {
      Print: function() {
        return "aaaaa";
      }
    };
  };
  innerFunc.Print = function() {
    return function() {
      return "bbbbb";
    };
  };
  return innerFunc;
}

console.log(Print().Print()()); // bbbbb
console.log(Print()().Print()); // aaaaa
