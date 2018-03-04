var x = 10;
let foo = {
  x: 20,
  // 动态 `this`.
  bar() {
    return this.x;
  },
  // 词法 `this`.
  baz: () => this.x, // undefined in Node.js, unless change to 'x' without this.
  qux() {
    // 调用内的词法this。
    let arrow = () => this.x;
    return arrow();
  }
};
console.log(
  foo.bar(), // 20, 来自 `foo`
  foo.baz(), // 10, 来自 global  // 当执行箭头函数时，创建了新的执行环境，但因为是箭头函数，当前环境的词法环境不会有this绑定。于是在环境作用域链上一级查找，上级执行环境是全局执行环境，其词法环境上的this是全局this，于是得到的x就是全局变量x。
  foo.qux() // 20, 来自 `foo` 和箭头函数
);
let qux = foo.qux;
console.log(qux());
// 可以将内部这样解释：解析出当前的this后，将它作为属性放在当前运行环境的词法环境对象上。
// 当调用箭头函数时，该执行环境不会产生this, 因此将在执行环境作用域链的上一级环境的词法环境上查找this，找到的话就将该this值作为当前环境的中this值。

const person = {
  namea: "menglinghua",
  say: function() {
    return () => {
      console.log(this.namea);
    };
  }
};
person.say()();
let say = person.say;
say()();
