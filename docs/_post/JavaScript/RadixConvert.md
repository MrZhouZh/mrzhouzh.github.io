---
title: 进制数转化
date: 2023-04-05
category: JavaScript
---

## 进制数转化

1. 整除法:

整除到没有余数

以十进制100转换为二进制为例：

| 计算   | 结果   | 余数
| :-: | :-: | :-:
| `100 / 2` | 50 | 0
| `50 / 2` | 25 | 0
| `25 / 2` | 12 | 1
| `12 / 2` | 6 | 0
| `6 / 2` | 3 | 0
| `3 / 2` | 1 | 1

结果: `100 => 1100100`

2. 比表法

`... 256 128 64 32 16 8 4 2 1`

`... 2^8 2^7 2^6 2^5 2^4 2^3 2^2 2^1 2^0`

例如: `173.8125`

先算整数部分

| - | - | - | - | - | - | - | - | -
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 128 | 64 | 32 | 16 | 8  | 4 | 2 | 1
| 173 | 45 | 45 | 13 | 13 | 5 | 1 | 1
| 1   | 0  | 1  | 0  | 1  | 1 | 0 | 1

小数部分: 0.8125

| 计算   | 结果   | 余数
| :-: | :-: | :-:
| 0.8125 x 2 | 1.625 | 1
| 0.625 x 2 | 1.25 | 1
| 0.25 x 2 | 0.5 | 0
| 0.5 x 2 | 1 | 1

所以计算结果得到: `10101101.1101`

### 程序实现

借助 `Number` 内置函数 `toString` 实现:

`Number.prototype.toString([radix])` 并没有继承 `Object.prototype.toString()`, `radix` 为转化基数(2~36), 默认为10

```js
(173.8125).toString(2)  // '10101101.1101'
(173.8125).toString(4)  // '2231.31'
(173.8125).toString(8)  // '255.64'
(173.8125).toString(16) // 'ad.d'
(173.8125).toString(32) // '5d.q'
```

手动实现10进制转化为10进制以下的数(10进制以上需要特殊的实现):

```js
function radixConvert(num, radix = 2) {
  if (radix >= 10) return
  let [res, decimalRes] = ['', '']
  let [n, decimal] = [num, num % 1]
  // 整数部分
  while (n) {
    res = n % radix + res
    n = Math.floor(n / radix)
  }

  // 小数部分
  if (decimal > 0) {
    while(decimal > 0 && decimal < 1) {
      decimalRes = decimalRes + String(Math.floor(decimal * radix))
      decimal = decimal * radix % 1
    }
  }

  return [res, decimalRes].join('.')
}

console.log(radixConvert(173.8125)) // '10101101.1101'
console.log(radixConvert(173.8125, 4))  // '2231.31'
console.log(radixConvert(173.8125, 8))  // '255.64'
```

简单实现转化为16进制

```js
function radix16Convert(num) {
  // 整除法
  if (num === 0) return num

  const HEXS = '0123456789abcdef'
  let [n, decimal] = [num, num % 1]
  let [hex, decimalHex] = ['', '']
  // 整数部分
  while (n) {
    hex = HEXS.charAt(n % 16) + hex
    n = Math.floor(n / 16)
  }
  // 小数部分
  if (decimal > 0) {
    while(decimal < 1) {
      decimalHex = HEXS.charAt(decimal * 16) + decimalHex
      decimal = Math.floor(decimal * 16)
    }
  }
  return [hex, decimalHex].join('.')
}

console.log(radix16Convert(10022321)) // 98edb1
console.log(radixConvert(173))  // ad
```

### 参考资料

- [进制转换在线工具](https://www.sojson.com/hexconvert.html)

- [十进制转二进制的两种方法](https://zhuanlan.zhihu.com/p/159127499)

- [MDN - Number.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
