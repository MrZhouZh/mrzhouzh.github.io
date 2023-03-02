---
title: 数据结构-链表
date: 2023-03-02
---

## 链表

> wikipedia: https://zh.wikipedia.org/wiki/%E9%93%BE%E8%A1%A8

```js
class Node {
  constructor(name) {
    this.name = name
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head')
  }

  // 添加节点
  append(name) {
    const newNode = new Node(name)
    let currentNode = this.head
    while(currentNode.next) {
      currentNode = currentNode.next
    }

    currentNode.next = newNode
  }

  // 插入节点
  insert(name, node) {
    if (!node || node === -1) {
      return false
    }

    const newNode = new Node(name)
    newNode.next = node.next
    node.next = newNode
  }

  // 删除节点
  remove(node) {
    const prevNode = this.findPrev(node)

    if (prevNode === -1) {
      return false
    }

    prevNode.next = prevNode.next.next
  }

  // 查找前一个节点
  findPrev(node) {
    let currentNode = this.head.next
    while (currentNode && currentNode.next !== node) {
      currentNode = currentNode.next
    }

    return currentNode === null ? -1 : currentNode
  }

  // 通过 name 查找节点
  findByName(name) {
    let currentNode = this.head.next
    while(currentNode !== null && currentNode.name !== name) {
      currentNode = currentNode.next
    }

    return currentNode === null ? -1 : currentNode
  }

  // 通过 index 查找节点
  findByIndex(index) {
    let currentNode = this.head.next
    let pos = 0

    while(currentNode !== null && pos !== index) {
      currentNode = currentNode.next
      pos++
    }

    return currentNode
  }

  // 查找中间节点
  findMidNode() {
    let fast = this.head,
      slow = this.head
    while(
      fast.next !== null && fast.next.next !== null
    ) {
      fast = fast.next.next
      slow = slow.next
    }

    return slow
  }
}

// ---------- Test ---------
let list = new LinkedList()
list.append('append1')
list.append('append2')

const findNode = list.findByName('append2')

list.insert('append3', findNode)
list.append('append4')
list.remove(list.findByName('append4'))

console.log(list)
```
