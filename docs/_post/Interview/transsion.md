---
title: 传音控股面试
# date: 2023-05-16
date: 2017-05-16
category: Interview
---

## 传音控股面试

- Q: React 合成事件(SyntheticEvent)和原生事件有何不同? 

::: details 点击查看答案

> 参考 [React合成事件与DOM原生事件](https://tsejx.github.io/react-guidebook/foundation/advanced-guides/synthetic-event/)

合成事件的背景: 在生成fiber节点时, 其对应的dom节点可能还未挂载, 事件处理函数作为prop也就无法绑定到真实dom上. **采用合成事件就解决了这个问题，同时还可以利用fiber树的结构来模拟事件的捕获与冒泡。**

实现机制:

  - **事件委派**, 将事件绑定在结构的**最外层**, 使用统一的事件监听器, 监听器上维护一个保存所有组件上的监听事件和处理函数的映射. 当组件挂/卸载时, 就会在事件监听器上插入或删除一些对象, 事件发生时, 首先事件处理器处理, 然后在事件里找到真正的事件处理函数

  - **自动绑定**, 通过this指向当前组件, 通过这种引用方式进行缓存, 从而实现CPU和内存上的最优化. 通过箭头函数则不用

    ::: details 点击查看代码
    ```jsx
    import React, { Component } from 'react';

    class App extends Component {
      handleClick(e, arg) {
        console.log(e, arg);
      }
      render() {
        {/* bind */}
        return <button onClick={this.handleClick.bind(this, 'test')}>Test</button>;
        {/* arrow function */}
        <!-- return <button onClick={(e) => this.handleClick(e, 'test')}>Test</button>; -->
      }
    }
    ```
    :::

优点: 
  
  1. 性能优化, 当dom上绑定过多事件处理函数时, 页面性能以及内存等可能会受到影响, 事件代理可达到性能优化的目的
  
  2. 兼容性, 可以更好的跨平台

  3. 统一管理, 对事件进行归类, 设定不同的优先级

:::

- Q: react hooks 对比 class 组件

::: details 点击查看答案

// 无状态

:::

- Q: Vue(2.x & 3.x版本) diff 算法复杂度以及具体实现

::: details 点击查看答案

*To be Continued...*

:::

- Q: Node.js SSR 渲染流程以及 React 水合

::: details 点击查看答案

*To be Continued...*

:::

- Q: Node.js pm2进程管理相关

::: details 点击查看答案

*To be Continued...*

:::

- Q: Node.js 部署有哪些痛点

::: details 点击查看答案

*To be Continued...*

:::



- Q: 作为前端的主导负责人, 产品频繁修改需求如何处理

1. 从研发的角度, 需求的目的和业务价值
2. 产品的角度, 探讨出较为完善的方案
3. 项目的角度, 时间人力成本
4. 运营的角度, 维护成本增高
