/**
 * 约瑟夫环问题(面试题62)
 */

// 我的初始解法
function getLastNumber(n = 1, m = 1) {
  if (n === 0 || m === 0) {
    return 0
  }
  let pendingIndex = 0,
    l = n + 1
  const arr = []
  for (let i = 0; i <= n; i++) {
    arr[i] = i
  }
  while (l > 1) {
    // 如果 (pendingIndex + m) % l 刚好为1呢？
    pendingIndex = (pendingIndex + m - 1) % l
    arr.splice(pendingIndex, 1)
    l--
  }
  return arr[0]
}

// test
console.log(getLastNumber(4, 3)) // 3
console.log(getLastNumber(1, 1)) // 1
console.log(getLastNumber(5, 1)) // 5

/**
 * 应该勘正的错误
 * 1. 从题面意思，n应该取长度，而非最大的数字
 * 2. 无效值应该返回 -1 而非 0
 */
function getLastNumberOpt(n = 1, m = 1) {
  if (n === 0 || m === 0) {
    return 0
  }
  let pendingIndex = 0,
    l = n
  const arr = []
  for (let i = 0; i < n; i++) {
    arr[i] = i
  }
  while (l > 1) {
    // 如果 (pendingIndex + m) % l 刚好为1呢？
    pendingIndex = (pendingIndex + m - 1) % l
    arr.splice(pendingIndex, 1)
    l--
  }
  return arr[0]
}

/**
 * 书中提供的最优解
 * @param {*} n
 * @param {*} m
 */
function getLastNumberBest(n, m) {
  if (n < 1 || m < 1) {
    return -1
  }
  // 每次删除一个，只需执行 n-1 次
  let last = 0
  for (let i = 2; i <= n; i++) {
    last = (last + m) % i
  }
  return last
}

/**
 * 复盘:
 * 首先，我提供的解法中，混淆了环的长度和环中最大的数字，这是一个错误；在输入无效时，应该返回一个明确的错误值，而我返回了一个可能的正确值0，这也是一个错误。
 * 其次，我的解法与书中提供的两种解法都有所不同。
 *  书中的第一种解法，是用链表完全模拟一个环，依次做这个运算，得到最后剩下的值。
 *  我的解法看起来好像接近第二种解法，其实也不一样。
 *  共同之处是，都在寻找 某次删除的位 与 下次删除的位 之间的代数关系；
 *  但我的解法中寻找的是 在环中 做第k次删除时的删除位 与 k-1次删除时的删除位 之间的关系，根本上还是基于模拟一个环去依次删除；
 *  书中的解法是： 令 对(n, m)做删除后最终结果为f(n, m), 寻找f(n, m)与 f(n-1, m)之间的代数关系，如此进行迭代，因为f(1, m)=0，就能得到f(n, m)的值。
 *
 *  那么如何找到 f(n, m) 与 f(n-1, m)之间的关系呢？
 *  对 环(n, m) 做一次删除后得到的序列为 [0, 1, ..., k-1, k+1, ..., n-1], 其中 k = (m-1)%n
 *  这个序列的长度为 n-2， 显然对他继续做 删除m 运算得到的结果也是 f(n, m)，但此时起始位是 k+1，而非 0
 *  也就是说相当于对 序列[K+1, k+2, ..., n, 0, ..., k-1] 进行 从0位开始的删除m运算。我们把这个运算的最终结果记为 g(n-1, m)
 *  而这个结果，与对 序列[0, 1, ..., n-2] 进行 删除m运算的结果即 f(n-1, m) 是有一定关系的。
 *  对 [K+1, k+2, ..., n, 0, ..., k-1] 做删除m运算，与对 [0, 1, ..., n-2] 做删除m运算，最后剩下的数字在整个数列中的位置是相同且一定的
 *  比如前者剩下的是 k+2(index = 1)， 那么后者一定是 1(index = 1)。
 *  而显然 这个相同位置对应的数字 之间的代数关系 是 g(n-1, m) = (f(n-1, m) + k + 1)%n
 *  所以 f(n, m) = g(n-1, m) = (f(n-1, m) + k + 1)%n = (f(n-1, m) + m)%n
 *  到了这里，就不难将这个代数关系转为上面的代码。
 */
