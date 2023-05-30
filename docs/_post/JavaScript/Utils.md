---
title: 常用工具函数
date: 2023-04-18
category: JavaScript
---

## 常用工具函数封装

封装一些常用的工具方法

### debounce

防抖: 事件被触发n秒后再执行回调, 如果在这n秒内又被触发, 则重新开始计时

::: details 点击查看代码

<<< @/docs/_code/JavaScript/Utils/debounce.js

:::

<!-- 点击查看[测试示例](/_code/JavaScript/Utils/index.test.html)代码 -->

### throttle

节流: 在一定时间内仅触发一次函数, 如果在这段时间内被多次触发, 只一次生效

::: details 点击查看代码

<<< @/docs/_code/JavaScript/Utils/throttle.js

:::

### 生成随机字符串

> refs: [nanoid - urlAlphabet](https://github.com/ai/nanoid/blob/950dbdaefef465cc6925c6ec596b3478233a1c2d/url-alphabet/index.js)

随机生成一段字符串

::: details 点击查看代码

<<< @/docs/_code/JavaScript/Utils/randomStr.js

:::

### 简单字符串模板引擎

简易字符串模板引擎

::: details 点击查看代码

<<< @/docs/_code/JavaScript/Utils/template.js

:::

## 参考资料

- [7分钟理解JS的节流、防抖及使用场景](https://juejin.cn/post/6844903669389885453)

- [30secondsofcode](https://www.30secondsofcode.org/js/)
