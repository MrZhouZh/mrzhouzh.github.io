---
title: 判断元素是否在可视区域内
date: 2023-04-09
category: JavaScript
---

## 判断元素是否在可视区域内

可视区域即我们浏览网页的设备肉眼可见的区域. 常见的应用场景有: 

- 图片的懒加载
- 列表的无线滚动
- 计算广告元素的曝光情况
- 可点击链接的预加载

实现的方式常见的有三种:

### Element.getBoundingClientRect()

如果一个元素在视窗之内的话，那么它一定满足下面四个条件：

- top 大于等于 
- left 大于等于 
- bottom 小于等于视窗高
- right 小于等于视窗宽度

::: details 点击查看代码

<<< @/docs/_code/JavaScript/inviewport-getboundingclientrect.js

:::

### IntersctionObserver

Intersection Observer API 会注册一个回调函数, 每当被监视的元素进入或者退出另外一个元素时 (或者 viewport)，或者两个元素的相交部分大小发生变化时, 该回调方法会被触发执行

::: details 点击查看代码

<<< @/docs/_code/JavaScript/inviewport-intersectionobserver.js

:::

### offsetTop/scrollTop

这种方式受布局影响, 有些不太准确

::: details 点击查看代码

<<< @/docs/_code/JavaScript/inviewport-offsetop-scrolltop.js

:::


### 参考资料

- [MDN - Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
- [MDN - Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)
- [MDN - IntersectionObserverEntry: isIntersecting property](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting)
