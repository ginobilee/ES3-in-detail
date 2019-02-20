> Native调用Javascript语言，是通过UIWebView组件的stringByEvaluatingJavaScriptFromString方法来实现的，该方法返回js脚本的执行结果。

> 从上面代码可以看出它其实就是调用了window下的一个对象，如果我们要让native来调用我们js写的方法，那这个方法就要在window下能访问到。但从全局考虑，我们只要暴露一个对象如JSBridge对native调用就好了，

# Javascript调用Native（Objective-C或Swift）方法
> 需要间接地通过一些方法来实现。UIWebView有个特性：在UIWebView内发起的所有网络请求，都可以通过delegate函数在Native层得到通知。这样，我们就可以在UIWebView内发起一个自定义的网络请求，通常是这样的格式：jsbridge://methodName?param1=value1&param2=value2

> 于是在UIWebView的delegate函数中，我们只要发现是jsbridge://开头的地址，就不进行内容的加载，转而执行相应的调用逻辑。

> 发起这样一个网络请求有两种方式：1. 通过localtion.href；2. 通过iframe方式； 通过location.href有个问题，就是如果我们连续多次修改window.location.href的值，在Native层只能接收到最后一次请求，前面的请求都会被忽略掉。

即， js调用ios的原生，本质上还是一种js向ios用某种格式传参数的机制,native读出参数进行对应的执行。






js -> native
1. ios
	通过固定的shema访问，ios拦截该请求。
2. android
	固定的shema；prompt/alert/console；android设置 addJavascriptInterface，js可以调用该方法


native -> js
1. ios
	stringByEvaluateJavascriptFromString. js中在全局对象上挂载方法。
2. android
	webview.loadurl, js在全局对象上挂载方法。
