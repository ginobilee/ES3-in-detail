// 在`index.html`中：
// 这个代理和其它worker之间共享的数据。
let sharedHeap = new SharedArrayBuffer(16);
// 我们角度的数据。
let heapArray = new Int32Array(sharedHeap);
// 创建一个新代理（worker）。
let agentSmith = new Worker("agent-smith.js");
agentSmith.onmessage = message => {
  // 代理发送它修改的数据的索引。
  let modifiedIndex = message.data;
  // 检查被修改的数据
  console.log(heapArray[modifiedIndex]); // 100
};
// 发送共享数据给代理
agentSmith.postMessage(sharedHeap);
