/**
 * 用非递归的方法实现后序遍历二叉树
 */
// interface Node {
//   data: number;
//   left: Node;
//   right: Node;
// }
// function Node(n) {
//   this.data = n
//   this.left = this.right = null
// }
var TNode = /** @class */ (function() {
  function TNode(n) {
    this.data = n
  }
  return TNode
})()
var l = console.log
function backTraverseWithRecursion(tree) {
  if (!tree) {
    return
  }
  backTraverseWithRecursion(tree.left)
  backTraverseWithRecursion(tree.right)
  l(tree.data)
}
function backTraverse(tree) {
  if (!tree) {
    return
  }
  var former = null
  var stack = []
  var current = tree
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    if (stack.length) {
      var top_1 = stack[stack.length - 1]
      if (!top_1.right || top_1.right === former) {
        former = stack.pop()
        l(former.data + "\n")
      } else {
        current = top_1.right
      }
    }
  }
}

function back(node) {
  const rightChecked = {},
    stack = []
  let c = node
  while (1) {
    if (!!c) {
      stack.push(c)
      c = c.left
    } else {
      if (isEmpty(stack)) {
        break
      } else {
        const top = getTop(stack)
        if (hasRightChecked(rightChecked, top)) {
          // log
          console.log(stack.pop().data)
        } else {
          setRightChecked(rightChecked, top)
          c = top.right
        }
      }
    }
  }

  function getTop(arr) {
    return arr[arr.length - 1]
  }
  function isEmpty(arr) {
    return arr.length === 0
  }
  function hasRightChecked(flags, ele) {
    return !!flags[ele.data]
  }
  function setRightChecked(flags, ele) {
    flags[ele.data] = true
  }
}
// test
var nodeA = new TNode(1)
var node2 = new TNode(2)
var node3 = new TNode(3)
nodeA.left = node2
nodeA.right = node3
var node4 = new TNode(4)
var node5 = new TNode(5)
node2.left = node4
node4.right = node5
var node6 = new TNode(6)
var node7 = new TNode(7)
node3.right = node6
node6.right = node7
backTraverse(nodeA)
back(nodeA)
// backTraverseWithRecursion(nodeA);
