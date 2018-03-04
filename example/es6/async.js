async function test() {
  console.log("1");
  return await Promise.resolve(10);
}
// test()
(async () => {
  let r = await test();
  console.log(r);
})();
console.log(2);

async function async1() {
  console.log("a");
  await async2(); //执行这一句后，await会让出当前线程，将后面的代码加到任务队列中，然后继续执行函数后面的同步代码
  console.log("b");
}
async function async2() {
  console.log("c");
}
console.log("d");
setTimeout(function() {
  console.log("e");
}, 0);
async1();
new Promise(function(resolve) {
  console.log("f");
  resolve();
}).then(function() {
  console.log("g");
});
console.log("h");
