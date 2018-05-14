# javascript调用native方式
3种方式：
1. 通过schema方式，使用shouldOverrideUrlLoading方法对url协议进行解析。这种js的调用方式与ios的一样，使用iframe来调用native代码。 
2. 通过在webview页面里直接注入原生js代码方式，使用addJavascriptInterface方法来实现。 
3. 使用prompt,console.log,alert方式，这三个方法对js里是属性原生的，在android webview这一层是可以重写这三个方法的。一般我们使用prompt，因为这个在js里使用的不多，用来和native通讯副作用比较少。

# Native调用javascript方式
在android里是使用webview的loadUrl进行调用的，如：
```java
// 调用js中的JSBridge.trigger方法
webView.loadUrl("javascript:JSBridge.trigger('webviewReady')");  
```