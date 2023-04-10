---
title: 数据结构-队列
date: 2023-03-02
category: Algo
---

## 队列

FIFO: First In First Out(先进先出)

> wikipedia: [https://zh.wikipedia.org/wiki/%E9%98%9F%E5%88%97](https://zh.wikipedia.org/wiki/%E9%98%9F%E5%88%97)


### 数组实现

```js
const queue = []

// 入队
queue.push(0)
queue.push(1)
queue.push(2)

// 出队
const shiftVal = queue.shift()  // 0

console.log(queue)  // [1, 2]
```

### 双栈实现队列

::: details 点击查看代码

<<< @/docs/_code/Algo/Queue.js

:::
