/**
检查对象是否存在环
*/

//  链式调用
// var origin = [
//   { id: 1, title: "title1" },
//   { id: 2, title: "abcd" },
//   { id: 3, title: "title2" },
//   { id: 4, title: "efg" }
// ];
// var find = function(data) {
//   // your code here
//   // check if data is array.
//   let SEQ = {
//     desc: true,
//     aesc: false
//   };
//   function Proxy(data) {
//     this.result = data;
//   }
//   if (null) {
//     console.log("sss".match(/\d$/));
//   }
//   Proxy.prototype.where = function(query) {
//     let result = this.result.filter((d, i) => {
//       let keys = Object.keys(query);
//       for (let i = 0, l = keys.length; i < l; i++) {
//         let q = keys[i];
//         if (d[q] === undefined || !d[q].match(query[q])) {
//           return false;
//         }
//       }
//       return true;
//     });
//     this.result = result;
//     return this;
//   };
//   Proxy.prototype.order = function(key, seq) {
//     let result = this.result.sort(function(a, b) {
//       if (a[key] === undefined || b[key] === undefined) {
//         return result;
//       }
//       return SEQ[seq] ? b[key] - a[key] : a[key] - b[key];
//     });
//     this.result = result;
//     return this;
//   };
//   return new Proxy(data);
// };

// var result = find(origin)
//   .where({ title: /\d$/ })
//   .order("id", "desc"); //desc 非递增
// console.log(result); //  [{id:3,title:'title2'},{id:1,title:'title1'}]

// function find(target) {
//   const SEQ = {
//     desc: false,
//     asc: true
//   }
//   function Proxy() {
//     // todo: check target to be array
//     this.target = target
//   }
//   Proxy.prototype.where = function(option) {
//     // todo: check option valid
//     const keys = Object.keys(option)
//     let result = this.target
//     keys.forEach(key => {
//       result = result.filter(element => element[key] && !!element[key].match(option[key]))
//     })
//     this.target = result
//     return this
//   }
//   Proxy.prototype.order = function(key, dir) {
//     const result = this.target.sort((a, b) => {
//       if (SEQ[dir]){
//         return a[key] - b[key]
//       } else {
//         return b[key] - a[key]
//       }
//     })
//     // this.target = result
//     return this.target
//   }
//   return new Proxy()
// }

// ali-for
// var items = [{ name: "item1" }, { name: "item2" }]
// var str = '<div ali-for="item in items">{{item.name}}<div>'

// var ParseDom = function(str) {
//   // your code here
//   // 首先将str转化为dom node
//   var root = document.createDocumentFragment()
//   root.innerHTML = str
//   console.log(root)
// }

// // 对应生成的dom
// // <div>item1</div>
// // <div>item2</div>
// ParseDom(str)

// // ali-for
// var items = [{ name: "item1" }, { name: "item2" }]
// var str = '<div ali-for="item in items">{{item.name}}<div>'

// var ParseDom = function(str) {
//   // your code here
//   // 首先将str转化为dom node
//   var root = document.createElement("div")
//   var result = document.createDocumentFragment()
//   root.setAttribute("id", "container")
//   root.innerHTML = str

//   // 依次在dom树中寻找'ali-for'特性。对于有此特性的节点，读出对应的数据源变量，以及在
//   // textContent中的表达式的引用变量名。
//   // 在源数据上使用array.map返回多个同类节点，对每个节点中的{{变量}}进行解析
//   var node = root.firstChild
//   console.log(node)
//   while (node) {
//     var newNode = node.cloneNode(true)
//     if (newNode.hasAttribute("ali-for")) {
//       var attrValue = newNode.getAttribute("ali-for")
//       // console.log(typeof attrValue);
//       let matched = attrValue.match(/(\w+)?\sin\s(\w+)/)
//       console.log(matched)
//       var [, itemName, arrName] = matched
//       console.log(itemName, arrName)
//       try {
//         var text = newNode.textContent
//         var nodeItems =
//           this[arrName] &&
//           this[arrName].forEach(item => {
//             // 解析出{{}}内的表达式，如果是以'itemName'开头，用split取出剩余部分
//             if ((expRresult = text.match(/\{\{(.*)\}\}/))) {
//               var [, exp] = expRresult,
//                 i
//               if ((i = exp.indexOf(itemName)) === 0) {
//                 let keys = exp.split(".")
//                 keys.shift()
//                 var value = item
//                 keys.forEach(k => (value = value[k]))
//                 let tempNode = newNode.cloneNode(true)
//                 tempNode.removeAttribute("ali-for")
//                 tempNode.textContent = text.replace(`{{${exp}}}`, value)
//                 result.appendChild(tempNode)
//               }
//             }
//           })
//       } catch (e) {
//         console.log(e)
//       }
//     } else {
//       result.appendChild(newNode)
//     }
//     // 没有考虑当前节点的自节点
//     var tnode = node.nextSibling
//     node = tnode
//   }
//   console.log(result.innerHTML)
//   debugger
//   document.querySelector("#app").appendChild(result)
// }

// ParseDom(str)

// // 对应生成的dom
// // <div>item1</div>
// // <div>item2</div>
// ParseDom(str)

/* detect circle in JSON.stringify
var a = { a1: null, a2: [] };
a.a2.push(a);
console.log(JSON.stringify(a));
*/

/* // 有一个长度为100的数组，以优雅的方式求出该数组的前10个元素之和
var aa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let sum = aa.slice(0, 10).reduce((prev, cur, curIndex, arr) => {
  return prev + cur;
});
console.log(sum);
*/

/* // 不使用loop循环，创建一个长度为10的数组，并且每个元素的值等于于它的下标
let arr = [];
function buildArr() {
  let l = arr.length;
  if (l >= 10) {
    return;
  }
  arr.push(l);
  buildArr();
}
buildArr();
console.log(arr);
*/

// 求输出值1
// var o = { a: 10 }
// var test = (function(a) {
//   this.a = a
//   return function(b) {
//     return this.a + b
//   }
// })(
//   (function(a, b) {
//     return a
//   })(1, 2)
// )
// o.test = test
// console.log(test(2)) //3
// console.log(o.test(2)) // 12

/* // 求输出值2
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a);
console.log(b);
// js中的等号执行顺序：1.解析左边的标识符；2. 计算右边的值；3. 检查是否严格模式是否要抛错；4. 将右边的值复制左边标识符；5: 返回右边的值
// 在执行 a.x = a = {n: 2},系统首先是解析左边的标识符a.x，此时标识符其实表达了[a所对应的对象的x键],
// 然后执行第一个等号的右边 a = {n: 2}。如上复制执行顺序，将a指向{n: 2}。
// 将右边复制语句的返回值{n: 2}赋给最左边等号的标识符a.x。注意a.x在之前已经经过了解析，而不是此时再去解析。如果此时解析，就会在上一部重新赋值的a上增加x键值。而从结果看显然不是。
*/

/* // js实现动画
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
*/

// class EventEmitter {
//   /** 请补充你的代码***/
//   /* 对于注册的事件，初始化一个发布者。发布者维护一个订阅者列表。每次发布者对应的事件被fire，就
//      依次调用订阅者里的回调。
//      on和once方法声明发布者，并注明订阅者的类型(是否单次运行)
//      fire出发时间类型对应的发布者发出更新
//      off注销发布者

//      发布者用一个对象表示，{eventType: 'eat', subscribers: []}
//      once的解除订阅用什么实现？最方便的是实现在发布者上。区分每个subscriber的性质，是一次性的在fire后就删掉。
//      这样发布者如下：{eventType: 'eat', subscribers: [{cb: sub, id: subId, once: false}]}

//   */
//   /*
//     改进：
//     1. 可以将publishers的结构改为object，这样在查询时效率更高
//     2. 对于off，应该实现一个清除事件的某个回调的功能。这样once的fire里，可以通过off来清除回调
//     3. 对于fire，可以用arguments来拿到参数，这样可以支持动态多参数
//   */
//   constructor() {
//     // 初始化发布者队列
//     this.publishers = {};
//   }
//   on(eventType, cb) {
//     if (!this.publishers[eventType]) {
//       this.publishers = []
//     }
//     this.publishers[eventType].push({
//       cb: cb,
//       once: false
//     })
//   }
//   once(eventType, cb) {
//     if (!this.publishers[eventType]) {
//       this.publishers = []
//     }
//     this.publishers[eventType].push({
//       cb: cb,
//       once: true
//     })
//   }
//   fire() {
//     let args = [].slice.apply(arguments);
//     let eventType = args[0];
//     if (!this.publishers[eventType]) {
//       return;
//     }
//     let subscribers = this.publishers[eventType];
//     for (let l = subscribers.length; l > 0; l--) {
//       let sub = subscribers[l - 1];
//       sub.cb.apply(this, args.slice(1));
//       if (sub.once) {
//         this.off(eventType, sub.cb);
//       }
//     }
//   }
//   off(eventType) {
//     let args = Array.prototype.slice.apply(arguments);
//     if (args.length === 1) {
//       delete this.publishers[eventType];
//     } else if (args.length > 1) {
//       let cb = args[1];
//       let i = this.publishers[eventType].findIndex(sub => sub.cb === cb);
//       if (i !== -1) {
//         this.publishers[eventType].splice(i, 1);
//       }
//     }
//   }
// }
// const event = new EventEmitter();
// const drank = person => {
//   console.log(person + "喝水");
// };
// event.on("drank", drank);
// event.on("eat", person => {
//   console.log(person + "吃东西");
// });
// event.once("buy", person => {
//   console.log(person + "买东西");
// });
// event.fire("drank", "我"); // 我喝水
// event.fire("drank", "我"); // 我喝水
// event.fire("eat", "其它人"); // 其它人吃东西
// event.fire("eat", "其它人"); // 其它人吃东西
// event.fire("buy", "其它人"); // 其它人买东西
// event.fire("buy", "其它人"); // 这里不会再次触发buy事件，因为once只能触发一次
// event.off("eat"); // 移除eat事件
// event.fire("eat", "其它人"); // 这里不会触发eat事件，因为已经移除了

/*
深拷贝和环
*/
