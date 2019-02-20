/* 输入两棵二叉树A和B，判断B是不是A的字结构。节点定义如下:
{
	value,
	left,
	right
}
*/
function isSameStructure(a, b) {
  // a should not be null
  if (!a) {
    return false
  }
  if (a.value !== b.value) {
    return false
  }
  let sameLeft = true
  if (b.left) {
    sameLeft = isSameStructure(a.left, b.left)
  }
  let sameRight = true
  if (b.right) {
    sameRight = isSameStructure(a.right, b.right)
  }
  return sameLeft && sameRight
}
function contains(a, b) {
  // a and b should not be null
  if (isSameStructure(a, b)) {
    return true
  }
  if (a.left) {
    if (contains(a.left, b)) {
      return true
    }
  }
  if (a.right) {
    if (contains(a.right, b)) {
      return true
    }
  }
  return false
}
function isSubTree(treeA, treeB) {
  if (!treeB) {
    return true
  }
  if (!treeA) {
    return false
  }
  return contains(treeA, treeB)
}

// test
// 1. A 包含 B, 但 B 的叶子不是A的叶子
// 2. A 包含 B, 但 B 的叶子也是A的叶子
// 3. A 不包含 B
// 4. A 是 null
// 5. B 是 null
function Node(v, left = null, right = null) {
  this.value = v
  this.left = left
  this.right = right
}
const leaf4 = new Node(4, new Node(41), new Node(42))
const leaf5 = new Node(5)
const node2 = new Node(1, leaf4, leaf5)
const A = new Node(1, new Node(2))
const A2 = new Node(1, node2)
const A3 = node2
const B = new Node(1, new Node(4), new Node(5))

console.log(isSubTree(A, B)) // false
console.log(isSubTree(A2, B)) // true
console.log(isSubTree(A3, B)) // true
console.log(isSubTree(null, B)) // false
console.log(isSubTree(null, null)) // true

/**
 * 复盘
 * 这道题目在做前已经做了题目分析，用纸笔梳理出了思路。但在写的过程中还是不够条理，导致时间上的浪费和重复的改写。
 * 模糊点主要在于没有清晰地区分开 是否有子树 和 是否结构一致 两个函数。
 * 如果清晰地分开两个函数，就能够条理且迅速地写出代码。
 * 其次是对于边界在哪里控制，也有模糊点。是应该在方法函数中，还是在入口函数中？或者说，对于某个函数，应该认定其
 * 输入有哪些边界？这个也可以在先编写正常流程代码后再去编写。
 * 总之，还是编码能力有待提高。需要更多的练习。
 */
