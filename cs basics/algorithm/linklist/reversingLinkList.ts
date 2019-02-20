/**
 * 给定一个单链表，以K个元素为一组，反转这个链表，
 * 比如输入： 1->2->3->4->5->6->7->8->null and k = 3；输出：3->2->1->6->5->4->8->7->null.
 */
/**
 * 1. build node structure
2. reversing
    1. 
*/


class TNode {
  data: number | string;
  next: TNode;
  constructor(d) {
    this.data = d
    this.next = null
  }
}
class Fragment {
  head: TNode;
  rear: TNode;
  // constructor(h, r) {
  //   this.head = h
  //   this.rear = r
  // }
  constructor() {
    this.head = null
    this.rear = null
  }
}

function reversingLinkList(list: TNode, k: number ) {
  // 处理边界
  if (k <= 1 || !list) {
    return list
  }
  
  // 开始旋转
  let current = list, previous = null, newHead = null // , next = current.next
  let tk = k
  let pf: Fragment
  while (current) {
    // cf - currentFragment, pf - previousFragment
    // 处理当前段的元素前，先对cf进行保存
    let cf = new Fragment()
    cf.rear = current
    // 开始处理当前段的元素
    while (tk && current) {
      // 处理以k为边界的一段
      let next = current.next
      current.next = previous
      previous = current
      current = next
      tk--
    }
    // cf.head 如何保存？ cf.head 就是最后处理的元素 即 cf.head === current
    cf.head = current
    // pf.rear 如何保存？应该是上述循环中第一个元素
    if (pf){
      pf.rear.next = cf.head
    } else {
      newHead = current
    }
    pf = cf
  }
  return newHead
}


// test
const nodeA = new TNode(1)
const node2 = new TNode(2)
const node3 = new TNode(3)
const node4 = new TNode(4)
const node5 = new TNode(5)
const node6 = new TNode(6)
const node7 = new TNode(7)
nodeA.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node6
node6.next = node7

const newTree = reversingLinkList(nodeA, 3)

const log = console.log
function logLinklist(list) {
  let c = list
  while(c) {
    log(c.data)
    c = c.next
  }
}
logLinklist(newTree)