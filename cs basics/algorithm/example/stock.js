/**
 * 股票的最大收益
 */
function getMin(a, b) {
  return a < b ? a : b
}
function getMaxProfit(arr) {
  if (arr.length <= 1) {
    return 0
  }
  if (arr.length === 2) {
    return arr[1] - arr[0]
  }
  let curStart = arr[0],
    curStop = arr[1],
    min = curStop > curStart ? curStart : curStop,
    minAfter = undefined,
    result = curStop - curStart
  for (let i = 2, l = arr.length; i <= l; i++) {
    if (minAfter !== undefined) {
      const newMax = arr[i] - minAfter
      if (arr[i] > curStop) {
        curStart = getMin(curStart, minAfter)
        curStop = arr[i]
        result = arr[i] - curStart
      } else if (newMax > result) {
        result = newMax
        curStart = minAfter
        curStop = arr[i]
      } else {
        minAfter = arr[i] < minAfter ? arr[i] : minAfter
      }
    } else {
      const newMax = arr[i] - min
      if (newMax > result) {
        curStart = min
        curStop = arr[i]
        result = newMax
      } else {
        minAfter = arr[i]
      }
    }
  }
  return result
}

// test
console.log(getMaxProfit([9, 11, 8, 5, 7, 12, 16, 14])) // 11
console.log(getMaxProfit([4, 3, 8])) // 5
console.log(getMaxProfit([4, 6, 8, 3, 5])) // 4
console.log(getMaxProfit([4, 6, 8, 5, 9])) // 5

/**
 * 复盘
 * 自己想到了用迭代去解决问题。但自己把问题解地太复杂了。
 * 在计算最新的最大差异时，我僵硬地将数据以 之前的最大差的截止位 为界限分为了两段。
 * 实际上，在计算新的最大值时，并不关心它们之间的区别。对于当前位来说，就只要知道之前的最小值就可以计算出新的最大差值。
 */

// 推荐解法
function maxDiff(arr) {
  if (!arr || !Array.isArray(arr) || arr.length < 2) {
    return 0
  }
  let min = arr[0],
    maxDiff = arr[1] - arr[0]
  for (let i = 1, l = arr.length; i <= l; i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
    let diff = arr[i] - min
    if (diff > maxDiff) {
      maxDiff = diff
    }
  }
  return maxDiff
}
console.log(maxDiff([9, 11, 8, 5, 7, 12, 16, 14])) // 11
console.log(maxDiff([4, 3, 8])) // 5
console.log(maxDiff([4, 6, 8, 3, 5])) // 4
console.log(maxDiff([4, 6, 8, 5, 9])) // 5
