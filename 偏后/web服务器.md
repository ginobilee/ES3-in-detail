HTTP服务器本质上也是一种应用程序——它通常运行在服务器之上，绑定服务器的IP地址并监听某一个tcp端口来接收并处理HTTP请求，这样客户端（一般来说是IE, Firefox，Chrome这样的浏览器）就能够通过HTTP协议来获取服务器上的网页（HTML格式）、文档（PDF格式）、音频（MP4格式）、视频（MOV格式）等等资源。

不仅仅是Apache HTTP Server和Nginx，绝大多数编程语言所包含的类库中也都实现了简单的HTTP服务器方便开发者使用：HttpServer (Java HTTP Server )Python SimpleHTTPServer。使用这些类库能够非常容易的运行一个HTTP服务器，它们都能够通过绑定IP地址并监听tcp端口来提供HTTP服务。

Apache Tomcat则是Apache基金会下的另外一个项目，与Apache HTTP Server相比，Tomcat能够动态的生成资源并返回到客户端。Apache HTTP Server和Nginx都能够将某一个文本文件的内容通过HTTP协议返回到客户端，但是这个文本文件的内容是固定的——也就是说无论何时、任何人访问它得到的内容都是完全相同的，这样的资源我们称之为静态资源。动态资源则与之相反，在不同的时间、不同的客户端访问得到的内容是不同的，例如：包含显示当前时间的页面显示当前IP地址的页面。Apache HTTP Server和Nginx本身不支持生成动态页面，但它们可以通过其他模块来支持（例如通过Shell、PHP、Python脚本程序来动态生成内容）。如果想要使用Java程序来动态生成资源内容，使用这一类HTTP服务器很难做到。Java Servlet技术以及衍生的Java Server Pages技术可以让Java程序也具有处理HTTP请求并且返回内容（由程序动态控制）的能力，Tomcat正是支持运行Servlet/JSP应用程序的容器（Container）:

Tomcat运行在JVM之上，它和HTTP服务器一样，绑定IP地址并监听TCP端口，同时还包含以下指责：
1. 管理Servlet程序的生命周期
2. 将URL映射到指定的Servlet进行处理
3. 与Servlet程序合作处理HTTP请求——根据HTTP请求生成 HttpServletRequest 对象并传递给Servlet进行处理，将Servlet中的 HttpServletResponse 对象生成的内容返回给浏览器

虽然Tomcat也可以认为是HTTP服务器，但通常它仍然会和Nginx配合在一起使用：
1. 动静态资源分离——运用Nginx的反向代理功能分发请求：所有动态资源的请求交给Tomcat，而静态资源的请求（例如图片、视频、CSS、JavaScript文件等）则直接由Nginx返回到浏览器，这样能大大减轻Tomcat的压力。
2. 负载均衡，当业务压力增大时，可能一个Tomcat的实例不足以处理，那么这时可以启动多个Tomcat实例进行水平扩展，而Nginx的负载均衡功能可以把请求通过算法分发到各个不同的实例进行处理.

总结: tomcat既是一个http服务器，也是一个servlet/jsp容器。它绑定ip并监听tcp端口，将制定的请求交给sevlet处理，将运行sevlet生成的动态内容返回给请求端。



### 多个Nginx如何实现集群（没具体方案，只是初步探究）

https://www.cnblogs.com/EasonJim/p/7807794.html