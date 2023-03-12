---
title: 行为模式 - 观察者
date: 2023-03-12
category: Design-pattern
---

## 观察者

允许你制定一种订阅机制, 可在对象事件发生时通知多个 "观察" 该对象的其他对象

### 优点

- **开闭原则** 无需修改发布者代码就能引入新的订阅者类

- 可在运行时建立对象之间的联系

### 缺点

- 订阅者的通知顺序是随机的

### 适用场景

- 当一个对象状态的改变需要改变其他对象, 或实际对象是事先未知的或动态变化的时

  例如你创建了自定义按钮类并允许客户端在按钮中注入自定义代码, 这样当用户按下按钮时就会触发这些代码

- 当应用中的一些对象必须观察其他对象时, 可使用该模式, 但仅能在有限时间内或特定的情况下使用

### 发布订阅实现

::: details 点击查看代码

<<< @/docs/_code/Design-pattern/Emitter.js

:::

### 常见问题

[观察者 VS 发布订阅](https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c)