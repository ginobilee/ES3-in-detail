weex sdk ?

通过 AppCache 或类似的方式对 JS bundle 在客户端进行缓存或预加载以降低网络通信的成本等。?

> Weex 采用了 vDOM 机制，在 JavaScript context 中维护页面布局，并通过向移动端发送规范化的渲染指令，在移动端直接通过 iOS 和 Android 的界面框架生成原生的 UI 进行渲染。

> 未来还会通过跨平台内核将 DOM 管理移至 native 层实现来彻底解决 native 与 JavaScript 层异步通信成本的问题

> Expression Binding 的交互理念提升了 Weex 的交互性能

> 基于模板和数据分离的 recycle list 组件

rax

Weex渲染流程由Native发起，通过JsBridge传给V8引擎，处理后回传指令到Native；
Dom相关的操作使用WXDomHandler切换到Dom线程操作；
layoutNodeImpl是核心测量过程解析FlexBox布局，计算Dom的位置信息并存储；
接下来WXRenderHandler将后续工作线程切换到RenderThread也就是UI线程；
由Component创建具体的View；
setLayout实际上是将位置信息转换为原生View识别的params；
addEvents添加事件；
bindData设置style及赋值；

下面我们对Weex的渲染和Android的渲染流程进行一下对比：

对于Android原生的渲染需要经过Measure、Layout、Draw等步骤；
对于Weex的来说，Android原生的渲染流程是全有的而且只是一部分，因为我们虽然写的是Js代码但是实际显示的确是Native控件；
那么Weex比原生多的流程就是：与V8的交互、关于Dom的解析与生成、设置属性与赋值（扩展）等；


> 在移动应用客户端里，Weex SDK 会准备好一个 JavaScript 执行环境，并且在用户打开一个 Weex 页面时在这个执行环境中执行相应的 JS bundle，并将执行过程中产生的各种命令发送到 native 端进行界面渲染、数据存储、网络通信、调用设备功能及用户交互响应等功能；