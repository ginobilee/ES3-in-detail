// 解析url：var str = 'http://s.weibo.com/weibo/Aralic?topnav=1&wvr=6'获得参数名和参数值：

// function getQuery(str) {
//   const indexOfQuestionMark = str.indexOf("?")
//   if (indexOfQuestionMark === -1) {
//     return {}
//   }
//   const query = str.slice(indexOfQuestionMark + 1)
//   const queries = query.split("&")
//   const result = {}
//   for (let e of queries) {
//     const r = e.split("=")
//     result[r[0]] = r[1]
//   }
//   return result
// }

function getQuery(str) {
  const reg = /\?(([^=]*)=([^=]*)&)*(([^=]*)=([^=]*))/g
  const match = reg.exec(str)
  console.log(match)
}

// test
const log = console.log
log(getQuery("http://s.weibo.com/weibo/Aralic?topnav=1&wvr=6&ty=9"))
