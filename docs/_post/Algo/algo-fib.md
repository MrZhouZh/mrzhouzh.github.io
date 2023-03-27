---
title: 算法 - 斐波那契数列
date: 2023-03-27
category: Algo
---

## 斐波那契数列

> wiki百科: <https://zh.wikipedia.org/wiki/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0>

::: tip 斐波那契数列的定义

```
F0 = 0
F1 = 1
Fn = Fn - 1 + Fn - 2 (n >= 2)

定义: 由0和1开始，之后的斐波那契数就是由之前的两数相加而得出
1、 1、 2、 3、 5、 8、 13、 21、 34...
```

:::

### 普通递归的方式实现

这种递归造成了很多浪费, 重复计算多次

分析: fib(6) =>
  (fib(5) + fib(4)) + (fib(4) + fib(3)) + (...)

```js
/**
 * @param {number} n 
 * @returns {number}
 */
const fib = (n) => {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}

console.log(fib(6)) // 8
```

### 尾递归优化

将上一个值缓存下来

计算逻辑为:

- fib(6, 0, 1)
- fib(5, 1, 1)
- fib(4, 1, 2)
- fib(3, 2, 3)
- fib(2, 3, 5)
- fib(1, 5, 8)
- = 8

```js
/**
 * @param {number} n 
 * @returns {number}
 */
const fib = (n, pre = 0, cur = 1) => {
  if (n === 0) return n
  if (n === 1) return cur
  return fib(n - 1, cur, pre + cur)
}

console.log(fib(6)) // 8
```

### 递推(最终版)

一次循环便可实现

- fib(4)
- [0, 1] = [1, 1 + 0]
- [1, 1] = [1, 1 + 1]
- [2, 2] = [2, 2 + 1]
- [3, 3] = [3, 3 + 2]
- = 5
```js
/**
 * @param {number} n 
 * @returns {number[]}
 */
const fib = (n) => {
  let cur = 0
  let next = 1
  let result = []
  while(n--) {
    // es5
    // let temp = cur
    // cur = next
    // next += temp
    // es6
    [cur, next] = [next, cur + next]
    result.push(cur)
  }

  return result
}

console.log(fib(10))
// [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

