如何判断一个节点是class component还是functional component?

react中利用的是原型链。如果节点继承了React.Component，那么就是class，否则就是functional。

但是，如果用instanceof 去判断的话，当页面中有多个React对象，在不同的元素和React对象之间进行判断就会出错。
所以，最后实在React.Component上加了一个标志量。刚开始加在React.Component上:
`Component.isReactClass = {};`
后来此时如果采用以前的组合寄生继承，则元素上查不到此属性，所以就将其放在了原型上，即: 
`Component.prototype.isReactComponent = {};`
之所以采用一个对象而非boolean，是为了配合早期不完善的Jest.

ref:
https://overreacted.io/how-does-react-tell-a-class-from-a-function/