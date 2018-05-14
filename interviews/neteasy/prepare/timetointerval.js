// 手写用setTimeout模拟setInterval
// 是不是也可以用闭包来实现？闭包内保存ti，然后向外暴露两个接口，
/*
class IntervalModule {
  constructor() {
    this.ti = null;
  }
  setInterval(cb, timeout) {
    const intervalCb = () => {
      this.ti = setTimeout(intervalCb, timeout);
      cb();
    };
    this.ti = setTimeout(intervalCb, timeout);
  }
  cancel() {
    if (this.ti) {
      Promise.resolve().then(() => clearTimeout(this.ti));
    }
  }
}
*/
// 一个是setInterval,一个是cancle。然后cancel就会调用闭包的ti进行clearTimeout.
const intervalManager = function(cb, timeout) {
  let _ti = null;
  const _intervalCb = () => {
    _ti = setTimeout(_intervalCb, timeout);
    cb();
  };
  _ti = setTimeout(_intervalCb, timeout);
  return {
    cancel: () => {
      if (_ti) {
        clearTimeout(_ti);
      }
    }
  };
};
let count = 0;
const cb = function() {
  count++;
  if (count === 5) {
    interval.cancel();
  }
  console.log("haha", count);
};
const interval = intervalManager(cb, 100);
