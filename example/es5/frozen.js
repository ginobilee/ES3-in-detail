var foo = { x: 10 };

// freeze the object
Object.freeze(foo);
console.log(Object.isFrozen(foo)); // true

// can't modify
foo.x = 100;

// can't extend
foo.y = 200;

// can't delete
delete foo.x;

console.log(foo); // {x: 10}
