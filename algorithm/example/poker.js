/**
 * 面试题61: 扑克牌中的顺子
 * 任抽5张牌，判断是不是顺子，2～10为数字本身，A->1, J->11, Q->12, K->13
 * 大小王为任意数字
 */
/**
 * question
 * 1. 抽到牌中的1认为是几？应该也是1才对
 * 2. 为何不把A当作14？
 */
// 将牌映射为数字
function parsePoker2Arr(str) {
  const pokers = { A: 1, J: 11, Q: 12, K: 13, P: 0, p: 0 }
  const ss = str.split("")
  return ss.map(s => (pokers.hasOwnProperty(s) ? pokers[s] : parseInt(s)))
}
// todo: test parsePoker2Arr
function sortAscend(arr) {
  return arr.sort((a, b) => a - b)
}
function sortAndAbstractZero(arr) {
  sortAscend(arr)
  let countOfZero = 0
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === 0) {
      countOfZero++
      arr.splice(i, 1)
    }
  }
  return { countOfZero, result: arr }
}
function isSmooth(arr) {
  // 1. 对数组进行递增排序
  // 2. 提取为0的元素，用countOfKing维持计数
  // 3. 遍历数组，如果与前一个元素相同/或差值不能被王牌替换，则return false
  // todo: 这里有一个优化点, 其实不需要将0从队列中抽取出来，因为已经排序了，只要从非零点开始去迭代就可以了。
  let { countOfZero, result } = sortAndAbstractZero(arr)
  for (let i = 1, l = result.length; i < l; i++) {
    const diff = result[i] - result[i - 1]
    if (diff === 0 || diff - 1 > countOfZero) {
      return false
    }
    if (diff > 1) {
      countOfZero -= diff - 1
    }
  }
  return true
}
function isSeqPokers(str) {
  const arr = parsePoker2Arr(str)
  return isSmooth(arr)
}

// test p->小王 P -> 大王
console.log(isSeqPokers("12345")) // true
console.log(isSeqPokers("15342")) // true
console.log(isSeqPokers("123A5")) // false
console.log(isSeqPokers("12K45")) // false
console.log(isSeqPokers("1P345")) // true
console.log(isSeqPokers("1P4p5")) // true
console.log(isSeqPokers("JQKPp")) // true

/**
 * 复盘
 * 这道题大概是看到了把王牌转换为0的思路，所以也就花了10分钟左右梳理出了思路。并准备了一些测试用例。
 * 但是在大小王进行数字转换时，还是出了错，因为转换为0，判断 pokers[i] ? pokers[i] : parseInt(i) 时大小王就被转为了 NaN。
 * 替换为 hasOwnP
 */
