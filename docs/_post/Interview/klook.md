---
title: 客路旅行面试
# date: 2023-05-12
date: 2017-05-12
category: Interview
---

## 客路旅行面试

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

- Web 前端安全, 如何防止 XSS 攻击: https://www.arryblog.com/interview/advanced/security-xss.html

- 美团 - 前端安全系列（一）：如何防止XSS攻击？: https://tech.meituan.com/2018/09/27/fe-security.html

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
