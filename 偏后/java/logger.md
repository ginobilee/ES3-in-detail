在biz或service中为通过loggerfactory.getlogger 得到的logger，默认会生成日志记录文件么？

Appender主要用于指定日志输出的目的地，目的地可以是控制台、文件、远程套接字服务器、 MySQL、PostreSQL、 Oracle和其他数据库、 JMS和远程UNIX Syslog守护进程等。 

子节点<loger>：用来设置某一个包或具体的某一个类的日志打印级别、以及指定<appender>。<loger>仅有一个name属性，一个可选的level和一个可选的addtivity属性。
可以包含零个或多个<appender-ref>元素，标识这个appender将会添加到这个loger

addtivity: 是否向上级loger传递打印信息。默认是true。同<loger>一样，可以包含零个或多个<appender-ref>元素，标识这个appender将会添加到这个loger。

logger 和 appender 是什么关系？
Logback将执行日志事件输出的组件称为Appender，实现的Appender必须继承 ch.qos.logback.core.Appender 接口