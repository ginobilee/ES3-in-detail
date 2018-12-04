// 其实最大的问题在于满足于通过题目给的用例，而不是自己去思考应该有的边界

/**
 * 编码题一：字符串填充
 * 说明：实现一个方法，将目标字符串用另一个字符串或空格填充至目标长度。
 *   填充从目标字符串的左侧开始。
 *   1. 语法：padLeft(str, len [, chars])
 *   2. 参数 str ，目标字符串
 *   3. 参数 len ，目标长度。如果这个数值小于目标字符串的长度，则返回目标字符串本身
 *   4. 参数 chars ，可选，填充字符串，默认空格。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断
 *   5. 返回填充后的字符串
 * 示例：
 *   padLeft('abc', 10);         // '       abc'
 *   padLeft('abc', 10, 'foo');  // 'foofoofabc'
 *   padLeft('abc', 6,'123465'); // '123abc'
 *   padLeft('abc', 6, '_-');    // '_-_abc'
 *   padLeft('abc', 8, '0');     // '00000abc'
 *   padLeft('abc', 1);          // 'abc'
 */

const log = console.log
/**
 * 跟 mdn 的实现相比，缺陷在于:
 * 1. 没有充分考虑到 len 取小数
 * 2. 在 str 不是 string 类型时, 应该返回一个 string, 因为这个函数的期待输出就是一个 string
 */
function padLeft(str, len, chars) {
  /* 代码实现 */
  /**
   * 1. validate str/len/chars
   * 2. check str.length >= len
   * 3. calculate length to be padded
   * 4. build pad string and insert
   */
  if (typeof str !== "string") {
    return str
  }
  if (typeof len !== "number" || !len) {
    len = 0
  }
  chars = chars ? "" + chars : " "

  if (str.length >= len) {
    return str
  }

  const lengthToBePadded = len - str.length

  var padString = ""
  // 这里有很大的优化空间，见 repeatString
  while (padString.length < lengthToBePadded) {
    padString += chars
  }
  padString = padString.slice(0, lengthToBePadded)

  return padString + str
}
function repeatString(str, len) {
  const l = Math.floor(Math.log(len) / Math.log(2))
  while (l--) {
    str += str
  }
  return str.slice(0, len)
}
// test
log(padLeft("abc", 10) === "       abc") // '       abc'
log(padLeft("abc", 10, "foo") === "foofoofabc") // 'foofoofabc'
log(padLeft("abc", 6, "123465") === "123abc") // '123abc'
log(padLeft("abc", 6, "_-") === "_-_abc") // '_-_abc'
log(padLeft("abc", 8, "0") === "00000abc") // '00000abc'
log(padLeft("abc", 1) === "abc") // 'abc'
log(padLeft("abc", 4.3) === " abc")

/**
 * 编码题二：类似通配符的匹配
 * 说明：实现支持 '.' 和 '*' 的类似通配符的匹配，规则如下：
 *   1. '.' 匹配任意单个字符
 *   2. '*' 匹配零个或多个前面的元素
 *   3. isMatch(s, r); s 是匹配的目标字符串，r 是带匹配符的字符串
 *   4. r 的匹配应该覆盖 s
 *
 * 示例：
 *   isMatch('aa','a') // return false
 *   isMatch('aa','aa') // return true
 *   isMatch('aaa','aa') // return false
 *   isMatch('aa', 'a*') // return true
 *   isMatch('aab', 'a*') // return false
 *   isMatch('aa', '.*') // return true
 *   isMatch('ab', '.*') // return true
 *   isMatch('ab', '.a') // return false
 *   isMatch('ab', '.b') // return true
 *   isMatch('aab', 'c*a*b') // return true
 */

/**
 * 这里也应该在 s 不为 string 时将其转为 string 再判断
 */
// function isMatch(s, r) {
//   /* 代码实现 */
//   /**
//    * 这里要检查 '.' 和 '*'，且其含义与正则中完全一致，肯定要用正则去检测
//    * 关键是第4个条件， r 要覆盖 s，那么一定要在正则中添加开始和结束符
//    * 如此，只要构造正则表达式即可
//    */
//   if (typeof s !== "string") {
//     return false
//   }
//   const reg = new RegExp("^" + r + "$")
//   return reg.test(s)
// }
// log(isMatch("aa", "a") === false) // return false
// log(isMatch("aa", "aa") === true) // return true
// log(isMatch("aaa", "aa") === false) // return false
// log(isMatch("aa", "a*") === true) // return true
// log(isMatch("aab", "a*") === false) // return false
// log(isMatch("aa", ".*") === true) // return true
// log(isMatch("ab", ".*") === true) // return true
// log(isMatch("ab", ".a") === false) // return false
// log(isMatch("ab", ".b") === true) // return true
// log(isMatch("aab", "c*a*b") === true) // return true

/**
 * 编码题三：实现一个检验对象是否循环指向的方法
 * 说明：当一个对象存在对自身引用时，称之为循环指向
 *   如`var o = { a: {} }; o.a = o;`
 *   o -> a -> o，就形成循环指向
 * 示例：
 *   isCyclic(window); // true
 *   isCyclic({}); // false
 *   var o = {}; o.o = o;
 *   isCyclic(o); // true
 *
 *   var obj = { foo: { bar: { baz: { qux: {} } } } };
 *   obj.foo.bar.baz.qux = obj.foo;
 *   isCyclic(o); // true
 */

function isCyclic(o) {
  /* 代码实现 */
  /**
   * 1. 将当前对象放入ancestors数组，对其键进行遍历，如果是对象，判断其值是否在ancestors中；
   * 2. 如果不在，迭代1
   * 3. 如果在 return true
   */
  const ancestors = []

  const check = function(target) {
    if (typeof target === "object" && !!target) {
      if (ancestors.findIndex(e => e === target) !== -1) {
        return true
      } else {
        ancestors.push(target)
        const values = Object.values(target)
        for (let i = 0, l = values.length; i < l; i++) {
          const v = values[i]
          if (check(v)) {
            return true
          }
        }
        ancestors.pop()
        return false
      }
    }
    return false
  }

  return check(o)
}
// log(isCyclic(window) === true) // true
// log(isCyclic({}) === false) // false
// var o = {}
// o.o = o
// log(isCyclic(o) === true) // true

// var obj = { foo: { bar: { baz: { qux: {} } } } }
// obj.foo.bar.baz.qux = obj.foo
// log(isCyclic(o) === true) // true
// log(isCyclic(null) === false)
// log(isCyclic(undefined) === false)
// const a = [1, 2]
// a[1] = a
// log(isCyclic(a) === true)

/**
 * 编码题四：裁剪拼凑数组
 * 说明：实现一个方法，按指定的序号N将长度为M的数组剪裁成两半，并把前后部分互换拼装成新数组
 *   其中，M > 2, M > N > 0
 * 示例：
 *  cutAndJoinArray([1, 2, 3, 4], 1); // [2, 3, 4, 1]
 *  cutAndJoinArray([1, 2, 3, 4, 5], 3); // [4, 5, 1, 2, 3]
 *  cutAndJoinArray([1, 2, 3, 4, 5, 6], 2); // [3, 4, 5, 6, 1, 2]
 */
function cutAndJoinArray(arr, index) {
  /* 代码实现 */
  /**
   * 这里的问题在于把原来的数组给改变了!!!!
   */
  /**
   * 1. check arr and index:
   * 2. splice and concat
   */
  if (!Array.isArray(arr) || index < 0 || arr.length <= index) {
    return arr
  }

  const switched = arr.splice(0, index)
  // console.log(arr)
  const result = arr.concat(switched)
  log(arr)
  return result
  // return arr.slice(index - arr.length).concat(arr.slice(0, index))
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const a = [1, 2, 3, 4]
log(same(cutAndJoinArray(a, 1), [2, 3, 4, 1])) // [2, 3, 4, 1]
console.log
log(same(cutAndJoinArray([1, 2, 3, 4, 5], 3), [4, 5, 1, 2, 3])) // [4, 5, 1, 2, 3]
log(same(cutAndJoinArray([1, 2, 3, 4, 5, 6], 2), [3, 4, 5, 6, 1, 2])) // [3, 4, 5, 6, 1, 2]
