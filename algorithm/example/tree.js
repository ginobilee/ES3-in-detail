function logTree(root) {
  const logNode = function(node) {
    if (node.left) {
      logNode(node.left);
    }
    if (node.right) {
      logNode(node.right);
    }
    console.log(node.content);
  };
  logNode(root);
}
const node11 = { content: 11 };
const node22 = { content: 22 };
const node1 = { content: 1, left: node11, right: null };
const node2 = { content: 2, left: null, right: node22 };
const root = { content: "root", left: node1, right: node2 };

logTree(root);
