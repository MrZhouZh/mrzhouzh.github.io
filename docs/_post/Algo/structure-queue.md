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

<<< @/docs/_code/Algo/Queue.js

```js
class CQueue {
  constructor() {
    this.inStack = []
    this.outStack = []
  }

  // 入队
  appendTail(value) {
    this.inStack.push(value)
  }

  // 出队
  deleteHead() {
    const { inStack, outStack } = this
    if (outStack.length > 0) return outStack.pop()

    while(inStack.length) {
      outStack.push(inStack.pop())
    }

    return outStack.pop() || -1
  }
}

// ---------- Test ---------
let cqueue = new CQueue()
cqueue.appendTail(0)
cqueue.appendTail(1)
cqueue.appendTail(2)

cqueue.deleteHead()
cqueue.deleteHead()

console.log(cqueue) // CQueue { inStack: [], outStack: [2] }
```
