
h5与安卓的通信

方式2:
> 通过在webview页面里直接注入原生js代码方式，使用addJavascriptInterface方法来实现。 
在android里实现如下：

```java
class JSInterface {  
    @JavascriptInterface //注意这个代码一定要加上
    public String getUserData() {
        return "UserData";
    }
}
webView.addJavascriptInterface(new JSInterface(), "AndroidJS");  
```

上面的代码就是在页面的window对象里注入了AndroidJS对象。在js里可以直接调用

```javascript
alert(AndroidJS.getUserData()) //UserDate 
```

方式3:
使用prompt,console.log,alert方式，这三个方法对js里是属性原生的，在android webview这一层是可以重写这三个方法的。一般我们使用prompt，因为这个在js里使用的不多，用来和native通讯副作用比较少。