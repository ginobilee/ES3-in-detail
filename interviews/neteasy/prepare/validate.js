// 实现一个函数，验证一个字符串，长度8位，至少包括其中三种或四种（数字，大写，小写，_）

const validate = function(str) {
  if (typeof str !== "string" || str.length !== 8) {
    return false;
  }
  const reg = /(\d+)*([a-z]+)*([A-Z]+)*(_+)*/;
  const match = str.match(reg);
  console.log(match);
};

validate("_jjjj8dD");
