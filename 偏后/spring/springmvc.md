> Spring MVC, as many other web frameworks, is designed around the front controller pattern where a central Servlet, the DispatcherServlet, provides a shared algorithm for request processing, while actual work is performed by configurable delegate components. This model is flexible and supports diverse workflows.

> Spring MVC 是一个模型 - 视图 - 控制器（MVC）的Web框架建立在中央前端控制器servlet（DispatcherServlet），它负责发送每个请求到合适的处理程序，使用视图来最终返回响应结果的概念。

> Spring MVC的请求流程：

    第一步：发起请求到前端控制器(DispatcherServlet)

    第二步：前端控制器请求HandlerMapping查找Handler，可以根据xml配置、注解进行查找

    第三步：处理器映射器HandlerMapping向前端控制器返回Handler

    第四步：前端控制器调用处理器适配器去执行Handler

    第五步：处理器适配器去执行Handler

    第六步：Handler执行完成给适配器返回ModelAndView

    第七步：处理器适配器向前端控制器返回ModelAndView。ModelAndView是springmvc框架的一个底层对象，包括 Model和view

    第八步：前端控制器请求视图解析器去进行视图解析，根据逻辑视图名解析成真正的视图(jsp)

    第九步：视图解析器向前端控制器返回View

    第十步：前端控制器进行视图渲染。视图渲染将模型数据(在ModelAndView对象中)填充到request域

    第十一步：前端控制器向用户响应结果


<blockquote>
    
</blockquote>