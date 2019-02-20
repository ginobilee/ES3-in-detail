
> Vue是面向对象的，通过一个plain object定义一个组件，所以，在Vue中，组件的本质是面向对象的模块。

***而React我觉得它聪明的地方在于，对组件的抽象要比Angular和Vue更彻底，除了对象化组件(Component和PureComponent)，函数也可以是组件(Stateless Component)。这也使得React一些特性Vue不能轻易效仿，比如HOC。***


1. jsx vs template
	react采用jsx表示页面和组件，更加灵活。比如vue中的computed，在react中是非常方便实现的。
2. setState vs this.data
	react提供了一个驱动数据更新的统一入口，然后自己去实现状态更新。
	vue将




vue在更改了this.data后是不是实时更新？