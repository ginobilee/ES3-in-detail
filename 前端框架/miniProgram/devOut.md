在工具打包出来的开发版代码中，有两个html，一个是index.html，一个是index.worker.js。
前者会把 axml 文件转成一个render函数，函数返回的是 react.default.createElement 对xml结构执行解析后 的结果，即一个react element。
后者是对js文件进行的打包，可以在其中找到自己写的js文件。每一个page的js文件被转成如下格式：
``` javascript
(function(module, exports, __webpack_require__) {

"use strict";


var _afAppx = __webpack_require__(/*! @alipay/af-appx */ "@alipay/af-appx");

var _index = __webpack_require__(/*! ../../../service/index */ "./service/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../../../constants/index */ "./constants/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalThis = undefined;
var global = undefined;
var appXRuntimeConfig = undefined;
var self = undefined;
var window = undefined;
var document = undefined;
var location = undefined;
var XMLHttpRequest = undefined;
var AlipayJSBridge = undefined;
var AFAppX = undefined;
var importScripts = undefined;
var fetch = undefined;
var abridge = _afAppx.bridge;
var my = _afAppx.bridge;

_afAppx.$global.currentPageConfig = { "pagePath": "pages/account/finishAccount/finishAccount", "usingComponents": {} };

// pages/account/finishAccount/finishAccount.js

var currentPath = "【/pages/account/finishAccount】";

var app = (0, _afAppx.getApp)();
(0, _afAppx.Page)({
  /**
   * 页面的初始数据
   */
  data: {
    dataInfo: {},
    CONSTANTS: _index4.default,
    goHome: true
  },
  IKnow: function IKnow() {
    this.setData({
      goHome: false
    });
    this.toHome();
  },
  toHome: function toHome() {
    var pages = (0, _afAppx.getCurrentPages)();
    var delta = pages.length - 1;
    if (this.data.goHome) {
      if (delta === 1) {
        return;
      }
    }
    my.navigateBack({
      delta: delta
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    this.getOrderInfo();
  },
  /**
   * 获取订单信息
   */
  getOrderInfo: function getOrderInfo() {
    // console.log(currentPath, "getOrderInfo")
    var body = {
      id: app.globalData.deviceInfo.orderId
    };
    try {
      var _this = this;
      _index2.default.getOrderInfo(body).then(function (res) {
        if (res && res.data) {
          // console.log(currentPath, "got order info: ", res.data)
          _this.setData({
            dataInfo: res.data
          });
        }
      }).catch(function (err) {
        console.error(currentPath, "get order error", err);
      });
    } catch (err) {
      console.error(currentPath, "get order info exception: ", err);
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onUnload: function onUnload() {
    if (this.data.goHome) {
      this.toHome();
    }
  }
});
```

/***/ })
可以看到是调用 _afAppx.Page 对传入的参数进行实例化。

再以 _afAppx. 作为关键字搜索，出现在后缀的还有： bridge/$global/getApp/getCurrentPages/WorkerComponent/App

对于App的调用也跟上面类似，只是传入的是我们写的 app.js中定义的对象
其中有 my = _afAppx.bridge
abridge = _afAppx.bridge



而 _afAppx 来源于：
var _afAppx = __webpack_require__(/*! @alipay/af-appx */ "@alipay/af-appx");
可以认为 @alipay/af-appx 是 worker的框架支持库。






在index.js中，同样可以找到 @alipay/af-appx 的身影，其中用到了 _afAppx 的如下接口： StyleSheet/Swiper/SwiperItem/Image/WorkerComponent/View/Input/Button/Span/Picker...
以及 Page ,但在 index.js 中，page传入的参数是 
(0, _afAppx.Page)({
  pagePath: 'pages/water/waterDevice/waterDevice',

  render: function render() {
    return __webpack_require__(/*! ./waterDevice.axml */ "./pages/water/waterDevice/waterDevice.axml");
  },
  stylesheet: function stylesheet() {
    return __webpack_require__(/*! ./waterDevice.acss */ "./pages/water/waterDevice/waterDevice.acss");
  }
})

在 index.worker.js 中，传入的是 自定义的js文件中的对象。


再通过安卓的边界分析，发现支付宝小程序除了 底部tab区/顶部按钮区 外，是一个webview在展示。（所以如果是rn开发的东西，用安卓边界查看是可以看到的，因为转化成了原生元素。）
