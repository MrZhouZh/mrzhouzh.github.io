---
title: 算法-统计只出现一次的数字
date: 2023-03-09
---

## 统计只出现一次的数字

> 来源: [leetcode 136](https://leetcode.cn/problems/single-number/)

> 解题思路: 异或运算. 一个数和它本身做异或运算结果为 0，即 `a ^ a = 0`；一个数和 0 做异或运算的结果为它本身，即 `a ^ 0 = a`

```js
const singleNumber = (nums) => {
  let res = 0
  for(const n of nums) {
    res ^= n
  }

  return res
}

// ---------- Test ----------
console.log(singleNumber([4,1,2,3,1,2,3]))
// 4
```
