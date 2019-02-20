### tomcat / servlet /springmvc

Tomcat是Servlet的运行容器，Servlet是处理动态请求的控制器。

前端的请求首先被tomcat处理成 HttpServletRequest 对象，然后tomcat选择匹配的servlet进行处理。servlet针对 HttpServletRequest 对象进行计算，返回 HttpServletResponse 作为响应。tomcat将此对象解析为对应的格式(满足http协议)后返回。

其中，springmvc就是servlet用来处理请求的一个框架支持。它处理流程如下：
1. 根据handlermapping选择合适的handler(handlermapping可以是基于xml或注解)
2. 调用handleradpter来访问handler
3. handlerAdapter 调用 handler ，handler中会读取req并进行计算然后返回resp
4. handlerAdapter 将此resp封装为 ModalAndView 返回servlet
5. servlet 调用 视图解析器 去进行视图解析，生成 view。
6. 视图解析器向前端返回 view
7. servlet 将 modal 填充入 view ，填充到request域
8. servlet 返回resp

> Spring 的MVC框架用控制反转把业务对象和控制逻辑清晰地隔离。它也允许以声明的方式把请求参数和业务对象绑定。

> ??? springmvc 与 strus 区别？


### spring bean

> 10.经过流程9之后，就可以正式使用该Bean了,对于scope为singleton的Bean,Spring的ioc容器中会缓存一份该bean的实例，而对于scope为prototype的Bean,每次被调用都会new一个新的对象，期生命周期就交给调用方管理了，不再是Spring容器进行管理了

如何设置一个bean为单例或原型模式？

<blockquote>
Spring中的自动装配有哪些限制？
答：

如果使用了构造器注入或者setter注入，那么将覆盖自动装配的依赖关系。
基本数据类型的值、字符串字面量、类字面量无法使用自动装配来注入。
优先考虑使用显式的装配来进行更精确的依赖注入而不是使用自动装配。
</blockquote>


什么是自动装配，如何自动装配？

<blockquote>
什么是IoC和DI？DI是如何实现的？
IOC
IOC是Inversion of Control的缩写，“控制反转”之意。 软件系统在没有引入IOC容器之前，对象A依赖于对象B，那么对象A在初始化或者运行到某一点的时候，自己必须主动去创建对象B或者使用已经创建的对象B。无论是创建还是使用对象B，控制权都在自己手上。 软件系统在引入IOC容器之后，这种情形就完全改变了，由于IOC容器的加入，对象A与对象B之间失去了直接联系，所以，当对象A运行到需要对象B的时候，IOC容器会主动创建一个对象B注入到对象A需要的地方。 通过前后的对比，我们不难看出来：对象A获得依赖对象B的过程,由主动行为变为了被动行为，控制权颠倒过来了，这就是“控制反转”这个名称的由来。

DI
2004年，Martin Fowler探讨了同一个问题，既然IOC是控制反转，那么到底是“哪些方面的控制被反转了呢？”，经过详细地分析和论证后，他得出了答案：“获得依赖对象的过程被反转了”。控制被反转之后，获得依赖对象的过程由自身管理变为了由IOC容器主动注入。 依赖注入(DI)和控制反转(IOC)是从不同的角度的描述的同一件事情，就是指通过引入IOC容器，利用依赖关系注入的方式，实现对象之间的解耦。

优点
降低类之间耦合，可维护性比较好，非常便于进行单元测试，便于调试程序和诊断故障。 模块之间通过接口交流，互不干扰，便于团队开发。 可复用性好 模块具有热插拔特性，可直接修改配置文件。

缺点
引入了第三方IOC容器，生成对象的步骤变得有些复杂 IOC容器生成对象是通过反射方式，在运行效率上有一定的损耗。 额外的配置工作。
</blockquote>


<blockquote>
解释一下什么叫AOP（面向切面编程）？
答：AOP（Aspect-Oriented Programming）指一种程序设计范型，该范型以一种称为切面（aspect）的语言构造为基础，切面是一种新的模块化机制，用来描述分散在对象、类或方法中的横切关注点（crosscutting concern）。
</blockquote>

aop是通过为程序添加指定的功能实现的。实现这个添加，要依赖如下步骤: 
1. 定义切面，这包括 切点(pointcut) 和 连接点(jointpoint) , 前者是aspect面切入业务程序的入口，后者是业务程序接纳 切面功能的 接口。
2. 定义实现aop的功能(advice)。这可以认为是一段具体的代码，将其通过 切点 和 连接点 注入到业务程序中，业务程序被动执行了这些代码，实现了aop。因此也将advice 译为 增强。
3. 定义将advice 注入业务程序的方式 weaving。可以分为 编译器织入；装载期织入；运行时织入。顾名可知其意。Spring采用了动态代理的方式实现了运行时织入，而AspectJ采用了编译期织入和装载期织入的方式。
4. 切面 aspect = pointcut + advice + jointpoint definition
5. introduction 是一种特殊的 advice，它为类添加一些属性和方法。这样，即使一个业务类原本没有实现某个接口，通过引介功能，可以动态的为该业务类添加接口的实现逻辑，让业务类成为这个接口的实现类。

<blockquote>
	AOP核心就是切面，它将多个类的通用行为封装成可重用的模块，该模块含有一组API提供横切功能。比如，一个日志模块可以被称作日志的AOP切面。根据需求的不同，一个应用程序可以有若干切面。在Spring AOP中，切面通过带有@Aspect注解的类实现。
</blockquote>

bean在 spring 中到底是什么粒度的一个概念？理解了这点，才能理解 自动装配的方式



<blockquote>
	Spring中如何使用注解来配置Bean？有哪些相关的注解？
答：首先需要在Spring配置文件中增加如下配置：

<context:component-scan base-package="org.example"/>
然后可以用@Component、@Controller、@Service、@Repository注解来标注需要由Spring IoC容器进行对象托管的类。这几个注解没有本质区别，只不过@Controller通常用于控制器，@Service通常用于业务逻辑类，@Repository通常用于仓储类（例如我们的DAO实现类），普通的类用@Component来标注。
</blockquote>

<blockquote>
	什么是Spring beans?
Spring beans 是那些形成Spring应用的主干的java对象。它们被Spring IOC容器初始化，装配，和管理。这些beans通过容器中配置的元数据创建。比如，以XML文件中 的形式定义。

Spring 框架定义的beans都是单件beans。在bean tag中有个属性”singleton”，如果它被赋为TRUE，bean 就是单件，否则就是一个 prototype bean。默认是TRUE，所以所有在Spring框架中的beans 缺省都是单件。
</blockquote>

看上面这段话，似乎 bean 就是一个普通的类。当这个类需要 spring 容器为其管理依赖时，就称其为一个bean。可以这样理解么？


> Bean 工厂和 Application contexts 有什么区别？

> 什么是bean的自动装配？

比如以注解的方式加载bean，自动装配是指不加注解直接通过类或接口加载么？

> 什么是基于Java的Spring注解配置? 

<blockquote>
	@Autowired 注解
@Autowired 注解提供了更细粒度的控制，包括在何处以及如何完成自动装配。它的用法和@Required一样，修饰setter方法、构造器、属性或者具有任意名称和/或多个参数的PN方法。
</blockquote>

> SpringJDBC 框架 与 mybatis 又是什么关系？

> Hibernate 是做什么的？


> spring 的编程式事务管理是如何执行的，什么原理？

