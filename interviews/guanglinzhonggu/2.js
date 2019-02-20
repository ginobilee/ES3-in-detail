/**
 * 将输入的数组重新排序后合并为一个数组，尽量使得原来同一组的元素不相邻
 *
 * 思路:
 * 1. 如果只是shuffle，那么可以将数组放在一个二维数组中。假设所有数组的长度和为l，那么初始化一个从0递增到l-1的数组；迭代l次，每次取数组中一个值并将其从中删除，以取出的值作为下标取二维数组中的对应元素既可。
 * 2. 如果需要尽量将元素打散，那么随机地处理元素就不是一个好的方案。而是每次在其它数组中选择一个数组，然后在其中随机选择一个元素；除非只有一个数组。
 * 3. 维护一个数组选择的indexOfArray，记录上次选择的数组序号。
 * 4. 如何处理数组中已被选择的元素，直接删除应该是简洁的方案。这就需要构建一个输入参数的拷贝，避免更改输入参数。
 *
 * 代码思路:
 * 1. 对输入的数组做拷贝，并放入一个新的数组valid中，valid是一个二维数组。
 * 2. 维护一个数组选择的下标 indexOfArrayToBeExtracted, 只要 valid 非空就选择当前下标数组中的随机一个元素。选择后删除该元素；如果当前数组为空，则从valid中删除
 */

function shuffle(...arrs) {
  // 1. 对输入参数进行校验: i. 剔除掉非数组 ii. 是否为空；
  const valid = []
  // 提前进入选择首抽取数组的流程，是为了选择最长的一个。避免在 shuffle([23], [4, 5]) 时出现 [23, 4, 5]
  let indexOfArrayToBeExtracted = 0 // 进行元素抽取的数组在二维数组中的下标
  let longest = 0 // 最长输入数组的长度
  let currentArrayIndex = 0 // 当前数组在 valid 中的index
  for (let s of arrs) {
    if (Array.isArray(s)) {
      valid.push(Array.from(s))
      if (s.length > longest) {
        longest = s.length
        indexOfArrayToBeExtracted = currentArrayIndex
      }
      currentArrayIndex++
    }
  }
  if (!valid.length) {
    return []
  }

  // 2. 当二维数组非空时，随机抽取当前待抽取数组的一个元素放入result中。更新数组长度和待抽取数组下标
  const result = []
  while (valid.length) {
    const currentArray = valid[indexOfArrayToBeExtracted]
    const eles = currentArray.splice(getRandom(currentArray.length), 1)
    result.push(eles[0])
    if (!currentArray.length) {
      valid.splice(indexOfArrayToBeExtracted, 1)
    }
    indexOfArrayToBeExtracted = (indexOfArrayToBeExtracted + 1) % valid.length
  }
  return result
}

/**
 * 取 0～l-1 之间的随机整数
 */
function getRandom(l) {
  const r = Math.floor(Math.random() * l)
  return r
}

const log = console.log
log(shuffle([1, 2, 3], [4, 5]))
log(shuffle())
log(shuffle(undefined, null, 1, [23], [4, 5]))
log(shuffle([1, 2, 3, 4, 5], [6], [false]))
