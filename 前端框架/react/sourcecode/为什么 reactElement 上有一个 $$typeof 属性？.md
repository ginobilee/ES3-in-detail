为什么 reactElement 上有一个 $$typeof 属性？

是为了区别这个element是不是由react创建的。区别的动机是为了安全。如果react发现一个element上没有这个键，或者这个键不是Symbol.for('react.element')或者0xeac7(不支持Symbol)时，就不会执行这个元素的markup语法。