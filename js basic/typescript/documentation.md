> This allows us to implement an interface just by having the shape the interface requires, without an explicit implements clause.

`never`类型的作用？

> Object spread also has a couple of other surprising limits. First, it only includes an objects’ **own, enumerable properties**. Basically, that means you lose methods when you spread instances of an object

> Typescript compiler doesn’t allow spreads of type parameters from generic functions

# 就是说，对于使用了`?`的`interface`，它是不能有其他属性的？
> **Object literals** get special treatment and undergo *excess property checking* when assigning them to other variables, or passing them as arguments. If an object literal has any properties that the “target type” doesn’t have, you’ll get an error.

确实如此。如果想让有别的属性，解决办法：

1. type assertion (use `as` or `<interface>`)

2. 最佳实践
```
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

3. 只有对象字面量会有上述的`excess property check`，所以将对象字面量赋值给一个变量可以绕过check。

#
增加了只读的的数组类型`ReadonlyArray`。这个类型的数组不能被修改，也不能被赋值给普通数组，除非以`type assertion`的方式。