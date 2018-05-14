// 要实现函数内每隔5秒调用自己这个函数，100次以后停止，
function test() {
  if (test.count) {
    test.count++;
  } else {
    test.count = 1;
  }
  // something
  console.log(test.count);
  if (test.count === 100) {
    delete test.count;
    return;
  }
  setTimeout(test, 50);
}
test();
