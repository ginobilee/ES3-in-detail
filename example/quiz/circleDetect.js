function circleDetect(o) {
  // 有循环时返回true。
  // 如果o不是一个对象，返回false
  // 如果是一个对象，将o放入父引用数组中，对其每个键执行检测，如果有一个返回true，返回true。如果都返回false，返回false

  // 声明一个数组parents用来放父引用，定义函数detect用来对对象针对parents进行检测。
  // 利用闭包来使detect每次引用parents时都为当前元素的所有父引用。
  const parents = [];

  const detect = function(target) {
    if (typeof target !== "object") {
      return false;
    }
    let exist = parents.findIndex(p => p === target); // 可以用 let exist = parents.indexOf(target)
    if (exist !== -1) {
      return true;
    }
    parents.push(target);
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        let v = detect(target[key]);
        if (v) {
          return true;
        }
      }
    }
    parents.pop();
    return false;
  };
  return detect(o);
}

let a = { a1: 1, a2: null };
a.a2 = a;
let b = { b1: 1, b2: null };
b.b2 = b.b1;
let c = [1];
c.push(c);
console.log(
  circleDetect(a),
  circleDetect(b),
  circleDetect(c),
  circleDetect(null)
);
