function parseQueryString(url) {
  // 首先将query段取出，利用split切分并存入对象
  let result = {};
  let query = url.match(/\?(.*)/);
  if (!query) {
    return result;
  }
  let str = query[1];
  let querys = str.split("&");
  querys.forEach(q => {
    let arr = q.split("=");
    result[arr[0]] = arr[1];
  });
  return result;
}

let result = parseQueryString(
  "https://mail.google.com/mail/#inbox/1620e0898dad533c?projector=1&messagePartId=0.0"
);
console.log(result);
