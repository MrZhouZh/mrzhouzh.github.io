---
title: 客路旅行
# date: 2023-05-12
date: 2017-05-12
# category: Interview
---

## 客路旅行

邮件笔试

1. 请编写一个名为 "convertTemperature" 的 JavaScript 函数，该函数接受两个参数：一个表示温度的数值，一个表示当前温度单位的字符串（'C' 表示摄氏度，'F' 表示华氏度）。该函数应将给定的温度转换为另一个单位（摄氏度转华氏度或反之），并将结果四舍五入为最接近的整数。请确保您的代码易于阅读、文档完善，且遵循变量命名和函数设计的最佳实践。

示例输入和输出：
convertTemperature(32, 'F') // 输出: 0
convertTemperature(100, 'C') // 输出: 212

**关键点就在于温标转华标公式**

2. 请编写一个名为 "groupArrayElements" 的 JavaScript 函数，该函数接受两个参数：一个整数数组和一个正整数 n。该函数应尽可能将数组元素分组为 n 个大小相等的子数组。如果数组无法平均分割，最后一个子数组应包含剩余元素。请确保您的代码易于阅读、文档完善，且遵循变量命名和函数设计的最佳实践。

示例输入和输出：
groupArrayElements([1, 2, 3, 4, 5], 2) // 输出: [[1, 2, 3], [4, 5]]
groupArrayElements([1, 2, 3, 4, 5, 6], 4) // 输出: [[1, 2], [3, 4], [5], [6]]

这里就是将数组进行分割, 方法不限, 我暂时能想到的就是将数组进行切割, 需要注意的是**数组剩余长度和分割后新数组的剩余长度能不能被均分**

::: details 点击查看代码

<<< @/docs/_code/Interview/klook.js#snippet{13,43,45}

:::


### 二面

主要问项目相关的, 难点挑战

问的最多的是web安全(xss防范/CSRF)

::: tip 参考链接

- [Web 前端安全, 如何防止 XSS 攻击: ](https://www.arryblog.com/interview/advanced/security-xss.html)

- [美团 - 前端安全系列（一）：如何防止XSS攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)

:::


#### XSS 攻击

全称跨站脚本攻击(Cross-Site Scripting), 攻击者通过在目标网站注入恶意代码, 利用恶意代码攻击者可获取用户的敏感信息(Cookie/SessionID), 从而危害数据安全

攻击分为三种类型

| 类型 | 存储区 | 插入点
| - | - | -
| 存储型 XSS | 后端数据库 | HTML
| 反射型 XSS | URL | HTML
| DOM 型 XSS | 后端数据库/前端存储/URL | JavaScript

#### XSS 预防

- 存储型 XSS 预防:

  1. 防止 HTML 中出现注入
  2. 防止 JavaScript 执行时，执行恶意代码

- 预防存储型和反射型 XSS 攻击

  1. **纯前端渲染**, 代码和数据隔开. 明确告诉浏览器, 设置的内容是文本/属性/样式等
  2. **转义HTML**, `& < > " ' /`进行字符过滤, 但这种并不全面, 可以采取一些第三方库

- 预防 DOM 型 XSS

  - 注意 `.innerHTML`、`.outerHTML`、`document.write()` 这几个方法的使用, 不要把不可信的数据直接作为HTML插入页面


#### CSRF 攻防

全称跨站请求伪造(Cross-site request forgery). 攻击者诱导受害者进入第三方网站, 在这个第三方网站中, 向被攻击网站发送跨站请求. 利用受害者在被攻击网站已经获取的注册凭证, 绕过后台用户验证, 达到冒充用户对被攻击者的网站执行某项操作的目的

- 特点

1. 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生.
2. 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据.
3. 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”.
4. 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪

- 防护策略

  阻止不明外域访问

  1. **同源检测**. 服务端可以通过解析HTTP协议请求头中 `Origin Header` 和 `Referer Header`, 用来确认请求的来源域
  2. **Samesite Cookie**

  提交时添加本域的相关信息

  1. CSRF Token,, 服务端Token中下发给网页, 前端通过代码手动添加
  2. 双重 Cookie 验证


#### JS是解释型语言, 如何理解?

参考: [【译】JavaScript 工作原理：V8 引擎中5个优化代码的技巧](https://lyn-ho.github.io/posts/4d26265b/)

> 源代码 -> AST -> 字节码 -> 机器码

JS 在运行时逐行解释和执行代码，而不需要在编译阶段将代码转换为机器语言

先进行代码解析, 转化为内部的抽象语法树(AST), 引擎逐行解释抽象语法树, 在执行时将其转换为机器码或字节码, 然后执行相对应的操作.

而V8引擎通常会进行一些优化措施, 例如即时编译和字节码缓存, 用来提高代码的执行效率. 因此在实际运行时, JavaScript的解释执行往往和编译型语言有一定的交织, 使得 JavaScript 的执行效率得到提升

##### JS 执行过程

<!-- refs: 
  - https://mp.weixin.qq.com/s/WFHUPPuJrW3JJXUm8CTJPQ
  - https://zhuanlan.zhihu.com/p/466773898 -->

  共分为两个阶段

  - 编译阶段

  - 执行阶段

###### 编译阶段

JS引擎主要做了三件事:

- 词法分析
- 语法分析
- 字节码生成

具体细节可以阅读 [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler). 该仓库通过几百行代码实现了一个微型的编译器, 并详细介绍了三个过程的具体实现

###### 执行阶段

执行阶段会视情况创建各种类型的执行上下文, 例如: **全局上下文**(只有一个), 函数执行上下文. 而执行上下文的创建分为两个阶段:

- 创建阶段
- 执行阶段

在创建阶段会做如下事情:

- 绑定 this
- 为函数和变量分配内存空间
- 初始化相关变量为 undefined

我们以前经常提到的 **变量提升** 和 **函数提升** 就是在 **创建阶段**. 以下代码并不会报错:

```js
console.log(msg)
add(1, 2)

var msg = 'hello'
function add(a, b) {
  return a + b
}
```

在执行之前的创建阶段, 已经把 `msg` 和 `add` 的内存空间分配好了

#### Git merge 和 rebase 的区别

<!-- refs:
  - [【Git】：git rebase和git merge有什么区别？](https://joyohub.com/2020/04/06/git-rebase/)
-->

- `git merge` 优点是分支代码合并后不破坏原分支的代码提交记录，缺点就是会产生额外的提交记录并进行两条分支的合并，

- `git rebase` 优点是无须新增提交记录到目标分支，`rebase` 后可以将对象分支的提交历史续上目标分支上，形成线性提交历史记录，进行 review 的时候更加直观

- `git merge` 如果有多人进行开发并进行分支合并，会形成复杂的合并分支图

虽然 `git rebase` 的优点明显, 但是不能完全替代 `merge`.

`git rebase` 有一条黄金原则: 

::: tip

“No one shall rebase a shared branch” — Everyone about rebase

不能在一个共享的分支上进行 `git rebase` 操作

:::

总的来说:

- 融合代码到公共分支的时使用 `git merge`,而不用 `git rebase`

- 融合代码到个人分支的时候使用 `git rebase`，可以不污染分支的提交记录，形成简洁的线性提交历史记录
