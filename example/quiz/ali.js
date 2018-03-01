// destructuringArray( [1,[2,4],3], "[a,[b],c]" );
// result
// { a:1, b:2, c:3 }

// 对数组的每一层，判断元素是数组还是直接值。前者嵌套解决，后者直接赋值
// 怎样拆分模版字符串？为每个变量添加引号，并用JSON.parse编译成数组
// 用数组的forEach方法对每个元素进行解析

const addQuoteForVar = str => {
  let regex = /([_\d\w]+)/g;
  return str.replace(regex, '"$1"');
};

let arr = [1, [2, 4], 3];
let keyStr = "[a, [b], c]";
let result = { a: 1, b: 2, c: 3 };
const log = console.log;
const parse = JSON.parse;
const destructuringArray = (arr, keyStr) => {
  let keyArr;
  if (typeof keyStr === "string") {
    keyArr = JSON.parse(addQuoteForVar(keyStr));
  } else {
    keyArr = keyStr;
  }
  let result = {};
  keyArr.forEach((key, index) => {
    if (keyArr[index] instanceof Array) {
      let partialResult = destructuringArray(arr[index], keyArr[index]);
      // result = { ...reuslt, ...partialResult };
      Object.keys(partialResult).forEach(
        key => (result[key] = partialResult[key])
      );
    } else if (typeof keyArr[index] === "string") {
      result[keyArr[index]] = arr[index];
    } else {
      throw new Error("参数不匹配");
    }
  });
  return result;
};
log(destructuringArray(arr, keyStr));
console.dir(destructuringArray(arr, keyStr));
// add quote for string
// log(addQuoteForVar(reg));
/*
const yourFunction = function(func, threshold) {
  // 请实现
  return searchText => {
    return setTimeout(func.bind(null, searchText), threshold);
  };
};
const triggerSearch = yourFunction(val => {
  const { onSearch } = this.props;
  onSearch(val);
  console.log(val);
}, 300);
triggerSearch("hha");
*/
