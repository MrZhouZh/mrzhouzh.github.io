---
title: 算法-二分查找左边界
date: 2023-03-07
category: Algo
---

## 二分查找左边界

> 实现原理: 传入的是一个有序的数组, 左右递减, 取中间下标进行匹配, 如果中值小于目标值, 左下标向右移动一位, 小于则右下标等于中下标, 缩小搜索边界

<<< @/docs/_code/Algo/binarySearchLeftBound.js#snippet{25,28,34}
