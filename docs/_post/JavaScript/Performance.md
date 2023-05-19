---
title: Web 性能指标 Performance API
date: 2023-04-05
category: JavaScript
---

## Web 性能指标 Performance API

> source: [MDN - Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API)

核心 Web 指标:

- [Largest Contentful Paint (LCP)](https://web.dev/lcp/): 最大内容绘制, 测量加载性能. 为了提供良好的用户体验, LCP 应在页面首次开始加载后的**2.5**秒内发生

- [First Input Delay (FID)](https://web.dev/fid/): 首次输入延迟，测量交互性。为了提供良好的用户体验，页面的 FID 应为100 毫秒或更短.

- [Cumulative Layout Shift (CLS)](https://web.dev/cls/): 累积布局偏移, 测量视觉稳定性. 为了提供良好的用户体验, 页面的 CLS 应保持在 **0.1** 或更少

<!-- 常用性能计算公式:

这些指标可以通过 Web Performance API 中的 Performance Timing 接口和 Performance Observer 接口来获取。其中，Performance Timing 接口提供了浏览器加载页面的各个阶段的时间戳，而 Performance Observer 接口则允许我们观察页面中的资源加载、DOM 渲染等事件，并计算相应的性能指标。

> const t = performance.timing

| 指标 | 备注 | 计算公式
| :- | :- | :-
| 白屏时间(Time to First Paint, TTFP) | 页面开始加载到页面开始有内容呈现的时间 | `t.domLoading - t.navigationStart`
| 首屏时间(Time to First Screen, TTFS) | 页面开始加载到首屏内容全部呈现的时间 | `t.domContentLoadedEventEnd - t.navigationStart`
| 页面完全加载时间(Fully Loaded Time, FLT) | 从页面开始加载到页面所有资源都加载完成的时间 | `t.loadEventEnd - t.navigationStart`
| DNS 查询时间 | 完成 DNS 查询所需的时间 | `t.domainLookupEnd - t.domainLookupStart`
| TCP 连接时间 | 完成 TCP 连接所需的时间 | `t.connectEnd - t.connectStart`
| SSL 安全连接时间 | 完成 SSL 安全连接所需的时间 | `t.connectEnd - t.secureConnectionStart`
| TTFB 时间 | 从发送请求到收到服务器响应的第一个字节所需的时间 | `t.responseStart - t.requestStart`
| 页面加载时间(Page Load Time, PLT)| 从页面开始加载到页面所有资源加载完成且 DOM 渲染完成的时间 | `-`
| 可交互时间(Time to Interactive, TTI) | 从页面开始加载到页面变得可交互的时间 | `-`
| 首次输入延迟(First Input Delay, FID) | 从用户首次与页面交互到页面响应交互的时间 | `-`
| 总下载时间(Total Download Time, TDT) | 从页面开始加载到所有资源下载完成的时间 | `-` -->

## 参考资料

- [Web 性能](https://developer.mozilla.org/zh-CN/docs/Web/Performance)

- [Web 指标](https://web.dev/i18n/zh/vitals/)

- [优化最大内容绘制 Largest Contentful Paint(LCP)](https://web.dev/i18n/zh/optimize-lcp/)

- [优化首次输入延迟 First Input Delay(FID)](https://web.dev/i18n/zh/optimize-fid/)

- [优化累积布局偏移 Cumulative Layout shift(CLS)](https://web.dev/i18n/zh/optimize-cls/)



