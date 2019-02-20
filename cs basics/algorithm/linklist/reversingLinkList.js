/**
 * 给定一个单链表，以K个元素为一组，反转这个链表，
 * 比如输入： 1->2->3->4->5->6->7->8->null and k = 3；输出：3->2->1->6->5->4->8->7->null.
 */
/**
 * 1. build node structure
2. reversing
    1.
*/
var TNode = /** @class */ (function() {
  function TNode(d) {
    this.data = d
    this.next = null
  }
  return TNode
})()
var Fragment = /** @class */ (function() {
  // constructor(h, r) {
  //   this.head = h
  //   this.rear = r
  // }
  function Fragment() {
    this.head = null
    this.rear = null
  }
  return Fragment
})()
function reversingLinkList(list, k) {
  // 处理边界
  if (k <= 1 || !list) {
    return list
  }
  // 开始旋转
  var current = list,
    previous = null,
    newHead = null // , next = current.next
  var tk = k
  var pf
  while (current) {
    // cf - currentFragment, pf - previousFragment
    // 处理当前段的元素前，先对cf进行保存
    var cf = new Fragment()
    cf.rear = current
    // 开始处理当前段的元素
    tk = k
    while (tk && current) {
      // 处理以k为边界的一段
      let next = current.next
      current.next = previous
      previous = current
      current = next
      tk--
    }
    // cf.head 如何保存？ cf.head 就是最后处理的元素 即 cf.head === current
    cf.head = previous
    // pf.rear 如何保存？应该是上述循环中第一个元素
    if (pf) {
      pf.rear.next = cf.head
    } else {
      newHead = previous
    }
    pf = cf
    // 清空 previous
    previous = null
  }
  return newHead
}
// test
var nodeA = new TNode(1)
var node2 = new TNode(2)
var node3 = new TNode(3)
var node4 = new TNode(4)
var node5 = new TNode(5)
var node6 = new TNode(6)
var node7 = new TNode(7)
nodeA.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node6
node6.next = node7
var newTree = reversingLinkList(nodeA, 3)
var log = console.log
function logLinklist(list) {
  var c = list
  while (c) {
    log(c.data)
    c = c.next
  }
}
logLinklist(newTree)
