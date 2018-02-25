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
