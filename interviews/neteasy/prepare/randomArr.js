var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var count = 1;
arr.sort(function(a, b) {
  console.log("sort", count++, a, b);
  return Math.random() - 0.5;
});
console.log(JSON.stringify(arr));
