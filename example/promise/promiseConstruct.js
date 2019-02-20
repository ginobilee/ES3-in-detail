// 自己实现一个 promise
/**
 * goal: 1. microtask; 2. then/catch/; 3. MyPromise.all/race
 */
/*
const Microtask = (function() {
  const cb = null
  var targetNode = document.createElement("div")

  // Options for the observer (which mutations to observe)
  var config = { attributes: true, childList: true, subtree: true }

  // Callback function to execute when mutations are observed
  var callback = function(mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type == "attributes") {
        console.log("The " + mutation.attributeName + " attribute was modified.")
        // fn()
        cb && cb()
        cb = null
      }
    }
  }

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback)

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config)

  return {
    // push cb into microTask
    push: function(fn) {
      cb = fn
      targetNode.setAttribute("test", "test")
    },
    close: function() {
      observer.disconnect()
    }
  }
})()*/
const Microtask = {
  push: function(fn) {
    nextTick(fn)
  }
}

function resolve(...args) {
  const _this = this
  if (_this.state !== "pending") {
    return
  }
  _this.state = "resolved"
  _this.value = args && args[0]
  _this.cbs.forEach(function(cb) {
    if (cb instanceof FutureMyPromise) {
      const r = cb.resolveFn && cb.resolveFn.apply(null, [_this.value])
      if (r instanceof MyPromise) {
        cb.cbs &&
          cb.cbs.forEach(function(scb) {
            // scb should be a FutureMyPromise
            r.then(scb.resolveFn, scb.rejectFn)
          })
      } else {
        let subMyPromise = new MyPromise(function(res) {
          res(r)
        })
        cb.cbs &&
          cb.cbs.forEach(function(scb) {
            // scb should be a FutureMyPromise
            subMyPromise.then(scb.resolveFn, scb.rejectFn)
          })
      }
    } else {
      console.log("error: cb in cbs of this promise is not a FutureMyPromise!")
    }
  })
}
function reject(...args) {
  const _this = this
  if (_this.state !== "pending") {
    return
  }
  _this.state = "rejected"
  _this.rejectCbs.forEach(rejectCb => {
    // 这里应该是将其推入microtask，而非执行
    //resolveCb.apply(null, )
    Microtask.push(rejectCb.bind(null, args))
  })
}
function MyPromise(fn) {
  this.state = "pending"
  this.value = undefined
  this.cbs = []
  this.resolveCbs = []
  this.rejectCbs = []
  const res = resolve.bind(this)
  const rej = reject.bind(this)
  // console.log(typeof fn, typeof res)
  fn.apply(null, [res, rej])
}

MyPromise.prototype.then = function(...args) {
  if (this.state === "resolved") {
    // execute fn
    const resolveFn = args && args[0]
    // console.log(resolveFn)
    if (resolveFn) {
      const r = resolveFn.apply(null, [this.value])
      if (r instanceof MyPromise) {
        return r
      } else {
        return new MyPromise(resolve => {
          resolve(r)
        })
      }
    } else {
      return new MyPromise(resolve => resolve(this.value))
    }
  } else if (this.state === "rejected") {
    // execute reject fn
    // if (args.length > 1 ) {
    //   rejectFn = args[1]
    //   const r
    // }
  } else {
    // pending
    // push into stack
    // 当前的promise还是pending状态，用then注册了一个回调。需要返回一个promise，以提供后续的then操作。
    // 但是，这个promise应该在当前的promise解决之后才进行构造才对
    // 也就是说，这个promise应该以回调的形式插入
    const resolveFn = args && args[0]
    const rejectFn = args && args[1]

    // this.resolveCbs.push({promise: p, resolve: r})
    const p = new FutureMyPromise(resolveFn, rejectFn)
    this.cbs.push(p)
    return p
  }
}

function FutureMyPromise(resolveFn, rejectFn) {
  this.resolveFn = resolveFn
  this.rejectFn = rejectFn
  this.cbs = []
}
FutureMyPromise.prototype.then = function(resolveFn, rejectFn) {
  // this.resolveCbs.push(resolveFn)
  // this.rejectCbs.push(rejectFn)
  let newPromise = new FutureMyPromise(resolveFn, rejectFn)
  this.cbs.push(newPromise)
  return newPromise
}

/* ---------------------------------------- test ----------------------------------- */
/**
 * case 1: return p.then() 
 const p = (function() {
   let p = new MyPromise(function(resolve) {
     // resolve(1)
     setTimeout(() => {
       resolve(1)
      }, 10)
    })
    return p.then(v => {
      console.log("v in inner p.then: ", v)
      console.log(12)
    })
  })()
  p.then(v => {
    console.log(v)
  })
  */
/**
 * case 2: p.then; return p
 const p = (function() {
   let p = new MyPromise(function(resolve) {
     // resolve(1)
     setTimeout(() => {
       resolve(1)
      }, 10)
    })
    p.then(v => {
      console.log("v in inner p.then: ", v)
      console.log(12)
    })
    return p
  })()
  p.then(v => {
    console.log(v)
  })
*/
const p = (function() {
  let p = new MyPromise(function(resolve) {
    // resolve(1)
    setTimeout(() => {
      resolve(1)
    }, 10)
  })
  p.then(v => {
    console.log("v in inner p.then: ", v)
    console.log(12)
  })
  return p
})()
p.then(v => {
  let pp = new MyPromise(resolve => {
    console.log(2)
    resolve(3)
  })
  console.log(v)
  return pp
})
  .then()
  .then(v => {
    console.log("the last then in format")
    console.log(v)
  })
