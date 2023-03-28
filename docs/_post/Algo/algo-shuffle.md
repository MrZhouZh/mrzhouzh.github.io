---
title: 数组随机顺序 - 洗牌算法
date: 2023-03-28
category: Algo
---

<!-- https://www.cnblogs.com/macq/p/6650586.html -->

## 洗牌算法

开发中常见将一个数组随机排序(shuffle), 以下是一般写法:

```js
// 0.5: 表示正负 50% 几率
const shuffle = (arr) => arr.sort(() => Math.random() * 0.5)
```

但是, 这种写法是有问题的, 它并**不能真正的打乱数组**

> 中文分析: <https://github.com/mqyqingfeng/Blog/issues/51>

> 可以去看: <https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array>

总结的原因就是, **V8** 引擎中针对长短数组使用了不同的排序方法, 短数组使用的是插入排序, 长数组使用了快速排序. 点这里 👉🏻[V8源码/Array.prototype.sort](https://github.com/v8/v8/blob/43960f2411453e808a515bc880478ac2bda25d37/third_party/v8/builtins/array-sort.tq#L1410)

于是乎, 就有大神们弄了一个算法: [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

::: details 点击查看代码

<<< @/docs/_code/Algo/shuffle.js#snippet{12,13}

:::



