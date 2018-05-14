// 手写parseInt的实现;
const myParseInt = function(val, radix) {
  // 检查边界
  const type = typeof val;
  if (typeof val !== "string" && typeof val !== "number") {
    return NaN;
  }
  val = val.toString().toLowerCase();
  // trim white space
  val = val.replace(/\s*/, ""); // val = val.trim()

  // set radix
  if (!radix) {
    radix = 10;
  } else if (typeof radix !== "number" || radix < 2 || radix > 36) {
    return NaN;
  }
  // else always get first numbers
  const numArr = val.split("");
  let result = 0;
  for (let i = 0; i < numArr.length; i++) {
    let n = numArr[i],
      nn;
    if (n >= "0" && n <= "9") {
      nn = n - "0";
    } else if (n >= "a" && n <= "z") {
      nn = n - "a";
    } else if (i === 0 && n === ".") {
      return NaN;
    } else {
      return result;
    }
    result = result * radix + nn;
  }
  return result;

  // no numbers, return NaN
  return NaN;
};

const log = console.log;
log(myParseInt(12.2));
log(myParseInt(0.2));
log(myParseInt("01.2"));
log(myParseInt("ab2"));
