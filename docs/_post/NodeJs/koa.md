---
title: Koa 原理解析
date: 2023-03-19
categories:
  - NodeJs
  - Koa
---

## Koa 原理解析

::: tip 参考链接
- 官网: https://koajs.com/
- 源码: https://github.com/koajs/koa
:::

先看两张图:

![koa模型](/images/NodeJs/koa-model.png)

![koa中间件](/images/NodeJs/koa-middleware.png)

在洋葱圈模型中, 每一层相当于一个中间件, 用来处理特定的功能. 处理顺序先是 `next()` 前请求(`Request`, 从外层到内层)然后执行 `next()` 函数, 最后是 `next()` 后响应(`Response`, 从内层到外层), 也就是说**每个中间件都有两次处理时机**.

### 从源码主流程实现一个简易版 Koa

源码中包含以下主流程:

- `use()`
- `listen()`

**重点在于 `compose` 这个函数**

::: details 点击查看完整代码
<<< @/docs/_code/NodeJs/simple-koa.js
:::


#### koa-compose 洋葱模型的实现

从代码分析, compose 返回一个 `Promise`, `Promise` 中取出第一个函数(也就是app.use添加的中间件), 传入 `context` 和第一个 `next` 函数来执行. 第一个 `next` 执行后返回的也是 `Promise`, Promise再取出第二个函数(中间件), 传入 `context` 和第二个 `next`, 以此类推, 直到最后一个有调用 `next`, 则返回 `Promise.resolve`, 没有调用则不执行 `next`. 这就是洋葱圈模型. 这种把函数存储下来的方式, 在许多开源代码中常见.

::: details 点击查看完整代码
<<< @/docs/_code/NodeJs/simple-koa-compose.js
:::

