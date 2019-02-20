从ts编译的结果来看，`interface`其实并不会出现在结果js中。它只是作为ts进行静态语法解析的工具。

# 
> When an interface type extends a class type it inherits the members of the class but not their implementations. It is as if the interface had declared all of the members of the class without providing an implementation. Interfaces inherit even the private and protected members of a base class. This means that when you create an interface that extends a class with private or protected members, that interface type can only be implemented by that class or a subclass of it.

即当一个接口继承了一个类，而这个类有`private`或`protected`属性，那么这个接口只能被这个类或其子类、它们的实例所实现。