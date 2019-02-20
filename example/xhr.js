function reqListener() {
  console.log(this.responseText)
}

var oReq = new XMLHttpRequest()
oReq.addEventListener("load", reqListener)
oReq.open("POST", "http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=shoe&bk_length=60")
oReq.send()
