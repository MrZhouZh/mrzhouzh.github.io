---
title: HTTP 相关
date: 2017-05-23
---

## HTTP 相关

### HTTP 缓存

强缓存和协商缓存是两种缓存控制方式.

**强缓存**：通过设置 `Cache-Control` 和 `Expires` 响应头来控制强缓存。`Cache-Control` 是 `HTTP/1.1` 新提供的字段，取代了 `Expires`，用来控制页面缓存。它是一个复合字段，常用的有以下几个指令：

  - `private`：表示只能作为私有缓存，不能在用户之间共享。

  - `public`：表示可以在用户之间共享，适用于静态资源。

  - `max-age`：表示从缓存开始后，过了多少秒后会失效。

  - `no-store`：表示不允许缓存该请求或者响应的任何内容。

`Expires` 字段是一个绝对时间，是过期的日期和时间，如果本地时间大于 `Expires` 时间就说明缓存已经过期。它已经被 `Cache-Control` 替代。

**协商缓存**：协商缓存是指浏览器每次在请求资源时，都会向服务器发送请求，根据服务器返回的响应判断是否要从缓存中读取资源，从而避免了强缓存的缺陷。常用的控制方法有以下两种：

  - `Last-Modified / If-Modified-Since`：服务器在响应头中加上Last-Moidified字段表示该资源在服务器上的最后修改时间。当客户端再次请求时，在请求头 `If-Modified-Since` 字段带上上次服务器响应的Last-Modified时间，如果服务器判断没有修改，就会返回 *304 Not Modified* 状态码。使用场景通常是对于静态资源且目标资源文件大小小于1MB的资源，否则存在重复读写的问题。

  - `ETag / If-None-Match`： `ETag` 是服务器响应头中表示资源版本的字段，它是一个字符串

**启发式缓存**: 如果响应中未显示 `Expires`, `Cache-Control:max-age` 或`Cache-Control:s-maxage`, 并且响应中不包含其他有关缓存的限制, 缓存可以使用启发式方法计算新鲜度寿命. 通常会根据响应头中的2个时间字段 `Date` 减去 `Last-Modified` 值的 **10%** 作为缓存时间

<!-- refs: [【金三银四】一年半经验，小羽同学的CVTE突袭面经](https://juejin.cn/post/6950128776315404302#heading-2) -->
