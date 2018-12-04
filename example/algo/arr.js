// 将有序数组a1和a2的内容拼接起来
// 当然可以将a1和a2用concat拼接后再排序，但这样失去了考察的意义

// 在js中可以为一个数组的某个位置直接赋值，就相当于对数组进行了扩容

// 将b插入a中
function concatArr(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return a
  }
  let x = a.length,
    y = b.length
  let tail = x + y - 1
  let i = x - 1,
    j = y - 1
  while (i >= 0 && j >= 0) {
    if (a[i] > b[j]) {
      a[tail] = a[i--]
    } else {
      a[tail] = b[j--]
      // j--
    }
    tail--
  }
}

const a = [1, 3, 5]
const b = [2, 4, 6]
console.log(a.toString())
concatArr(a, b)
console.log(a.toString())
