var start = Date.now();
while (Date.now() - start < 1000) {}
var original = document.getElementById("original");
var newDiv = document.createElement("div");
var newContent = document.createTextNode("Hi there and greetings!");
newDiv.appendChild(newContent);
document.body.insertBefore(newDiv, original);
