// 2
/**
 * 请封装时间格式化函数和时间差格式化函数
 */

/**
 * @param {*} t : timestamp
 * @param {*} format: format string
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
const formatWith0 = (reg, methodName) => {
  return function (date, format) {
    if (reg.test(format)) {
      let d = date[methodName].apply(date)
      let dd = d < 10 ? '0' + d : d
      format = format.replace(RegExp.$1, RegExp.$1.length > 1 ? dd : d)
    }
    return format
  }
}
/**
 *
 * @param {number | Date} date
 * @param {string} format
 */
const formatYear = (date, format) => {
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').slice(4 - RegExp.$1.length)
    )
  }
  return format
}
const formatMonth = (date, format) => {
  if (/(M+)/.test(format)) {
    let m = date.getMonth() + 1
    let mm = m < 10 ? '0' + m : m
    format = format.replace(RegExp.$1, RegExp.$1.length > 1 ? mm : m)
  }
  return format
}
const formatDate = formatWith0(/(D+)/, 'getDate')
const formatHours = formatWith0(/(H+)/, 'getHours')
const formatMinutes = formatWith0(/(m+)/, 'getMinutes')
const formatSeconds = formatWith0(/(s+)/, 'getSeconds')
const formatArr = [
  formatYear,
  formatMonth,
  formatDate,
  formatHours,
  formatMinutes,
  formatSeconds
]
const formatTime = (t, format) => {
  const date = typeof t === 'number' ? new Date(t) : t
  if (Object.prototype.toString.apply(date) !== '[object Date]') {
    return
  }
  formatArr.forEach(f => (format = f(date, format)))
  return format
}

/**
 *
 * @param {*} t1 : timestamp
 * @param {*} t2 : timestamp
 * @param {*} format: format string
 */
const formatSpan = (t1, t2, format) => {
  let span = Math.abs(t1 - t2)
  let date = new Date(span)
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, date.getFullYear() - 1970 + '')
  }
  return formatTime(span, format)
}

const t1 = 19999999999999
const t2 = 1999999999

console.log(formatTime(t1, 'yyyy-M-DD-HH:mm:s'))
console.log(formatTime(t1, 'yyyy'))
console.log(formatSpan(t1, t2, 'yyyy-MM-D-H:m:s'))
