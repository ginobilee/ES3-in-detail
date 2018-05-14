对web服务器端开发（nodejs、java）有一定的了解和实践，对web系统安全有一定的了解；


web 系统安全,前端安全的理解／前端安全问题：CSRF和XSS


web 服务器端开发（ nodejs、java ）有一定的了解和实践

手写一个select组件

渐进增强

模版用过没有？字符串怎么解析成模板的？特别是带逻辑的那一块?
react的ssr是输出字符串拼接么？
怎样才算前后端同构？	后端输出后，前端脚本可以继续动态变化；比如更新modal而导致更新dom时，要在前端执行virtual dom检测更更新，而不是在后端重新输出。

代码优化了解过吗？你说的是性能优化。有读过相关的书吗？

比如webpack打包原理、如何写webpack插件等。

用过网易的哪些产品？优势劣势？

请描述以下 request 和 response headers：
Diff. between Expires, Date, Age and If-Modified-...
Do Not Track
Cache-Control
Transfer-Encoding
ETag
X-Frame-Options

请解释 HTTP status 301 与 302 的区别？

你会用什么工具来查找代码中的性能问题

请指出 JavaScript 宿主对象 (host objects) 和原生对象 (native objects) 的区别？

为什么扩展 JavaScript 内置对象不是好的做法？

“三元 (Ternary)” 表示什么意思？


为何通常会认为保留网站现有的全局作用域 (global scope) 不去改变它，是较好的选择？


为何你会使用 load 之类的事件 (event)？此事件有缺点吗？你是否知道其他替代品，以及为何使用它们？

以及如何使spa对搜索引擎友好 (SEO-friendly)。


你能描述渐进增强 (progressive enhancement) 和优雅降级 (graceful degradation) 之间的不同吗?

浏览器同一时间可以从一个域名下载多少资源？
有什么例外吗？

什么是 FOUC (无样式内容闪烁)？你如何来避免 FOUC？

请解释什么是 ARIA 和屏幕阅读器 (screenreaders)，以及如何使网站实现无障碍访问 (accessible)。

浏览器标准模式 (standards mode) 、几乎标准模式（almost standards mode）和怪异模式 (quirks mode) 之间的区别是什么？

# 请解释可变 (mutable) 和不变 (immutable) 对象的区别。
请举出 JavaScript 中一个不变性对象 (immutable object) 的例子？
不变性 (immutability) 有哪些优缺点？
如何用你自己的代码来实现不变性 (immutability)？

Long-Polling、Websockets 和 Server-Sent Event 之间有什么区别？

# angular脏检查 √
每次有事件或异步响应到达时，并不知道回调中改动了哪些值，因此要对modal内的数据做深度遍历，比较某个数据是否有变化。这样的检测机制称为脏检查。
而在vue.js中，由于对modal内的数据建立了观察/发布者模式，因此对于每个数据的变化都可以直接调用观察者的更新api。这样就不用每次在回调中对所有数据进行遍历检测。

## 前后端同构

## 排序 √

# iframe跨域
postMessage, location.hash, window.name?

# 说说你对前端架构师的理解
负责前端团队的管理及与其他团队的协调工作，提升团队成员能力和整体效率； 
带领团队完成研发工具及平台前端部分的设计、研发和维护； 
带领团队进行前端领域前沿技术研究及新技术调研，保证团队的技术领先 
负责前端开发规范制定、功能模块化设计、公共组件搭建等工作，并组织培训。

# mouseenter和mouseover的区别 √
是不是本质上就是子元素的over事件冒泡了？果然，如下：
> mouseenter类似 mouseover，它们两者之间的差别是 mouseenter不会冒泡（bubble），也就是说当指针从它的子层物理空间移到它的物理空间上时不会触发

函数式编程

# 组件化≠模块化。好多人对这两个概念有些混淆。
1. 模块化只是在语言层面上，对代码的拆分；而组件化是基于模块化，在设计层面上，对UI（用户界面）的拆分。
2. 传统前端框架/类库的思想是先组织DOM，然后把某些可复用的逻辑封装成组件来操作DOM，是DOM优先；而组件化框架/类库的思想是先按顶层设计来构思组件，然后用DOM这种基本单元结合相应逻辑来实现组件，是组件优先。


# 框架类

1. angular双向绑定的原理
2. react中setState的流程

# css

1. 左边固定右边自适应CSS布局 不少于3种方法 xxx
	https://segmentfault.com/a/1190000010698609

	- float+bfc
	- flex
	- inline-block+calc
	- float+margin-left | margin-right
	- absolute + margin-left

2. bfc， IFC
	https://zhuanlan.zhihu.com/p/25321647

	BFC 是什么呢？
	> BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

	触发 BFC，只要元素满足下面任一条件即可触发 BFC 特性：
	 - body 根元素
	 - 浮动元素：float 除 none 以外的值
	 - 绝对定位元素：position (absolute、fixed)
	 - display 为inline-block、table-cells、flex
	 - overflow 除了visible 以外的值 (hidden、auto、scroll)

	作用或特性
	- 同一个 BFC 下外边距会发生折叠
	- BFC 可以包含浮动的元素（清除浮动）
	- BFC 可以阻止元素被浮动元素覆盖
3. css动画：translate还是animation
4. CSS3用过哪些新特性
5. 对栅格的理解
6. （水平）居中有哪些实现方式
7. 1像素边框问题
8. 清除浮动的常用方法
9. 从工具层面，社区又创造出Shadow DOM、CSS in JS和CSS Modules三种解决方案。
	Shadow DOM是WebComponents的标准。它能解决全局污染问题，但也使样式彻底私有化了，造成外部无法重写，损失了灵活性；

	CSS in JS是彻底抛弃CSS，使用JS或JSON来写样式。这种方法很激进，不能利用现有的CSS技术，而且处理伪类等问题比较困难；

	CSS Modules仍然使用CSS，只是让JS来管理依赖。它能够最大化地结合CSS生态和JS模块化能力，目前来看是最好的解决方案。


# js
手写parseInt的实现：要求简单一些，把字符串型的数字转化为真正的数字即可，但不能使用JS原生的字符串转数字的API，比如Number()

1. 图片懒加载
2. 实现页面加载进度条
3. 实现extend函数
4. 为什么会有跨域的问题以及解决方式
5. postMessage原理
6. 实现拖拽功能，比如把5个兄弟节点中的最后一个节点拖拽到节点1和节点2之间
7. 实现gulp的功能
8. 节点遍历

	DOM操作——怎样添加、移除、移动、复制、创建和查找节点?
	>   （1）创建新节点
    createDocumentFragment()    //创建一个DOM片段
    createElement()   //创建一个具体的元素
    createTextNode()   //创建一个文本节点
  （2）添加、移除、替换、插入
    appendChild()
    removeChild()
    replaceChild()
    insertBefore() //在已有的子节点前插入一个新的子节点
  （3）查找
    getElementsByTagName()    //通过标签名称
    getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
    getElementById()    //通过元素Id，唯一性

9. 给Date扩展 format 格式化方法，比如：new Date.format("yyyy-mm-dd hh:mm:ss") √
10. 编写验证函数：验证类似username@163.com,username@abc.com,username@adfs.com（我就记得163,其他的我瞎编的，这道题考正则，还有考查字符串或者正则的方法）
11. 编写each({}|[],function(key,value){})函数，要求里面的函数：(我解释下：each函数第一个是对象或者数组，第二个是回调函数)
　　（1）this指向传入对象或数组
　　（2）结果是true,则continue
　　（3）结果是false,则break
12. 用js实现position:absolute的效果
13. 项目中弹框怎么做的？如果你自己写插件，你怎么实现？
14. 实现一个函数，验证一个字符串，长度8位，至少包括其中三种或四种（数字，大写，小写，_）
	<span style="font-size:18px;">^(?![A-Za-z]+$)(?![A-Z\\d]+$)(?![A-Z\\W]+$)(?![a-z\\d]+$)(?![a-z\\W]+$)(?![\\d\\W]+$)\\S{8,20}$</span>  
	https://blog.csdn.net/u012236936/article/details/53895951
15. defer或者async属性
	- 当解析器遇到了设置async属性的<script>元素时，它开始下载脚本，并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器没有停下来等他下载。
	- 所有有defer属性的脚本，在文档完成解析，document.readyState属性变成“interactive”后，会按它们在文档里的出现顺序执行。异步脚本可能也会在这个时间执行。延迟脚本能访问完整的文档树，
	
	- defer为true：延迟加载脚本，在文档完成解析完成开始执行，并且在DOMContentLoaded事件之前执行完成。
	- async为true：异步加载脚本，下载完毕后再执行，在window的load事件之前执行完成

	浏览器的在遇到defer和async属性的<script>的浏览器执行过程如下（以下摘自javascript权威指南）：

		WEB浏览器创建Document对象，并且开始解析WEB页面，解析HTML元素和它们的文本内容后添加Element对象和Text节点到文档中。这个过程的readystate的属性值是“loading”
		当HTML解析器遇到没有async和defer属性的<script>时，它把这些元素添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载（如果需要）和执行解析器会暂停。这样脚本就可以用document.write()来把文本插入到输入流中。解析器恢复时这些文本会成为文档的一部分。同步脚本经常单定义函数和注册后面使用的注册事件处理程序，但它们可以遍历和操作文档树，因为在它们执行时已经存在了。这样同步脚本可以看到他自己的<script>元素和它们之前的文档内容
		当解析器遇到了设置async属性的<script>元素时，它开始下载脚本，并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器没有停下来等他下载。异步脚本禁止document.write()方法。它们可以看到自己的<script>元素和它之前的所有文档元素，并且可能或干脆不可能访问其他的文档内容。
		当文档完成解析，document.readyState属性变成“interactive”。
		所有有defer属性的脚本，会被它们在文档的里的出现顺序执行。异步脚本可能也会在这个时间执行。延迟脚本能访问完整的文档树，禁止使用document.write()方法。
		浏览器在Document对象上触发DOMContentLoaded事件。这标志着程序执行从同步脚本执行阶段转到异步事件驱动阶段。但要注意，这时可能还有异步脚本没有执行完成。
		这时，文档已经完全解析完成，但是浏览器可能还在等待其他内容载入，如图片。当所有这些内容完成载入时，并且所有异步脚本完成载入和执行，document.readyState属性变为“complete”，WEB浏览器出发Window对象上的load事件。
		从此刻起，会调用异步事件，以异步响应用户输入事件，网络事件，计算器过期等。
16. WEB应用从服务器主动推送Data到客户端有那些方式？
	Javascript数据推送
	Commet：基于HTTP长连接的服务器推送技术
	基于WebSocket的推送方案
	SSE（Server-Send Event）：服务器推送数据新方式

17. 用js实现千位分隔符
	https://www.cnblogs.com/freeyiyi1993/p/4603525.html
```JavaScript
	function format(num) {  
	    var reg=/\d{1,3}(?=(\d{3})+$)/g;   
	    return (num + '').replace(reg, '$&,'); 
	}
```
18. React Native,Weex框架的实现原理？

19. hoc of react
a higher-order component is a function that takes a component and returns a new component.

负载均衡


# 优化

1. 项目中使用过哪些优化方法
2. 优化中会提到缓存的问题，问：静态资源或者接口等如何做缓存优化