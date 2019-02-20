eslint常用关闭校验语句

1. 关闭段落校验

```
/* eslint-disable */some code
some code
/* eslint-enable */
```

2. 关闭当前行校验

```
some code // eslint-disable-line
```

3. 关闭下一行校验

```
// eslint-disable-next-line
some code
```