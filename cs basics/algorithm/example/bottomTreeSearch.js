function bottomTreeSearch(node) {
  /**
   * 用一个数组来依次存储节点，
   * 将根节点入队列。
   * 进入循环，当队列不为空时，依次取出当前节点，并将其的子节点放入队列尾部。
   * 何时将之前取出的父节点放回？
   * 如果将不同层的节点分别放在不同的数组中？
   * 应该可行，每次进入循环时，依次遍历当前层级的数组curNodes，并将子节点取出放在一个新的队列中nextNodes。遍历结束后，将curNodes放入结果中，并将curNodes指向nextNodes.
   * 进入循环判断curNodes为空时跳出，返回结果。
   */
  const queue = [];
}

const node11 = { content: 11 };
const node22 = { content: 22 };
const node1 = { content: 1, left: node11, right: null };
const node2 = { content: 2, left: null, right: node22 };
const root = { content: "root", left: node1, right: node2 };

bottomTreeSearch(root);
