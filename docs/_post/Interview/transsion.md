---
title: 传音控股
# date: 2023-05-16
date: 2017-05-16
# category: Interview
---

## 传音控股

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

::: tip 参考链接

1. [Dan 博客 - 函数式组件与类组件有何不同？](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)

2. [知乎 - 为什么 React 现在要推行函数式组件，用 class 不好吗？](https://www.zhihu.com/question/343314784/answer/937174224)

3. [React.js 官方文档 - hooks简介](https://zh-hans.legacy.reactjs.org/docs/hooks-intro.html)

:::

::: details 点击查看答案

| 函数式组件 | class 组件
| - | -
| 维护自己的state/props | 组件实例化一次, 通过 this 拿到最新的state/props
| 组件逻辑聚合 | 组件逻辑分散
| 逻辑复用简单 | 逻辑复用困难
| 心智负担小 | 心智负担大(声明周期)

:::

- Q: Vue(2.x & 3.x版本) diff 算法复杂度以及具体实现

> 参考: [说说 vue2 和 vue3 核心diff算法](https://juejin.cn/post/7092068900589797413)

::: details 点击查看答案

时间复杂度:

```
Vue2: O(n)

Vue3: O(nlogn)
```

**`Vue` diff 算法背景**: `Vue` 通过模板编译生成虚拟 `DOM` 树, 然后通过渲染器渲染成真实 `DOM`, 当数据更新时, 产生新的虚拟 `DOM` 树, 如果直接将新的虚拟 `DOM` 树渲染成真实 `DOM`, 势必造成了性能上的浪费, 为了进一步降低找出差异的性能损耗, 于是就有了 diff 算法(也称对比算法).

### `Vue2` 采用 **双端diff算法**

核心方法是 [`updateChildren`](https://github.com/vuejs/vue/blob/49b6bd4264c25ea41408f066a1835f38bf6fe9f1/src/core/vdom/patch.ts#L413), 共**5**种查找, 对比顺序为: `新前与旧前` -> `新后与旧后` -> `新后与旧前` -> `新前与旧后` -> `暴力对比`

在这个查找算法中, 提取了一个公用方法: [`sameVnode`](https://github.com/vuejs/vue/blob/49b6bd4264c25ea41408f066a1835f38bf6fe9f1/src/core/vdom/patch.ts#L36)

```js
function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

1. 新前(新的开始节点)与旧前(旧的开始节点)

对比相同, 新旧节点开始下标往后移一位, 如果不同, 则进行`新后与旧后`对比

2. 新后(新的结束节点)与旧后(旧的结束节点)

对比相同, 新旧节点结束下标往前移一位, 如果不同, 则进行 `新后与旧前` 对比

3. 新后(新的结束节点)与旧前(旧的开始节点)

对比相同, 将旧的开始**节点**移动到老的结束节点后面, 旧的开始**下标**往后移动一位, 新的结束**下标**往前移动一位, 如果不同, 则进行 `新前与旧后` 对比

4. 新前(新的开始节点)与旧后(旧的结束节点)

对比相同, 将旧的结束**节点**移动到旧的开始节点前面, 新的开始**下标**往后移动一位, 旧的结束**下标**往前移动一位, 如果不同, 则进行 `暴力对比`

5. 暴力对比(乱序)

遍历 `oldChildren` 生成 `key` 和 `index` 的映射表 `{'节点A': 0,'节点B': 1}`, 然后用新的开始节点的 `key` 在映射表中找, 如果找到就把该节点移动到最前面, 原来的位置用 `undefined` 占位, 防止数组塌陷, 老节点移动后破坏初始映射表位置. 如果没有找到, 则插入新节点

*To be Continued...*

:::

- Q: Node.js SSR 渲染流程以及 React 水合

::: details 点击查看答案

![查看图片](/images/Interview/node-ssr-react.png)

:::

- Q: Node.js pm2进程管理相关

::: details 点击查看答案

1. pm2 的特性

- 进程守护: 守护应用程序进程，确保进程持续运行，即使发生崩溃或意外退出.

- 自动重启: 如果应用程序崩溃或退出，PM2 可以自动重启进程，以确保应用程序的连续性.

- 多进程管理: 可以在单个主机上运行多个应用程序实例，以充分利用多核 CPU 的性能优势

- 日志管理: 配置日志文件的路径、大小限制和日志切割策略

- 负载均衡: 对于多进程模式下的应用程序, 在不同的进程之间平均分配请求，提高应用程序的并发能力和性能

- 代码热重载: 在不停止整个应用程序的情况下，重新加载代码更新，以实现零秒部署

- 集群模式: 将多个应用程序实例分布在多台主机上, 实现高可用性和负载均衡

- 环境管理: 通过文件配置不同的环境(开发、测试、生产), 在不同的部署环境中使用正确的程序

- 监控与诊断: 可查看应用程序的CPU使用情况, 内存占用, 进程状态等信息, 用以排查问题和优化性能

:::

- Q: Node.js 部署有哪些痛点

::: details 点击查看答案

*To be Continued...*

:::

- Q: 为什么v-for和v-if不能一起使用

::: details 点击查看答案

> 参考: [为什么v-if和v-for不能一起使用](https://juejin.cn/post/7155139407182299173)

1. `v-for` 比 `v-if` 的优先级更高, 点击[查看源码](https://github.com/vuejs/vue/blob/49b6bd4264c25ea41408f066a1835f38bf6fe9f1/src/compiler/codegen/index.ts#L83-L85)

  ```js#{10,12}
  export function genElement (el: ASTElement, state: CodegenState): string {
    if (el.parent) {
      el.pre = el.pre || el.parent.pre
    }

    if (el.staticRoot && !el.staticProcessed) {
      return genStatic(el, state)
    } else if (el.once && !el.onceProcessed) {
      return genOnce(el, state)
    } else if (el.for && !el.forProcessed) {
      return genFor(el, state)
    } else if (el.if && !el.ifProcessed) {
      return genIf(el, state)
    } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
      return genChildren(el, state) || 'void 0'
    } else if (el.tag === 'slot') {
      return genSlot(el, state)
    } else {
      // component or element
      // ...
    }
  }
  ```

2. 如果一起使用, 会造成性能上的浪费, 每次渲染都会先遍历后判断, 一般都是采用 `computed` 组合使用, 提前过滤掉选项, 或者可以采取 在 `v-for` 外层增加一层容器用 `v-if` 进行判断
:::

- Q: 作为前端的主导负责人, 产品频繁修改需求如何处理

1. 从研发的角度, 需求的目的和业务价值
2. 产品的角度, 探讨出较为完善的方案
3. 项目的角度, 时间人力成本
4. 运营的角度, 维护成本增高
