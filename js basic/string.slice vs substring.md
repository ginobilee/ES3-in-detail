### slice
1. 不改变原来的字符串
2. 传入一个数字时，作为获取子字符串的起始下标。如果是负数n，则以 length + n 作为起始下标。
3. 第1个参数: 大于字符串长度时，return 空字符串; 当为绝对值大于长度的负值时，当作0处理; 当为不大于长度的负值，当作 长度 + 参数值; 
4. 第2个参数: 大于字符串长度时，计算为 string.length; 绝对值大于字符串长度的负值时，返回空字符串; 小于第1个参数时，返回空字符串
5. 

### substring
1. 同 slice 的 1 & 2
2. 第1个参数: 大于字符串长度时，return 空字符串; 当为绝对值大于长度的负值时，当作0处理;当为不大于长度的负值，当作 0;  
3. 第2个参数: 大于字符串长度时，计算为 string.length; 绝对值大于字符串长度的负值时，返回空字符串; 小于第1个参数时，交换2者

### 总结
1. 当第一个参数n小于0时，且其绝对值不大于字符串长度时，slice 会换算为 length + n; 而 substring 会换算为 0
2. 当第二个参数n小于第一个参数时，slice 会返回空字符串；而 substring 会交换二者。

```javascript
const log = console.log
const original = '012345'
log(original.substring(-1) === '012345')
log(original.substring(1, 3) === '12')
```

### substr
not recommend using
