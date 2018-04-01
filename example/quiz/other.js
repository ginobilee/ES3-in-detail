function sum(...args) {
  // false被转成-1，null->0
  // 避免出现0.300000000004:将当前的所有小数参数转成整数，计算需要的最小的10进制倍数。用整数进行运算，得到结果后除以倍数。
  // var args = Array.prototype.slice.apply(arguments);
  var result = args.reduce(function(s, cur, ind) {
    debugger;
    if (ind === 1) {
      s = parseFloat(s);
    }
    cur = parseFloat(cur) || 0;
    // debugger;
    var s1 = s.toString().split("."),
      s2 = cur.toString().split(".");
    var n1 = s1[1] ? s1[1].length : 0,
      n2 = s2[1] ? s2[1].length : 0;

    var max = Math.max(n1, n2);
    if (max === 0) {
      return s + cur;
    }
    var mul = Math.pow(10, max);
    s = s * mul;
    cur = cur * mul;
    return (s + cur) / mul;
  });
  console.log(result);
  return result;
}

sum(
  "1.0",
  false,
  1,
  true,
  1,
  "A",
  1,
  "B",
  1,
  "C",
  1,
  "D",
  1,
  "E",
  1,
  "F",
  1,
  "G",
  1
);
// Should equal 0.3, not 0.30000000000000004
sum(0.1, 0.2);
