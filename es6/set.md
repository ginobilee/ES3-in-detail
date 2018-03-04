# set

`Set`构造器实际上可以接收任何一种可迭代对象作为参数，并使用迭代器来提取参数中的值。

# 可以使用`set.has(val)`来测试set是否有某个值。

# 可以用`set.delete(val)`或`set.clear()`来删除指定或所有值。

# WeakSet与Set的区别

1. 对于对象，前者是弱引用，当对该对象仅有的引用就是在WeakSet中时，垃圾回收器可以将其回收。而在Set中不行。
2. WeakSet不接受非对象的参数。
3. WeakSet不可迭代/无任何迭代器/无forEach方法/无size属性。
总之，若只想追踪对象的引用，应该使用WeakSet。

> Set数据结构
>
> *es6方法,Set本身是一个构造函数，它类似于数组，但是成员值都是唯一的
>
> 如下将array去重
>
> ```javascript
> const set = new Set([1,2,3,4,4])
>
> [...set] // [1,2,3,4]
>
> // or: Array.from(new Set())
>
> ```
>
> 



但set只能将基本值去重，但不能将引用类去重。如下:

```javascript
const set2 = new Set([1, [2, 3], [2, 3]]);
console.log(Array.from(set2)); // [1, [2, 3], [2, 3]]
```


# Map

map使用Object.is()来比较键值。

# 初始化Map

```
let map = new Map([['key1', 'value1'], ['key2', 'value2']])
```

# 能够用 WeakMap创建私有的引用类数据，并在该数据不被引用时被垃圾回收器回收。