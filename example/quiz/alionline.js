// 请在1个小时内完成以下几道题目，遇到不熟悉的原生对象属性或者API，可以适当使用搜索引擎
//（注意：请不要直接搜索题目答案，自觉遵守规则）

0. 编写一个函数 parseQueryString，它的用途是把 URL 参数解析为一个对象
function parseQueryString(url) {
  // 首先将query段取出，利用split切分并存入对象
  let result = {}
  let query = url.match(/\?(.*)/)
  if (!query) {
    return result
  }
  let str = query[1]
  let querys = str.split('&')
  querys.forEach(q => {
    let arr = q.split('=')
    result[arr[0]] = result[arr[1]]
  })
  return result
}

1. 给一个div：
   <div id="draggable" style="width: 200px; height: 200px; background: #000;"></div>
   用原生JS让这个 div 可拖拽。
   

     
   window.onload = function() {
     function move(e) {
   	   let sleft = e.screenX, stop = e.screenY, target = e.target
       target.style.left = sleft - innerLeft
       target.style.top = stop - innerTop
     }
     function getOffset(target) {
       let left = 0, top = 0
       while(target !== document.body) {
         left += target.offsetLeft
         top = target.offsetTop
         target = target.parentNode
       }
       return {left: left, right: top}
     }
     let innerLeft = 0, innerTop = 0
     let dragDom = document.querySelector('#draggable')
     dragDom.style.position = 'absolute'
     // 在mousedown事件内为元素挂载mousemove事件，使元素跟随鼠标点击点。
     // 在mouseup事件内卸载mousemove事件
     dragDom.addEventListener('mousedown', function(e) {
   	   let sleft = e.screenX, stop = e.screenY, target = e.target
       let {left, top} = getOffset(target)
       innerLeft = sleft - left
       innerTop = stop - top
       dragDom.addEventListener('mousemove', move, false)
     })
     dragDom.addEventListener('mouseup', function(e) {
       dragDom.removeEventListener('mousemove', move)
     })
   }
   
2. 写一个类 EventEmitter，实现简单的发布订阅功能：
   const e = new EventEmitter();  
   e.on('update', function(data) { console.log(data) }); 
   e.emit('update', 'message');
   class EventEmitter() {
     constructor() {
       this.publishers = {}
     }
     on (eventType, cb) {
       if (this.publishers[eventType]) {
         this.publishers[eventType].subers.push(cb)
       } else {
         this.publishers[eventType].subers = [cb] 
       }
     }
     emit (eventType, ...values) {
       let puber = this.publishers[eventType]
       if (!puber) {
         return 
       }
       var that = this
       puber.subers.forEach(function(sub){
         sub.apply(that, values)
       })
     }
   }

3. 实现一个搜索框的智能提示功能，可自己mock一个获取提示数据的接口。
  （如输入”电脑“，显示一个提示列表：电脑游戏 、电脑壁纸、电脑管家、电脑VPN）
  <div id='searchBox'>
      <input id='input' />
      <select id='select' ></select>
  </div>
  <style>
    #searchBox{
      position: relative;
	}
    select{
      position: absolute;
    }
  </style>
  <script>
    window.onload = function() {
      const datas = ['1', '2']
      let input = document.getElementById('input'), select = document.getElementById('select')
      input.addEventListener('change', function(e) {
        let v = e.target.value
        throttle(() => hint(v), 100, e.target)
      })
      const search = function(v) {
        return new Promise((resolve, reject) => {
          try{
          // 实际中，这里会是一个异步操作
            let results = datas.filter(d => d.indexOf(v) === 0)
            resolve(results || [])
          } catch (e) {
            reject(e)
          }
        })
      }
      function hint(val){
        // 根据val动态匹配数据库中字段，将以val开头的项返回
        let fetchResults = search(val)
        fetchResults.then((results) => {
          if (results.length > 0) {
            let fragment = document.createDocumentFragment()
            results.forEach(r => {
              let option = document.createElement('option')
              option.textContent = r
              option.setAttribute('value', r)
              fragment.appendChild(option)
            })
            select.appendChild(fragment)
          }
        } 
      }
      function throttle(cb, timeout, thisObj) {
        // 如果cb已经放在了待执行中，更新cb
        // 连续多次调用throttle应该只运行一次，这样只能将cb放在throttle的外部？用一个闭包实现
        // cbs里如何区分多个cb？直接indexof查询
        // 如何保存每次cb的参数？
        // 使cbs和tos存储次序一致, fire之后将cb和tos中的对应对象删除
          var cbs = [], tos = []
          return function (...args){
            let index = cbs.indexOf(cb)
            if (index === -1) {
               	cbs.push(cb)
                let ti = setTimeout((() => {
                  cb.apply(thisObj, args)
                  tos.splice(index, 1) // index的值会不会发生变化？有点晕，用立即执行解决
                }, timeout)
                tos.push(ti)
            } else {
              let ti = tos[index]
              clearTimeout(ti)
              ti =setTimeout(() => cb.apply(thisObj, args), timeout)
            }
          }
      }
    }
  </script>