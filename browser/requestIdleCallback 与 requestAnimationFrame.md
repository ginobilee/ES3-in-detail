requestIdleCallback 与 requestAnimationFrame

### requestAnimationFrame
window.requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。

在大多数浏览器里，当运行在后台标签页或者隐藏的<iframe> 里时，requestAnimationFrame() 会暂停调用以提升性能和电池寿命。

回调函数会被传入一个参数，DOMHighResTimeStamp，指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间

demo:
```
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

### requestIdleCallback

window.requestIdleCallback()会在浏览器空闲时期依次调用函数， 这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这样延迟触发而且关键的事件产生影响。函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间

#### 返回值节
一个无符号长整数，可以把它传入 Window.cancelIdleCallback(callback, options) 方法，来结束回调

callback会接收到一个名为 deadline 的参数，它具有如下属性:
timeRemaining： 一个返回DOMHighResTimeStamp的函数的引用。
didTimeout： 布尔型，如果 callback 在空闲时间被客户端执行，它的值为 false，其他情况它的值为 true (例如：options 中给了超时时间，并且在超时过期时仍没有足够的空闲时间)。

options具有如下属性:
timeout：timeout 值被指定为正数时，当做浏览器调用 callback 的最后期限。它的单位是毫秒

### 一帧里面浏览器都要做哪些事情
用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。
假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调

requestIdleCallback里面最好不要进行可DOM修改操作，而应在requestAnimationFrame中进行。

推荐的做法是在requestAnimationFrame里面做dom的修改，可以在requestIdleCallback里面构建Document Fragment，然后在下一帧的requestAnimationFrame里面应用Fragment。

refs:
https://juejin.im/post/5ad71f39f265da239f07e862