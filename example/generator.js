function* gen() {
  yield 1;
  return 2;
}
let g = gen();
console.log(
  g.next().value, // 1
  g.next().value // 2
);
