/*
function* gen() {
  yield 1;
  return 2;
}
let g = gen();
console.log(
  g.next().value, // 1
  g.next().value // 2
);
*/

/*
// generator could be nested
function* genFuncWithReturn() {
  console.log("a");
  yield "a";
  console.log("b");
  yield "b";
  return "The result";
}
var logReturned = function*(genObj) {
  const result = yield* genObj;
  console.log(result); // (A)
};
let a = [...logReturned(genFuncWithReturn())];
*/

/*
// a generator object (not a generator), is a iterable and iterator at the same time.
var aGeneratorObject = (function*() {
  yield 1;
  yield 2;
  yield 3;
})();
typeof aGeneratorObject.next;
// "function", because it has a next method, so it's an iterator
typeof aGeneratorObject[Symbol.iterator];
// "function", because it has an @@iterator method, so it's an iterable
aGeneratorObject[Symbol.iterator]() === aGeneratorObject;
// true, because its @@iterator method returns itself (an iterator), so it's an well-formed iterable
[...aGeneratorObject];
// [1, 2, 3]
*/

/*
function makeIterator(array) {
  var nextIndex = 0;

  return {
    next: function() {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true };
    }
  };
}

var it = makeIterator(["yo", "ya"]);
// a iterator can't be accessed as a iterable: console.log([...it]); // error

console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done); // true
*/

// followed is a classic example for nested generators. However, maybe it need a nicer grammer when executing.
/**
 * Returns an iterable that transforms the input sequence
 * of characters into an output sequence of words.
 */
function* tokenize(chars) {
  const iterator = chars[Symbol.iterator]();
  let ch;
  do {
    ch = getNextItem(iterator); // (A)
    if (isWordChar(ch)) {
      let word = "";
      do {
        word += ch;
        ch = getNextItem(iterator); // (B)
      } while (isWordChar(ch));
      yield word; // (C)
    }
    // Ignore all other characters
  } while (ch !== END_OF_SEQUENCE);
}
const END_OF_SEQUENCE = Symbol();
function getNextItem(iterator) {
  const { value, done } = iterator.next();
  return done ? END_OF_SEQUENCE : value;
}
function isWordChar(ch) {
  return typeof ch === "string" && /^[A-Za-z0-9]$/.test(ch);
}
/**
 * Returns an iterable that filters the input sequence
 * of words and only yields those that are numbers.
 */
function* extractNumbers(words) {
  for (const word of words) {
    if (/^[0-9]+$/.test(word)) {
      yield Number(word);
    }
  }
}
/**
 * Returns an iterable that contains, for each number in
 * `numbers`, the total sum of numbers encountered so far.
 * For example: 7, 4, -1 --> 7, 11, 10
 */
function* addNumbers(numbers) {
  let result = 0;
  for (const n of numbers) {
    result += n;
    yield result;
  }
}
const CHARS = "2 apples and 5 oranges.";
const CHAIN = addNumbers(extractNumbers(tokenize(CHARS)));
console.log([...CHAIN]);
