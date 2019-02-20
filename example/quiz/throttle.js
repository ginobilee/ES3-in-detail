const hint = () => {};
const throttle = (cb, timeout) => {
  // 在timeout内只执行一次，但最少执行一次。
  // 将当前时间与上次调用时间lastTickTime比较，如果大于timeout，可以认为已经触发。
  // 此时将lastTickTime置为当前时间，并在timeout之后执行回调。
  // 用params来存储每次传入的参数。
  // 当在timeout之内发生调用更新params，重新计算要触发的时延，取消之前的settimeout并重新设置settimeout
  // 'firstCalled' is the flag means this is the first time the cb is clicked in timeout
  let lastTickTime, context,
    firstCalled = true,
    params = [],
    ti;
  return function(...args) {
    let newTime = Date.now();
    params = args;
    if (!lastTickTime || newTime - lastTickTime > timeout) {
      firstCalled = true;
      // should believe cb has been called . set new lastTickTime and setTimeout
      lastTickTime = newTime;
      context = this;
      ti = setTimeout(cb.bind(context, params), timeout);
    } else {
      // called again in timeout
      let newTimeout = timeout - (newTime - lastTickTime);
      if (ti) {
        clearTimeout(ti);
      }
      ti = setTimeout(cb.bind(context, params), newTimeout);
    }
  };
};
input.addEventListener("click", throttle(hint, 100));

const debounce = (cb, timeout) => {
  // if new call comes between last call and timeout, reset timer
  let ti;
  let lastTickTime;
  return function(...args) {
    let now = Date.now();
    let that = this;
    if (lastTickTime && now - lastTickTime < timeout) {
      // ti must not be empty
      clearTimeout(ti);
    }
    lastTickTime = now;
    ti = setTimeout(cb.bind(that, ...args), timeout);
  };
};
