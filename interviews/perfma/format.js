// 2
/**
 * 请封装时间格式化函数和时间差格式化函数
 */

/**
 * @param {timestamp} t
 * @param {string} format: format string
 * format string:
 * -'yyyy': full year
 * -'MM': full month, with 0 appended
 * -'M': month whithout 0
 * -'DD': day with 0 appended
 * -'D': day without 0
 * -'H': hour of 24 hour format
 * -'mm': minutes with 0 appended
 * -'m': minutes without 0
 * -'ss' : seconds with 0
 * -'s': seconds without 0
 */
const adding0 = (str, length) => {
  str = str.toString();
  for (let i = 0; i < length - str.length; i++) {
    str = 0 + str;
  }
  return str;
};
const formatFuncFactory = (reg, methodName) => {
  return (date, format) => {
    return format.replace(reg, (match, p1) => {
      if (p1) {
        let val = date[methodName].apply(date);
        return p1.length > 1 ? adding0(val, p1.length) : val;
      }
    });
  };
};
/**
 *
 * @param {*} date : number or Date object
 * @param {*} format
 */
const formatYear = (date, format) => {
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").slice(4 - RegExp.$1.length)
    );
  }
  return format;
};
const formatMonth = (date, format) => {
  return format.replace(/(M+)/, (match, p1) => {
    if (p1) {
      let m = date.getMonth() + 1;
      return p1.length > 1 ? adding0(m, p1.length) : m;
    }
  });
};
const formatDate = formatFuncFactory(/(D+)/, "getDate");
const formatHours = formatFuncFactory(/(H+)/, "getHours");
const formatMinutes = formatFuncFactory(/(m+)/, "getMinutes");
const formatSeconds = formatFuncFactory(/(s+)/, "getSeconds");
const formatArr = [
  formatYear,
  formatMonth,
  formatDate,
  formatHours,
  formatMinutes,
  formatSeconds
];
const formatTime = (t, format) => {
  const date = typeof t === "number" ? new Date(t) : t;
  if (Object.prototype.toString.apply(date) !== "[object Date]") {
    return;
  }
  formatArr.forEach(f => (format = f(date, format)));
  return format;
};

/**
 *
 * @param {*} t1 : timestamp
 * @param {*} t2 : timestamp
 * @param {*} format: format string
 */
const formatSpan = (t1, t2, format) => {
  let span = Math.abs(t1 - t2);
  let date = new Date(span);
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, date.getFullYear() - 1970 + "");
  }
  return formatTime(span, format);
};

const t1 = new Date();
const t2 = 1999999999;

console.log(formatTime(t1, "yyyy-MM-DD HH:mm:s"));
console.log(formatTime(t1, "yyyy"));
console.log(formatSpan(t1, t2, "yyyy-MM-D-H:m:s"));
