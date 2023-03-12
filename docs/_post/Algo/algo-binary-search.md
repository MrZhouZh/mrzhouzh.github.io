---
title: 算法-二分查找
date: 2023-03-06
category: Algo
---

## 二分查找

**只能在升序的数组中使用**

> 实现原理: 左右递减, 取中间下标进行匹配, 如果小于目标值, 左下标向右移动一位, 反之右下标项向左移动一位

<<< @/docs/_code/Algo/binarySearch.js#snippet{13,16,18,20}
