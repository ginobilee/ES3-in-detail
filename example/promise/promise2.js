(function() {
  console.log(1);
  setTimeout(function() {
    console.log(2);
  }, 1000);
  setTimeout(function() {
    console.log(3);
  }, 0);
  console.log(4);
  let p = new Promise((resovle, reject) => {
    console.log(5);
    setTimeout(() => {
      console.log(6);
      resovle(7);
    }, 0);
    resovle(8);
  });
  p.then(arg => {
    console.log(arg);
  });
})();

function User() {
  getName = function() {
    console.log(1);
  };
  return this;
}
User.getName = function() {
  console.log(2);
};
User.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  console.log(5);
}

User.getName(); //2
getName(); //4
User().getName(); //1
getName(); //1
new User.getName(); //2
new User().getName(); //3
new new User().getName(); //3
