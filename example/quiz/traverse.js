function traverse() {
  // 首先取到根节点，对其进行判断。然后取到其所有子节点，迭代进行判断
  var detect = function(node) {
    if (node.nodeType !== 9) {
      return;
    }
    let style = node.getComputedStyle();
    let height = style.height,
      width = style.width;
    if (width > 50 && height > 50) {
      console.log(node);
    }
    let childrens = node.childrens;
    childrens.forEach(detect);
  };
  // let body = document.getElementsByTagName('body') || document.body
  detect(document);
}
