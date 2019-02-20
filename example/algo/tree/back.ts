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
class TNode {
  data: number;
  left;
  right;
  constructor(n: number) {
    this.data = n;
  }
}
const l = console.log

function backTraverseWithRecursion(tree: TNode) {
  if (!tree) {
    return
  }
  backTraverseWithRecursion(tree.left)
  backTraverseWithRecursion(tree.right)
  l(tree.data)
}
function backTraverse(tree: TNode) {
  if (!tree) {
    return
  }
  let former = null
  const stack = []
  let current = tree
  while(current || stack.length) {
    while(current) {
      stack.push(current)
      current = current.left
    }
    if (stack.length) {
      const top = stack[stack.length - 1]
      if (!top.right || top.right === former) {
        former = stack.pop()
        l(former.data + '\n')
      } else {
        current = top.right
      }
    }
  }

}


// test
const nodeA = new TNode(1)
const node2 = new TNode(2)
const node3 = new TNode(3)
nodeA.left = node2
nodeA.right = node3
const node4 = new TNode(4)
const node5 = new TNode(5)
node2.left = node4
node4.right = node5
const node6 = new TNode(6)
const node7 = new TNode(7)
node3.right = node6
node6.right = node7
// backTraverse(nodeA)
backTraverseWithRecursion(nodeA)