---
title: JS - 价格千分位分割
date: 2023-03-30
category: JavaScript
---

## 价格千分位分割

使用正则表达式 `/\B(?=(\d{3})+(?!\d))/g`

`\B`: 匹配一个非单词边界

`x(?=y)`: 先行断言, 当 'x' 后面跟着'y'. 例如 `/Jace(?=Sparat)/` 匹配到 'Sparat'.

`(?!pattern)` 负向预查. 在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如“Windows(?!95|98|NT|2000)”能匹配“Windows3.1”中的“Windows”，但不能匹配“Windows2000”中的“Windows”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始


```js
function formatterPrice(price) {
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Test
console.log(formatterPrice(12321134324324234))
// '12,321,134,324,324,234'
```

但是这种不能输入不能有小数点, 所以改造下

```js
function formatterPrice(price) {
  const part = String(price).split('.')
  part[0] = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return part.join('.')
}

// Test
console.log(formatterPrice(12321.01))
// 12,321.01
console.log(formatterPrice(5683321.021))
// 5,683,321.021
```

但是这种不能处理超过最大安全数(`[-(2 ^ 53 - 1), (2 ^ 53 - 1)]`), 例如, `formatterPrice(12321134324324234.08)`, 结果始终是 `12,321,134,324,324,234`, 究其根源, 具体涉及到底层的存储,运算机制[^1]

[^1]: [JavaScript 浮点数之迷: 0.1 + 0.2 为什么不等于 0.3?](https://mp.weixin.qq.com/s/EnXEdK8F8GWpKbeGOUGqqQ)

## 0.1 + 0.2 = 0.3 精度问题解决

> 以下解决方案只能处理在最大安全数范围内的数

```js
// 1. 考虑浮点数偏差小, 这种也会有特殊情况下不能处理, 如 210000 * 10000  * 1000 * 8.2 
const formatFloat = (n) => parseInt(n.toFixed(12))
formatFloat(0.1 + 0.2) // 0.3

// 2. 浮点化整, 这种也不能处理最大安全数
const getDecimal = n => String(n).replace(/^(\+|\-)?\d+\.(\d+)/g, '$2')
// getDecimal(3.1415926535) => '1415926535'
const formatFloat2 = (n1, n2) => {
  let delta, decimalN1, decimalN2
  try {
    // decimalN1 = String(n1).split('.')[1].length
    decimalN1 = getDecimal(n1).length
  } catch(e) { decimalN1 = 0 }
  try {
    // decimalN2 = String(n2).split('.')[1].length
    decimalN2 = getDecimal(n2).length
  } catch(e) { decimalN2 = 0 }

  delta = Math.pow(10, Math.max(decimalN1, decimalN2))

  return (n1 * delta + n2 * delta) / delta
}

// 3. 借助第三方库, 模拟实际运算的过程, 目前也有比较成熟的库
// - bignumber.js: https://github.com/MikeMcl/bignumber.js/blob/master/bignumber.js
// - big.js: https://github.com/MikeMcl/big.js/blob/master/big.js
// - decimal.js: https://github.com/MikeMcl/decimal.js
```

## 参考链接

- [MDN - `\B`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-non-word-boundary)

- [常用正则表达式使用方法](https://www.cnblogs.com/lsm-boke/p/12637932.html)

- [Node.js 中遇到大数处理精度丢失如何解决？前端也适用!](https://zhuanlan.zhihu.com/p/394841148)

- [JavaScript 中精度问题以及解决方案](https://www.runoob.com/w3cnote/js-precision-problem-and-solution.html)
