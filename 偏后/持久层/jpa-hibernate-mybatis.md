> 如果使用Spring Data JPA和Hibernate等ORM的框架而没有以面向对象思想和方法去分析和设计系统，而是抱怨框架不能灵活操作sql查询数据，那就是想让狗去帮你拿耗子了。

> MyBatis对于面向对象的概念强调比较少，更适用于灵活的对数据进行增、删、改、查

> 面向对象试图为动态的世界建模，他要描述的是世界的过程和规律，进而适应发展和变化，面向对象总是在变化中处理各种各样的变化。而关系型模型为静态世界建模，它通过数据快照记录了世界在某一时候的状态，它是静态的。

> MyBatis更适合于面向关系（或面向数据、或面向过程）的系统设计方法，这样的系统一般称为“事务脚步”系统（事务脚步（Transaction Script） 出自Martin Fowler 2004年所著的企业应用架构模式（Patterns of Enterprise Application Architecture））。而hibernate（也可以说Spring Data JPA)更适合于构建领域模型类的系统。当然，我们也不能说MyBatis无法构建领域模型驱动的系统，而hibernate无法构建事务脚步系统。只是用MyBatis构建领域模型要做更多、跟脏、更累的工作；而用hibernate构建一个事务脚本系统有些大材小用，数据的查询反而没那么灵活。

hibernate: 用pojo代替数据库操作，默认封装简单语句
mybatis: 灵活的查询/更新定制化操作

笑联采用mybatis而非hibernate是不是出于灵活性和性能的考虑？比如：
1. mybatis可以更灵活地定制 crud
2. mybatis可以自定义sql，就意味着可以直接确定sql语句，从而查找sql的问题和优化sql
3. hibernate用反射的机制，可能会存在性能问题。

question: 
1. hibernate 中，用户写的也是interface，自定义的interface是如何执行的？

ref: 
https://blog.csdn.net/xihuanyuye/article/details/81201441