---
title: 算法 - 检查括号是否有效
date: 2023-03-18
category: Algo
---

## 检查括号是否有效

> 来源: [https://leetcode.cn/problems/valid-parentheses/](https://leetcode.cn/problems/valid-parentheses/)

1. 左括号必须用相同类型的右括号闭合
2. 左括号必须以正确的顺序闭合
3. 每个右括号都有一个对应的相同类型的左括号

解题思路:

利用栈的特性(LIFO), 构建一个 Map 括号映射, 左括号为 key , 右括号为 value, 将字符串中存在左括号压入栈中, 右括号出栈顶, 最后栈中如果有剩余长度则表示不合法.

<<< @/docs/_code/Algo/isValidBrackets.js#snippet{18,20}
