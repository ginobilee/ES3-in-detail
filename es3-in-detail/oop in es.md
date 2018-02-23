# ECMAScript中的oop

> *Prototype* is an object, which is used either as an *original copy* for other objects, or as a *helper object to which characteristics other objects can delegate* in case if these objects do not have the necessary characteristic themselves.

> That is, in contrast with the static class based implementation, in case of impossibility to respond the message, the conclusion is: *the object at the moment does not have the requested characteristic, however to get the result is still possible if to try to analyze alternative prototype chain, or probably, the object will have such characteristic after a number of mutations*.

> The basic purpose of the encapsulation, repeat, is an *abstraction* from the user of the *auxiliary helper data* and not a “way to secure object from hackers”. 

> Encapsulating *auxiliary* helper (local) objects, we provide possibility for further behavior changes of the public-interface with a *minimum of expenses*, localizing and predicting places of these changes. *And exactly this is the main encapsulation purpose*.





这篇文章讨论了oop的一般理论，并把es对oop的实现与其他oop实现做了对比。通过对比，作者指出，es的oop实现的根本特点在于**动态的原型**。可以认为，其对立面恰是**静态的类**(java?)。作者通过对对象的继承/扩展/修改等操作的比较，剖析了这两种oop实现的区别。在这种对比中，可以清晰地看到es作为一种动态语言，在对象操作上十分灵活(自由地声明、改变实例对象/原型的属性)。

剖析中，作者指出，基于动态原型实现的oop，其实是一种代理模式。对象的原型代理了对对象的属性的访问。当访问一个对象的某个属性时，其实是依次在对象的代理上查找“是不是有这个属性呢？”。因而在特定的实现中，可以在找不到对应属性时，改变代理的方向或作出对应的响应。**这种代理模式也就是通常说js是一门弱类型语言的语义所在，即对于一个对象而言，它是什么'类'的实例并不重要，重要的是它有哪些属性，它的原型链上有哪些属性。**

之后，作者通过对oop的一些特点的讨论，阐释了在es中实现这些特点的可行方法。比如多态/封装/多对象继承/接口/函数修饰符等等。这里作者用了很大的篇幅去讨论在es中常见的使用闭包封装私有变量，作者所着力强调的是，这种私有变量的封装，目的在于程序的**封装和抽象**， 而不是为了防范什么所谓的"黑客式地改变内部变量"。

而且，作者指出，在某些实现中，闭包的自由变量也并不是完全不可访问。比如在spidermonkey1.7中还可以通过给eval传递一个执行环境就可以改变其变量对象上的值。或者在rihno中，可以访问对象的固定属性(`__parent__`)来获得和修改环境中的值。

作者在对比**静态的类**和**动态原型**这两种oop时，所做出的各自特点归类很有价值，在这里特别记一下：

> ##### [Key concepts of class based model](http://dmitrysoshnikov.com/ecmascript/chapter-7-1-oop-general-theory/#key-concepts-of-class-based-model)
>
> - to create an object first it is necessary to define its class;
> - thus, the object will be created in its own classification “image and similarity” (structure and behavior);
> - resolution of methods is handled by a strict, direct, unchangeable chain of *inheritance*;
> - classes-descendants (and accordingly, objects created from them) contain all properties of an inheritance chain (even if some of these properties are not necessary to the concrete inherited class);
> - being created, the class cannot (because of the static model) to change a set of characteristics (neither properties, nor methods) of their instances;
> - instances (again because of strict static model) cannot have neither additional own (unique) behavior, nor the additional properties which are distinct from structure and behavior of the class.

> [Key concepts of prototype based model](http://dmitrysoshnikov.com/ecmascript/chapter-7-1-oop-general-theory/#key-concepts-of-prototype-based-model)
>
> - the basic concept is an *object*;
> - objects are fully dynamic and mutable (and in the theory can completely mutate from one type into another);
> - objects do not have the strict classes which describe their structure and behavior; objects do not need classes;
> - however, not having classes, objects can have prototypes to which they can delegate if cannot answer the message themselves;
> - the object prototype can be changed at any moment at runtime;
> - in *delegation based* model changing prototype’s characteristics will affect on all objects related with this prototype;
> - in *concatenative prototype* model prototype is the *original copy* from which other objects are cloned and further become completely independent; changes of prototype’s characteristics do not affect on objects cloned from it;
> - if it is not possible to respond to a message, it is possible to signal the caller about it which can take additional measures (for example, to change dispatching);
> - identification of objects can be made not by their hierarchy and belonging to concrete type, but by a current set of characteristics.