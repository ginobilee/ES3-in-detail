class MyArray extends Array {
  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() {
    return Array;
  }
}
var a = new MyArray(1, 2, 3);
var mapped = a.map(x => x * x);

console.log(a instanceof MyArray);
console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true
